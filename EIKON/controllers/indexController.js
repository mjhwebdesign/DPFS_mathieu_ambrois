const productModel = require("../models/productModel");

const indexController = {
 index: function (req, res, next) {
  // Retrieve All products using the method in the Model previously created
  const products = productModel.getAll();
  // Send the products to the view using literal object { products: products }
  return res.render("index", { products });
 },
 cart: function (req, res, next) {
  return res.render("products/productCart");
 },
 login: function (req, res, next) {
  return res.render("users/userlogin-userRegister");
 },
 logout: function (req, res, next) {
  return res.render("index");
 },
};
module.exports = indexController;
