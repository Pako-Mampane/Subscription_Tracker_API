import { Router } from "express";
import {
  requestPasswordReset,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);
authRouter.post("/request-password-reset", requestPasswordReset);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
