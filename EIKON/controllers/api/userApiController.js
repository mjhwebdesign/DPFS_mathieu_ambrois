const db = require("../../database/models");

const userApiController = {
 // GET /api/users
 list: async (req, res) => {
  try {
   const users = await db.User.findAll({
    attributes: ["user_id", "first_name", "last_name", "email"],
   });

   const usersDetail = users.map((user) => {
    return {
     id: user.user_id,
     name: user.first_name + " " + user.last_name,
     email: user.email,
     detail: `/api/users/${user.user_id}`,
    };
   });

   return res.json({
    count: users.length,
    users: usersDetail,
   });
  } catch (error) {
   return res
    .status(500)
    .json({ error: "Error: No se puede acceder a la lista de usuarios" });
  }
 },

 // GET /api/users/:id
 detail: async (req, res) => {
  try {
   const user = await db.User.findByPk(req.params.id);

   if (!user) {
    return res.status(404).json({ error: "Error: No se encontró el usuario" });
   }

   return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: `${user.avatar}`,
   });
  } catch (error) {
   return res.status(500).json({ error: "Error al obtener usuario" });
  }
 },
};

module.exports = userApiController;
