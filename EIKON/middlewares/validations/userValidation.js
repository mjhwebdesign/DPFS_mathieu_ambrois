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
    throw new Error("Email ya registrado");
   }
   return true;
  }),

 body("password")
  .notEmpty()
  .withMessage("La contraseña es obligatoria")
  .isLength({ min: 8 })
  .withMessage("Mínimo 8 caracteres"),

 // Avatar VALIDATION

 body("avatar").custom((value, { req }) => {
  if (!req.files || !req.files.avatar) {
   throw new Error("Debes subir una imagen");
  }

  const file = Array.isArray(req.files.avatar)
   ? req.files.avatar[0]
   : req.files.avatar;

  if (file.size === 0) {
   throw new Error("Debes subir una imagen");
  }

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/png",
   "image/gif",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato de imagen inválido");
  }

  return true;
 }),
];
