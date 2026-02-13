const indexController = {
 index: function (req, res, next) {
  return res.render("index");
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
