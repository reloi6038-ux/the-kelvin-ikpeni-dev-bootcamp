// Path 14: Render Deployment
module.exports = {
  course: {
    title: "Render Deployment",
    slug: "render-deployment",
    description:
      "Deploy your full-stack application to Render with MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 8,
    icon: "render",
    order: 14,
    isPublished: true,
  },
  modules: [
    {
      title: "Production Deployment",
      description: "From localhost to a live URL.",
      order: 1,
      lessons: [
        {
          title: "Deploying to Render",
          slug: "deploying-render",
          order: 1,
          estimatedMinutes: 30,
          content: `# Deploying to Render

Render is a cloud platform that runs your Node.js app 24/7.

## Prerequisites
- ✅ Code pushed to GitHub
- ✅ MongoDB Atlas cluster running
- ✅ Atlas allows connections from anywhere: \`0.0.0.0/0\`

## Steps

### 1. Create a Render Account
**render.com** → Sign up with GitHub

### 2. Create a Web Service
**New → Web Service** → connect your repo

### 3. Configure
| Field | Value |
|-------|-------|
| Environment | Node |
| Build Command | \`npm install\` |
| Start Command | \`npm start\` |
| Instance Type | Free |

### 4. Set Environment Variables
- \`MONGODB_URI\`
- \`SESSION_SECRET\`
- \`NODE_ENV\` = \`production\`
- \`COOKIE_SECURE\` = \`true\`

### 5. Deploy
Click **Deploy**. First deploy takes 2–5 minutes.

## Common Failures
- **Build fails** → check \`package.json\` scripts
- **App crashes** → check env vars
- **MongoDB timeout** → check Atlas IP whitelist`,
        },
        {
          title: "Production Configuration",
          slug: "production-configuration",
          order: 2,
          estimatedMinutes: 20,
          content: `# Production Configuration

## Environment Variables
Never hardcode secrets. Use \`process.env\`:
\`\`\`javascript
const uri = process.env.MONGODB_URI;
const secret = process.env.SESSION_SECRET;
\`\`\`

## Cookie Security
\`\`\`javascript
cookie: {
  httpOnly: true,
  secure: true,           // requires HTTPS
  sameSite: "lax",
}
\`\`\`

## Health Check
Render pings \`/api/health\` every 30s. Respond with \`200\`:
\`\`\`javascript
router.get("/", (req, res) => res.json({ success: true }));
\`\`\`

## Logs
Watch Render's logs for errors after deploy.`,
        },
      ],
    },
  ],
};