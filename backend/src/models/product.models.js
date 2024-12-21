import mongoose, { Schema } from "mongoose";

// Updated categories for eyewear
const generalCategory = [
  "sunglasses",
  "prescription glasses",
  "reading glasses",
  "sports eyewear",
];
const genderCategory = ["men", "women", "unisex"];
const frameMaterialCategory = ["metal", "plastic", "wood", "acetate"];
const lensCategory = [
  "single vision",
  "bifocal",
  "progressive",
  "blue light blocking",
];

const productSchema = new Schema(
  {
    productImg: {
      type: String,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    generalCategory: {
      type: String,
      enum: generalCategory,
      default: "oval",
    },
    genderCategory: {
      type: String,
      enum: genderCategory,
      default: "unisex",
    },
    stock: {
      type: Number,
      default: 1,
      required: true,
    },
    composition: {
      type: String, // Frame material or lens type info
      required: true,
    },
    weight: {
      type: String, // Glasses weight
      required: true,
    },
    size: {
      type: String, // Frame size or lens dimensions (e.g., small, medium, large)
      required: true,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    frameMaterial: {
      type: String,
      enum: frameMaterialCategory, // Type of frame material
      required: true,
    },
    lensType: {
      type: String,
      enum: lensCategory, // Type of lens (single vision, bifocal, etc.)
      required: true,
    },
    // lensColor: {
    //   type: String, // Color of the lens (e.g., gray, blue, brown, etc.)
    //   required: false,
    // },
    uvProtection: {
      type: Boolean, // Whether the lenses have UV protection
      default: false,
    },
    prescriptionReady: {
      type: Boolean, // Indicates whether the glasses can be fitted with prescription lenses
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
