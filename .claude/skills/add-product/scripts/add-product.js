#!/usr/bin/env node
// Uploads product images to Firebase Storage and writes the product document to Firestore.
// Usage: node add-product.js <config.json>
//
// config.json shape:
// {
//   "id": "caja-de-12",              // Firestore doc ID (kebab-case)
//   "folder": "caja_de_12",          // Storage folder prefix (snake_case). Optional, defaults to id with - -> _
//   "name": "Caja de 12 minis",
//   "category": "mini",
//   "description": "4 sabores a elección",
//   "price": "27.000",
//   "size": "Tortas de 5cm",          // optional
//   "optionsLines": ["Carrot cake", "Lemon pie"], // optional, joined with a literal backslash-n
//   "outOfStock": false,              // optional
//   "show": true,                     // optional, defaults to true
//   "imagePaths": ["C:/path/image1.webp", "C:/path/image2.webp"],
//   "merge": false                    // set true to update an existing doc instead of erroring
// }

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const admin = require('firebase-admin');

const configPath = process.argv[2];
if (!configPath) {
  console.error('Usage: node add-product.js <config.json>');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
const serviceAccount = require(path.join(repoRoot, 'serviceAccountKey.json'));

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const {
  id,
  folder,
  name,
  category,
  description,
  price,
  size,
  optionsLines,
  outOfStock,
  show = true,
  imagePaths,
  merge = false,
} = config;

if (!id || !name || !category || !description || !price || !imagePaths || !imagePaths.length) {
  console.error('Missing required fields: id, name, category, description, price, imagePaths[]');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'titiroselia-a4fc9.firebasestorage.app',
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

async function uploadImage(localPath, destPath) {
  const token = crypto.randomUUID();
  await bucket.upload(localPath, {
    destination: destPath,
    metadata: {
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });
  const encodedPath = encodeURIComponent(destPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedPath}?alt=media&token=${token}`;
}

async function main() {
  const folderSlug = folder || id.replace(/-/g, '_');
  const urls = [];
  for (let i = 0; i < imagePaths.length; i++) {
    const localPath = imagePaths[i];
    if (!fs.existsSync(localPath)) {
      throw new Error(`Image not found: ${localPath}`);
    }
    const ext = path.extname(localPath) || '.webp';
    const destPath = `${folderSlug}/image${i + 1}${ext}`;
    const url = await uploadImage(localPath, destPath);
    urls.push(url);
    console.error(`Uploaded ${localPath} -> ${destPath}`);
  }

  const data = {
    name,
    category,
    description,
    price: String(price),
    show: !!show,
    image1: urls[0],
    image2: urls[1] || urls[0],
    images: urls,
  };
  if (size) data.size = size;
  if (typeof outOfStock === 'boolean') data.outOfStock = outOfStock;
  if (optionsLines && optionsLines.length) {
    data.options = optionsLines.join('\\n');
  }

  const docRef = db.collection('products').doc(id);
  if (merge) {
    await docRef.set(data, { merge: true });
  } else {
    const existing = await docRef.get();
    if (existing.exists) {
      throw new Error(`Document products/${id} already exists. Pass "merge": true in the config to update it instead.`);
    }
    await docRef.set(data);
  }

  console.log(JSON.stringify({ id, path: `products/${id}`, data }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
