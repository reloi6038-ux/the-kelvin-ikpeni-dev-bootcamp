// Path 11: Web Security
module.exports = {
  course: {
    title: "Web Security",
    slug: "web-security",
    description:
      "Defend against XSS, CSRF, SQL injection, session hijacking, and brute-force attacks with production-grade defenses.",
    level: "advanced",
    estimatedHours: 22,
    icon: "security",
    order: 11,
    isPublished: true,
  },
  modules: [
    {
      title: "Authentication Security",
      description: "Password hashing, sessions, and secure cookies.",
      order: 1,
      lessons: [
        {
          title: "Password Hashing with bcrypt",
          slug: "password-hashing",
          order: 1,
          estimatedMinutes: 30,
          content: `# Password Hashing with bcrypt

**Learning objectives:**
- Understand why hashing is mandatory
- Explain salts and rounds
- Use bcrypt correctly

## The Golden Rule
**Never store passwords in plain text.**

If your database is ever leaked (and it happens to everyone eventually), plaintext passwords hand attackers the keys to every account — and to every other site where users reused the password.

## What is Hashing?
A hash function converts input into a fixed-size string. It's **one-way** — you can't reverse it.

\`\`\`
"password123" → $2a$12$Kj8Xf2P.vNz1YhL9pWq3u.OaBcDeFgHiJkLmNoPqRsTuVwXyZ
\`\`\`

## Salts
If two users have the password "password123", they'd get the same hash without a salt. A **salt** is a random string added to the password before hashing — making every hash unique even for identical passwords.

Bcrypt generates the salt automatically.

## Rounds
\`\`\`javascript
await bcrypt.hash(password, 12); // 12 rounds
\`\`\`

Each round **doubles** the computation time:
- 10 rounds ≈ 60ms
- 12 rounds ≈ 250ms
- 14 rounds ≈ 1s

12 is the modern standard. Fast enough for users, slow enough that brute-forcing millions of passwords takes years.

## The Two Operations
\`\`\`javascript
const bcrypt = require("bcryptjs");

// Hashing (during registration)
const hash = await bcrypt.hash(password, 12);
await User.create({ passwordHash: hash });

// Comparing (during login)
const user = await User.findOne({ email }).select("+passwordHash");
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: "Invalid credentials" });
\`\`\`

## Why Not MD5 or SHA-256?
Fast hashes are the wrong tool for passwords. They can be computed billions of times per second — perfect for brute-force attacks. Bcrypt is **deliberately slow**, and it scales with hardware over time.

## Key Takeaways
- Always hash passwords with bcrypt (12 rounds)
- Never store plaintext passwords
- Use \`bcrypt.compare()\` to verify, not manual comparison
- Fast hashes (MD5, SHA-256) are the wrong tool`,
        },
        {
          title: "Sessions and Secure Cookies",
          slug: "sessions-secure-cookies",
          order: 2,
          estimatedMinutes: 30,
          content: `# Sessions and Secure Cookies

**Learning objectives:**
- Understand how session-based auth works
- Configure cookies securely
- Rotate session IDs on login

## How Sessions Work
1. User logs in with email + password
2. Server verifies the hash with \`bcrypt.compare\`
3. Server creates a **session** with a random ID
4. Server sends the session ID as a **cookie**
5. Browser stores it and sends it on every request
6. Server looks up the session and knows who you are

## The Critical Cookie Settings
\`\`\`javascript
cookie: {
  httpOnly: true,   // JavaScript cannot read it (XSS defense)
  secure: true,     // HTTPS-only (MITM defense)
  sameSite: "lax",  // Blocks cross-site POSTs (CSRF defense)
  maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
}
\`\`\`

## What Each Setting Prevents
| Setting | Blocks |
|---------|--------|
| \`httpOnly: true\` | XSS stealing the cookie |
| \`secure: true\` | Cookie leaking over plain HTTP |
| \`sameSite: "lax"\` | Cross-site POST attacks |

**Get any one of these wrong, and your auth is compromised.**

## Session Storage
By default, sessions live in **server memory**. Problems:
- Restarting the server logs everyone out
- Multiple servers can't share sessions

**Solution: \`connect-mongo\`.** Sessions are stored in MongoDB, so any process can verify any session. Restart-safe.

## Session Fixation Defense
When a user logs in, **rotate the session ID**:
\`\`\`javascript
req.session.regenerate((err) => {
  if (err) return next(err);
  req.session.userId = user._id.toString();
  req.session.role = user.role;
  res.json({ success: true });
});
\`\`\`

Without this, an attacker who sets a session ID before login can hijack the session after.

## Key Takeaways
- Sessions = server-side state, cookie = session ID
- \`httpOnly\`, \`secure\`, \`sameSite\` are non-negotiable
- Store sessions in MongoDB with \`connect-mongo\`
- Rotate session ID on login`,
        },
        {
          title: "CSRF Protection",
          slug: "csrf-protection",
          order: 3,
          estimatedMinutes: 25,
          content: `# CSRF Protection

**Learning objectives:**
- Explain the CSRF attack in detail
- Implement token-based defense
- Understand why \`sameSite\` isn't enough alone

## The Attack in Detail
1. You log into \`bank.com\`. Your browser stores a session cookie.
2. You visit \`evil.com\` (or get phished into visiting it).
3. \`evil.com\` silently submits a form to \`bank.com/transfer\`.
4. **Your browser automatically attaches your bank.com cookies.**
5. The bank sees a request with a valid session — it thinks it's you.
6. Money transferred.

## The Defense: CSRF Tokens
Before any state-changing request, the server issues a **random token** tied to your session:

\`\`\`javascript
req.session.csrfToken = crypto.randomBytes(32).toString("hex");
\`\`\`

Your client sends it back on every POST/PUT/DELETE:
\`\`\`javascript
fetch("/api/enrollments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  },
  body: JSON.stringify({ slug: "html5" }),
});
\`\`\`

The server compares:
\`\`\`javascript
if (req.headers["x-csrf-token"] !== req.session.csrfToken) {
  return res.status(403).json({ message: "Invalid CSRF token" });
}
\`\`\`

## Why Attackers Can't Bypass This
- \`evil.com\` doesn't know the token
- The token is in your server's session, invisible to other origins
- The browser won't send custom headers to a foreign origin

## Why \`sameSite\` Isn't Enough
\`sameSite: "lax"\` blocks cross-site POSTs from \`evil.com\`. But:
- Older browsers don't support it
- Attackers can sometimes use GET requests
- Subdomain attacks (\`sub.evil.com\`) can bypass it

**Layered defense is required.** CSRF tokens + \`sameSite\` together are strong.

## Which Methods Need Protection
- ✅ POST, PUT, PATCH, DELETE — yes
- ❌ GET, HEAD, OPTIONS — safe (read-only)

## Key Takeaways
- CSRF = an attacker submitting requests on your behalf
- CSRF tokens = proof the request came from your app
- Protect all state-changing methods
- Use \`sameSite\` cookies + tokens together`,
        },
      ],
    },
  ],
};