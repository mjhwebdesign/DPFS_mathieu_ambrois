module.exports = function (req, res, next) {
 const loggedUser = req.session.user;

 if (!loggedUser) {
  return res.redirect("/?error=Debe iniciar sesión");
 }

 const profileId = parseInt(req.params.id);

 // Permitir si es el dueño O si es admin
 if (loggedUser.id === profileId || loggedUser.role === "admin") {
  return next();
 }

 return res.redirect("/?error=No tiene permisos para acceder");
};
