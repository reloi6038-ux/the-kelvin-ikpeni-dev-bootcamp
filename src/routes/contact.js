const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { verifyCsrf } = require("../middleware/csrf");
const Message = require("../models/Message");

// ---------- POST /api/contact ----------
router.post(
  "/",
  verifyCsrf,
  asyncHandler(async (req, res, next) => {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      const err = new Error("All fields are required.");
      err.statusCode = 400;
      return next(err);
    }

    if (message.length < 10) {
      const err = new Error("Message must be at least 10 characters.");
      err.statusCode = 400;
      return next(err);
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
      data: newMessage,
    });
  })
);

module.exports = router;