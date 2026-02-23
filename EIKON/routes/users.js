var express = require("express");
let usersController = require("../controllers/usersController");
var router = express.Router();

/* GET user list */
//router.get("/", usersController.index);

/* GET Register Form Page */
router.get("/create", usersController.create);

/* POST a new User */
router.post("/create", usersController.store);

/* POST login form */
router.post("/login", usersController.login);

/* GET Logout Page */
router.get("/logout", usersController.logout);

/* GET Edit user */
//router.get("/edit", usersController.edit);

/* POST Update user */
//router.post("/edit", usersController.update);

/* GET Detail of a user*/
//router.get("/:id", usersController.show);

module.exports = router;
