module.exports = {
  course: {
    title: "Render Deployment",
    slug: "render-deployment",
    description: "Deploy your full-stack application to Render with MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 6,
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
          estimatedMinutes: 25,
          content: `# Deploying to Render

Render is a cloud platform that runs your Node.js app 24/7.

## Prerequisites
- ✅ Code pushed to GitHub
- ✅ MongoDB Atlas cluster running
- ✅ Atlas allows connections from anywhere: \`0.0.0.0/0\`

## Steps

### 1. Create a Render account
**render.com** → Sign up with GitHub

### 2. Create a Web Service
Click **New → Web Service** → connect your repo

### 3. Configure
| Field | Value |
|-------|-------|
| **Name** | your-app-name |
| **Environment** | Node |
| **Build Command** | \`npm install\` |
| **Start Command** | \`npm start\` |
| **Instance Type** | Free |

### 4. Set environment variables
Click **Environment** → add:
- \`MONGODB_URI\` — your Atlas connection string
- \`SESSION_SECRET\` — 48-byte hex
- \`NODE_ENV\` = \`production\`
- \`COOKIE_SECURE\` = \`true\`

**Never commit these to GitHub.** They go in Render's env vars only.

### 5. Deploy
Click **Deploy**. Watch the logs. First deploy takes 2–5 minutes.

### 6. Add your Render IP to Atlas
Render's outbound IP is dynamic on free tier — use **\`0.0.0.0/0\`** in Atlas Network Access. Your database is still protected by the password.

### 7. Verify
- Open your \`https://your-app.onrender.com\`
- Test registration, login, course browsing
- Check logs if something fails

## Common failures
- **Build fails** → check \`package.json\` scripts
- **App crashes** → check env vars in Render dashboard
- **MongoDB connection timeout** → check Atlas IP whitelist
- **Cookie not working** → \`COOKIE_SECURE=true\` is required on HTTPS`,
        },
      ],
    },
  ],
};