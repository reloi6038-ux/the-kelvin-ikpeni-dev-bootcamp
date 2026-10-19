// ============================================================
// src/routes/health.js
// Health endpoint used by Render and smoke tests.
// ============================================================

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  const dbStates = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = dbStates[mongoose.connection.readyState] || "unknown";

  res.json({
    success: true,
    service: "Kelvin Ikpeni Dev Bootcamp API",
    environment: process.env.NODE_ENV || "development",
    database: dbState,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
});

module.exports = router;