import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      discount,
      featured,
      generalCategory,
      genderCategory,
      composition,
      weight,
      stock,
      size,
      frameMaterial,
      lensType,
      lensColor,
      uvProtection,
      prescriptionReady,
    } = req.body;

    console.log(productName, description, weight, stock);

    const existedProduct = await Product.findOne({ productName });
    if (existedProduct) {
      return res.status(400).send({ message: "Product with same name exists" });
    }

    const productImgLocalPath = req.files?.productImg[0]?.path;
    if (!productImgLocalPath)
      return res.status(400).send({ message: "Product image is required" });

    const productImg = await uploadOnCloudinary(productImgLocalPath);

    const newProduct = await Product.create({
      productImg: productImg.url,
      productName,
      description,
      price,
      discount,
      featured,
      generalCategory,
      genderCategory,
      composition,
      size,
      stock,
      weight,
      frameMaterial,
      lensType,
      lensColor,
      uvProtection,
      prescriptionReady,
    });

    res.status(200).send({
      success: true,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ message: "Problem creating the product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getProductsById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      discount,
      featured,
      generalCategory,
      genderCategory,
      composition,
      weight,
      stock,
      size,
      frameMaterial,
      lensType,
      lensColor,
      uvProtection,
      prescriptionReady,
    } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    const productImgLocalPath = req.files?.productImg?.[0]?.path;
    if (!productImgLocalPath) {
      existingProduct.productImg = existingProduct.productImg;
    }

    let productImg;
    if (productImgLocalPath) {
      productImg = await uploadOnCloudinary(productImgLocalPath);
      existingProduct.productImg = productImg.url;
    }

    existingProduct.productName = productName;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.discount = discount;
    existingProduct.featured = featured;
    existingProduct.generalCategory = generalCategory;
    existingProduct.genderCategory = genderCategory;
    existingProduct.composition = composition;
    existingProduct.size = size;
    existingProduct.stock = stock;
    existingProduct.weight = weight;
    existingProduct.frameMaterial = frameMaterial;
    existingProduct.lensType = lensType;
    existingProduct.lensColor = lensColor;
    existingProduct.uvProtection = uvProtection;
    existingProduct.prescriptionReady = prescriptionReady;

    const updatedProduct = await existingProduct.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Problem updating the product" });
  }
};

const newArrivalProduct = async (req, res) => {
  try {
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setDate(fourMonthsAgo.getDate() - 120);
    const newArrivalProducts = await Product.find({
      createdAt: { $gte: fourMonthsAgo },
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();
    res.send(newArrivalProducts);
  } catch (error) {
    res.status(500).send({ message: "Problem finding new arrivals" });
  }
};

export {
  createProduct,
  getProducts,
  getProductsById,
  deleteProduct,
  updateProduct,
  newArrivalProduct,
};
