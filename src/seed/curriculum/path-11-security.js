// Path 11: Web Security
module.exports = {
  course: {
    title: "Web Security",
    slug: "web-security",
    description:
      "Password hashing, sessions, CSRF, XSS, injection attacks, and production-grade defenses.",
    level: "advanced",
    estimatedHours: 20,
    icon: "security",
    order: 11,
    isPublished: true,
  },
  modules: [
    {
      title: "Authentication Security",
      description: "Passwords, sessions, and brute force.",
      order: 1,
      lessons: [
        {
          title: "Password Hashing",
          slug: "password-hashing",
          order: 1,
          estimatedMinutes: 25,
          content: `# Password Hashing

**Never store passwords in plain text.**

## What Is Hashing?
A one-way mathematical function. You can turn a password into a hash, but not back.

## Salting
Two users with the same password get different hashes. A **salt** is a random string added before hashing.

## Using Bcrypt
\`\`\`javascript
const bcrypt = require("bcryptjs");

// Hashing (registration)
const hash = await bcrypt.hash(password, 12);

// Comparing (login)
const ok = await bcrypt.compare(password, hash);
\`\`\`

## Why 12 Rounds?
Each round doubles the computation time. 12 rounds ≈ 250ms — slow enough to deter hackers, fast enough for users.`,
        },
        {
          title: "Sessions & Secure Cookies",
          slug: "sessions-secure-cookies",
          order: 2,
          estimatedMinutes: 25,
          content: `# Sessions & Secure Cookies

## How Sessions Work
1. User logs in.
2. Server verifies credentials.
3. Server creates a **session** with an ID.
4. Sends the session ID as a **cookie**.
5. On every request, the browser sends the cookie.
6. Server looks up the session.

## Critical Cookie Settings
\`\`\`javascript
cookie: {
  httpOnly: true,   // blocks XSS
  secure: true,     // HTTPS only
  sameSite: "lax",  // blocks CSRF
  maxAge: 14 * 24 * 60 * 60 * 1000,
}
\`\`\`

## Session Storage
By default, sessions live in memory. A server restart logs everyone out. Use **\`connect-mongo\`** to store them in MongoDB.`,
        },
        {
          title: "CSRF Protection",
          slug: "csrf-protection",
          order: 3,
          estimatedMinutes: 25,
          content: `# CSRF Protection

**Cross-Site Request Forgery** tricks a logged-in user's browser into making a request they didn't intend.

## The Attack
1. Log into \`bank.com\`.
2. Visit \`evil.com\`.
3. \`evil.com\` submits a form to \`bank.com/transfer\`.
4. Browser sends the request **with your bank.com cookies**.
5. Bank thinks **you** initiated it.

## The Defense: CSRF Tokens
1. Server generates a random token, stores it in the session.
2. Client receives the token.
3. Client sends the token in \`X-CSRF-Token\` header.
4. Server verifies.

An attacker on \`evil.com\` cannot read the token. **Request blocked.**

**Rule:** Protect all POST/PUT/PATCH/DELETE with CSRF.`,
        },
        {
          title: "XSS Prevention",
          slug: "xss-prevention",
          order: 4,
          estimatedMinutes: 25,
          content: `# XSS Prevention

**Cross-Site Scripting** — injecting malicious JS into your page.

## The Attack
If you inject user input directly into HTML:
\`\`\`javascript
title.innerHTML = userInput; // ⚠️ dangerous
\`\`\`

A user submits \`<script>alert('hacked')</script>\`. It executes.

## The Defense
**Always escape user content.**
\`\`\`javascript
title.textContent = userInput; // ✅ safe
\`\`\`

Or use an escape function:
\`\`\`javascript
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
\`\`\`

## Rule
**Never use \`innerHTML\` with untrusted data.**`,
        },
      ],
    },
  ],
};