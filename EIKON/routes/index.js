var express = require("express");
var router = express.Router();

/* GET home page and product list. */
router.get("/", function (req, res, next) {
 res.render("index");
});
/*Get cart page*/
router.get("/cart", function (req, res, next) {
 res.render("products/productCart");
});
/*Get Login Page*/
router.get("/login", function (req, res, next) {
 res.render("users/userlogin-userRegister");
});
/*Temporary Logout route*/
router.get("/logout", function (req, res, next) {
 res.render("index");
});
/*Profile Page*/
router.get("/profile", function (req, res, next) {
 res.render("users/userDetail");
});

/*Get login page*/

module.exports = router;
