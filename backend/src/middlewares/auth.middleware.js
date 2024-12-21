import JWT from "jsonwebtoken";
import { User } from "../models/user.models.js";

import { ApiError } from "../utils/ApiError.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      throw new ApiError(401, "unauthorized access");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
