const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

// 📧 Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// 🌸 Email Templates
const generateSuccessEmail = (name, tourPackage) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #4CAF50;">Jai Shri Radhe, ${name}!</h2>
    <p>Your <strong>Braj Darshan</strong> booking for the <strong>${tourPackage}</strong> has been <strong>successfully confirmed</strong>. 🥳</p>
    <p>We are delighted to welcome you on this divine journey through the sacred land of Braj.</p>
    <p>You will receive a follow-up confirmation call or message from our team within <strong>24 hours</strong>.</p>
    <p>If you have any questions, feel free to contact us directly:</p>
    <ul>
      <li><strong>WhatsApp:</strong> <a href="https://wa.me/919068446055">+91 90684 46055</a></li>
      <li><strong>Email:</strong> sam9068khan@gmail.com</li>
    </ul>
    <p style="margin-top: 20px;">Thank you for choosing Braj Darshan.<br/>May your yatra be filled with peace and blessings. 🙏</p>
    <p>Bablu Khan,<br/><strong>Founder, Braj Darshan</strong></p>

    <br><br>
    <hr style="border: none; border-top: 1px solid #ccc;">
    <p style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
      Warm regards,<br>
      <strong style="color: #6a1b9a;">Team Braj Darshan</strong><br>
      <em>Spiritual journeys in the divine land of Shri Krishna</em><br>
      📞 <a href="tel:+919837494865" style="color: #6a1b9a;">+91 9837494865</a> |
      💬 <a href="https://wa.me/919068446055" target="_blank" style="color: #6a1b9a;">Chat on WhatsApp</a><br>
      📧 <a href="mailto:braj.darshan.travels@gmail.com" style="color: #6a1b9a;">braj.darshan.travels@gmail.com</a><br>
    </p>
  </div>
`;

const generateFailureEmail = (name) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #E53935;">Dear ${name},</h2>
    <p>We're sorry to inform you that your <strong>Braj Darshan</strong> booking could not be processed at this time.</p>
    <p>Please do not worry — you can reach out to our founder directly for personal assistance:</p>
    <ul>
      <li><strong>WhatsApp:</strong> <a href="https://wa.me/919068446055">+91 90684 46055</a></li>
      <li><strong>Email:</strong> sam9068khan@gmail.com</li>
    </ul>
    <p>We apologize for the inconvenience and hope to serve you soon.</p>
    <p>Bablu Khan,<br/><strong>Founder, Braj Darshan</strong></p>

    <br><br>
    <hr style="border: none; border-top: 1px solid #ccc;">
    <p style="font-family: Arial, sans-serif; font-size: 14px; color: #444;">
      Warm regards,<br>
      <strong style="color: #6a1b9a;">Team Braj Darshan</strong><br>
      <em>Spiritual journeys in the divine land of Shri Krishna</em><br>
      📞 <a href="tel:+919068446055" style="color: #6a1b9a;">+91 90684 46055</a> |
      💬 <a href="https://wa.me/919068446055" target="_blank" style="color: #6a1b9a;">Chat on WhatsApp</a><br>
      📧 <a href="mailto:braj.darshan.travels@gmail.com" style="color: #6a1b9a;">braj.darshan.travels@gmail.com</a><br>
    </p>
  </div>
`;

router.post("/book", async (req, res) => {
  const { name, email, phone: mobile, package: tourPackage, message, date } = req.body;

  console.log("📥 New booking request received:", req.body);

  if (!email) {
    console.error("❌ Email is missing in request");
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const booking = new Booking({ name, email, mobile, package: tourPackage, message, date });
    await booking.save();
    console.log("✅ Booking saved to database");

    // ✉️ Send confirmation email to user
    const userMailOptions = {
      from: `"Braj Darshan" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Braj Darshan Booking Confirmation 🌷",
      html: generateSuccessEmail(name, tourPackage),
    };

    await transporter.sendMail(userMailOptions);
    console.log("✅ Confirmation email sent to user:", email);

    // 📩 Notify founder
    const founderMailOptions = {
      from: `"Braj Darshan" <${process.env.GMAIL_USER}>`,
      to: "sam9068khan@gmail.com",
      subject: "📥 New Booking Received - Braj Darshan",
      html: `
        <h2>New Booking Details</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Package:</strong> ${tourPackage}</li>
          <li><strong>Message:</strong> ${message}</li>
          <li><strong>Date:</strong> ${date}</li>
        </ul>
      `,
    };

    await transporter.sendMail(founderMailOptions);
    console.log("✅ Founder notified");

    res.status(200).json({ success: true, message: "Booking successful!" });
  } catch (error) {
    console.error("❌ Booking failed:", error);

  const failMail = {
  from: `"Braj Darshan" <${process.env.GMAIL_USER}>`,
  to: email,
  subject: "Booking Failed - Braj Darshan ❌",
  html: generateFailureEmail(name),
};


    const failToFounder = {
      from: `"Braj Darshan" <${process.env.GMAIL_USER}>`,
      to: "sam9068khan@gmail.com",
      subject: "Booking Failed - User Notification Sent",
      html: `
        <h2>Booking Attempt Failed</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
        </ul>
        <p>User has been informed of the issue.</p>
      `,
    };

    try {
      await transporter.sendMail(failMail);
      console.log("📩 Failure email sent to user");
    } catch (err) {
      console.error("❌ Failed to notify user:", err);
    }

    try {
      await transporter.sendMail(failToFounder);
      console.log("📩 Failure notification sent to founder");
    } catch (err) {
      console.error("❌ Failed to alert founder:", err);
    }

    res.status(500).json({ success: false, message: "Booking failed due to a server error" });
  }
});

module.exports = router;
