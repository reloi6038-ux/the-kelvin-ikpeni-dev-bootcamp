module.exports = {
  title: "Module 2: Pagination & Documentation (Part 3)",
  description: "Rate Limiting.",
  order: 4,
  lessons: [
    {
      title: "Rate Limiting and Throttling",
      slug: "rate-limiting",
      order: 1,
      estimatedMinutes: 30,
      content: `# Rate Limiting and Throttling

**Learning objectives:**
- Understand why rate limiting is critical
- Implement rate limiting in Express
- Configure different limits for different routes

## Why Rate Limit?
- **Prevent abuse**: Stop DDoS attacks and brute-force login attempts.
- **Fair usage**: Prevent one user from hogging all server resources.
- **Cost control**: Protect paid APIs (like Twilio or OpenAI).

## Implementing with \`express-rate-limit\`
\`\`\`bash
npm install express-rate-limit
\`\`\`

## Basic Setup
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all requests
app.use(limiter);
\`\`\`

## Route-Specific Limits
For sensitive routes (like login), use stricter limits.

\`\`\`javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes.'
});

app.post('/api/auth/login', loginLimiter, loginController);
\`\`\`

## Important: Trust Proxy
If your app is behind a proxy (like Render, Heroku, or Cloudflare), you must tell Express to trust the proxy so rate limiting uses the real user IP, not the proxy IP.

\`\`\`javascript
app.set('trust proxy', 1);
\`\`\`

## Key Takeaways
- Rate limiting is essential for production APIs.
- Use stricter limits for authentication and expensive endpoints.
- Always set \`trust proxy\` if deploying to Render or Heroku.`
    }
  ]
};