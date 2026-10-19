// ============================================================
// src/config/session.js
// Configures Express Session with a MongoDB store.
// Compatible with connect-mongo@6.x (named MongoStore export).
// ============================================================

const session = require("express-session");
const { MongoStore } = require("connect-mongo");

function buildSessionMiddleware() {
  const isProd = process.env.NODE_ENV === "production";

  const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 14 * 24 * 60 * 60, // 14 days in seconds
    autoRemove: "native",
  });

  return session({
    name: "kid.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      secure: isProd ? true : process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in ms
    },
  });
}

module.exports = { buildSessionMiddleware };