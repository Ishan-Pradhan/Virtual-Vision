import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (
      [name, email, password, phone, address].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Registered Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Your Account is registered",
      user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "fail to Register",
    });
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is wrong",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "email or password is wrong" });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Success",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "Login failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (password && password.length < 6) {
      return res.json({ error: "password is required and 6 character long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error while upadating profile",
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const updateUsers = async (req, res) => {
  try {
    const { role } = req.body;

    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    existingUser.role = role;

    const updatedUser = await existingUser.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ success: false, message: "Problem updating the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting user",
      error,
    });
  }
};

export {
  registerController,
  loginController,
  updateProfile,
  allUsers,
  getUserById,
  updateUsers,
  deleteUser,
};
