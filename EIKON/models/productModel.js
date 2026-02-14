const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const productModel = {
 // Get all products (fs to read , rewrite and deliver fresh data after all getAll() Call !! after Create update Delete )
 getAll: function () {
  const productsFile = fs.readFileSync(productsFilePath, "utf-8");
  return JSON.parse(productsFile);
 },

 // Find a product by id
 findById: function (id) {
  const products = this.getAll();
  return products.find((product) => product.id == id);
 },

 // Create a new project
 create: function (newProduct) {
  const products = this.getAll();

  // Create an id
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

 // Update an existing product
 update: function (id, updatedData) {
  const products = this.getAll();

  const updatedProducts = products.map((product) => {
   if (product.id == id) {
    return {
     ...product,
     ...updatedData,
     id: product.id, // !! Make sure id doesn´t change
    };
   }
   return product;
  });

  fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
 },

 // Delete an existing product
 delete: function (id) {
  // Load clean product list
  const products = this.getAll();
  //Keep in filteredProducts all products except the one selected by id
  const filteredProducts = products.filter((product) => product.id != id);
  // Overwrite json with filteredProducts
  fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));

  return true;
 },
};

module.exports = productModel;
