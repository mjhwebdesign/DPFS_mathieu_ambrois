var express = require("express");
let indexController = require("../controllers/indexController");
const usersController = require("../controllers/usersController");
var router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");

/* GET home page and product list. */
router.get("/", indexController.index);

/* GET temporary admin page. */
router.get("/admin", adminMiddleware, indexController.admin);

/* GET temporary admin page. */
router.get("/login", guestMiddleware, usersController.create);

/* GET home page and product list. */
router.get("/products", indexController.index);

/*Get cart page*/
router.get("/cart", indexController.cart);

module.exports = router;
