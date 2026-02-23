module.exports = function (req, res, next) {
 if (!req.session.user) {
  return res.redirect(
   "/login?error=Debe Loguearse en su cuenta para ver su perfil",
  );
 }

 next();
};
