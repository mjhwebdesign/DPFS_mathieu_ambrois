const db = require("../../database/models");
const { validationResult } = require("express-validator");
const productModel = require("../../models/productModel");
const fs = require("fs");
const path = require("path");

const toBoolean = (value) => {
 if (value === undefined) return false;
 return value === "true" || value === "on";
};

const productApiController = {
 /*===============
LIST METHOD : GET /api/products*/

 list: async (req, res) => {
  try {
   // Config for pagination
   const page = parseInt(req.query.page) || 1;
   const limit = 10;
   const offset = (page - 1) * limit;

   // Paginated Products
   const { count, rows: products } = await db.Product.findAndCountAll({
    include: [
     { association: "category" },
     { association: "themes" },
     { association: "spaces" },
    ],
    limit,
    offset,
   });

   // Count by category
   const counts = await db.Product.findAll({
    attributes: [
     "category_id",
     [db.Sequelize.fn("COUNT", db.Sequelize.col("product_id")), "count"],
    ],
    group: ["category_id"],
    raw: true,
   });

   const categories = await db.Category.findAll({
    attributes: ["category_id", "category"],
    raw: true,
   });

   const countByCategory = {};
   counts.forEach((c) => {
    const cat = categories.find((cat) => cat.category_id === c.category_id);
    if (cat) {
     countByCategory[cat.category] = c.count;
    }
   });

   // Last product

   const lastProduct = await db.Product.findOne({
    order: [["createdAt", "DESC"]],
   });

   // Formated products
   const productsFormatted = products.map((product) => ({
    id: product.product_id,
    name: product.title,
    description: product.description,
    category: product.category ? product.category.category : "Sin categoría", // Avoid break if no category
    image: product.cover_image,
    detail: `/api/products/${product.product_id}`,
   }));

   // Next & Previous for pagination
   const totalPages = Math.ceil(count / limit);

   const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

   const next = page < totalPages ? `${baseUrl}?page=${page + 1}` : null;

   const previous = page > 1 ? `${baseUrl}?page=${page - 1}` : null;

   return res.json({
    count,
    countByCategory,
    lastProduct,
    page,
    totalPages,
    next,
    previous,
    products: productsFormatted,
   });
  } catch (error) {
   console.error(error);
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder a la lista de productos" });
  }
 },
 /*===============
DETAIL METHOD : GET /api/products/:id*/

 detail: async (req, res) => {
  try {
   const product = await db.Product.findByPk(req.params.id, {
    include: [
     { association: "category" },
     { association: "themes" },
     { association: "spaces" },
    ],
   });

   if (!product) {
    return res
     .status(404)
     .json({ error: "Error: No se puede acceder al detalle del producto" });
   }

   return res.json({
    product_id: product.product_id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category.category,

    // Related themes & Spaces
    themes: product.themes.map((t) => t.theme),
    spaces: product.spaces.map((s) => s.space),

    // Image
    image: `${product.cover_image}`,
   });
  } catch (error) {
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder al detalle del producto" });
  }
 },

 // ADMIN
 /*===============*/

 /*===============
CREATE METHOD */
 create: async (req, res) => {
  const errors = validationResult(req);

  const deleteUploadedFiles = () => {
   if (!req.files) return;
   Object.values(req.files).forEach((file) => {
    const f = Array.isArray(file) ? file[0] : file;
    if (f?.filepath && fs.existsSync(f.filepath)) {
     fs.unlinkSync(f.filepath);
    }
   });
  };

  if (!errors.isEmpty()) {
   deleteUploadedFiles();
   return res.status(400).json({ errors: errors.mapped() });
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
   const themesSelected = [];
   possibleThemes.forEach((theme) => {
    if (toBoolean(fields[theme])) themesSelected.push(theme);
   });

   // SPACES
   const possibleSpaces = ["office", "home", "professionals", "museum"];
   const spacesSelected = [];
   possibleSpaces.forEach((space) => {
    if (toBoolean(fields[space])) spacesSelected.push(space);
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
    title: fields.productTitle,
    description: fields.productDescription,
    price: parseFloat(fields.productPrice),
    category_id: parseInt(fields.productCategory),
    cover_image,
    secundary_image,
   });

   // THEMES RELATION
   const themesFromDB = await db.Theme.findAll({
    where: { theme: themesSelected },
   });
   await newProduct.addThemes(themesFromDB);

   // SPACES RELATION
   const spacesFromDB = await db.Space.findAll({
    where: { space: spacesSelected },
   });
   await newProduct.addSpaces(spacesFromDB);

   return res.json({ success: true, product: newProduct });
  } catch (error) {
   deleteUploadedFiles();
   return res.status(500).json({ error: "Error creando producto" });
  }
 },
 /*===============
EDITDATA  (Load current values of the product) */

 editData: async (req, res) => {
  try {
   const product = await db.Product.findByPk(req.params.id, {
    include: [
     { association: "category" },
     { association: "themes" },
     { association: "spaces" },
    ],
   });

   if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
   }

   return res.json({
    id: product.product_id,
    title: product.title,
    description: product.description,
    price: product.price,
    category_id: product.category_id,

    cover_image: product.cover_image,
    secundary_image: product.secundary_image,

    themes: product.themes.map((t) => t.theme),
    spaces: product.spaces.map((s) => s.space),
   });
  } catch (error) {
   return res.status(500).json({ error: "Error obteniendo producto" });
  }
 },

 /*=============== 
Update
===============*/
 update: async (req, res) => {
  try {
   console.log("BODY:", req.body);
   console.log("FILES:", req.files);

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
   }

   const fields = req.body;
   const files = req.files;
   const productId = req.params.id;

   const existingProduct = await db.Product.findByPk(productId);
   if (!existingProduct) {
    return res.status(404).json({ message: "Producto no encontrado" });
   }

   // Images
   let cover_image = existingProduct.cover_image;
   let secundary_image = existingProduct.secundary_image;

   const moveFile = (file) => {
    const newPath = "/images/products/" + file.newFilename;
    const destPath = path.join(
     __dirname,
     "../../public/images/products/",
     file.newFilename,
    );
    fs.renameSync(file.filepath, destPath);
    return newPath;
   };

   if (files?.portada && files.portada[0]?.size > 0) {
    cover_image = moveFile(files.portada[0]);
   }

   if (files?.lamina && files.lamina[0]?.size > 0) {
    secundary_image = moveFile(files.lamina[0]);
   }

   // Update ProductData
   await existingProduct.update({
    title: fields.productTitle,
    description: fields.productDescription,
    price: parseFloat(fields.productPrice),
    category_id: parseInt(fields.productCategory),
    cover_image,
    secundary_image,
   });

   // Theme
   const possibleThemes = [
    "architecture",
    "animal",
    "vintage",
    "bauhaus",
    "maps",
    "blueprints",
   ];

   const themesSelected = [];
   possibleThemes.forEach((theme) => {
    if (toBoolean(fields[theme])) themesSelected.push(theme);
   });

   const themesFromDB = await db.Theme.findAll({
    where: { theme: themesSelected },
   });

   await existingProduct.setThemes(themesFromDB);

   // Spaces
   const possibleSpaces = ["office", "home", "professionals", "museum"];
   const spacesSelected = [];
   possibleSpaces.forEach((space) => {
    if (toBoolean(fields[space])) spacesSelected.push(space);
   });

   const spacesFromDB = await db.Space.findAll({
    where: { space: spacesSelected },
   });

   await existingProduct.setSpaces(spacesFromDB);

   return res.json({
    ok: true,
    message: "Producto actualizado correctamente",
   });
  } catch (error) {
   console.error("🔥 UPDATE ERROR:", error);
   return res.status(500).json({ message: "Error del servidor" });
  }
 },

 /*===============
DELETE METHOD : GET /api/products/:id*/

 remove: async (req, res) => {
  try {
   await db.Product.destroy({
    where: { product_id: req.params.id },
   });

   return res.json({ deleted: true });
  } catch (error) {
   return res.status(500).json({ error: "Error eliminando producto" });
  }
 },
};

module.exports = productApiController;
