import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    customer_information: {
      name: String,
      phone: String,
      email: String,
    },
    payment_method: {
      type: String,
      required: true,
      default: "khalti",
    },
    transaction_code: String,
    amount: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        identity: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "created",
        "cash on delivery",
        "paid",
        "shipping",
        "delivered",
        "cancelled",
      ],
      default: "created",
    },
    address: String,
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
