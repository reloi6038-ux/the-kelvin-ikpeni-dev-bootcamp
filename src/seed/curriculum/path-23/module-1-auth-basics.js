module.exports = {
  title: "Module 1: Auth Basics & Hashing",
  description: "Registration, login, and secure password storage.",
  order: 1,
  lessons: [
    {
      title: "User Registration and Login Systems",
      slug: "registration-login",
      order: 1,
      estimatedMinutes: 35,
      content: `# User Registration and Login Systems

**Learning objectives:**
- Understand the core flow of registration and login
- Differentiate between authentication and authorization
- Identify the security pitfalls of naive auth systems

## The Registration Flow
1. User submits name, email, and password.
2. Server validates the input (e.g., is the email valid?).
3. Server checks if the email already exists.
4. Server hashes the password.
5. Server saves the user to the database.
6. Server logs the user in (creates a session).

## The Login Flow
1. User submits email and password.
2. Server finds the user by email.
3. Server compares the submitted password with the stored hash.
4. If valid, server creates a session or token.
5. Server sends the session token back to the client.

## Authentication vs. Authorization
These terms are often confused:
- **Authentication** (AuthN): "Who are you?" (Verifying identity via login).
- **Authorization** (AuthZ): "What are you allowed to do?" (Permissions, roles).

## The Golden Rule of Auth
**Never reveal which part of the login failed.**
If you say "Email not found," an attacker learns which emails are registered in your system (account enumeration). Always return a generic message: "Invalid email or password."

## Key Takeaways
- Registration creates the user; Login verifies them.
- Always validate server-side.
- Always return generic error messages for failed logins.`
    },
    {
      title: "Password Hashing with bcrypt",
      slug: "bcrypt-hashing",
      order: 2,
      estimatedMinutes: 30,
      content: `# Password Hashing with bcrypt

**Learning objectives:**
- Understand why hashing is mandatory
- Use bcrypt to hash and compare passwords
- Explain what a "salt" is

## Why Hash?
If you store plain passwords and your database is hacked, every user's account is compromised. If you store hashes, the attacker only has a string of gibberish.

## What is a Hash?
A mathematical function that converts input into a fixed-size string. It is **one-way** — you cannot reverse it.

\`\`\`
"password123" → $2a$12$Kj8Xf2P.vNz1YhL9pWq3u...
\`\`\`

## What is a Salt?
A salt is a random string added to the password before hashing. Even if two users have the same password, their hashes will be completely different.

## Using bcryptjs
\`\`\`bash
npm install bcryptjs
\`\`\`

\`\`\`javascript
const bcrypt = require('bcryptjs');

// 1. Hashing (Registration)
const salt = await bcrypt.genSalt(12); // 12 rounds
const hash = await bcrypt.hash("password123", salt);

// 2. Comparing (Login)
const isValid = await bcrypt.compare("password123", hash);
console.log(isValid); // true
\`\`\`

## Why 12 Rounds?
The number of rounds (or cost) determines how slow the hash is to compute.
- 10 rounds: ~60ms
- 12 rounds: ~250ms
- 14 rounds: ~1s

You want it slow enough to deter brute-force attacks, but fast enough that your server isn't overwhelmed during login.

## Key Takeaways
- Never store plain-text passwords.
- Always use a hashing algorithm designed for passwords (bcrypt, Argon2).
- Never use MD5 or SHA-256 for passwords.`
    },
    {
      title: "Authentication vs. Authorization",
      slug: "authn-vs-authz",
      order: 3,
      estimatedMinutes: 25,
      content: `# Authentication vs. Authorization

**Learning objectives:**
- Clearly distinguish between AuthN and AuthZ
- Implement basic authorization checks
- Understand the 401 vs 403 status codes

## The Difference
- **Authentication**: Proving who you are. (Showing your ID card at the door).
- **Authorization**: What you're allowed to do once you're inside. (Your ticket says "General Admission," not "VIP").

## The HTTP Status Codes
- **401 Unauthorized**: You are **not authenticated**. You need to log in.
- **403 Forbidden**: You are authenticated, but you **lack permission** to access this resource.

*(Yes, "401 Unauthorized" is a misnomer; it actually means "Unauthenticated.")*

## Real-World Example
Imagine a banking app:
1. You log in (Authentication). You prove you are Alice.
2. You request \`/api/accounts/bob\` (Authorization). The server checks if Alice is allowed to see Bob's account. If not, it returns 403.

## Middleware for Authorization
\`\`\`javascript
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: "Please log in" });
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Admins only" });
  next();
}

// Only logged-in users can access
app.get('/api/profile', requireAuth, getProfile);

// Only admins can access
app.delete('/api/users/:id', requireAuth, requireAdmin, deleteUser);
\`\`\`

## Key Takeaways
- AuthN is identity; AuthZ is permission.
- 401 = Log in first. 403 = You don't have access.
- Always enforce authorization on the server, never the client.`
    }
  ]
};