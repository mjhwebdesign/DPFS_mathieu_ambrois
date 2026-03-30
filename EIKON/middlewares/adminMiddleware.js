module.exports = function (req, res, next) {
 if (!req.session.user || req.session.user.role !== 1) {
  return res.redirect("/?error=Acceso solo para Administrador");
 }
 next();
};
