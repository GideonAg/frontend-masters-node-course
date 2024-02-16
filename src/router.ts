import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/products";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/updates";

const router = Router();

/**
 * PRODUCT
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.put(
  "/product/:id",
  body("name", "valid character name field is required").isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name", "valid character name field is required").isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * UPDATE
 */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["SHIPPED", "DEPRECATED", "IN_PROGRESS"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * UPDATE POINT
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
);
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  () => {}
);
router.delete("/updatepoint/:id", () => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "error from router handler" });
});

export default router;
