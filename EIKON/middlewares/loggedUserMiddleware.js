module.exports = function (req, res, next) {
 const loggedUser = req.session.user;

 const profileId = parseInt(req.params.id);

 if (loggedUser.id !== profileId && loggedUser.role !== 1) {
  return res.redirect("/?error=Esta cuenta no es suya");
 }

 next();
};
