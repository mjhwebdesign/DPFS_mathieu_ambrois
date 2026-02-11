const productsController = {
 create: function (req, res, next) {
  res.render("products/productCreate");
 },
 edit: function (req, res, next) {
  res.render("products/productEdit");
 },
 show: function (req, res, next) {
  res.render("products/productDetail");
 },
};

module.exports = productsController;
