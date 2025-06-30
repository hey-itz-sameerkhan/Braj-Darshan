const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 📦 Routes
const bookingRoutes = require("./routes/book");
const protectedRoutes = require('./routes/protected');
const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contact');

app.use("/api", bookingRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", contactRoutes);

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// ✉️ Test Email Endpoint
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

app.get("/test-email", async (req, res) => {
  const testMailOptions = {
    from: `"Braj Darshan" <${process.env.GMAIL_USER}>`,
    to: "sam9068khan@gmail.com",
    subject: "🧪 Test Email from Braj Darshan",
    html: "<h2>This is a test email 💌</h2>",
  };

  try {
    await transporter.sendMail(testMailOptions);
    res.send("✅ Test email sent successfully!");
  } catch (error) {
    console.error("❌ Test email failed:", error);
    res.status(500).send("❌ Test email failed");
  }
});

// ✅ Root Route (for Render health check)
app.get("/", (req, res) => {
  res.send("🚩 Braj Darshan Backend is Running Successfully!");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
