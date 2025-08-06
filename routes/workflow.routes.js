import { Router } from "express";
import {
  sendPasswordReset,
  sendReminders,
} from "../controllers/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendReminders);
workflowRouter.post("/auth/password-reset", sendPasswordReset);

export default workflowRouter;
