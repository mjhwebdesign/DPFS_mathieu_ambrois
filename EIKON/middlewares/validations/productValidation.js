const { body } = require("express-validator");

module.exports = [
 // TITLE
 body("productTitle")
  .notEmpty()
  .withMessage("El título es obligatorio")
  .isLength({ min: 5 })
  .withMessage("Mínimo 5 caracteres"),

 // DESCRIPTION
 body("productDescription")
  .notEmpty()
  .withMessage("La descripción es obligatoria")
  .isLength({ min: 20 })
  .withMessage("Mínimo 20 caracteres"),

 // PRICE
 body("productPrice")
  .notEmpty()
  .withMessage("El precio es obligatorio")
  .isFloat({ gt: 0 })
  .withMessage("Debe ser un número mayor a 0"),

 // CATEGORY
 body("productCategory")
  .notEmpty()
  .withMessage("Debes seleccionar una categoría"),

 // PORTADA
 body("portada").custom((value, { req }) => {
  if (!req.files || !req.files.portada) {
   throw new Error("Debes subir una imagen de portada");
  }

  const file = Array.isArray(req.files.portada)
   ? req.files.portada[0]
   : req.files.portada;

  if (file.size === 0) {
   throw new Error("La portada es obligatoria");
  }

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/png",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato inválido (jpg, gif, png, webp)");
  }

  return true;
 }),

 // LAMINA
 body("lamina").custom((value, { req }) => {
  if (!req.files || !req.files.lamina) {
   throw new Error("Debes subir la imagen secundaria");
  }

  const file = Array.isArray(req.files.lamina)
   ? req.files.lamina[0]
   : req.files.lamina;

  if (file.size === 0) {
   throw new Error("La imagen secundaria es obligatoria");
  }

  const allowed = [
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/png",
   "image/webp",
  ];

  if (!allowed.includes(file.mimetype)) {
   throw new Error("Formato inválido (jpg, gif, png, webp)");
  }

  return true;
 }),
];
