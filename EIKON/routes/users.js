var express = require("express");
let usersController = require("../controllers/usersController");
var router = express.Router();

/* GET user list */
router.get("/", usersController.index);

/* GET Create user */
router.get("/create", usersController.create);

/* GET Edit user */
router.get("/edit", usersController.edit);

/* GET Detail of a user*/
router.get("/:id", usersController.show);

module.exports = router;
