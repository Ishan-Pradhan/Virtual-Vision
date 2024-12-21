import axios from "axios";
import { Order } from "../models/orders.models.js";

const paymentController = async (formData, req, res) => {
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      { headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` } }
    );

    if (khaltiResponse) {
      res.send({
        success: true,
        payment_method: "Khalti",
        data: khaltiResponse?.data,
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleKhaltiCallback = async (req, res, next) => {
  try {
    const {
      status,
      idx,
      pidx,
      amount,
      purchase_order_name,
      purchase_order_id,
      transaction_id,
      message,
    } = req.query;

    console.log(
      status,
      idx,
      pidx,
      amount,
      purchase_order_id,
      purchase_order_name,
      transaction_id,
      message
    );

    if (message) {
      return res
        .status(400)
        .send({ error: message || "Error Processing Khalti" });
    }

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    // Lookup the payment status from Khalti
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers }
    );

    if (response.data.status !== "Completed") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    req.transaction_uuid = purchase_order_id;
    req.transaction_code = idx;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export { paymentController, handleKhaltiCallback };
