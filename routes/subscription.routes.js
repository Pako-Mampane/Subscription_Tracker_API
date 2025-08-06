import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  cancelUserSubscription,
  createSubscription,
  deleteUserSubscription,
  getUserSubscriptions,
  updateUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscriptions" })
);

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET subscription details" })
);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:subId", authorize, updateUserSubscription);

subscriptionRouter.delete("/:subId", authorize, deleteUserSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:subId/cancel", authorize, cancelUserSubscription);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

export default subscriptionRouter;
