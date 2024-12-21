import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/order.controllers.js";

const router = Router();

router.route("/orders").get(getAllOrders);
router.route("/orders/:orderId").get(getOrderDetails).put(updateOrderStatus);
router.route("/create-orders").post(createOrder);

export default router;
