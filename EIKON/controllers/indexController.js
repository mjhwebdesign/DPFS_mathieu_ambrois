const indexController = {
 index: function (req, res, next) {
  res.render("index", { currentPath: req.path });
 },
 cart: function (req, res, next) {
  res.render("products/productCart", { currentPath: req.path });
 },
 login: function (req, res, next) {
  res.render("users/userlogin-userRegister");
 },
 logout: function (req, res, next) {
  res.render("index", { currentPath: req.path });
 },
};
module.exports = indexController;
