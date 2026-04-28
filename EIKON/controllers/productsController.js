const { IncomingForm } = require("formidable");
const fs = require("fs");
const path = require("path");
let db = require("../database/models");
const productModel = require("../models/productModel");
const { validationResult } = require("express-validator");

const productsController = {
 /*===============
STORE METHODE*/

 store: async function (req, res, next) {
  const errors = validationResult(req);

  // Fn to Delete files if register failed
  const deleteUploadedFiles = () => {
   if (!req.files) return;

   Object.values(req.files).forEach((file) => {
    const f = Array.isArray(file) ? file[0] : file;
    if (f && f.filepath && fs.existsSync(f.filepath)) {
     fs.unlinkSync(f.filepath);
    }
   });
  };

  if (!errors.isEmpty()) {
   deleteUploadedFiles();
   return res.render("products/productCreate", {
    errors: errors.mapped(),
    oldData: req.body,
   });
  }

  try {
   const fields = req.body;
   const files = req.files;

   // THEMES
   const possibleThemes = [
    "architecture",
    "animal",
    "vintage",
    "bauhaus",
    "maps",
    "blueprints",
   ];

   const themes = [];
   possibleThemes.forEach((theme) => {
    if (fields[theme]) themes.push(theme);
   });

   // SPACES
   const possibleSpaces = ["office", "home", "professionals", "museum"];

   const spaces = [];
   possibleSpaces.forEach((space) => {
    if (fields[space]) spaces.push(space);
   });

   // FILES
   const portadaFile = Array.isArray(files.portada)
    ? files.portada[0]
    : files.portada;

   const laminaFile = Array.isArray(files.lamina)
    ? files.lamina[0]
    : files.lamina;

   const cover_image =
    "/images/products/" + path.basename(portadaFile.filepath);
   const secundary_image =
    "/images/products/" + path.basename(laminaFile.filepath);

   // CREATE PRODUCT
   const newProduct = await productModel.create({
    title: fields["productTitle"],
    description: fields["productDescription"],
    price: parseFloat(fields["productPrice"]),
    category_id: parseInt(fields["productCategory"]),
    cover_image,
    secundary_image,
   });

   // THEMES in Database
   const themesFromDB = await db.Theme.findAll({
    where: { theme: themes },
   });

   await newProduct.addThemes(themesFromDB);

   // SPACES in Database
   const spacesFromDB = await db.Space.findAll({
    where: { space: spaces },
   });

   await newProduct.addSpaces(spacesFromDB);

   return res.redirect("/admin");
  } catch (error) {
   console.error(error);
   deleteUploadedFiles();
   return res.status(500).send("Error creando producto");
  }
 },

 /*===============
CREATE METHODE*/

 create: function (req, res, next) {
  return res.render("products/productCreate", {
   errors: {},
   oldData: {},
  });
 },

 /*===============
EDIT METHODE*/

 edit: async function (req, res) {
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
   return res.status(404).send("El producto no existe");
  }
  // Load Pre filled Form
  res.render("products/productEdit", {
   product,
   errors: {},
   oldData: {},
  });
 },

 /*===============
Update METHODE*/

 update: async function (req, res) {
  const errors = validationResult(req);

  const deleteUploadedFiles = () => {
   if (!req.files) return;

   Object.values(req.files).forEach((file) => {
    const f = Array.isArray(file) ? file[0] : file;
    if (f && f.filepath && fs.existsSync(f.filepath)) {
     fs.unlinkSync(f.filepath);
    }
   });
  };

  if (!errors.isEmpty()) {
   deleteUploadedFiles();

   const product = await productModel.findById(req.params.id);

   return res.render("products/productEdit", {
    product,
    errors: errors.mapped(),
    oldData: req.body,
   });
  }

  try {
   const id = req.params.id;
   const fields = req.body;
   const files = req.files;

   const existingProduct = await productModel.findById(id);

   // CHECKBOXES
   const possibleSpaces = ["office", "home", "professionals", "museum"];
   const spaces = [];
   possibleSpaces.forEach((space) => {
    if (fields[space]) spaces.push(space);
   });

   const possibleThemes = [
    "architecture",
    "animal",
    "vintage",
    "bauhaus",
    "maps",
    "blueprints",
   ];

   const themes = [];
   possibleThemes.forEach((theme) => {
    if (fields[theme]) themes.push(theme);
   });

   // IMAGES
   let cover_image = existingProduct.cover_image;
   let secundary_image = existingProduct.secundary_image;

   // PORTADA
   if (files.portada) {
    const file = Array.isArray(files.portada)
     ? files.portada[0]
     : files.portada;

    if (file.size > 0) {
     if (existingProduct.cover_image) {
      const oldPath = path.join(
       __dirname,
       "../public",
       existingProduct.cover_image,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
     }

     cover_image = "/images/products/" + path.basename(file.filepath);
    }
   }

   // LAMINA
   if (files.lamina) {
    const file = Array.isArray(files.lamina) ? files.lamina[0] : files.lamina;

    if (file.size > 0) {
     if (existingProduct.secundary_image) {
      const oldPath = path.join(
       __dirname,
       "../public",
       existingProduct.secundary_image,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
     }

     secundary_image = "/images/products/" + path.basename(file.filepath);
    }
   }

   await productModel.update(id, {
    title: fields["productTitle"],
    description: fields["productDescription"],
    price: parseFloat(fields["productPrice"]),
    category_id: parseInt(fields["productCategory"]),
    cover_image,
    secundary_image,
   });

   const updatedProduct = await productModel.findById(id);

   const themesFromDB = await db.Theme.findAll({
    where: { theme: themes },
   });

   await updatedProduct.setThemes(themesFromDB);

   const spacesFromDB = await db.Space.findAll({
    where: { space: spaces },
   });

   await updatedProduct.setSpaces(spacesFromDB);

   return res.redirect("/admin");
  } catch (error) {
   console.error(error);
   deleteUploadedFiles();
   return res.status(500).send("Error actualizando producto");
  }
 },

 /*===============
DESTROY METHODE*/

 destroy: async function (req, res) {
  const id = req.params.id;

  const product = await productModel.findById(id);

  if (!product) {
   return res.status(404).send("Producto no encontrado");
  }

  // Delete cover image
  if (product.cover_image) {
   const coverPath = path.join(__dirname, "../public", product.cover_image);

   if (fs.existsSync(coverPath)) {
    fs.unlinkSync(coverPath);
   }
  }

  // Delete secondary image
  if (product.secundary_image) {
   const secundaryPath = path.join(
    __dirname,
    "../public",
    product.secundary_image,
   );

   if (fs.existsSync(secundaryPath)) {
    fs.unlinkSync(secundaryPath);
   }
  }

  // DELETE on DB
  await productModel.delete(id);

  res.redirect("/admin");
 },

 /*===============
SHOW METHODE*/

 show: async function (req, res, next) {
  //Get the id from the url
  const id = parseInt(req.params.id);
  // Retrieve a specific product using the method in the Model previously created
  const product = await productModel.findById(id);

  if (!product) {
   return res.status(404).send("Produit non trouvé");
  }
  // Send specific product to the view
  return res.render("products/productDetail", { product });
 },

 /*===============
SEARCH METHODE*/

 search: async function (req, res, next) {
  const form = new IncomingForm({
   multiples: true,
  });

  form.parse(req, async (err, fields) => {
   if (err) {
    return res.status(500).send("Error formulario");
   }
   const searchTerm = fields["searchTerm"][0];
   const products = await productModel.findByTerm(searchTerm);

   if (!products) {
    return res.status(404).send("Ningun producto corresponde");
   }

   // Send results to the view
   return res.render("searchResults", { products, searchTerm });
  });
 },
};

module.exports = productsController;
