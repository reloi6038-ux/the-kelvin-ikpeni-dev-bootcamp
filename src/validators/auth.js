// ============================================================
// src/validators/auth.js
// Server-side validation for registration and login.
// NEVER trust the client — always validate here.
// ============================================================

function validateRegister(body) {
  const errors = [];
  const { name, email, password } = body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.length > 80) {
    errors.push("Name cannot exceed 80 characters");
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("A valid email address is required");
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (password.length > 128) {
    errors.push("Password cannot exceed 128 characters");
  } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.push("Password must contain at least one letter and one number");
  }

  return { valid: errors.length === 0, errors };
}

function validateLogin(body) {
  const errors = [];
  const { email, password } = body || {};

  if (!email || typeof email !== "string") errors.push("Email is required");
  if (!password || typeof password !== "string") errors.push("Password is required");

  return { valid: errors.length === 0, errors };
}

module.exports = { validateRegister, validateLogin };