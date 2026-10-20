module.exports = {
  title: "Module 5: Deploy to Render",
  description: "Push to GitHub and deploy to production.",
  order: 5,
  lessons: [
    {
      title: "Push to GitHub",
      slug: "push-to-github",
      order: 1,
      estimatedMinutes: 25,
      content: `# Push to GitHub

**Learning objectives:**
- Initialize a Git repository
- Create a GitHub repository
- Push your code

## Step 1: Verify .gitignore

Open **\`.gitignore\`** and confirm it has:

\`\`\`
node_modules/
.env
\`\`\`

**If \`.env\` is missing, add it now.** Committing \`.env\` exposes your MongoDB password.

## Step 2: Initialize Git

\`\`\`powershell
git init
git branch -M main
\`\`\`

## Step 3: Stage and commit

\`\`\`powershell
git add .
git commit -m "Initial commit: full-stack website"
\`\`\`

**Verify:**
\`\`\`powershell
git status
\`\`\`

You should see \`.env\` is **not** listed as a file to commit.

## Step 4: Create a GitHub repository

1. Go to **https://github.com/new**
2. Name: \`my-first-website\`
3. **Do not check** README, .gitignore, or license
4. Click **Create repository**

## Step 5: Connect and push

Copy the URL from GitHub (e.g., \`https://github.com/YOUR_USERNAME/my-first-website.git\`) and run:

\`\`\`powershell
git remote add origin https://github.com/YOUR_USERNAME/my-first-website.git
git push -u origin main
\`\`\`

First push opens a browser to authenticate. Sign in with GitHub.

## Step 6: Verify on GitHub

Open \`https://github.com/YOUR_USERNAME/my-first-website\` in your browser.

**Confirm:**
- ✅ \`server.js\`, \`package.json\`, \`src/\`, \`public/\` visible
- ❌ \`.env\` is **NOT** in the file list
- ❌ \`node_modules/\` is **NOT** in the file list

## Common Errors and Fixes

### ❌ "fatal: not a git repository"
**Cause:** You're not in the project folder, or \`git init\` wasn't run.
**Fix:** \`cd\` to the project root, run \`git init\`.

### ❌ "Authentication failed"
**Cause:** GitHub no longer accepts passwords.
**Fix:** Use a **Personal Access Token**:
1. github.com/settings/tokens → Generate new token (classic)
2. Check \`repo\` scope
3. Copy and paste as password when prompted

### ❌ "Updates were rejected"
**Cause:** GitHub repo wasn't empty (README was created).
**Fix:** Delete the GitHub repo and recreate it empty, or:
\`\`\`powershell
git pull --rebase origin main
git push -u origin main
\`\`\`

### ❌ \`.env\` was committed
**Cause:** \`.gitignore\` didn't include \`.env\` before commit.
**Fix:**
1. **Immediately rotate** your MongoDB password and any other secrets
2. \`git rm --cached .env\`
3. \`git commit -m "Remove .env"\`
4. \`git push\`
5. Note: the file is still in history — for a public repo, delete and recreate

## Key Takeaways
- \`.env\` in \`.gitignore\` = passwords stay secret
- \`git push -u origin main\` = one-time setup
- Use Personal Access Tokens, not passwords
- If you leak \`.env\`, rotate everything immediately`,
    },
    {
      title: "Deploy to Render",
      slug: "deploy-to-render",
      order: 2,
      estimatedMinutes: 30,
      content: `# Deploy to Render

**Learning objectives:**
- Create a Render web service
- Configure environment variables
- Access your live app

## Step 1: Create a Render account

Go to **https://render.com** → **Sign up with GitHub**.

## Step 2: Create a Web Service

1. On the dashboard: **New +** → **Web Service**
2. Find your repo \`my-first-website\` → click **Connect**

## Step 3: Configure

Fill the form:

| Field | Value |
|-------|-------|
| **Name** | \`my-first-website\` |
| **Region** | Closest to you |
| **Branch** | \`main\` |
| **Runtime** | \`Node\` |
| **Build Command** | \`npm install\` |
| **Start Command** | \`npm start\` |
| **Instance Type** | \`Free\` |

## Step 4: Environment variables

Scroll to **Environment Variables** → **Add**:

| Key | Value |
|-----|-------|
| \`MONGODB_URI\` | Your Atlas connection string (from \`.env\`) |

**Don't add \`PORT\`** — Render sets it automatically. Your code uses \`process.env.PORT || 3000\`.

## Step 5: Deploy

Click **Create Web Service**.

Render will:
1. Clone your repo
2. Run \`npm install\` (2–3 minutes)
3. Run \`npm start\`
4. Assign a URL: \`https://my-first-website.onrender.com\`

Watch the logs. When you see:
\`\`\`
✅ MongoDB connected: my-first-website
✅ Server running on http://localhost:10000
\`\`\`

**Your app is live.**

## Step 6: Verify

Open in your browser: **https://my-first-website.onrender.com**

**Expected:**
- Homepage loads
- Nav works
- \`/api/health\` returns \`{ success: true, database: "connected" }\`

## Common Deployment Errors

### ❌ Build failed: "Cannot find module 'express'"
**Cause:** You didn't commit \`package.json\` or \`package-lock.json\`.
**Fix:**
\`\`\`powershell
git add package.json package-lock.json
git commit -m "Add package files"
git push
\`\`\`

### ❌ App crashes on startup
**Cause:** Missing environment variable.
**Fix:** Render → your service → **Environment** → add \`MONGODB_URI\`.

### ❌ "MongoDB connection timed out"
**Cause:** Atlas hasn't whitelisted Render's IP.
**Fix:** Atlas → Network Access → Add IP Address → \`0.0.0.0/0\` (allow all — password still protects you).

### ❌ App goes to sleep after 15 min
**Cause:** Free tier limitation (not a bug).
**Fix:** First request after idle takes ~30s to wake up. Upgrade to paid for always-on.

### ❌ Data missing in production
**Cause:** Local and production use different databases.
**Fix:** Verify \`MONGODB_URI\` in Render points to the same Atlas database.

## Step 7: Auto-deploy on push

Render watches your GitHub repo. Every \`git push\` triggers a redeploy automatically.

\`\`\`powershell
git add .
git commit -m "Add new feature"
git push
\`\`\`

Render rebuilds and deploys without any manual action.

## Key Takeaways
- Deploy = connect GitHub repo to Render → set env vars → push
- Never commit \`.env\` — use Render's environment panel
- Free tier sleeps after inactivity (30s wakeup)
- Every push auto-deploys`,
    },
  ],
};