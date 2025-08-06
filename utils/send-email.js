import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import { EMAIL } from "../config/env.js";
import transporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing Parameters");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid mail type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("DD MMM YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);
  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error, "Error Sending email");

    console.log("Email Sent: " + info.response);
  });
};

export const sendPasswordResetEmail = async ({ to, type, resetUrl }) => {
  if (!to || !type) throw new Error("Missing Parameters");

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) throw new Error("Invalid mail type");

  const mailInfo = {
    resetUrl: resetUrl,
  };

  const message = template.generateBody(mailInfo);
  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: "Password Reset",
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      return console.error(error, "Error sending password reset email");

    console.log("Email Sent: " + info.response);
  });
};
