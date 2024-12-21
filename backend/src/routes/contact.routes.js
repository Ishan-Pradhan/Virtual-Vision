import { Router } from "express";

import {
  contactForm,
  deleteContact,
  getContact,
  getContactById,
  updateContact,
} from "../controllers/contact.controllers.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contact").get(getContact).post(contactForm);

router
  .route("/contact/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

export default router;
