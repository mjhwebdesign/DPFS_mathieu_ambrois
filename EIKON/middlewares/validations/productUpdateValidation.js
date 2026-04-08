const { body } = require("express-validator");

module.exports = [
 body("productTitle")
  .notEmpty()
  .withMessage("El título es obligatorio")
  .isLength({ min: 5 })
  .withMessage("Mínimo 5 caracteres"),

 body("productDescription")
  .notEmpty()
  .withMessage("La descripción es obligatoria")
  .isLength({ min: 20 })
  .withMessage("Mínimo 20 caracteres"),

 body("productPrice")
  .notEmpty()
  .withMessage("El precio es obligatorio")
  .isFloat({ gt: 0 })
  .withMessage("Debe ser mayor a 0"),

 body("productCategory").notEmpty().withMessage("Selecciona una categoría"),

 // PORTADA opcional
 body("portada").custom((value, { req }) => {
  if (!req.files || !req.files.portada) return true;

  const file = Array.isArray(req.files.portada)
   ? req.files.portada[0]
   : req.files.portada;

  if (file.size === 0) return true;

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/png",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato portada inválido");
  }

  return true;
 }),

 // LAMINA opcional
 body("lamina").custom((value, { req }) => {
  if (!req.files || !req.files.lamina) return true;

  const file = Array.isArray(req.files.lamina)
   ? req.files.lamina[0]
   : req.files.lamina;

  if (file.size === 0) return true;

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/png",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato lamina inválido");
  }

  return true;
 }),
];
