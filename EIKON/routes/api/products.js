const express = require("express");
const router = express.Router();

const productApiController = require("../../controllers/api/productApiController");

// Product List
router.get("/", productApiController.list);
// Product Detail
router.get("/:id", productApiController.detail);

module.exports = router;
