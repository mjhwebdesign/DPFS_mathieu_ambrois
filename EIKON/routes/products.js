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
// POST Existing Prodcut update
router.post("/edit/:id", productsController.update);

module.exports = router;
