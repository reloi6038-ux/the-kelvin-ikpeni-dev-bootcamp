// ============================================================
// src/middleware/rateLimiters.js
// Rate limiters protect expensive endpoints from brute-force.
// ============================================================

const rateLimit = require("express-rate-limit");

// Auth endpoints: 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again in 15 minutes.",
  },
});

// General API: 200 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
});

module.exports = { authLimiter, apiLimiter };