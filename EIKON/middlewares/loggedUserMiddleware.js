module.exports = function (req, res, next) {
 const loggedUser = req.session.user;

 const profileId = parseInt(req.params.id);

 if (loggedUser.id !== profileId) {
  return res.redirect("/");
 }

 next();
};
