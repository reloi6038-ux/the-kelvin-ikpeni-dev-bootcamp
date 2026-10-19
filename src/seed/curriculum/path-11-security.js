module.exports = {
  course: {
    title: "Web Security",
    slug: "web-security",
    description: "Password hashing, sessions, CSRF, XSS, injection attacks, and production-grade defenses.",
    level: "advanced",
    estimatedHours: 14,
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
          title: "Password Hashing with bcrypt",
          slug: "password-hashing",
          order: 1,
          estimatedMinutes: 25,
          content: `# Password Hashing with bcrypt

**Never store passwords. Store hashes.**

## What a hash is
A one-way function. Given \`"password123"\`, bcrypt returns:
\`\`\`
$2a$12$Kj8Xf2P.vNz1YhL9pWq3u.xxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

You **cannot** reverse it — but you can verify it: \`bcrypt.compare()\` re-hashes the input and compares.

## The two operations
\`\`\`js
const bcrypt = require("bcryptjs");

// Hash (when registering)
const hash = await bcrypt.hash(password, 12);
// → store this in the database

// Verify (when logging in)
const ok = await bcrypt.compare(password, user.passwordHash);
// → true or false
\`\`\`

## Why \`12\` rounds?
Each round doubles the computation time. 12 rounds ≈ 250ms on modern hardware.

- Too low → easy to brute-force
- Too high → slow login, slow server

12 is the industry standard in 2026.

## What NOT to do
\`\`\`js
// ❌ Never store plaintext
User.create({ password: req.body.password });

// ❌ Never use MD5 or SHA1 for passwords
const hash = crypto.createHash("md5").update(password).digest("hex");
\`\`\``,
        },
        {
          title: "Sessions & Secure Cookies",
          slug: "sessions-secure-cookies",
          order: 2,
          estimatedMinutes: 25,
          content: `# Sessions & Secure Cookies

## How sessions work
1. User logs in with email/password
2. Server verifies credentials
3. Server creates a **session** with an ID
4. Server sends the session ID as a **cookie**
5. On every subsequent request, the browser sends the cookie
6. Server looks up the session and knows who you are

## The cookie settings that matter

\`\`\`js
cookie: {
  httpOnly: true,    // JavaScript cannot read it — blocks XSS theft
  secure: true,      // Only sent over HTTPS
  sameSite: "lax",   // Blocks cross-site POSTs (CSRF)
  maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
}
\`\`\`

## What each setting prevents

| Setting | Prevents |
|---------|----------|
| \`httpOnly\` | XSS attackers reading the cookie |
| \`secure\` | Cookie sent over unencrypted HTTP |
| \`sameSite\` | Cross-site request forgery |

## Session storage
By default, sessions live in memory. **That's bad** — a server restart logs everyone out, and multiple servers can't share sessions.

Use **\`connect-mongo\`** to store sessions in MongoDB. Any server can verify any user.`,
        },
        {
          title: "CSRF Protection",
          slug: "csrf-protection",
          order: 3,
          estimatedMinutes: 20,
          content: `# CSRF Protection

**Cross-Site Request Forgery** tricks a logged-in user's browser into making a request they didn't intend.

## The attack
1. You log into \`bank.com\`
2. You visit \`evil.com\`
3. \`evil.com\` auto-submits a form to \`bank.com/transfer\`
4. Your browser sends the request **with your session cookie**
5. The bank thinks **you** initiated the transfer

## The defense: CSRF tokens
1. Server generates a random token, stores it in the session
2. Server sends the token to the client
3. Client sends the token in the \`X-CSRF-Token\` header on every state-changing request
4. Server verifies the token matches the session

An attacker on \`evil.com\` cannot read the token — same-origin policy blocks it.

## What's protected
- ✅ POST, PUT, PATCH, DELETE
- ❌ GET, HEAD, OPTIONS (safe methods — they don't change state)

## In this bootcamp
Every auth, enrollment, and progress request requires the token. \`api.js\` and \`auth.js\` handle it automatically.`,
        },
      ],
    },
  ],
};