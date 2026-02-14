var express = require("express");
let indexController = require("../controllers/indexController");
var router = express.Router();

/* GET home page and product list. */
router.get("/", indexController.index);

/* GET home page and product list. */
router.get("/products", indexController.index);

/*Get cart page*/
router.get("/cart", indexController.cart);

/*Get Login Page*/
router.get("/login", indexController.login);

/*Temporary Logout route*/
router.get("/logout", indexController.logout);

module.exports = router;
