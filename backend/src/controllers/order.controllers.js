import { Order } from "../models/orders.models.js";
import { Product } from "../models/product.models.js";
import { paymentController } from "./payment.controllers.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer_info, products_details, payment_method } = req.body;

    console.log(customer_info, products_details, payment_method);
    const order = await Order.create({
      ...req.body,
      products: products_details.map((product) => ({
        product: product.name,
        quantity: product.quantity,
        identity: product.identity,
      })),
      customer_information: {
        name: customer_info.name,
        phone: customer_info.phone,
        email: customer_info.email,
      },
      address: customer_info.address,
      payment_method,
    });

    if (order.payment_method === "khalti") {
      const formData = {
        return_url: "http://localhost:3000/api/v1/success",
        website_url: "http://localhost:3000",
        amount: order.amount,
        purchase_order_id: order._id,
        purchase_order_name: order.customer_information.name,
      };

      paymentController(formData, req, res);
    } else if (order.payment_method === "cashOnDelivery") {
      order.status = "cash on delivery";
      for (const productDetail of order.products) {
        const product = await Product.findById(productDetail.identity);
        if (!product) {
          console.error(`Product not found: ${productDetail.product}`);
          continue;
        }

        product.stock -= productDetail.quantity;
        product.quantitySold += productDetail.quantity;

        await product.save();
      }
      await order.save();
      res.send({
        message: "Your product will be delivered",
        order,
        payment_method,
        amount: order.amount,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: err?.message || "Failed to create order" });
  }
};

export const updateOrderAfterPayment = async (req, res) => {
  try {
    console.log(req.body);
    const order = await Order.findById(req.transaction_uuid);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    order.status = "paid";
    order.transaction_code = req.transaction_code;

    for (const productDetail of order.products) {
      const product = await Product.findById(productDetail.identity);
      if (!product) {
        console.error(`Product not found: ${productDetail.product}`);
        continue;
      }

      product.stock -= productDetail.quantity;
      product.quantitySold += productDetail.quantity;

      await product.save();
    }

    await order.save();
    res.redirect("http://localhost:3000/success");
  } catch (err) {
    return res
      .status(400)
      .json({ error: err?.message || "Failed to update order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status === "cancelled") {
      for (const productDetail of order.products) {
        const product = await Product.findById(productDetail.identity);

        if (!product) {
          console.error(`Product not found: ${productDetail.product}`);
          continue;
        }
        product.stock += productDetail.quantity;
        product.quantitySold -= productDetail.quantity;

        await product.save();
      }
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBillingInfo = async (req, res) => {
  try {
  } catch (error) {}
};
