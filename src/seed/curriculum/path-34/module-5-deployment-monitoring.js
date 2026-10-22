module.exports = {
  title: "Module 5: Deployment & Monitoring",
  description: "Hosting, CI/CD, and tracking errors.",
  order: 5,
  lessons: [
    {
      title: "Deploying Frontend Applications",
      slug: "deploying-frontend",
      order: 1,
      estimatedMinutes: 30,
      content: `# Deploying Frontend Applications

**Learning objectives:**
- Configure build settings
- Understand SPA routing on static hosts

## Hosting on Static Hosts
Services like Render, Vercel, and Netlify serve the \`dist/\` folder.

1. **Build Command**: \`npm install && npm run build\`
2. **Publish Directory**: \`dist\`

## The SPA Routing Trap
When you refresh a page like \`/about\`, the server looks for an \`about/index.html\` file. Since it's a Single Page App, that file doesn't exist → 404.

**The Fix**: Add a rewrite rule so all traffic goes to \`index.html\`.
- **Render/Netlify**: Add a \`_redirects\` file in the \`public\` folder:
  \`\`\`
  /*    /index.html   200
  \`\`\`
- **Vercel**: Add a \`vercel.json\` file with rewrites.`
    },
    {
      title: "Hosting on Render and Other Static Hosts",
      slug: "hosting-render",
      order: 2,
      estimatedMinutes: 25,
      content: `# Hosting on Render and Other Static Hosts

**Learning objectives:**
- Set up a Render Static Site
- Connect custom domains

## Render Static Sites
1. Create a new **Static Site** on Render.
2. Connect your GitHub repo.
3. Set Build Command: \`npm install && npm run build\`.
4. Set Publish Directory: \`dist\`.
5. Render handles HTTPS automatically.

## Custom Domain
In Render settings, add your custom domain and update your DNS records at your registrar (e.g., Namecheap) with the provided CNAME record.`
    },
    {
      title: "Continuous Integration with GitHub Actions",
      slug: "ci-github-actions",
      order: 3,
      estimatedMinutes: 30,
      content: `# Continuous Integration with GitHub Actions

**Learning objectives:**
- Automate testing
- Block broken code from merging

## What is CI?
Automatically running your tests on every push to GitHub.

## Setup
Create \`.github/workflows/ci.yml\`:
\`\`\`yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test
      - run: npm run build
\`\`\`
If the build or tests fail, GitHub shows a red X on the pull request, preventing broken code from merging.`
    },
    {
      title: "Monitoring Frontend Errors and Performance",
      slug: "monitoring-errors",
      order: 4,
      estimatedMinutes: 30,
      content: `# Monitoring Frontend Errors and Performance

**Learning objectives:**
- Track production errors
- Use Sentry

## Why Monitor?
If a user experiences a crash, you won't know unless they report it. Monitoring tools capture errors automatically with the stack trace, browser version, and user actions.

## Error Tracking with Sentry
1. Create a free account on sentry.io.
2. Install the SDK: \`npm install @sentry/react\`.
3. Initialize it in your \`main.jsx\`:
\`\`\`javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN_HERE",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
\`\`\`

Now, every crash will be logged in the Sentry dashboard, alerting you immediately.`
    }
  ]
};