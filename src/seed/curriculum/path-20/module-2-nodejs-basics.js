module.exports = {
  title: "Module 2: Node.js Basics",
  description: "Modules, package management, and built-in libraries.",
  order: 2,
  lessons: [
    {
      title: "Introduction to Node.js",
      slug: "intro-to-nodejs",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Node.js

**Learning objectives:**
- Understand what Node.js is and what it is not
- Learn about the V8 engine and the Event Loop

## What is Node.js?
Node.js is a **JavaScript runtime environment**. It takes the V8 engine (which powers Google Chrome) and wraps it in C++ code that can interact with the operating system.

**It is NOT a framework.** It is not a language. It is the environment that allows JavaScript to read files, listen to network ports, and talk to databases.

## The Event Loop
Traditional servers (like Apache/PHP) create a new thread for every request. If 10,000 users connect, they need 10,000 threads, consuming gigabytes of RAM.

Node.js uses a **single thread** with an **Event Loop**. Instead of waiting for a database query to finish, it moves on to the next request. When the database finishes, it triggers a callback.

This makes Node.js incredibly efficient for I/O (input/output) tasks, which is exactly what web servers do.

## Running Your First Script
Create a file called \`app.js\`:
\`\`\`javascript
const name = "Developer";
console.log(\`Hello, \${name}! Welcome to Node.js.\`);
\`\`\`

Run it in the terminal:
\`\`\`bash
node app.js
\`\`\`

You will see the output in the terminal (not the browser).

## The \`process\` Object
Node gives you a global \`process\` object.
- \`process.env\`: Environment variables.
- \`process.argv\`: Command line arguments.
- \`process.exit()\`: Quit the program.

## Key Takeaways
- Node.js runs JavaScript outside the browser.
- It is optimized for handling many concurrent connections efficiently.
- Use \`node filename.js\` to run backend scripts.`
    },
    {
      title: "Node.js Modules: CommonJS and ES Modules",
      slug: "nodejs-modules",
      order: 2,
      estimatedMinutes: 30,
      content: `# Node.js Modules: CommonJS and ES Modules

**Learning objectives:**
- Split code into reusable modules
- Understand \`module.exports\` and \`require\`
- Know the difference between CommonJS and ES Modules

## Why Modules?
As your app grows, putting all code in one file becomes unmanageable. Modules allow you to split code into separate files and import them where needed.

## CommonJS (The Node.js Standard)
For years, Node.js used CommonJS. You export with \`module.exports\` and import with \`require\`.

**Exporting (\`math.js\`):**
\`\`\`javascript
function add(a, b) {
  return a + b;
}
module.exports = { add };
\`\`\`

**Importing (\`app.js\`):**
\`\`\`javascript
const { add } = require('./math');
console.log(add(2, 3)); // 5
\`\`\`

## ES Modules (The Modern Standard)
Modern JavaScript uses \`import\` and \`export\`. Node.js supports this if you set \`"type": "module"\` in \`package.json\`.

**Exporting (\`math.js\`):**
\`\`\`javascript
export function add(a, b) {
  return a + b;
}
\`\`\`

**Importing (\`app.js\`):**
\`\`\`javascript
import { add } from './math.js';
console.log(add(2, 3));
\`\`\`

## Which Should You Use?
- Most legacy Node.js tutorials and older packages use **CommonJS** (\`require\`).
- Modern projects prefer **ES Modules** (\`import\`).
- In this bootcamp, we use CommonJS because it works out of the box with Express and most tutorials without extra configuration.

## Key Takeaways
- Modules prevent massive, unreadable files.
- CommonJS uses \`require\`, ES Modules use \`import\`.
- Do not mix them in the same file.`
    },
    {
      title: "Working with npm and package.json",
      slug: "working-with-npm",
      order: 3,
      estimatedMinutes: 30,
      content: `# Working with npm and package.json

**Learning objectives:**
- Initialize a new Node project
- Install dependencies
- Understand \`package.json\` and \`package-lock.json\`

## What is npm?
npm (Node Package Manager) is the world's largest software registry. It allows you to install open-source code written by others (like Express, Mongoose, etc).

## Initializing a Project
Go to your project folder in the terminal and run:
\`\`\`bash
npm init -y
\`\`\`

This creates a \`package.json\` file. It acts as the ID card for your project:
\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node app.js"
  }
}
\`\`\`

## Installing Packages
To install a package:
\`\`\`bash
npm install express
\`\`\`

This does three things:
1. Downloads the code into a \`node_modules\` folder.
2. Adds \`express\` to your \`package.json\` under "dependencies".
3. Creates a \`package-lock.json\` file (which locks in the exact versions).

## Dev Dependencies
Some packages are only needed while you are developing (like \`nodemon\`). Use the \`--save-dev\` flag:
\`\`\`bash
npm install --save-dev nodemon
\`\`\`

## Never Commit \`node_modules\`
The \`node_modules\` folder is massive. Never push it to GitHub. Add it to your \`.gitignore\` file:
\`\`\`
node_modules/
\`\`\`

Anyone who clones your project just runs \`npm install\` and npm will read \`package.json\` and download everything.

## Key Takeaways
- \`package.json\` lists your dependencies.
- \`npm install\` reads it and downloads what's needed.
- Always use \`.gitignore\` to exclude \`node_modules\`.`
    },
    {
      title: "Node.js Built-in Modules",
      slug: "nodejs-built-in-modules",
      order: 4,
      estimatedMinutes: 25,
      content: `# Node.js Built-in Modules

**Learning objectives:**
- Use Node's native modules without installing them
- Understand the difference between core modules and third-party modules

## What are Built-in Modules?
Node.js comes with a rich set of built-in modules that you can use immediately without running \`npm install\`. You just \`require\` them.

Some of the most important:
- \`fs\`: File system (reading/writing files).
- \`path\`: Paths and directories.
- \`http\`: Creating HTTP servers.
- \`os\`: Operating system info.
- \`crypto\`: Cryptography and hashing.

## The \`os\` Module
\`\`\`javascript
const os = require('os');

console.log(os.platform()); // 'win32', 'darwin', 'linux'
console.log(os.cpus().length); // Number of CPU cores
console.log(os.freemem() / 1024 / 1024); // Free memory in MB
\`\`\`

## The \`crypto\` Module
\`\`\`javascript
const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('password123').digest('hex');
console.log(hash);
\`\`\`

## Core vs Third-Party
- **Core**: Built into Node (no install needed). \`const fs = require('fs')\`.
- **Third-Party**: Built by the community (needs npm). \`const express = require('express')\`.

## Key Takeaways
- Node has dozens of built-in modules for common tasks.
- They are already on your machine once Node.js is installed.
- The \`fs\` and \`path\` modules are the most commonly used.`
    }
  ]
};