// ============================================================
// src/middleware/csrf.js
// ============================================================

const crypto = require("crypto");

function issueCsrfToken(req, res, next) {
  if (!req.session) return next();

  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }

  // Set as a cookie so the client can read it
  res.cookie("csrfToken", req.session.csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, csrfToken: req.session.csrfToken });
}

function verifyCsrf(req, res, next) {
  // ✅ IGNORE safe methods (GET, HEAD, OPTIONS)
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  // Extract token from header OR body
  const token = req.headers["x-csrf-token"] || req.body?.csrfToken;
  const expected = req.session?.csrfToken;

  if (!token || !expected || token !== expected) {
    console.error(`❌ CSRF Failed: Method=${req.method}, Path=${req.originalUrl}, Token=${token}, Expected=${expected}`);
    return res.status(403).json({
      success: false,
      message: "Invalid or missing CSRF token.",
    });
  }

  next();
}

module.exports = { issueCsrfToken, verifyCsrf };