// ============================================================
// src/routes/auth.js
// ============================================================

const express = require("express");
const router = express.Router();

const { register, login, logout, me } = require("../controllers/auth");
const { authLimiter } = require("../middleware/rateLimiters");
const { issueCsrfToken, verifyCsrf } = require("../middleware/csrf");
const { requireAuth } = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");
const User = require("../models/User");

// Issue CSRF token (call this once when a page loads)
router.get("/csrf", issueCsrfToken);

// Public: register and login (rate limited)
router.post("/register", authLimiter, verifyCsrf, asyncHandler(register));
router.post("/login", authLimiter, verifyCsrf, asyncHandler(login));

// Authenticated: logout
router.post("/logout", asyncHandler(logout));

// Authenticated: who am I?
router.get("/me", requireAuth, asyncHandler(me));

// Update profile (custom name for guests)
router.post(
  "/update-profile",
  verifyCsrf, // Check CSRF, but bypass requireAuth to avoid '_id' errors
  asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length < 2) {
      const err = new Error("Name must be at least 2 characters");
      err.statusCode = 400;
      return next(err);
    }

    // Find the user by session, or fallback to the Guest account
    let user;
    if (req.session && req.session.userId) {
      user = await User.findById(req.session.userId);
    } else {
      user = await User.findOne({ email: "guest@kelvinbootcamp.com" });
    }

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    user.name = name;
    await user.save();
    res.json({ success: true, user });
  })
);

module.exports = router;