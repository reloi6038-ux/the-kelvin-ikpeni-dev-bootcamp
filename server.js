// ============================================================
// The Kelvin Ikpeni Dev Bootcamp
// server.js — process entry point. Runs once.
// ============================================================

require("dotenv").config();

const { createApp } = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

async function start() {
  if (process.env.SKIP_DB === "true") {
    console.warn("⚠️  SKIP_DB=true — starting without MongoDB.");
  } else {
    await connectDB();
  }

  const app = createApp();

  app.listen(PORT, () => {
    console.log("============================================================");
    console.log("🎓 The Kelvin Ikpeni Dev Bootcamp API");
    console.log(`   Environment : ${NODE_ENV}`);
    console.log(`   Listening on: http://localhost:${PORT}`);
    console.log(`   Health      : http://localhost:${PORT}/api/health`);
    console.log(`   Courses     : http://localhost:${PORT}/api/courses`);
    console.log("============================================================");
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});