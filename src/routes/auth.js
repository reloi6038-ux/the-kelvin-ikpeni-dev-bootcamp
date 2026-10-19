// ============================================================
// src/routes/auth.js
// POST /api/auth/register
// POST /api/auth/login
// POST /api/auth/logout
// GET  /api/auth/me
// GET  /api/auth/csrf
// ============================================================

const express = require("express");
const router = express.Router();

const { register, login, logout, me } = require("../controllers/auth");
const { authLimiter } = require("../middleware/rateLimiters");
const { issueCsrfToken, verifyCsrf } = require("../middleware/csrf");
const { requireAuth } = require("../middleware/auth");
const { asyncHandler } = require("../middleware/errorHandler");

// Issue CSRF token (call this once when a page loads)
router.get("/csrf", issueCsrfToken);

// Public: register and login (rate limited)
router.post(
  "/register",
  authLimiter,
  asyncHandler(verifyCsrf),
  asyncHandler(register)
);

router.post(
  "/login",
  authLimiter,
  asyncHandler(verifyCsrf),
  asyncHandler(login)
);

// Authenticated: logout
router.post("/logout", asyncHandler(logout));

// Authenticated: who am I?
router.get("/me", requireAuth, asyncHandler(me));

module.exports = router;