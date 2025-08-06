export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="background-color: #4a90e2; text-align: center;">
                  <p style="font-size: 54px; line-height: 54px; font-weight: 800;">Sub Tracker</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 30px;">                
                  <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${userName}</strong>,</p>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong style="color: #4a90e2;">${renewalDate}</strong> (${daysLeft} days from today).</p>
                  
                  <table cellpadding="15" cellspacing="0" border="0" width="100%" style="background-color: #f0f7ff; border-radius: 10px; margin-bottom: 25px;">
                      <tr>
                          <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                              <strong>Plan:</strong> ${planName}
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; border-bottom: 1px solid #d0e3ff;">
                              <strong>Price:</strong> ${price}
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px;">
                              <strong>Payment Method:</strong> ${paymentMethod}
                          </td>
                      </tr>
                  </table>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">If you'd like to make changes or cancel your subscription, please visit your <a href="${accountSettingsLink}" style="color: #4a90e2; text-decoration: none;">account settings</a> before the renewal date.</p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">Need help? <a href="${supportLink}" style="color: #4a90e2; text-decoration: none;">Contact our support team</a> anytime.</p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">
                      Best regards,<br>
                      <strong>Sub Tracker Team</strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                  <p style="margin: 0 0 10px;">
                      Sub Tracker. | Plot 000, CBD, Gaborone, Botswana
                  </p>
                  <p style="margin: 0;">
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Privacy Policy</a> | 
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                  </p>
              </td>
          </tr>
      </table>
  </div>
  `;

export const passwordResetEmail = ({ resetUrl, supportLink }) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="background-color: #4a90e2; text-align: center; padding: 20px;">
        <p style="font-size: 54px; line-height: 54px; font-weight: 800; color: #ffffff; margin: 0;">Sub Tracker</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 40px 30px;">
        <p style="font-size: 16px; margin-bottom: 25px;">Hello,</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">We received a request to reset your Sub Tracker account password. Use the token below to make your password reset request:</p>
        
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 25px; text-align: center;">
          <tr>
            <td>
              <span style="display: inline-block; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 5px;">${resetUrl}</span>
            </td>
          </tr>
        </table>
        
        <p style="font-size: 16px; margin-bottom: 25px;">This link will expire in 1 hour for your security. If you didn’t request a password reset, please ignore this email or <a href="${supportLink}" style="color: #4a90e2; text-decoration: none;">contact our support team</a>.</p>
        
        <p style="font-size: 16px; margin-top: 30px;">
          Best regards,<br>
          <strong>Sub Tracker Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
        <p style="margin: 0 0 10px;">
          Sub Tracker | Plot 000, CBD, Gaborone, Botswana
        </p>
       
      </td>
    </tr>
  </table>
</div>`;

export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) =>
      `📅 Reminder: Your ${data.subscriptionName} Subscription Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) =>
      `⏳ ${data.subscriptionName} Renews in 5 Days – Stay Subscribed!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) =>
      `🚀 2 Days Left!  ${data.subscriptionName} Subscription Renewal`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 days before reminder",
    generateSubject: (data) =>
      `⚡ Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
  {
    label: "Password Reset",
    generateSubject: () => `🔐 Password Reset Email`,
    generateBody: (data) => passwordResetEmail({ ...data, daysLeft: 1 }),
  },
];
