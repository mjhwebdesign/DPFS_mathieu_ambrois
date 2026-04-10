const db = require("../../database/models");

const userApiController = {
 /*===============
LIST METHOD : GET /api/users*/

 list: async (req, res) => {
  try {
   //  Config for pagination
   const page = parseInt(req.query.page) || 1;
   const limit = 10;
   const offset = (page - 1) * limit;

   // Paginated users
   const { count, rows: users } = await db.User.findAndCountAll({
    attributes: ["user_id", "first_name", "last_name", "email"],
    limit,
    offset,
   });

   // Formated Users
   const usersDetail = users.map((user) => ({
    id: user.user_id,
    name: user.first_name + " " + user.last_name,
    email: user.email,
    detail: `/api/users/${user.user_id}`,
   }));

   // Next & Previous for pagination
   const totalPages = Math.ceil(count / limit);

   const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

   const next = page < totalPages ? `${baseUrl}?page=${page + 1}` : null;

   const previous = page > 1 ? `${baseUrl}?page=${page - 1}` : null;

   return res.json({
    count,
    page,
    totalPages,
    next,
    previous,
    users: usersDetail,
   });
  } catch (error) {
   console.error(error);
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder a la lista de usuarios" });
  }
 },

 /*===============
DETAIL METHOD : GET /api/users/:id*/

 detail: async (req, res) => {
  try {
   const user = await db.User.findByPk(req.params.id);

   if (!user) {
    return res
     .status(404)
     .json({ error: "Error: No se puede acceder al detalle del usuario" });
   }

   return res.json({
    id: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    image: `${user.avatar}`,
   });
  } catch (error) {
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder al detalle del usuario" });
  }
 },
};

module.exports = userApiController;
