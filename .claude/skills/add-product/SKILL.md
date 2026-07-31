---
name: add-product
description: Add a new product to TitiRoselia's Firestore "products" collection, including uploading its images to Firebase Storage. Use when the user wants to add/create a new product, list a new item for sale, or upload photos for a product.
---

# Add Product

Adds a document to the `products` Firestore collection and uploads its images to
Firebase Storage. Uses the `firebase-admin` SDK (already a project dependency) with the
`serviceAccountKey.json` at the repo root (gitignored — never print or commit its contents),
since the Firebase MCP tools can read/write Firestore but cannot upload to Storage.

## Schema (inferred from existing docs — keep new products consistent)

- **Doc ID**: kebab-case slug derived from the product name (e.g. `caja-de-12`). Products use
  meaningful IDs, not auto-generated ones.
- **Storage folder**: snake_case version of the same slug (e.g. `caja_de_12`), used as the
  folder prefix for that product's images in Storage.
- **Fields**:
  - `name` (string)
  - `category` (string) — one of `grande`, `chica`, `mini`, `navidad`, `dia-de-la-madre`,
    `alfajores`, `brownies`. If the user wants a new category, add it and confirm with them —
    it also needs a title mapping in `src/pages/product/product.js`'s `categoryToTitle` map and
    any category filter UI; this skill only touches Firestore/Storage.
  - `description` (string)
  - `price` (string) — Argentine format, dot as thousands separator, no currency symbol, e.g.
    `"25.000"`
  - `size` (string, optional)
  - `options` (string, optional) — only for categories `mini`, `dia-de-la-madre`, `alfajores`.
    Lines are joined with a **literal two-character `\n`** (backslash + n), NOT a real newline —
    see `src/pages/product/product.js`'s `.split("\\n")`. The upload script's `optionsLines`
    array handles this correctly; don't hand-write the joined string.
  - `outOfStock` (boolean, optional)
  - `show` (boolean) — visibility on the site, default `true`
  - `image1`, `image2` (string URLs) — first two images; used for the product-card hover-swap
    and as the OG-tag fallback image (`functions/index.js`)
  - `images` (array of string URLs) — all images, used in the product page carousel

## Steps

1. Gather from the user: product name, category, description, price, size (if relevant),
   list of option lines (if relevant), out-of-stock flag, and the local file paths of the
   images, in the order they should appear.
2. Derive the doc ID (kebab-case of the name) and storage folder (same slug, `-` → `_`).
3. Write a JSON config to the scratchpad dir matching the shape documented at the top of
   `scripts/add-product.js`.
4. Run: `node .claude/skills/add-product/scripts/add-product.js <path-to-config.json>`
   - Uploads each image to `<folder>/imageN.<ext>` in Storage with a fresh public download
     token, then creates the Firestore doc at `products/<id>`.
   - Fails loudly (non-zero exit) if a doc with that ID already exists, unless the config sets
     `"merge": true`.
   - Prints the created doc as JSON on success.
5. Verify with the Firebase MCP tool `firestore_get_document`
   (parent: `projects/titiroselia-a4fc9/databases/(default)/documents/products/<id>`) and
   report the result back to the user.

## Notes

- Confirm with the user before setting `"merge": true` against an existing product — it
  overwrites that doc's fields.
- If unsure of a value (category, whether options apply, price format), ask rather than guess —
  bad data here is user-facing on the storefront.
