import { Router } from "express";
export const router = Router();
import { productController } from "../controller/products.js";
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", productController.createProduct);
router.put("/:id", productController.uptadeProduct);
router.delete("/:id", productController.deleteOne);
