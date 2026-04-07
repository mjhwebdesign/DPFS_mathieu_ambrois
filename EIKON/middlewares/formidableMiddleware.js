const { IncomingForm } = require("formidable");
const path = require("path");

module.exports = function (options = {}) {
 return (req, res, next) => {
  const form = new IncomingForm({
   uploadDir: options.uploadDir || path.join(__dirname, "../public/images/tmp"),
   keepExtensions: true,
   multiples: true,
   allowEmptyFiles: true, // validar en middleware
   minFileSize: 0, // validar en middleware
  });

  form.parse(req, (err, fields, files) => {
   if (err) {
    console.error("FORMIDABLE ERROR:", err);
    return res.status(500).send("Error al procesar formulario");
   }

   // Permite recuperar fields de Formidable como req.body y req.files
   req.body = {};
   Object.keys(fields).forEach((key) => {
    req.body[key] = fields[key]?.[0];
   });

   req.files = files;

   next();
  });
 };
};
