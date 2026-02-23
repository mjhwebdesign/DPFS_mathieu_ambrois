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
    return res.status(500).send("Error de Carga");
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
    title: fields["product-title"][0],
    description: fields["product-description"][0],
    price: parseFloat(fields["product-price"]),
    category: fields["product-category"][0],
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
 /*===============
CREATE METHODE
===============*/
 create: function (req, res, next) {
  return res.render("products/productCreate");
 },
 /*===============
EDIT METHODE
===============*/
 edit: function (req, res) {
  const id = req.params.id;
  const product = productModel.findById(id);
  // Load Pre filled Form
  res.render("products/productEdit", { product });
 },
 /*===============
Update METHODE
===============*/
 update: function (req, res) {
  const id = req.params.id;
  const existingProduct = productModel.findById(id);

  const form = new IncomingForm({
   uploadDir: path.join(__dirname, "../public/images/products"),
   keepExtensions: true,
   allowEmptyFiles: true,
   minFileSize: 0, // in case the images doesn´t change
  });

  form.parse(req, (err, fields, files) => {
   if (err) {
    console.error(err);
    return res.status(500).send("Error update");
   }

   // CHECKBOXES

   const spaces = [];
   const themes = [];

   const possibleSpaces = ["office", "home", "profesionals", "museum"];
   possibleSpaces.forEach((space) => {
    if (fields[space]) spaces.push(space);
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
    if (fields[theme]) themes.push(theme);
   });

   //  IMAGES

   let coverImage = existingProduct.coverImage;
   let secundaryImage = existingProduct.secundaryImage;

   // If new cover image is load
   if (files.portada) {
    const file = Array.isArray(files.portada)
     ? files.portada[0]
     : files.portada;

    if (file.size > 0) {
     // Delete old image
     if (existingProduct.coverImage) {
      const oldPath = path.join(
       __dirname,
       "../public",
       existingProduct.coverImage,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
     }

     coverImage = "/images/products/" + path.basename(file.filepath);
    }
   }

   // If new secundary image is load
   if (files.lamina) {
    const file = Array.isArray(files.lamina) ? files.lamina[0] : files.lamina;

    if (file.size > 0) {
     if (existingProduct.secundaryImage) {
      const oldPath = path.join(
       __dirname,
       "../public",
       existingProduct.secundaryImage,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
     }

     secundaryImage = "/images/products/" + path.basename(file.filepath);
    }
   }

   // FINAL PRODUCT

   const updatedData = {
    title: fields["product-title"][0],
    description: fields["product-description"][0],
    price: parseFloat(fields["product-price"]),
    category: fields["product-category"][0],
    space: spaces,
    theme: themes,
    coverImage,
    secundaryImage,
   };

   productModel.update(id, updatedData);
   //Redirect to upadted product
   res.redirect("/products/" + id);
  });
 },

 /*===============
DESTROY METHODE
===============*/

 destroy: function (req, res) {
  const id = req.params.id;

  const product = productModel.findById(id);

  if (!product) {
   return res.status(404).send("Producto no encontrado");
  }

  //  Delete cover image
  if (product.coverImage) {
   const coverPath = path.join(__dirname, "../public", product.coverImage);

   if (fs.existsSync(coverPath)) {
    fs.unlinkSync(coverPath);
   }
  }

  //  Delete secondary Image
  if (product.secundaryImage) {
   const secundaryPath = path.join(
    __dirname,
    "../public",
    product.secundaryImage,
   );

   if (fs.existsSync(secundaryPath)) {
    fs.unlinkSync(secundaryPath);
   }
  }

  // Delete product from json
  productModel.delete(id);
  //Redirect
  res.redirect("/products");
 },

 /*===============
SHOW METHODE
===============*/
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
