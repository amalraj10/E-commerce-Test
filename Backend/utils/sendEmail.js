const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure you have .env file with EMAIL_USER, EMAIL_PASS, and other necessary values.

const sendEmail = async (email, otpCode) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other email services (e.g., Outlook, Yahoo)
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password from .env
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Recipient email address
      subject: "Your OTP Code",
      text: `Your OTP code is ${otpCode}. Please do not share it with anyone.`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email.", error };
  }
};

module.exports = sendEmail;
