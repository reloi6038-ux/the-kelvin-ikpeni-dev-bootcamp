// ============================================================
// src/controllers/auth.js
// Register, login, logout, and "me" endpoints.
// ============================================================

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validateRegister, validateLogin } = require("../validators/auth");

const BCRYPT_ROUNDS = 12; // ~250ms on modern hardware

async function register(req, res, next) {
  try {
    const { valid, errors } = validateRegister(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "student",
    });

    // Log the user in immediately after registration
    req.session.userId = user._id.toString();
    req.session.role = user.role;

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { valid, errors } = validateLogin(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: errors[0], errors });
    }

    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+passwordHash"
    );

    // IMPORTANT: same response for "no user" and "wrong password"
    // Prevents attackers from discovering which emails exist.
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Rotate the session ID on login to prevent fixation attacks
    await new Promise((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = user._id.toString();
    req.session.role = user.role;

    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res, next) {
  if (!req.session) {
    return res.json({ success: true, message: "Already logged out" });
  }
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("kid.sid");
    res.clearCookie("csrfToken");
    res.json({ success: true, message: "Logged out" });
  });
}

async function me(req, res, next) {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const user = await User.findById(req.session.userId).select(
      "name email role createdAt lastLoginAt bio avatarUrl"
    );

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ success: false, message: "Session invalid" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout, me };