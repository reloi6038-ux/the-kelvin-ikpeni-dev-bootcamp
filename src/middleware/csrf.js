// ============================================================
// src/middleware/csrf.js
// Stateless CSRF protection using a session-stored token
// delivered in the X-CSRF-Token header on state-changing requests.
// ============================================================

const crypto = require("crypto");

/**
 * Issue or return the CSRF token for this session.
 * Exposes it at GET /api/auth/csrf so the client can read it.
 */
function issueCsrfToken(req, res, next) {
  if (!req.session) return next();

  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }

  // Also set as a non-HttpOnly cookie so JS can read it (double-submit pattern)
  res.cookie("csrfToken", req.session.csrfToken, {
    httpOnly: false, // JS must read this to echo it back
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, csrfToken: req.session.csrfToken });
}

/**
 * Verify the CSRF token on state-changing methods.
 * Compares X-CSRF-Token header against the session-stored value.
 */
function verifyCsrf(req, res, next) {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) return next();

  // Bypass for unauthenticated requests (login/register have their own limits)
  const token = req.headers["x-csrf-token"] || req.body?.csrfToken;
  const expected = req.session?.csrfToken;

  if (!token || !expected || token !== expected) {
    return res.status(403).json({
      success: false,
      message: "Invalid or missing CSRF token. Refresh the page and try again.",
    });
  }

  next();
}

module.exports = { issueCsrfToken, verifyCsrf };