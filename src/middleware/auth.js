// ============================================================
// src/middleware/auth.js
// Reusable authorization middleware.
// ============================================================

const User = require("../models/User");

/**
 * Require a valid session. Attaches req.user for downstream handlers.
 * Returns 401 if unauthenticated.
 */
async function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in.",
    });
  }

  try {
    const user = await User.findById(req.session.userId).select(
      "name email role"
    );
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Require the authenticated user to be an admin.
 * Must be used AFTER requireAuth.
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Administrator access required.",
    });
  }
  next();
}

/**
 * Optional auth: attaches req.user if session exists, but never rejects.
 * Useful for pages that show personalization when logged in.
 */
async function attachUser(req, res, next) {
  if (!req.session?.userId) return next();
  try {
    const user = await User.findById(req.session.userId).select(
      "name email role"
    );
    if (user) req.user = user;
  } catch {
    // ignore — unauthenticated continues
  }
  next();
}

module.exports = { requireAuth, requireAdmin, attachUser };