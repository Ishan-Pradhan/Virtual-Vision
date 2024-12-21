import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsById,
  deleteProduct,
  updateProduct,
  newArrivalProduct,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/product")
  .get(getProducts)
  .post(upload.fields([{ name: "productImg", maxCount: 1 }]), createProduct);

router
  .route("/product/:id")
  .get(getProductsById)
  .delete(deleteProduct)
  .put(upload.fields([{ name: "productImg", maxCount: 1 }]), updateProduct);

router.route("/newarrivals").get(newArrivalProduct);

export default router;
