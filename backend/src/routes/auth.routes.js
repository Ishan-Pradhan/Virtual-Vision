import { Router } from "express";
import {
  registerController,
  loginController,
  updateProfile,
  allUsers,
  getUserById,
  updateUsers,
  deleteUser,
} from "../controllers/auth.controllers.js";

import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/users", requireSignIn, isAdmin, allUsers, (req, res) => {
  res.status(200).send({ ok: true });
});

router.route("/users/:id").get(getUserById).put(updateUsers).delete(deleteUser);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfile);

export default router;
