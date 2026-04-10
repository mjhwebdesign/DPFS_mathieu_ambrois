const express = require("express");
const router = express.Router();

const userApiController = require("../../controllers/api/userApiController");

// User list
router.get("/", userApiController.list);

// User Detail
router.get("/:id", userApiController.detail);

module.exports = router;
