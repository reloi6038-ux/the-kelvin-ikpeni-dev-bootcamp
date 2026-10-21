module.exports = {
  title: "Module 5: Dependencies & OWASP",
  description: "npm security, HTTPS, and API security.",
  order: 5,
  lessons: [
    {
      title: "Dependency Auditing and npm Security",
      slug: "dependency-auditing",
      order: 1,
      estimatedMinutes: 25,
      content: `# Dependency Auditing and npm Security

**Learning objectives:**
- Understand supply chain attacks
- Use \`npm audit\`
- Keep dependencies updated

## The Problem
Your app is only as secure as its weakest dependency. If you use 100 npm packages, and one has a vulnerability, your app is vulnerable.

## npm audit
npm automatically checks for known vulnerabilities in your dependencies.

\`\`\`bash
npm audit
\`\`\`

You will see a report like:
- **Low/Moderate**: Can usually wait.
- **High/Critical**: Fix immediately.

## Fixing Vulnerabilities
\`\`\`bash
npm audit fix
\`\`\`

If it can't fix automatically (because it would require a breaking change), it will tell you to run:
\`\`\`bash
npm audit fix --force
\`\`\`
*(Only do this if you are ready to test your app for breaking changes).*

## Checking for Updates
\`\`\`bash
npm outdated
\`\`\`
This shows which packages have newer versions available.

## Key Takeaways
- Run \`npm audit\` regularly.
- Fix critical/high vulnerabilities immediately.
- Don't blindly update packages; test after updating.`
    },
    {
      title: "HTTPS and TLS Fundamentals",
      slug: "https-tls",
      order: 2,
      estimatedMinutes: 25,
      content: `# HTTPS and TLS Fundamentals

**Learning objectives:**
- Understand what HTTPS does
- Learn about certificates
- Enforce HTTPS

## What is TLS?
Transport Layer Security (TLS) encrypts the connection between the client and the server. HTTPS is simply HTTP over TLS.

## Why is it Important?
Without HTTPS:
- Passwords can be read by anyone on the same Wi-Fi.
- Data can be modified in transit (Man-in-the-Middle attacks).
- Browsers mark the site as "Not Secure."

## Certificates
A TLS certificate proves the server's identity. It is issued by a Certificate Authority (CA).

## Free Certificates
You no longer need to pay for certificates. Services like **Let's Encrypt** provide them for free.

## On Render / Heroku
If you deploy to Render, HTTPS is configured automatically. You just need to make sure your app is aware it's behind a proxy:

\`\`\`javascript
app.set('trust proxy', 1);
\`\`\`

## Enforce HTTPS
Use Helmet's HSTS (HTTP Strict Transport Security) to force browsers to only use HTTPS.

\`\`\`javascript
app.use(helmet.hsts({ maxAge: 31536000 })); // 1 year
\`\`\`

## Key Takeaways
- HTTPS encrypts data in transit.
- Free certificates are available via Let's Encrypt.
- Use \`trust proxy\` and HSTS in production.`
    },
    {
      title: "Secure Database Access",
      slug: "secure-database-access",
      order: 3,
      estimatedMinutes: 30,
      content: `# Secure Database Access

**Learning objectives:**
- Secure your MongoDB connection
- Use the principle of least privilege
- Prevent database exposure

## The Danger of Public Databases
In 2017, thousands of MongoDB databases were wiped because they were exposed to the internet with no password.

## 1. Never Expose the Database Port
Your MongoDB port (usually 27017) should **never** be open to the public internet. Only allow access from your backend server's IP address (or \`0.0.0.0/0\` if using a dynamic host like Render, protected by a strong password).

## 2. Use Strong Credentials
- Generate a long, random password (not "password123").
- Use a username other than "admin" or "root" if possible.

## 3. Least Privilege
Create a database user that can only access the specific database your app needs, not all databases.

## 4. Use TLS
Ensure your connection string includes TLS:
\`\`\`
mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
\`\`\`
MongoDB Atlas enforces TLS automatically.

## 5. Store Credentials in Env Vars
Never hardcode the connection string.

\`\`\`javascript
mongoose.connect(process.env.MONGODB_URI);
\`\`\`

## Key Takeaways
- Never expose the database to the internet without a firewall/password.
- Use strong, random passwords.
- Store connection strings in environment variables.`
    },
    {
      title: "OWASP API Security Fundamentals",
      slug: "owasp-api-security",
      order: 4,
      estimatedMinutes: 30,
      content: `# OWASP API Security Fundamentals

**Learning objectives:**
- Understand the OWASP API Top 10
- Identify API-specific vulnerabilities
- Implement defense strategies

## Why APIs Are Different
APIs expose data and functionality directly. Unlike web pages, there's no UI to hide vulnerabilities. Attackers can bypass the frontend and hit the API directly.

## The OWASP API Top 10 (Notable Entries)

### 1. Broken Object Level Authorization (BOLA)
The #1 API vulnerability. A user requests \`/api/users/1\` when they should only see \`/api/users/2\`.

**Defense:** Always check if the authenticated user owns the resource they are requesting.
\`\`\`javascript
if (req.user.id !== req.params.id) {
  return res.status(403).send("Forbidden");
}
\`\`\`

### 2. Broken Authentication
Weak login mechanisms, exposed tokens, or no rate limiting.

**Defense:** Use strong passwords, rate limiting, and short-lived JWTs.

### 3. Excessive Data Exposure
Returning too much data. A user might request a post, and you return the post plus the user's hashed password because you did \`res.json(user)\` instead of picking specific fields.

**Defense:** Never return raw database objects. Select only the fields the client needs.
\`\`\`javascript
User.findById(id).select('name email');
\`\`\`

### 4. Lack of Resources & Rate Limiting
Attackers overwhelm the API with requests.

**Defense:** Rate limiting (express-rate-limit) and pagination.

## Key Takeaways
- APIs are direct access points.
- Always check authorization on every request.
- Never expose more data than necessary.`
    }
  ]
};