module.exports = {
  title: "Module 1: Preparing & Deploying",
  description: "Getting your app ready for the real world and launching it.",
  order: 1,
  lessons: [
    {
      title: "Preparing a Node.js App for Production",
      slug: "preparing-for-production",
      order: 1,
      estimatedMinutes: 30,
      content: `# Preparing a Node.js App for Production

**Learning objectives:**
- Differentiate between development and production environments
- Optimize your \`package.json\`
- Remove dev-only tools from production

## The Two Environments
- **Development**: Where you write code. You want fast restarts (nodemon), verbose logging, and no caching.
- **Production**: Where real users interact. You want security, speed, minimal logging, and high performance.

## 1. NODE_ENV
Always set \`NODE_ENV=production\` in your hosting provider. This tells Express to:
- Disable stack traces in error responses.
- Enable view caching.
- Improve performance.

## 2. Package.json Scripts
Your production start command should use plain Node, not nodemon.
\`\`\`json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
\`\`\`

## 3. Pruning Dev Dependencies
Tools like \`eslint\`, \`jest\`, and \`nodemon\` are only needed during development. When you deploy, your server should only install **production dependencies**.

Most hosting providers (like Render) do this automatically when they see \`NODE_ENV=production\`. If running manually, use:
\`\`\`bash
npm ci --omit=dev
\`\`\`

## Key Takeaways
- Always set \`NODE_ENV=production\`.
- Use \`node\` for production, \`nodemon\` for dev.
- Never install dev dependencies in production.`
    },
    {
      title: "Git and GitHub Workflow",
      slug: "git-github-workflow",
      order: 2,
      estimatedMinutes: 25,
      content: `# Git and GitHub Workflow

**Learning objectives:**
- Follow a professional Git workflow
- Protect the main branch
- Use pull requests effectively

## The Main Branch is Sacred
In production, the \`main\` branch should always be deployable. If it's broken, your live app is broken.

## The Professional Workflow
1. **Branch**: Create a new branch for every feature or fix.
   \`\`\`bash
   git checkout -b feature/user-auth
   \`\`\`
2. **Commit**: Write clear, descriptive commit messages.
   \`\`\`bash
   git commit -m "Add JWT authentication middleware"
   \`\`\`
3. **Push**: Push the branch to GitHub.
   \`\`\`bash
   git push origin feature/user-auth
   \`\`\`
4. **Pull Request**: Open a PR on GitHub to merge into \`main\`.
5. **Merge**: Once tests pass and code is reviewed, merge.

## Branch Protection Rules
In your GitHub repository settings, you can enforce:
- Require pull requests before merging.
- Require status checks (like passing tests).
- Prevent force pushes to \`main\`.

## Key Takeaways
- Never commit directly to \`main\` for large features.
- Use branches and pull requests.
- Protect \`main\` in GitHub settings.`
    },
    {
      title: "Deploying Node.js Applications to Render",
      slug: "deploying-to-render",
      order: 3,
      estimatedMinutes: 35,
      content: `# Deploying Node.js Applications to Render

**Learning objectives:**
- Deploy a Node.js app to Render
- Configure build and start commands
- Debug deployment failures

## Why Render?
Render is a modern cloud platform that automatically deploys from GitHub. It offers a generous free tier and zero-config HTTPS.

## Step-by-Step Deployment
1. **Push to GitHub**: Ensure your code is on GitHub.
2. **Create a Render Account**: Go to render.com and sign in with GitHub.
3. **New Web Service**: Click **New +** → **Web Service**.
4. **Connect Repository**: Select your GitHub repo.
5. **Configure**:
   - **Environment**: Node
   - **Build Command**: \`npm install\`
   - **Start Command**: \`npm start\`
   - **Instance Type**: Free
6. **Environment Variables**: Add your \`.env\` variables (like \`MONGODB_URI\`).
7. **Deploy**: Click **Create Web Service**.

## Auto-Deploy
Render watches your GitHub repo. Every time you push to \`main\`, Render automatically builds and deploys the new version.

## Common Deployment Errors
- **Build failed**: Missing package in \`package.json\`. Run \`npm install <package>\` locally and push.
- **App crashed**: Missing environment variable. Check the Environment tab.
- **Port binding**: Your app must use \`process.env.PORT\`, not a hardcoded \`3000\`.

## Key Takeaways
- Render deploys directly from GitHub.
- Always use \`process.env.PORT\`.
- Check the Render logs if the build fails.`
    }
  ]
};