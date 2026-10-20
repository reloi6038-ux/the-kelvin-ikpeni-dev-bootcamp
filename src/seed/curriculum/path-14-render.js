// Path 14: Render Deployment
module.exports = {
  course: {
    title: "Render Deployment",
    slug: "render-deployment",
    description:
      "Take your application from localhost to a live, HTTPS-secured URL with MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 10,
    icon: "render",
    order: 14,
    isPublished: true,
  },
  modules: [
    {
      title: "Deploying to Production",
      description: "From localhost to a live URL.",
      order: 1,
      lessons: [
        {
          title: "Deploying to Render",
          slug: "deploying-render",
          order: 1,
          estimatedMinutes: 35,
          content: `# Deploying to Render

**Learning objectives:**
- Deploy a Node.js app to Render
- Configure environment variables securely
- Debug common deployment failures

## Prerequisites
- ✅ Code pushed to GitHub
- ✅ MongoDB Atlas cluster running
- ✅ Atlas network access allows \`0.0.0.0/0\` (for free tier)

## Step-by-Step Deployment

### 1. Create a Render Account
Go to **render.com** → **Sign up with GitHub**

### 2. Create a Web Service
**New → Web Service** → pick your repository

### 3. Configure

| Field | Value |
|-------|-------|
| Name | your-app-name |
| Region | closest to your users |
| Branch | \`main\` |
| Runtime | **Node** |
| Build Command | \`npm install\` |
| Start Command | \`npm start\` |
| Instance Type | Free |

### 4. Add Environment Variables

| Key | Value |
|-----|-------|
| \`MONGODB_URI\` | your Atlas connection string |
| \`SESSION_SECRET\` | 96-char hex string |
| \`NODE_ENV\` | \`production\` |
| \`COOKIE_SECURE\` | \`true\` |
| \`PUBLIC_BASE_URL\` | \`https://your-app.onrender.com\` |

**Do NOT set \`PORT\`** — Render assigns it automatically.

### 5. Deploy
Click **Create Web Service**. First deploy takes 2–5 minutes. Watch the logs.

## What Render Does
1. Clones your repo
2. Runs \`npm install\` (only production deps since \`NODE_ENV=production\`)
3. Runs \`npm start\`
4. Assigns a public URL with HTTPS
5. Health checks your app periodically

## Common Failures
| Error | Cause | Fix |
|-------|-------|-----|
| \`Cannot find module\` | Package not in \`package.json\` | \`npm install <pkg>\` locally, commit \`package.json\` |
| MongoDB timeout | IP not whitelisted | Add \`0.0.0.0/0\` in Atlas Network Access |
| App crashes on start | Missing env var | Check Render → Environment tab |
| 404 on routes | Wrong start command | Verify \`npm start\` runs \`node server.js\` |
| Session logged out | \`COOKIE_SECURE=false\` | Set to \`true\` on Render |

## Key Takeaways
- Deploy = push to GitHub → Render auto-builds
- All secrets go in Render's env vars, never in code
- \`NODE_ENV=production\` + \`COOKIE_SECURE=true\` are mandatory
- Read the build logs when something fails`,
        },
        {
          title: "Production Configuration",
          slug: "production-configuration",
          order: 2,
          estimatedMinutes: 25,
          content: `# Production Configuration

**Learning objectives:**
- Configure your app correctly for production
- Understand secure cookies in production
- Set up health checks

## Environment Variables
Never hardcode secrets:
\`\`\`javascript
// ❌ Committed to GitHub
const uri = "mongodb+srv://user:password@...";

// ✅ Read from env
const uri = process.env.MONGODB_URI;
\`\`\`

## Cookie Security in Production
\`\`\`javascript
cookie: {
  httpOnly: true,
  secure: true,           // HTTPS only — Render provides HTTPS
  sameSite: "lax",
  maxAge: 14 * 24 * 60 * 60 * 1000,
}
\`\`\`

**\`secure: true\` requires HTTPS.** Render gives you HTTPS automatically, so this works.

## Trust Proxy
Render terminates TLS at its edge. Your app receives HTTP. To make \`req.ip\` and \`req.secure\` work:
\`\`\`javascript
app.set("trust proxy", 1);
\`\`\`

**Without this:** rate limiting sees Render's IP for all users (useless), and \`req.secure\` is \`false\` (breaks secure cookies).

## Health Check
Render pings \`/api/health\` every 30 seconds:
\`\`\`javascript
router.get("/", (req, res) => {
  res.json({
    success: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});
\`\`\`

If the app returns non-200 three times in a row, Render restarts it.

## Logs
Render's log panel shows real-time output. During deployment:
- Build logs → \`npm install\` output
- Runtime logs → \`console.log\` from your app

Watch for red error lines.

## Key Takeaways
- \`NODE_ENV=production\` + \`COOKIE_SECURE=true\`
- \`app.set("trust proxy", 1)\` is required
- Health check returns JSON with DB status
- Read build and runtime logs during deployment`,
        },
      ],
    },
  ],
};