const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const productModel = {
 // 🔎 Get all products (fs to read , rewrite and deliver fresh data after all getAll() Call !! after Create update Delete )
 getAll: function () {
  const productsFile = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(productsFile);
 },

 // 🔎 Trouver un produit par ID
 findById: function (id) {
  const products = this.getAll();
  return products.find((product) => product.id == id);
 },

 // ➕ Créer un nouveau produit
 create: function (newProduct) {
  const products = this.getAll();

  // Génération ID automatique
  const lastProduct = products[products.length - 1];
  const newId = lastProduct ? lastProduct.id + 1 : 1;

  const productToSave = {
   id: newId,
   ...newProduct,
  };

  products.push(productToSave);

  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

  return productToSave;
 },
};

module.exports = productModel;
