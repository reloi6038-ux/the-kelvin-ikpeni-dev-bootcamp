module.exports = {
  title: "Module 2: Sessions & JWT",
  description: "Stateful vs. Stateless authentication.",
  order: 2,
  lessons: [
    {
      title: "Session-Based Authentication",
      slug: "session-auth",
      order: 1,
      estimatedMinutes: 35,
      content: `# Session-Based Authentication

**Learning objectives:**
- Understand how sessions work
- Configure \`express-session\`
- Secure your session cookies

## How Sessions Work
1. User logs in.
2. Server creates a unique session ID and stores it (in memory, or in a database).
3. Server sends the session ID as a cookie.
4. On every subsequent request, the browser sends the cookie.
5. Server looks up the session ID to identify the user.

## Setting Up express-session
\`\`\`bash
npm install express-session
\`\`\`

\`\`\`javascript
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevent XSS from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
    sameSite: 'lax', // Prevent CSRF
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));
\`\`\`

## Storing Sessions in Production
By default, Express stores sessions in memory. If your server restarts, everyone is logged out. If you have multiple servers, they can't share sessions.

**Solution:** Use \`connect-mongo\` to store sessions in MongoDB.
\`\`\`javascript
const MongoStore = require('connect-mongo');

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  // ...
}));
\`\`\`

## Key Takeaways
- Sessions are stateful (the server remembers the user).
- Cookies must be \`httpOnly\`, \`secure\`, and \`sameSite\`.
- Always use a persistent store (like MongoDB) for sessions in production.`
    },
    {
      title: "JSON Web Tokens (JWT)",
      slug: "jwt-basics",
      order: 2,
      estimatedMinutes: 40,
      content: `# JSON Web Tokens (JWT)

**Learning objectives:**
- Understand the structure of a JWT
- Sign and verify tokens
- Compare JWT to sessions

## What is a JWT?
A JWT is a compact, URL-safe token that represents claims (data) between two parties. Unlike sessions, the server does not need to store the session ID in a database — the token itself contains the user data.

## Structure of a JWT
A JWT has three parts, separated by dots:
1. **Header**: Algorithm and token type.
2. **Payload**: The data (e.g., \`{ userId: 1, role: 'admin' }\`).
3. **Signature**: Verifies the token hasn't been tampered with.

\`\`\`
xxxxx.yyyyy.zzzzz
\`\`\`

## Signing a Token
\`\`\`bash
npm install jsonwebtoken
\`\`\`

\`\`\`javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
\`\`\`

## Verifying a Token
\`\`\`javascript
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.userId); // 1
} catch (err) {
  console.error("Invalid token");
}
\`\`\`

## Where to Store the Token on the Client?
- **localStorage**: Vulnerable to XSS.
- **httpOnly Cookie**: Secure against XSS, but requires CSRF protection.

## Sessions vs JWT
| Feature | Sessions | JWT |
|---------|----------|-----|
| Server Storage | Required (DB/Redis) | Not required (stateless) |
| Revocation | Easy (delete the session) | Hard (token is valid until it expires) |
| Scalability | Harder (need shared store) | Easy (no shared state) |

## Key Takeaways
- JWT is stateless and self-contained.
- Never store sensitive data in the payload (it's easily decoded).
- Use short expiry times (like 1 hour).`
    },
    {
      title: "Access Tokens and Refresh Tokens",
      slug: "access-refresh-tokens",
      order: 3,
      estimatedMinutes: 30,
      content: `# Access Tokens and Refresh Tokens

**Learning objectives:**
- Understand the problem with long-lived tokens
- Implement a refresh token flow
- Secure refresh tokens

## The Problem
If a JWT is stolen, the attacker has access until it expires. If you set it to expire in 5 minutes, the user is annoyed by having to log in constantly.

## The Solution: Two Tokens
1. **Access Token**: Short-lived (e.g., 15 minutes). Used to access protected routes.
2. **Refresh Token**: Long-lived (e.g., 7 days). Used only to get a new access token when the current one expires.

## The Flow
1. User logs in.
2. Server sends both an Access Token and a Refresh Token.
3. Client stores them.
4. When the Access Token expires (401 error), the client sends the Refresh Token to a \`/refresh\` endpoint.
5. Server verifies the Refresh Token and issues a new Access Token.

## Storing Refresh Tokens
Unlike Access Tokens (which can be stateless), you should store Refresh Tokens in your database. This allows you to revoke a refresh token if a user's device is stolen.

## Implementation
\`\`\`javascript
app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) return res.status(401).json({ error: "No token provided" });
  
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    
    // Optionally: Check if this token exists in the DB (revocation check)
    
    const newAccessToken = jwt.sign(
      { userId: decoded.userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});
\`\`\`

## Key Takeaways
- Access tokens should be short-lived (minutes).
- Refresh tokens should be long-lived (days) and stored securely.
- Refresh tokens can be revoked; access tokens cannot.`
    }
  ]
};