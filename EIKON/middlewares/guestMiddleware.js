module.exports = function (req, res, next) {
 if (req.session.user) {
  return res.redirect("/users/" + req.session.user.id);
 }

 next();
};
