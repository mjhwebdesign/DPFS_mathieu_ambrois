const userModel = require("../models/userModel");

module.exports = function (req, res, next) {
 if (req.session.user) {
  return next();
 }

 const token = req.cookies.rememberToken;

 if (!token) {
  return next();
 }

 const users = userModel.getAll();

 const user = users.find((u) => u.rememberToken === token);

 if (!user) {
  return next();
 }

 // recrear la sesion solo si el token es valido
 req.session.user = {
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
 };

 next();
};
