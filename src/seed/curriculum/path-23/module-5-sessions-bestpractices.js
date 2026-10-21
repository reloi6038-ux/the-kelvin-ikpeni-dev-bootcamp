module.exports = {
  title: "Module 5: Session Management & Best Practices",
  description: "Protecting routes and hardening auth.",
  order: 5,
  lessons: [
    {
      title: "Managing User Sessions",
      slug: "managing-sessions",
      order: 1,
      estimatedMinutes: 30,
      content: `# Managing User Sessions

**Learning objectives:**
- Manage active sessions
- Implement session revocation
- Handle "Remember Me" functionality

## Multi-Device Support
Users log in from phones, laptops, and tablets. You need to allow multiple active sessions while giving the user control.

## Storing Sessions in the DB
If using JWT, you can't easily revoke a token. To allow revocation, store a \`refreshToken\` or a \`sessionId\` in the DB.

\`\`\`javascript
// On login
await Session.create({
  userId: user._id,
  token: refreshToken,
  userAgent: req.headers['user-agent'],
  ipAddress: req.ip
});
\`\`\`

## "Log Out of All Devices"
When a user changes their password, revoke all sessions.

\`\`\`javascript
await Session.deleteMany({ userId: user._id });
\`\`\`

## "Remember Me"
If a user checks "Remember me," set a longer expiry for the refresh token (e.g., 30 days). Otherwise, use a short one (e.g., 1 day).

## Key Takeaways
- Track sessions so users can see active logins.
- Provide "Log out of all devices."
- Clear sessions on password change.`
    },
    {
      title: "Protecting Private Routes",
      slug: "protecting-routes",
      order: 2,
      estimatedMinutes: 25,
      content: `# Protecting Private Routes

**Learning objectives:**
- Use middleware to protect both HTML pages and APIs
- Handle redirects vs. JSON responses
- Prevent unauthorized access

## The Two Types of Routes
1. **API Routes** (\`/api/*\`): Return 401 JSON.
2. **HTML Routes** (\`/dashboard\`): Redirect to the login page.

## Middleware for APIs
\`\`\`javascript
function requireAuthAPI(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

app.get('/api/user/profile', requireAuthAPI, getProfile);
\`\`\`

## Middleware for HTML Pages
\`\`\`javascript
function requireAuthWeb(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login?next=' + req.originalUrl);
  }
  next();
}

app.get('/dashboard', requireAuthWeb, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
\`\`\`

## The \`next\` Parameter
Notice \`/login?next=\`. After the user logs in, you can redirect them back to where they were trying to go.

## Never Rely on the Frontend
Hiding a button on the frontend is not security. A user can still send the request via Postman. The **backend** must check the session.

## Key Takeaways
- APIs return 401. Web pages redirect.
- Always protect both the HTML and the API.
- Frontend hiding is UX; backend checks are security.`
    },
    {
      title: "Authentication Security Best Practices",
      slug: "auth-best-practices",
      order: 3,
      estimatedMinutes: 30,
      content: `# Authentication Security Best Practices

**Learning objectives:**
- Audit your auth system
- Implement defense in depth
- Prevent common auth bypasses

## 1. Enforce HTTPS
Never send credentials over HTTP. Use HSTS and secure cookies.

## 2. Rate Limit Auth Routes
Attackers will try thousands of passwords. Rate limit login and password reset endpoints.

\`\`\`javascript
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }));
\`\`\`

## 3. Strong Password Policies
Enforce a minimum of 8 characters. Consider checking against the "Have I Been Pwned" API to reject known compromised passwords.

## 4. Session Rotation
When a user logs in, always generate a new session ID. This prevents "Session Fixation" attacks where an attacker sets a session ID before login.

\`\`\`javascript
req.session.regenerate((err) => {
  if (err) return next(err);
  req.session.userId = user._id;
  res.json({ success: true });
});
\`\`\`

## 5. Fail Securely
If the database goes down during login, do not "fail open" (let everyone in). Fail closed (return an error).

## Key Takeaways
- HTTPS + Secure Cookies.
- Rate limiting prevents brute force.
- Regenerate session ID on login.`
    }
  ]
};