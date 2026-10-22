module.exports = {
  title: "Module 4: Code Quality & Structure",
  description: "ESLint, Prettier, Git, and project organization.",
  order: 4,
  lessons: [
    {
      title: "ESLint for JavaScript Code Quality",
      slug: "eslint",
      order: 1,
      estimatedMinutes: 30,
      content: `# ESLint for JavaScript Code Quality

**Learning objectives:**
- Install and configure ESLint
- Catch bugs before runtime

## What is ESLint?
A static analyzer. It reads your code and finds problems without running it. It catches undefined variables, unused variables, missing brackets, and much more.

## Installation
\`\`\`bash
npm install --save-dev eslint
npx eslint --init
\`\`\`

## Configuration
ESLint asks a few questions (framework, style, etc.) and generates \`eslint.config.js\` (or \`.eslintrc.json\` for older versions).

## Rules
You can enable/disable rules in the config file:
\`\`\`javascript
{
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
\`\`\`

## Running ESLint
\`\`\`bash
npx eslint src/
\`\`\`
Or add it to your npm scripts.`
    },
    {
      title: "Prettier for Code Formatting",
      slug: "prettier",
      order: 2,
      estimatedMinutes: 25,
      content: `# Prettier for Code Formatting

**Learning objectives:**
- Automate code formatting
- Integrate with VS Code

## What is Prettier?
An opinionated code formatter. It enforces a consistent style (tabs vs spaces, semicolons, line length) across your entire team, eliminating formatting arguments.

## Installation
\`\`\`bash
npm install --save-dev prettier
\`\`\`

## Configuration
Create \`.prettierrc\`:
\`\`\`json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
\`\`\`

## Running Prettier
\`\`\`bash
npx prettier --write .
\`\`\`
The \`--write\` flag saves the changes to disk.

## The VS Code Extension
Install the Prettier extension in VS Code, then enable **Editor: Format On Save** in settings. Every time you hit save, your code is beautifully formatted.`
    },
    {
      title: "Git and GitHub for Frontend Projects",
      slug: "git-github-frontend",
      order: 3,
      estimatedMinutes: 25,
      content: `# Git and GitHub for Frontend Projects

**Learning objectives:**
- Initialize a git repo
- Ignore the right files

## Initialize
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
\`\`\`

## The .gitignore File
Never commit your \`node_modules\`. They are massive. Add them to \`.gitignore\`.
\`\`\`text
node_modules/
dist/
.env
.env.local
.DS_Store
\`\`\`
Note the \`dist/\` folder: Vite generates this during \`npm run build\`. You don't need to commit it; your hosting provider will build it.`
    },
    {
      title: "Frontend Project Structure and Organization",
      slug: "frontend-project-structure",
      order: 4,
      estimatedMinutes: 30,
      content: `# Frontend Project Structure and Organization

**Learning objectives:**
- Structure a scalable frontend project
- Separate concerns

## The Recommended Structure
\`\`\`text
my-app/
├── src/
│   ├── assets/       (images, fonts)
│   ├── css/          (stylesheets)
│   ├── js/           (modules and components)
│   ├── main.js       (entry point)
│   └── style.css     (global css)
├── public/           (static files, robots.txt)
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## Why Organize?
As your app grows, a flat structure becomes a mess. Grouping files by feature or type (assets, CSS, JS) keeps it maintainable.

## The Entry Point
Vite starts at \`index.html\`, which loads \`src/main.js\`. That file imports your CSS and initializes your app.`
    }
  ]
};