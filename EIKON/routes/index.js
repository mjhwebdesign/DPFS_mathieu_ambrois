var express = require("express");
var router = express.Router();
let indexController = require("../controllers/indexController");
const usersController = require("../controllers/usersController");
const cartController = require("../controllers/cartController");
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

/*GET cart page*/
router.get("/cart", cartController.getCart);

/* POST items to Cart */
router.post("/cart/add", cartController.add);

/* UPDATE items directly in cart */
router.post("/cart/update", cartController.update);

/* DELETE item from cart */
router.post("/cart/remove", cartController.remove);

module.exports = router;
