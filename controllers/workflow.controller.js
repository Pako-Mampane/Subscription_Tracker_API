import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import {
  sendPasswordResetEmail,
  sendReminderEmail,
} from "../utils/send-email.js";
import User from "../models/user.models.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") return;
  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    }
  }
});

export const sendPasswordReset = serve(async (context) => {
  const { userEmail, resetUrl } = context.requestPayload;

  const user = await fetchUser(context, userEmail);

  if (!user) return;
  await triggerReset(context, "Password Reset", user, resetUrl, userEmail);
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const fetchUser = async (context, userEmail) => {
  return await context.run("get user email", async () => {
    return User.findOne({ email: userEmail });
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}.`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering reminder ${label}.`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};

const triggerReset = async (context, label, user, resetUrl, userEmail) => {
  return await context.run(label, async () => {
    console.log(
      `Triggering reminder at ${new Date().toISOString()} for ${label}.`
    );
    await sendPasswordResetEmail({
      to: userEmail,
      type: label,
      user,
      resetUrl,
    });
  });
};
