const { IncomingForm } = require("formidable");
const fs = require("fs");
const path = require("path");
const productModel = require("../models/productModel");

const productsController = {
 /*===============
STORE METHODE
===============*/
 store: function (req, res, next) {
  const form = new IncomingForm({
   uploadDir: path.join(__dirname, "../public/images/products"),
   keepExtensions: true,
   multiples: true,
  });

  // Formidabel parse the form
  form.parse(req, (err, fields, files) => {
   if (err) {
    console.error(err);
    return res.status(500).send("Erreur upload");
   }

   // Checkboxes

   const spaces = [];
   const themes = [];

   const possibleSpaces = ["office", "home", "profesionals", "museum"];
   possibleSpaces.forEach((space) => {
    if (fields[space]) {
     spaces.push(space);
    }
   });

   const possibleThemes = [
    "architecture",
    "animals",
    "vintage",
    "bauhaus",
    "maps",
    "blueprints",
   ];

   possibleThemes.forEach((theme) => {
    if (fields[theme]) {
     themes.push(theme);
    }
   });

   //  Files upload

   const coverImage = files.portada
    ? "/images/products/" + path.basename(files.portada[0].filepath)
    : "";

   const secundaryImage = files.lamina
    ? "/images/products/" + path.basename(files.lamina[0].filepath)
    : "";

   // newProduct Construction

   const newProduct = {
    title: fields["product-title"],
    description: fields["product-description"],
    price: parseFloat(fields["product-price"]),
    category: fields["product-category"],
    space: spaces,
    theme: themes,
    coverImage,
    secundaryImage,
   };

   productModel.create(newProduct);

   // Redirect after creation
   res.redirect("/");
  });
 },

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
  const product = productModel.findById(id);

  if (!product) {
   return res.status(404).send("Produit non trouvé");
  }
  // Send specific product to the view
  return res.render("products/productDetail", { product });
 },
};

module.exports = productsController;
