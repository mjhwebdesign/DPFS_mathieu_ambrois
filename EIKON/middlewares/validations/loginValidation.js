const { body } = require("express-validator");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

module.exports = [
 body("emailLogin")
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("Formato inválido")
  .bail() // stop execution if errors
  .custom(async (value) => {
   const user = await userModel.findByEmail(value);
   if (!user) {
    throw new Error("Usuario no existe");
   }
   return true;
  }),

 body("password")
  .notEmpty()
  .withMessage("La contraseña es obligatoria")
  .bail()
  .custom(async (value, { req }) => {
   const user = await userModel.findByEmail(req.body.email);

   if (!user) return true; // ya lo manejó arriba

   const isValid = bcrypt.compareSync(value, user.password);

   if (!isValid) {
    throw new Error("Clave incorrecta");
   }

   return true;
  }),
];
