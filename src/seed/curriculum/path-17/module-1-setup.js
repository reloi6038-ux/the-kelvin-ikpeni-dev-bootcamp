module.exports = {
  title: "Module 1: Project Setup",
  description: "Install tools, initialize the project, and get your first server running.",
  order: 1,
  lessons: [
    {
      title: "Install VS Code and Node.js",
      slug: "install-vscode-nodejs",
      order: 1,
      estimatedMinutes: 20,
      content: `# Install VS Code and Node.js

**Learning objectives:**
- Install the two tools every Node.js developer needs
- Verify your installation works
- Understand what each tool does

## The Two Tools

### VS Code (the editor)
Free, professional code editor. Downloads at **https://code.visualstudio.com/**

**Install steps:**
1. Download "Windows User Installer"
2. Run the installer
3. **Check these boxes** when prompted:
   - ✅ Add "Open with Code" to context menu
   - ✅ **Add to PATH** (this is required)
4. Click Install

### Node.js (the runtime)
Runs JavaScript on your computer. Downloads at **https://nodejs.org/en/download**

Choose the **LTS** version (Long Term Support — most stable).
1. Download the Windows .msi installer
2. Run it, accept all defaults
3. **Do NOT uncheck "Add to PATH"**

## Verify Everything Works

Open **PowerShell** (press Win + X → "Windows PowerShell") and run:

\`\`\`powershell
node --version
npm --version
code --version
\`\`\`

You should see three version numbers:

\`\`\`
v20.x.x       ← Node.js
10.x.x        ← npm (comes with Node.js)
1.85.x        ← VS Code
\`\`\`

## Common Errors and Fixes

### ❌ "node: command not found"
**Cause:** PATH not set.
**Fix:** Restart your computer. If still broken, reinstall Node.js and check "Add to PATH."

### ❌ "code: command not found"
**Cause:** VS Code not in PATH.
**Fix:** Open VS Code → \`Ctrl + Shift + P\` → type "Shell Command: Install 'code' command in PATH" → Enter.

### ❌ "npm: command not found"
**Cause:** npm is bundled with Node.js, so this means Node.js isn't installed.
**Fix:** Reinstall Node.js from nodejs.org.

## Key Takeaways
- Node.js is the runtime; VS Code is the editor
- Both must be in PATH
- Verify with \`node --version\`, \`npm --version\`, \`code --version\``
    },
    {
      title: "Initialize Your Project",
      slug: "initialize-project",
      order: 2,
      estimatedMinutes: 25,
      content: `# Initialize Your Project

**Learning objectives:**
- Create a project folder
- Generate \`package.json\`
- Install Express
- Run your first Node.js script

## Step 1: Create the Folder

\`\`\`powershell
mkdir C:\\dev
cd C:\\dev
mkdir my-first-website
cd my-first-website
\`\`\`

**What each command does:**
- \`mkdir\` = make directory (create folder)
- \`cd\` = change directory (enter folder)

## Step 2: Open in VS Code

\`\`\`powershell
code .
\`\`\`

The dot means "current folder." VS Code opens with your project visible.

## Step 3: Initialize package.json

In VS Code, open the terminal (\`Ctrl + \`\` or menu: Terminal → New Terminal):

\`\`\`powershell
npm init -y
\`\`\`

This creates \`package.json\` — your project's ID card. It looks like:

\`\`\`json
{
  "name": "my-first-website",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "test": "echo \\"Error: no test specified\\" && exit 1" },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
\`\`\`

**Edit it** so it matches this:

\`\`\`json
{
  "name": "my-first-website",
  "version": "1.0.0",
  "description": "My first full-stack website",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "license": "MIT"
}
\`\`\`

**Why:**
- \`"main": "server.js"\` — Node runs this file first
- \`"start"\` — used on Render for production
- \`"dev"\` — auto-restarts on file change locally

## Step 4: Install Express and Nodemon

\`\`\`powershell
npm install express
npm install --save-dev nodemon
\`\`\`

**What just happened:**
- \`express\` — added to \`"dependencies"\`
- \`nodemon\` — added to \`"devDependencies"\` (dev-only)
- Both downloaded into \`node_modules/\`

## Step 5: Verify Your First Node.js Script

Create a file called \`hello.js\`:

\`\`\`javascript
console.log("Hello from Node.js!");
console.log("Node version:", process.version);
\`\`\`

Run it:

\`\`\`powershell
node hello.js
\`\`\`

**Expected output:**
\`\`\`
Hello from Node.js!
Node version: v20.x.x
\`\`\`

## Common Errors and Fixes

### ❌ "npm: command not found" after npm init
**Cause:** You're not in the right folder.
**Fix:** Run \`pwd\` (print working directory) to check. Use \`cd\` to navigate to your project folder.

### ❌ "Cannot find module 'express'"
**Cause:** \`npm install\` failed or you're in the wrong folder.
**Fix:** \`cd\` into the folder with \`package.json\` and run \`npm install\` again.

### ❌ nodemon command not found
**Cause:** \`nodemon\` is installed locally, not globally.
**Fix:** Use \`npm run dev\` (not \`nodemon server.js\`) — npm finds it automatically.

## Key Takeaways
- \`npm init -y\` creates \`package.json\` (never write it by hand first)
- \`npm install X\` adds a package and records it
- \`npm install --save-dev X\` adds a dev-only package
- Run scripts with \`npm run <name>\``
    },
    {
      title: "Create Your First Server",
      slug: "first-server",
      order: 3,
      estimatedMinutes: 30,
      content: `# Create Your First Server

**Learning objectives:**
- Write a basic Express server
- Serve a JSON endpoint
- Understand the request-response cycle

## Step 1: Create server.js

In your project root, create \`server.js\`:

\`\`\`javascript
const express = require("express");
const app = express();
const PORT = 3000;

// A simple JSON endpoint
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(\`✅ Server running on http://localhost:\${PORT}\`);
  console.log(\`✅ Health check: http://localhost:\${PORT}/api/health\`);
});
\`\`\`

## Step 2: Run it

\`\`\`powershell
npm run dev
\`\`\`

**Expected output:**
\`\`\`
[nodemon] starting \`node server.js\`
✅ Server running on http://localhost:3000
✅ Health check: http://localhost:3000/api/health
\`\`\`

## Step 3: Test in the browser

Open: **http://localhost:3000/api/health**

You should see:

\`\`\`json
{ "success": true, "message": "Server is running!" }
\`\`\`

## Understanding the Code

**Line by line:**

\`\`\`javascript
const express = require("express");
\`\`\`
Loads the Express library. The variable \`express\` is now a function.

\`\`\`javascript
const app = express();
\`\`\`
Creates your Express application. Everything attaches to \`app\`.

\`\`\`javascript
app.get("/api/health", (req, res) => { ... });
\`\`\`
Defines a route. When the user visits \`/api/health\` with a GET request, run this handler.

\`\`\`javascript
res.json({ ... });
\`\`\`
Sends a JSON response back to the browser.

\`\`\`javascript
app.listen(PORT, () => { ... });
\`\`\`
Starts the server, listening on port 3000.

## The Request-Response Cycle

\`\`\`
Browser                    Server
   │                          │
   │  GET /api/health         │
   │─────────────────────────▶│
   │                          │ (runs handler)
   │  { success: true }       │
   │◀─────────────────────────│
\`\`\`

## Common Errors and Fixes

### ❌ "EADDRINUSE: port 3000 already in use"
**Cause:** Another process is using port 3000 (maybe an old server).
**Fix:** 
- Find and kill it: \`Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process\`
- Or change \`PORT\` to 3001 in server.js

### ❌ Browser shows "Cannot GET /"
**Cause:** You visited \`http://localhost:3000/\` but only \`/api/health\` exists.
**Fix:** Visit \`/api/health\` or add a route for \`/\`.

### ❌ "SyntaxError: Unexpected token"
**Cause:** Missing a bracket, quote, or semicolon.
**Fix:** Check the error message for the line number. Count your brackets.

### ❌ Terminal doesn't restart after changes
**Cause:** You ran \`node server.js\`, not \`npm run dev\`.
**Fix:** Stop with Ctrl+C, then run \`npm run dev\` (nodemon auto-restarts).

## Key Takeaways
- \`app.get(path, handler)\` defines a route
- \`res.json(...)\` sends JSON
- \`app.listen(PORT, callback)\` starts the server
- \`npm run dev\` = auto-restarting server
- Every route is a request-response cycle`
    }
  ]
};