module.exports = function (req, res, next) {
 const loggedUser = req.session.user;

 if (!loggedUser) {
  return res.redirect("/?error=Debe iniciar sesión");
 }

 const profileId = parseInt(req.params.id);

 // Allow owner of account OR Admin
 if (loggedUser.id === profileId || loggedUser.role === 1) {
  return next();
 }

 return res.redirect("/?error=No tiene permisos para acceder");
};
