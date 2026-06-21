const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp();
const db = admin.firestore();

let indexHtml = null;

function getIndexHtml() {
  if (!indexHtml) {
    try {
      indexHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');
    } catch (e) {
      indexHtml = '<!DOCTYPE html><html><head><title>Titi Roselia</title></head><body><div id="root"></div></body></html>';
    }
  }
  return indexHtml;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

exports.productOG = onRequest({ region: 'southamerica-east1' }, async (req, res) => {
  const match = req.path.match(/\/productos\/([^/?]+)/);

  if (!match) {
    res.set('Cache-Control', 'public, max-age=60');
    return res.send(getIndexHtml());
  }

  const productId = match[1];

  try {
    const doc = await db.collection('products').doc(productId).get();
    let html = getIndexHtml();

    if (doc.exists) {
      const product = doc.data();
      const imageUrl = product.image1 || (product.images && product.images[0]) || '';
      const title = escapeHtml(`${product.name} - Titi Roselia`);
      const description = escapeHtml(
        (product.description || 'Pastelería artesanal').substring(0, 200)
      );
      const url = `https://${req.hostname}/productos/${productId}`;

      const ogTags = `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />`;

      html = html.replace('</head>', `${ogTags}\n  </head>`);
    }

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(html);
  } catch (error) {
    console.error('Error in productOG function:', error);
    res.set('Cache-Control', 'public, max-age=60');
    res.send(getIndexHtml());
  }
});
