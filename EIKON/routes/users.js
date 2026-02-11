var express = require("express");
var router = express.Router();

/* GET user list */
router.get("/", function (req, res, next) {
 res.render("users/userList");
});

/* GET Create user */
router.get("/create", function (req, res, next) {
 res.render("users/userCreate");
});

/* GET Edit user */
router.get("/edit", function (req, res, next) {
 res.render("users/userEdit");
});

module.exports = router;
