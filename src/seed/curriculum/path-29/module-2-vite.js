module.exports = {
  title: "Module 2: Introduction to Vite",
  description: "The modern build tool and development server.",
  order: 2,
  lessons: [
    {
      title: "Introduction to Vite",
      slug: "intro-to-vite",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Vite

**Learning objectives:**
- Understand what a build tool does
- Learn why Vite replaced older tools like Webpack

## What is Vite?
Vite (French for "fast") is a build tool and development server created by Evan You (creator of Vue.js).

## Why Vite?
Older tools (like Webpack) had to bundle your entire app before starting the dev server. This took seconds (or minutes). Vite serves your files as native ES Modules, so the server starts in **milliseconds** regardless of project size.

## The Build Step
While the dev server is fast, browsers still need bundled code for production. Vite uses **Rollup** under the hood to create highly optimized production builds.`
    },
    {
      title: "Creating Frontend Projects with Vite",
      slug: "creating-projects-vite",
      order: 2,
      estimatedMinutes: 30,
      content: `# Creating Frontend Projects with Vite

**Learning objectives:**
- Scaffold a new project with Vite
- Run the dev server

## Creating a Project
\`\`\`bash
npm create vite@latest my-app
\`\`\`
You will be prompted to choose a framework (Vanilla JS, React, Vue, etc.) and a language (JavaScript or TypeScript).

## Using Vanilla JavaScript
Choose **Vanilla** → **JavaScript**. This is perfect for learning.

## Entering the Project
\`\`\`bash
cd my-app
npm install
npm run dev
\`\`\`

The terminal will give you a URL, usually \`http://localhost:5173\`.

## What Did Vite Create?
- \`index.html\` (at the root, not in \`public/\`)
- \`src/\` folder for JS/CSS
- \`vite.config.js\` for customization
- \`package.json\` with \`"dev"\` and \`"build"\` scripts`
    },
    {
      title: "Development Servers and Hot Module Replacement",
      slug: "dev-servers-hmr",
      order: 3,
      estimatedMinutes: 25,
      content: `# Development Servers and Hot Module Replacement

**Learning objectives:**
- Understand what HMR is
- Save time while coding

## What is a Dev Server?
A local server that serves your files over HTTP and watches for changes. Unlike opening \`index.html\` directly (which uses \`file://\`), a dev server allows modules, fetch requests, and cookies to work correctly.

## Hot Module Replacement (HMR)
HMR updates your app in the browser without a full page reload. When you save a file, only that module is updated, preserving the current state (e.g., form input or scroll position).

## How to Use It
Just run \`npm run dev\` and leave it running. Edit your files, and watch the browser update automatically.`
    }
  ]
};