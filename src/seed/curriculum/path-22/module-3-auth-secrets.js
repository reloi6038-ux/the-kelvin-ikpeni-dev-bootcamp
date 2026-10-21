module.exports = {
  title: "Module 3: Password & Secret Management",
  description: "Protecting credentials and session data.",
  order: 3,
  lessons: [
    {
      title: "Secure Password Storage",
      slug: "secure-password-storage",
      order: 1,
      estimatedMinutes: 30,
      content: `# Secure Password Storage

**Learning objectives:**
- Understand why hashing is mandatory
- Use bcrypt correctly
- Avoid the trap of fast hashes

## The Golden Rule
**Never store passwords in plain text.**

If your database is leaked (and it happens to everyone eventually), plaintext passwords hand attackers the keys to every account.

## What is Hashing?
A hash function converts input into a fixed-size string. It's **one-way** — you can't reverse it.

\`\`\`
"password123" → $2a$12$Kj8Xf2P.vNz1YhL9pWq3u...
\`\`\`

## Salting
If two users have the password "password123", they'd get the same hash without a salt. A salt is a random string added to the password before hashing.

Bcrypt generates the salt automatically.

## Why Not MD5 or SHA-256?
MD5 and SHA-256 are designed to be **fast**. Modern GPUs can compute billions of SHA-256 hashes per second, making brute-force attacks easy.

Bcrypt is **deliberately slow**.

\`\`\`javascript
const bcrypt = require('bcryptjs');

// 12 rounds takes ~250ms
const hash = await bcrypt.hash("password123", 12);
\`\`\`

## Verifying Passwords
\`\`\`javascript
const isMatch = await bcrypt.compare("password123", user.passwordHash);
if (!isMatch) return res.status(401).send("Invalid credentials");
\`\`\`

## Key Takeaways
- Hash passwords with bcrypt (12+ rounds).
- Never use MD5 or SHA-1 for passwords.
- Always compare hashes using the library's built-in compare function.`
    },
    {
      title: "Secrets and Environment Variable Management",
      slug: "secret-management",
      order: 2,
      estimatedMinutes: 25,
      content: `# Secrets and Environment Variable Management

**Learning objectives:**
- Protect API keys and database passwords
- Use \`.env\` locally
- Manage secrets in production

## The Problem
Your code needs secrets (database credentials, API keys). If you hardcode them and push to a public GitHub repository, bots will find them and compromise your database within minutes.

## Local Development: \`.env\`
Use the \`dotenv\` package to load variables from a \`.env\` file.

\`\`\`
PORT=3000
DATABASE_URL=mongodb+srv://...
STRIPE_SECRET=sk_test_123
\`\`\`

\`\`\`javascript
require('dotenv').config();
console.log(process.env.STRIPE_SECRET);
\`\`\`

## The Absolute Rule
**Never commit \`.env\`.**
Add it to \`.gitignore\` immediately.

\`\`\`
node_modules/
.env
\`\`\`

## Production: Environment Variables
In production (like on Render, Heroku, or AWS), you don't use a \`.env\` file. You set environment variables in the hosting platform's dashboard. The server injects them into the OS environment.

## Secret Rotation
If you ever suspect a secret was exposed:
1. Immediately generate a new secret.
2. Update the value in your production environment.
3. Restart the server.

## Key Takeaways
- Never hardcode secrets in source code.
- \`.env\` is for local development only.
- Production secrets go in the hosting provider's dashboard.`
    },
    {
      title: "Input Sanitization and Validation",
      slug: "input-sanitization",
      order: 3,
      estimatedMinutes: 30,
      content: `# Input Sanitization and Validation

**Learning objectives:**
- Distinguish between validation and sanitization
- Strip malicious characters
- Prevent malicious file paths

## Validation vs Sanitization
- **Validation**: Checking if the input meets your rules (e.g., "Is this a valid email format?"). If not, reject it.
- **Sanitization**: Cleaning the input (e.g., removing HTML tags from a comment).

## The Two Layers
Always validate on the client (UX) and **always** validate on the server (security).

## Sanitizing Strings
If you accept rich text (like a blog post), you must strip dangerous tags (like \`<script>\`).

\`\`\`bash
npm install sanitize-html
\`\`\`

\`\`\`javascript
const sanitizeHtml = require('sanitize-html');

const clean = sanitizeHtml(userInput, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: { 'a': [ 'href' ] }
});
\`\`\`

## Preventing Path Traversal
If a user can specify a filename, they might try to access sensitive files:
\`\`\`
GET /api/files?name=../../.env
\`\`\`

Always sanitize file paths:
\`\`\`javascript
const path = require('path');
const safePath = path.basename(req.query.name); // Strips directory traversal
\`\`\`

## Key Takeaways
- Validate first: Reject invalid input entirely.
- Sanitize: Clean the input before storing or rendering.
- Always validate on the server, never trust the client.`
    }
  ]
};