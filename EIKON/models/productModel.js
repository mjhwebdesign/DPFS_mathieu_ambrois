const products = require("../data/products.json");

const productModel = {
 getAll: function () {
  return products;
 },
 getById: function (id) {
  return products.find((product) => product.id === id);
 },
};

module.exports = productModel;
