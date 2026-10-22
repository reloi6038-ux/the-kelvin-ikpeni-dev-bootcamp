module.exports = {
  title: "Module 3: Dependencies & Env Vars",
  description: "Scripts, dependencies, and environment variables.",
  order: 3,
  lessons: [
    {
      title: "Using npm Scripts",
      slug: "npm-scripts",
      order: 1,
      estimatedMinutes: 25,
      content: `# Using npm Scripts

**Learning objectives:**
- Write custom scripts
- Chain commands

## What are Scripts?
Shortcuts defined in \`package.json\`. You can run multiple commands, chain them, and even use environment variables.

## Examples
\`\`\`json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src/",
  "format": "prettier --write src/"
}
\`\`\`

## Chaining
Run multiple commands in sequence using \`&&\`.
\`\`\`json
"build": "vite build && echo 'Build complete!'"
\`\`\`

## NPM Run
\`\`\`bash
npm run lint
\`\`\`
If the script is named \`start\` or \`test\`, you can skip the \`run\` (\`npm start\`).`
    },
    {
      title: "Understanding Dependencies and Dev Dependencies",
      slug: "dependencies-dev",
      order: 2,
      estimatedMinutes: 25,
      content: `# Understanding Dependencies and Dev Dependencies

**Learning objectives:**
- Know when to use \`--save-dev\`
- Optimize production builds

## dependencies
Packages your app needs to run in the browser. Examples: \`axios\`, \`react\`, \`lodash\`.

\`\`\`bash
npm install axios
\`\`\`

## devDependencies
Packages only needed during development. They are stripped out before deployment. Examples: \`vite\`, \`eslint\`, \`prettier\`, \`typescript\`.

\`\`\`bash
npm install --save-dev eslint
\`\`\`

## Why It Matters
Production servers (like Vercel or Netlify) install only \`dependencies\` to save bandwidth and time. If you accidentally put \`vite\` in \`dependencies\`, your bundle might include unnecessary build tools.`
    },
    {
      title: "Environment Variables in Frontend Projects",
      slug: "frontend-env-vars",
      order: 3,
      estimatedMinutes: 30,
      content: `# Environment Variables in Frontend Projects

**Learning objectives:**
- Use \`.env\` files with Vite
- Understand the \`VITE_\` prefix

## The Frontend Problem
In Node.js, you can use \`process.env.SECRET_KEY\`. But in the browser, \`process\` doesn't exist, and **any variable you expose is visible to the user** (in the JavaScript bundle).

## Vite's Approach
Vite only exposes variables that start with \`VITE_\`.

## Creating a .env File
\`\`\`env
VITE_API_URL=https://api.example.com
VITE_STRIPE_KEY=pk_test_123
SECRET_KEY=do_not_expose
\`\`\`

## Accessing Variables
\`\`\`javascript
console.log(import.meta.env.VITE_API_URL);
\`\`\`

## Security Warning
**Never put passwords or private API keys in frontend .env files.** They are compiled into the JavaScript bundle and are visible to anyone who opens DevTools. Only use them for public keys (like a Stripe publishable key) or public URLs.`
    }
  ]
};