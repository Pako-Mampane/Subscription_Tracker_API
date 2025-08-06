import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";
import mongoose from "mongoose";

export const createSubscription = async (req, res, next) => {
  try {
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      status,
      startDate,
    } = req.body;
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!price) missingFields.push("price");
    if (!currency) missingFields.push("currency");
    if (!frequency) missingFields.push("frequency");
    if (!category) missingFields.push("category");
    if (!paymentMethod) missingFields.push("paymentMethod");
    if (!status) missingFields.push("status");
    if (!startDate) missingFields.push("startDate");

    if (missingFields.length > 0) {
      const error = new Error(
        `Missing required fields: ${missingFields.join(", ")}`
      );
      error.status = 400;
      throw error;
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId },
      message: `the following workflow has been created ${workflowRunId}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  let { subId } = req.params;
  const userId = req.user._id;
  const updateSubInfo = req.body;
  try {
    const subscription = await Subscription.findOne({
      _id: subId,
      user: userId,
    });

    if (!subscription) {
      const error = new Error(
        "Subscription not found or you are not the owner!"
      );
      error.status = 401;
      throw error;
    }
    const updatedSub = await Subscription.findOneAndUpdate(
      { _id: subId },
      { $set: updateSubInfo },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedSub,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelUserSubscription = async (req, res, next) => {
  const { subId } = req.params;
  const userId = req.user._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(subId)) {
      const error = new Error("Invalid user ID or subscription ID");
      error.status = 400;
      throw error;
    }

    const subscription = await Subscription.findOne({
      _id: subId,
      user: userId,
    });

    if (!subscription) {
      const error = new Error(
        "Subscription not found or you are not the owner!"
      );
      error.status = 401;
      throw error;
    }

    const cancelledSub = await Subscription.findOneAndUpdate(
      { _id: subId },
      { $set: { status: "cancelled" } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: cancelledSub,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
