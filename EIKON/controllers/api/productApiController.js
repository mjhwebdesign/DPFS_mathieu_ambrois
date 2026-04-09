const db = require("../../database/models");

const productApiController = {
 // GET /api/products
 list: async (req, res) => {
  try {
   const products = await db.Product.findAll({
    include: [
     { association: "category" },
     { association: "themes" },
     { association: "spaces" },
    ],
   });

   // COUNT
   const count = products.length;

   // COUNT BY CATEGORY
   const countByCategory = {};

   products.forEach((product) => {
    const categoryName = product.category.category;

    if (!countByCategory[categoryName]) {
     countByCategory[categoryName] = 0;
    }

    countByCategory[categoryName]++;
   });

   // FORMAT PRODUCTS
   const productsFormatted = products.map((product) => ({
    id: product.product_id,
    name: product.title,
    description: product.description,

    //
    categories: [product.category.category],

    detail: `/api/products/${product.product_id}`,
   }));

   return res.json({
    count,
    countByCategory,
    products: productsFormatted,
   });
  } catch (error) {
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder a la lista de productos" });
  }
 },

 // GET /api/products/:id
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
    return res.status(404).json({ error: "Error: No se encontró el producto" });
   }

   return res.json({
    product_id: product.product_id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category.category,

    //
    themes: product.themes.map((t) => t.theme),
    spaces: product.spaces.map((s) => s.space),

    // imagen
    image: `${product.cover_image}`,
   });
  } catch (error) {
   return res.status(500).json({ error: "Error: No se encontró el producto" });
  }
 },
};

module.exports = productApiController;
