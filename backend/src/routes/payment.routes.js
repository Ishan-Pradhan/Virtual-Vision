import { Router } from "express";
import {
  handleKhaltiCallback,
  paymentController,
} from "../controllers/payment.controllers.js";
import {
  createOrder,
  updateOrderAfterPayment,
} from "../controllers/order.controllers.js";

const router = Router();

// router.route("/khalti-api").post(paymentController, createOrder);
router.route("/success").get(handleKhaltiCallback, updateOrderAfterPayment);

export default router;
