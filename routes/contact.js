const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message, services } = req.body;
  const fullName = `${firstName} ${lastName}`;
  const selectedServices = services.join(", ");

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // (1) ✅ Email to User
    const userMail = {
      from: `Braj Darshan <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We Received Your Message - Braj Darshan",
      html: `
        <p>Radhey Radhey <b>${fullName}</b>,</p>
        <p>We have received your message regarding: <b>${selectedServices}</b>.</p>
        <p>Our team will contact you at <b>${phone}</b> soon.</p>
        <p style="margin-top: 1rem;">Jai Shri Radhe!<br/>Braj Darshan Team</p>
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

      `,
    };

    // (2) ✅ Email to Founder
    const founderMail = {
      from: `Braj Darshan <${process.env.GMAIL_USER}>`,
      to: "sam9068khan@gmail.com",
      subject: `📩 New Contact Form Submission from ${fullName}`,
      html: `
        <h3>New Message from Contact Form</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Services:</b> ${selectedServices}</p>
        <p><b>Message:</b><br/> ${message}</p>
      `,
    };

    await transporter.sendMail(userMail);
    await transporter.sendMail(founderMail);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email Error:", err);
    return res.status(500).json({ success: false });
  }
});

module.exports = router;
