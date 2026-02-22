var express = require("express");
let indexController = require("../controllers/indexController");
const usersController = require("../controllers/usersController");
var router = express.Router();

/* GET home page and product list. */
router.get("/", indexController.index);

/* GET temporary admin page. */
router.get("/admin", indexController.admin);

/* GET temporary admin page. */
router.get("/login", usersController.create);

/* GET home page and product list. */
router.get("/products", indexController.index);

/*Get cart page*/
router.get("/cart", indexController.cart);

/*Get Login Page*/
router.get("/login", indexController.login);

/*Temporary Logout route*/
router.get("/logout", indexController.logout);

module.exports = router;
