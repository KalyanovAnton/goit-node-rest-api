import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchema.js";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  updateAvatarController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatarURL"),
  validateBody(authRegisterSchema),
  registerController,
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController,
);

export default authRouter;
