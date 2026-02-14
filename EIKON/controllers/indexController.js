const productModel = require("../models/productModel");

const indexController = {
 /*===============
INDEX METHOD
===============*/
 index: function (req, res, next) {
  // Retrieve products
  const products = productModel.getAll();

  // Send  products to the view
  return res.render("index", { products });
 },

 /*===============
CART METHOD
===============*/
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
