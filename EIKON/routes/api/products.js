const express = require("express");
const router = express.Router();

const productsApiController = require("../../controllers/api/productsApiController");
const formidableMiddleware = require("../../middlewares/formidableMiddleware");
const apiAdminMiddleware = require("../../middlewares/api/apiAdminMiddleware");
const productValidation = require("../../middlewares/validations/productValidation");
const productUpdateValidation = require("../../middlewares/validations/productUpdateValidation");

// Product List
router.get("/", productsApiController.list);
// Product Detail
router.get("/:id", productsApiController.detail);

// REQUIERE ADMIN
// CREATE PRODUCT
router.post(
 "/",
 apiAdminMiddleware,
 formidableMiddleware({ uploadDir: "public/images/products" }),
 productValidation,
 productsApiController.create,
);

router.get("/:id/edit", apiAdminMiddleware, productsApiController.editData);

router.put(
 "/:id",
 apiAdminMiddleware,
 formidableMiddleware({ uploadDir: "public/images/products" }),
 productUpdateValidation,
 productsApiController.update,
);

// Product delete
router.delete("/:id", apiAdminMiddleware, productsApiController.remove);

module.exports = router;
