const db = require("../../database/models");

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
LIST METHOD : GET /api/products/:id*/

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
};

module.exports = productApiController;
