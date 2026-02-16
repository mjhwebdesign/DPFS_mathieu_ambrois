var express = require("express");
let productsController = require("../controllers/productsController");
var router = express.Router();

// GET create a product page
router.get("/create", productsController.create);
// GET Edit a product page
router.get("/edit/:id", productsController.edit);
//GET Detail of a product Page
router.get("/:id", productsController.show);
//POST a new product
router.post("/create", productsController.store);
// PUT Existing Prodcut update
router.put("/edit/:id", productsController.update);
// DELETE to Delete an Existing Product
router.delete("/delete/:id", productsController.destroy);

module.exports = router;
