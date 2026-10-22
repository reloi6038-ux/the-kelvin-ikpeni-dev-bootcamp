module.exports = {
  title: "Module 1: Node.js & npm Basics",
  description: "Setting up your tooling environment and understanding the core files.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Node.js for Frontend Tooling",
      slug: "nodejs-frontend-tooling",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Node.js for Frontend Tooling

**Learning objectives:**
- Understand why frontend developers need Node.js
- Differentiate between browser JS and Node.js
- Learn what "tooling" means

## Why Node.js for Frontend?
Even though Node.js runs on the server, frontend developers use it heavily for **tooling**. Tools that compile, bundle, lint, and format your code are all written in JavaScript and run via Node.js.

Before Node.js, you had to write plain HTML, CSS, and JS files manually. Today, we use **build tools** to:
- Convert modern JS into browser-compatible JS.
- Bundle multiple files into one.
- Minify code for faster loading.
- Run local development servers.

## Browser JS vs Node.js
- **Browser**: Has access to the \`window\`, \`document\`, and \`DOM\`.
- **Node.js**: Has access to the file system (\`fs\`), network (\`http\`), and processes.

Tooling scripts run in Node.js, not the browser.`
    },
    {
      title: "Installing and Using npm",
      slug: "installing-npm",
      order: 2,
      estimatedMinutes: 25,
      content: `# Installing and Using npm

**Learning objectives:**
- Verify Node.js is installed
- Install your first package

## What is npm?
Node Package Manager. It comes bundled with Node.js. It has two main jobs:
1. **Registry**: A database of over 1 million open-source packages.
2. **CLI**: The command-line tool used to install and manage those packages.

## Installation
Download Node.js from nodejs.org (LTS version). npm installs automatically.

Verify with:
\`\`\`bash
node -v
npm -v
\`\`\`

## Installing a Package
\`\`\`bash
npm install lodash
\`\`\`
This downloads the package into the \`node_modules\` folder and adds it to \`package.json\`.

## Global vs Local
- **Local**: Installed in your project folder (\`npm install\`).
- **Global**: Installed on your machine, used from anywhere (\`npm install -g\`). Use global for CLI tools only (like Vite or ESLint).`
    },
    {
      title: "Understanding package.json",
      slug: "understanding-package-json",
      order: 3,
      estimatedMinutes: 30,
      content: `# Understanding package.json

**Learning objectives:**
- Read and modify package.json
- Understand the scripts section

## What is package.json?
The heart of your Node.js project. It contains metadata, dependencies, and scripts.

## Creating One
\`\`\`bash
npm init -y
\`\`\`

## Key Fields
\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {},
  "devDependencies": {}
}
\`\`\`

## The Scripts Section
The most useful part. You can run any command with \`npm run <name>\`.
\`\`\`bash
npm run dev
\`\`\`
This runs whatever is inside \`"dev"\`, e.g., starting your Vite dev server.`
    },
    {
      title: "Installing and Managing npm Packages",
      slug: "managing-npm-packages",
      order: 4,
      estimatedMinutes: 25,
      content: `# Installing and Managing npm Packages

**Learning objectives:**
- Add, update, and remove packages
- Understand semver (^ and ~)

## Installing
\`\`\`bash
npm install axios
\`\`\`

## Removing
\`\`\`bash
npm uninstall axios
\`\`\`

## Updating
\`\`\`bash
npm update
\`\`\`

## Understanding Versions (SemVer)
Versions look like \`1.4.2\` (Major.Minor.Patch).
- \`^\` (caret): Accepts minor and patch updates. \`^1.4.2\` allows \`1.9.0\` but NOT \`2.0.0\`.
- \`~\` (tilde): Accepts only patch updates. \`~1.4.2\` allows \`1.4.9\` but NOT \`1.5.0\`.

## Never Commit node_modules
Always add \`node_modules/\` to your \`.gitignore\`. Anyone who clones your repo just runs \`npm install\` and their npm reads \`package.json\` to install the correct versions.`
    }
  ]
};