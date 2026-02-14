const productModel = require("../models/productModel");

const productsController = {
 create: function (req, res, next) {
  return res.render("products/productCreate");
 },
 edit: function (req, res, next) {
  return res.render("products/productEdit");
 },
 show: function (req, res, next) {
  //Get the id from the url
  const id = parseInt(req.params.id);
  // Retrieve a specific product using the method in the Model previously created
  const product = productModel.getById(id);

  if (!product) {
   return res.status(404).send("Produit non trouvé");
  }
  // Send specific product to the view
  return res.render("products/productDetail", { product });
 },
};

module.exports = productsController;
