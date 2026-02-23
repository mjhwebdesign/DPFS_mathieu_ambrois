var express = require("express");
let productsController = require("../controllers/productsController");
var router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");

// GET create a product page
router.get("/create", adminMiddleware, productsController.create);
// GET Edit a product page
router.get("/edit/:id", adminMiddleware, productsController.edit);
//GET Detail of a product Page
router.get("/:id", productsController.show);
//POST a new product
router.post("/create", adminMiddleware, productsController.store);
// PUT Existing Product update
router.put("/edit/:id", adminMiddleware, productsController.update);
// DELETE to Delete an Existing Product
router.delete("/delete/:id", adminMiddleware, productsController.destroy);

module.exports = router;
