var express = require("express");
let productsController = require("../controllers/productsController");
var router = express.Router();

// Create a product page
router.get("/create", productsController.create);
// Edit a product page
router.get("/edit", productsController.edit);
//Detail of a product Page
router.get("/:id", productsController.show);

module.exports = router;
