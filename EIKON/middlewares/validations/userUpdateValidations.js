const { body } = require("express-validator");
const userModel = require("../../models/userModel");

module.exports = [
 body("firstName")
  .notEmpty()
  .withMessage("El apellido es obligatorio")
  .isLength({ min: 2 })
  .withMessage("Mínimo 2 caracteres"),

 body("lastName")
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .isLength({ min: 2 })
  .withMessage("Mínimo 2 caracteres"),

 body("email")
  .notEmpty()
  .withMessage("El email es obligatorio")
  .isEmail()
  .withMessage("Formato inválido")
  .custom(async (value) => {
   if (!value) return true;
   const user = await userModel.findByEmail(value);
   if (user) {
    return true;
   }
   return true;
  }),

 // Avatar VALIDATION

 body("avatar").custom((value, { req }) => {
  if (!req.files || !req.files.avatar) return true;

  const file = Array.isArray(req.files.avatar)
   ? req.files.avatar[0]
   : req.files.avatar;

  if (file.size === 0) return true;

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/png",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato avatar inválido");
  }
  return true;
 }),
];
