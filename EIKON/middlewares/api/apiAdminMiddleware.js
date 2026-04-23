module.exports = function (req, res, next) {
 if (!req.session.user || req.session.user.role !== 1) {
  return res.status(401).json({
   error: "Acceso solo para administradores",
  });
 }
 next();
};
