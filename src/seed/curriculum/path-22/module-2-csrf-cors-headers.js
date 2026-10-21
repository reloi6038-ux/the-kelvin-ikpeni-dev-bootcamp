module.exports = {
  title: "Module 2: CSRF, CORS & Headers",
  description: "Securing the boundary between the browser and the server.",
  order: 2,
  lessons: [
    {
      title: "Cross-Site Request Forgery (CSRF) Protection",
      slug: "csrf-protection",
      order: 1,
      estimatedMinutes: 30,
      content: `# Cross-Site Request Forgery (CSRF) Protection

**Learning objectives:**
- Understand the CSRF attack vector
- Implement CSRF tokens
- Use SameSite cookies

## What is CSRF?
CSRF forces an end user to execute unwanted actions on a web application in which they're currently authenticated.

## The Attack
1. You log into \`bank.com\`. The server sets a session cookie.
2. You visit \`evil.com\`.
3. \`evil.com\` contains a hidden form that POSTs to \`bank.com/transfer\`.
4. Your browser automatically sends the request **along with your bank.com cookie**.
5. The bank thinks the request came from you.

## Prevention 1: CSRF Tokens
The server sends a unique, random token to the client. The client must send this token back in a custom header.

Since \`evil.com\` cannot read the token (due to browser same-origin policies), it cannot forge the request.

\`\`\`javascript
// Server generates token and stores in session
req.session.csrfToken = crypto.randomBytes(32).toString('hex');
res.json({ csrfToken: req.session.csrfToken });

// Client sends it back
fetch('/api/transfer', {
  method: 'POST',
  headers: { 'X-CSRF-Token': token }
});

// Server verifies
if (req.headers['x-csrf-token'] !== req.session.csrfToken) {
  return res.status(403).send('CSRF token invalid');
}
\`\`\`

## Prevention 2: SameSite Cookies
Set the \`SameSite\` attribute on your cookies.
- \`SameSite=Strict\`: Cookie is never sent on cross-site requests.
- \`SameSite=Lax\`: Cookie is sent on top-level navigation (like clicking a link).

\`\`\`javascript
res.cookie('session', token, { sameSite: 'lax', httpOnly: true });
\`\`\`

## Key Takeaways
- CSRF tricks the user's browser into making an authenticated request.
- Use CSRF tokens for state-changing requests (POST, PUT, DELETE).
- Set \`SameSite=Lax\` or \`Strict\` on session cookies.`
    },
    {
      title: "CORS Configuration",
      slug: "cors-configuration",
      order: 2,
      estimatedMinutes: 30,
      content: `# CORS Configuration

**Learning objectives:**
- Understand the Same-Origin Policy
- Configure CORS correctly
- Avoid common CORS pitfalls

## The Same-Origin Policy
Browsers block JavaScript from making requests to a different origin (domain, protocol, or port) unless explicitly allowed. This prevents a malicious site from reading your data.

## What is CORS?
Cross-Origin Resource Sharing (CORS) is a mechanism that allows a server to tell the browser "It's okay if this other domain makes a request to me."

## The Headers
When a client makes a cross-origin request, the browser sends an \`Origin\` header.
The server responds with:
\`\`\`
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

## Using the \`cors\` Package
\`\`\`bash
npm install cors
\`\`\`

### Allow All (Development Only)
\`\`\`javascript
app.use(cors()); // Allows *
\`\`\`

### Allow Specific Origin (Production)
\`\`\`javascript
app.use(cors({
  origin: 'https://myfrontend.com',
  credentials: true // Allow cookies
}));
\`\`\`

## Common Pitfall: Credentials
If your frontend sends cookies (\`credentials: 'include'\`), the server **cannot** use \`Access-Control-Allow-Origin: *\`. It must specify the exact origin.

## Key Takeaways
- CORS is enforced by the browser, not the server.
- Never use wildcard (\`*\`) in production if you allow credentials.
- Configure CORS to only allow your trusted domains.`
    },
    {
      title: "HTTP Security Headers with Helmet",
      slug: "http-security-headers",
      order: 3,
      estimatedMinutes: 25,
      content: `# HTTP Security Headers with Helmet

**Learning objectives:**
- Understand security headers
- Use Helmet.js
- Configure Content Security Policy

## What are HTTP Security Headers?
Headers sent by the server that tell the browser how to behave securely. Without them, browsers default to permissive behavior, which attackers can exploit.

## Essential Headers
- **X-Frame-Options**: Prevents Clickjacking (embedding your site in an iframe).
- **X-Content-Type-Options**: Prevents MIME-sniffing (forcing the browser to trust the declared content type).
- **Strict-Transport-Security (HSTS)**: Forces the browser to only use HTTPS.
- **Content-Security-Policy (CSP)**: Restricts where scripts can load from.

## Helmet.js
Helmet sets all these headers for you with sane defaults.

\`\`\`bash
npm install helmet
\`\`\`

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

That's it. You instantly get 11+ security headers.

## Configuring CSP
If you're using external scripts (like Google Fonts or Stripe), the default CSP might block them. You can configure Helmet:

\`\`\`javascript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
      },
    },
  })
);
\`\`\`

## Key Takeaways
- Security headers are a quick, easy win.
- Helmet handles them with one line of code.
- If something breaks (like external scripts), check your CSP.`
    }
  ]
};