const usersController = {
 index: function (req, res, next) {
  return res.render("users/userList");
 },
 create: function (req, res, next) {
  return res.render("users/userCreate");
 },
 edit: function (req, res, next) {
  return res.render("users/userEdit");
 },
 show: function (req, res, next) {
  return res.render("users/userDetail");
 },
};

module.exports = usersController;
