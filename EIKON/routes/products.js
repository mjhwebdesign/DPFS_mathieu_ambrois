var express = require("express");
var router = express.Router();

// Create a product page
router.get("/create", function (req, res, next) {
 res.render("products/productCreate");
});
// Edit a product page
router.get("/edit", function (req, res, next) {
 res.render("products/productEdit");
});
//Detail of a product Page
router.get("/:id", function (req, res, next) {
 res.render("products/productDetail");
});

module.exports = router;
