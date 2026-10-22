module.exports = {
  title: "Module 4: Frontend Security & Bundling",
  description: "Protecting data and building for production.",
  order: 4,
  lessons: [
    {
      title: "Frontend Security Fundamentals",
      slug: "frontend-security",
      order: 1,
      estimatedMinutes: 30,
      content: `# Frontend Security Fundamentals

**Learning objectives:**
- Prevent XSS
- Understand frontend vulnerabilities

## XSS (Cross-Site Scripting)
If you inject untrusted input directly into the DOM, you risk XSS.

### React is Safe by Default
\`\`\`jsx
// Safe. React escapes the string automatically.
<div>{userInput}</div>

// DANGEROUS. Only use if the HTML is sanitized.
<div dangerouslySetInnerHTML={{ __html: userInput }} />
\`\`\`

## Other Risks
- **Clickjacking**: Prevent by using \`X-Frame-Options: DENY\`.
- **Man-in-the-Middle**: Always use HTTPS.`
    },
    {
      title: "Protecting Sensitive Data in Frontend Applications",
      slug: "protecting-sensitive-data",
      order: 2,
      estimatedMinutes: 25,
      content: `# Protecting Sensitive Data in Frontend Applications

**Learning objectives:**
- Never store secrets in code
- Understand token storage trade-offs

## The Golden Rule
**The frontend is public.** Any API key, database password, or secret you put in your React code will be visible in the browser bundle.

## Where to Store Tokens
- **localStorage**: Vulnerable to XSS. If a hacker injects a script, they can read the token.
- **HttpOnly Cookies**: Cannot be read by JavaScript. Safer against XSS, but you must protect against CSRF.

## Best Practice
For maximum security, store authentication tokens in HttpOnly, Secure, SameSite cookies.`
    },
    {
      title: "Building Production Bundles",
      slug: "production-bundles",
      order: 3,
      estimatedMinutes: 25,
      content: `# Building Production Bundles

**Learning objectives:**
- Minify code
- Analyze bundle size

## The Build Command
\`\`\`bash
npm run build
\`\`\`
This creates a \`dist/\` folder containing:
- Minified JS.
- Minified CSS.
- Hashed filenames (for cache busting).

## Analyzing Bundle Size
Install \`rollup-plugin-visualizer\` to see what is taking up space.
\`\`\`bash
npm install -D rollup-plugin-visualizer
\`\`\`
Add it to \`vite.config.js\`. Run the build. A \`stats.html\` file will open, showing you exactly which packages are heavy.`
    }
  ]
};