const { IncomingForm } = require("formidable");
const fs = require("fs");
const path = require("path");
let db = require("../database/models");
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

  form.parse(req, async (err, fields, files) => {
   if (err) {
    console.error(err);
    return res.status(500).send("Error de Carga");
   }

   // THEMES
   const possibleThemes = [
    "architecture",
    "animals",
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
   const cover_image = files.portada
    ? "/images/products/" + path.basename(files.portada[0].filepath)
    : "";

   const secundary_image = files.lamina
    ? "/images/products/" + path.basename(files.lamina[0].filepath)
    : "";

   // CREATE PRODUCT
   const newProduct = await productModel.create({
    title: fields["product-title"][0],
    description: fields["product-description"][0],
    price: parseFloat(fields["product-price"]),
    category_id: parseInt(fields["product-category"][0]),
    cover_image,
    secundary_image,
   });

   // 🔥 THEMES
   const themesFromDB = await db.Theme.findAll({
    where: {
     theme: themes,
    },
   });

   await newProduct.addThemes(themesFromDB);

   // 🔥 SPACES
   const spacesFromDB = await db.Space.findAll({
    where: {
     space: spaces,
    },
   });

   await newProduct.addSpaces(spacesFromDB);
   res.redirect("/admin");
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
 edit: async function (req, res) {
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
   return res.status(404).send("El producto no existe");
  }
  // Load Pre filled Form
  res.render("products/productEdit", { product });
 },
 /*===============
Update METHODE
===============*/
 update: function (req, res) {
  const id = req.params.id;
  const form = new IncomingForm({
   uploadDir: path.join(__dirname, "../public/images/products"),
   keepExtensions: true,
   allowEmptyFiles: true,
   minFileSize: 0,
  });

  form.parse(req, async (err, fields, files) => {
   if (err) {
    console.error(err);
    return res.status(500).send("Error update");
   }

   // 🔥 Producto existente (await ahora)
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

   // Cover
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

   // Secondary
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

   // UPDATE PRODUCT (sin relaciones)
   await productModel.update(id, {
    title: fields["product-title"][0],
    description: fields["product-description"][0],
    price: parseFloat(fields["product-price"]),
    category_id: parseInt(fields["product-category"][0]),
    cover_image,
    secundary_image,
   });

   //Traer instancia actualizada
   const updatedProduct = await productModel.findById(id);

   // THEMES
   const themesFromDB = await db.Theme.findAll({
    where: { theme: themes },
   });

   await updatedProduct.setThemes(themesFromDB); // Set reemplaza todo

   // SPACES
   const spacesFromDB = await db.Space.findAll({
    where: { space: spaces },
   });

   await updatedProduct.setSpaces(spacesFromDB);

   res.redirect("/admin");
  });
 },

 /*===============
DESTROY METHODE
===============*/

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

  // 🔥 DELETE en DB
  await productModel.delete(id);

  res.redirect("/admin");
 },

 /*===============
SHOW METHODE
===============*/
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
SEARCH METHODE
===============*/
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
