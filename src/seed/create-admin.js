// ============================================================
// src/seed/create-admin.js
// One-time script: create or promote an admin user.
// Usage: node src/seed/create-admin.js
// Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env
// ============================================================

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../config/database");
const User = require("../models/User");

async function run() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!email || !password) {
    console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    await mongoose.disconnect();
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ ADMIN_PASSWORD must be at least 8 characters");
    await mongoose.disconnect();
    process.exit(1);
  }

  const existing = await User.findOne({ email });

  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`✅ Promoted existing user to admin: ${email}`);
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    await User.create({
      name: "Administrator",
      email,
      passwordHash,
      role: "admin",
    });
    console.log(`✅ Created new admin: ${email}`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});