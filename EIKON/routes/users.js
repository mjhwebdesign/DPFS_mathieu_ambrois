var express = require("express");
let usersController = require("../controllers/usersController");
var router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const loggedUserMiddleware = require("../middlewares/loggedUserMiddleware");
const adminOrLoggedUserMiddleware = require("../middlewares/adminOrLoggedUserMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

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

//GET Detail of a user
router.get("/:id", authMiddleware, loggedUserMiddleware, usersController.show);

/* GET Edit user */
router.get("/userEdit/:id", adminOrLoggedUserMiddleware, usersController.edit);

// PUT Existing User update
router.put("/edit/:id", adminOrLoggedUserMiddleware, usersController.update);

// DELETE to Delete an Existing User
router.delete("/delete/:id", adminMiddleware, usersController.destroy);

module.exports = router;
