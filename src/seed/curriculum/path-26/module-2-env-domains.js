module.exports = {
  title: "Module 2: Environment & DNS",
  description: "Managing secrets and connecting domains.",
  order: 2,
  lessons: [
    {
      title: "Deploying and Connecting MongoDB Atlas",
      slug: "production-mongodb",
      order: 1,
      estimatedMinutes: 25,
      content: `# Deploying and Connecting MongoDB Atlas

**Learning objectives:**
- Connect a production app to Atlas
- Configure IP whitelisting for the cloud
- Manage database users securely

## The Production Database
Never use a local MongoDB database for a production app. Use MongoDB Atlas.

## Network Access (IP Whitelist)
When deploying to Render, Heroku, or Vercel, your server's IP address changes. You cannot whitelist a single IP.

**Solution**: In Atlas Network Access, add \`0.0.0.0/0\` (allow access from anywhere).
*Is this safe?* Yes, as long as your database user has a strong password. The password is your security, not the IP.

## Database User
Create a specific user for your app (e.g., \`prod_user\`). Do not use the admin account. Grant only the permissions the app needs (Read and Write to your specific database).

## The Connection String
\`\`\`text
mongodb+srv://prod_user:SuperStrongPassword@cluster0.xxx.mongodb.net/myapp?retryWrites=true&w=majority
\`\`\`
Store this in your hosting provider's environment variables.

## Key Takeaways
- Use \`0.0.0.0/0\` for dynamic cloud IPs.
- Use a strong, dedicated production user.
- Never hardcode the production connection string.`
    },
    {
      title: "Managing Production Environment Variables",
      slug: "production-env-vars",
      order: 2,
      estimatedMinutes: 25,
      content: `# Managing Production Environment Variables

**Learning objectives:**
- Set environment variables in the cloud
- Rotate secrets safely
- Avoid common misconfigurations

## Where do they go?
In production, you do not use a \`.env\` file. You enter the variables in the hosting platform's dashboard (Render, Heroku, AWS, etc.).

## Essential Variables
- \`NODE_ENV=production\`
- \`PORT=10000\` (Usually set automatically by the host)
- \`MONGODB_URI=...\`
- \`SESSION_SECRET=...\`
- \`JWT_SECRET=...\`

## Rotating Secrets
If a secret is leaked:
1. Generate a new one.
2. Update it in the hosting dashboard.
3. The server will automatically restart or you can trigger a manual deploy.

**Warning**: Rotating a \`SESSION_SECRET\` or \`JWT_SECRET\` immediately logs out every user.

## Common Mistake: Committing .env
If you accidentally commit \`.env\` to GitHub:
1. Assume the secret is compromised.
2. Delete the file from the repo.
3. Rotate the secret immediately.
4. The old secret is still in Git history, but rotating it makes it useless.

## Key Takeaways
- Production variables live in the cloud dashboard.
- Rotate secrets immediately if exposed.
- Never commit \`.env\`.`
    },
    {
      title: "Domain Names and DNS Fundamentals",
      slug: "dns-domains",
      order: 3,
      estimatedMinutes: 30,
      content: `# Domain Names and DNS Fundamentals

**Learning objectives:**
- Understand what DNS does
- Point a custom domain to your app
- Configure SSL/HTTPS

## What is DNS?
DNS (Domain Name System) translates human-readable domains (like \`google.com\`) into IP addresses (like \`142.250.190.46\`).

## Using a Custom Domain
If you bought a domain on Namecheap or GoDaddy, you need to point it to Render.

1. In Render, go to **Settings** → **Custom Domain**.
2. Add your domain (\`myapp.com\` and \`www.myapp.com\`).
3. Render will give you **CNAME** or **A** records.
4. Go to your domain registrar and add those records.
5. Wait for DNS propagation (can take minutes to hours).

## SSL/HTTPS
Once the domain is verified, Render automatically provisions a free SSL certificate (via Let's Encrypt). Your app is now secure at \`https://myapp.com\`.

## Key Takeaways
- DNS translates names to IPs.
- Point your domain using CNAME records.
- SSL is automatic on modern hosts like Render.`
    }
  ]
};