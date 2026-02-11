const indexController = {
 index: function (req, res, next) {
  res.render("index");
 },
 cart: function (req, res, next) {
  res.render("products/productCart");
 },
 login: function (req, res, next) {
  res.render("users/userlogin-userRegister");
 },
 logout: function (req, res, next) {
  res.render("index");
 },
};
module.exports = indexController;
