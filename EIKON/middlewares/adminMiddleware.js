function adminMiddleware(req, res, next) {
 if (!req.session.user || req.session.user.role !== "admin") {
  return res.redirect("/?error=Acceso solo para Administrador");
 }
 next();
}
