// ============================================================
// src/middleware/auditLog.js
// Minimal admin action audit logger. Logs to console for now;
// can be extended to a MongoDB collection later.
// ============================================================

function auditLog(action) {
  return function (req, res, next) {
    const log = {
      timestamp: new Date().toISOString(),
      admin: req.user ? req.user.email : "unknown",
      adminId: req.user ? req.user._id.toString() : null,
      action,
      method: req.method,
      path: req.originalUrl,
      ip: req.ip,
    };
    console.log(`📋 AUDIT ${JSON.stringify(log)}`);
    next();
  };
}

module.exports = { auditLog };