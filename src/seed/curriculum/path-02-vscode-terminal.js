// Path 2: VS Code & Terminal Fundamentals
module.exports = {
  course: {
    title: "VS Code & Terminal Fundamentals",
    slug: "vscode-terminal",
    description:
      "Master the professional developer workspace: terminal navigation, VS Code configuration, extensions, npm, and the tools that make you productive.",
    level: "beginner",
    estimatedHours: 10,
    icon: "vscode",
    order: 2,
    isPublished: true,
  },
  modules: [
    {
      title: "The Terminal",
      description: "Commands every developer uses daily.",
      order: 1,
      lessons: [
        {
          title: "Navigating the Filesystem",
          slug: "navigating-filesystem",
          order: 1,
          estimatedMinutes: 25,
          content: `# Navigating the Filesystem

**Learning objectives:**
- Move around your computer using only the terminal
- Understand absolute vs relative paths

## Why the Terminal?
Clicking is slow. Typing is fast and repeatable. Real developers live in the terminal because:
- **Automation**: everything is a command, and commands can be scripted
- **Precision**: no ambiguity about which file you're acting on
- **Remote work**: on a cloud server (like Render), there is no GUI — only the terminal

## Essential Commands

### Navigation
\`\`\`powershell
pwd        # Print Working Directory (where am I?)
ls         # List files in current folder
cd folder  # Change into a folder
cd ..      # Go up one folder
cd ~       # Go to home directory
\`\`\`

### Files and Folders
\`\`\`powershell
mkdir my-folder      # Make a folder
touch file.txt       # Create empty file (Windows: New-Item file.txt)
rm file.txt          # Delete a file
rm -rf folder        # Delete folder and contents (⚠️ permanent)
\`\`\`

## Paths: Absolute vs Relative
- **Absolute path**: starts from the drive root — \`C:\\dev\\myproject\\server.js\`
- **Relative path**: starts from your current location — \`./src/app.js\` or \`../config/db.js\`

When your Node code does \`require("./src/app")\`, it's a **relative path** from the current file. That's why moving files breaks imports.

## Key Takeaways
- \`pwd\`, \`ls\`, \`cd\` are the three most-used commands
- Absolute paths are stable, relative paths are portable
- Learn to read error messages — they always say the path`,
        },
        {
          title: "npm and package.json",
          slug: "npm-package-json",
          order: 2,
          estimatedMinutes: 25,
          content: `# npm and package.json

**Learning objectives:**
- Explain what npm does
- Read and modify \`package.json\`
- Install and remove packages

## What is npm?
**Node Package Manager**. It gives you access to over 1 million open-source packages — everything from Express (web server) to Bcrypt (password hashing) to Monaco (code editor).

## Initializing a Project
\`\`\`powershell
mkdir my-project
cd my-project
npm init -y
\`\`\`

This creates \`package.json\`:

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  }
}
\`\`\`

## Installing Packages
\`\`\`powershell
npm install express
\`\`\`

Three things happen:
1. \`express\` is added to \`"dependencies"\` in \`package.json\`
2. The package is downloaded to \`node_modules/\`
3. The exact version is saved in \`package-lock.json\`

## Dev vs Production Dependencies
\`\`\`powershell
npm install --save-dev nodemon
\`\`\`

Dev dependencies are tools you use *while developing* (nodemon, eslint, testing) but that aren't needed when the app runs in production. Render installs only production dependencies with \`NODE_ENV=production\`.

## Scripts
\`\`\`json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
\`\`\`

Run them with \`npm run dev\` or \`npm start\`.

## The .gitignore Rule
**Never** commit \`node_modules/\`. It's huge and re-creatable. Add it to \`.gitignore\`.

## Key Takeaways
- \`package.json\` is the ID card of your project
- Install = download + record the version
- Scripts let you run any command with \`npm run <name>\`
- \`node_modules/\` never goes to GitHub`,
        },
      ],
    },
    {
      title: "VS Code Mastery",
      description: "Editor configuration, extensions, and speed.",
      order: 2,
      lessons: [
        {
          title: "Extensions That Multiply Productivity",
          slug: "essential-extensions",
          order: 1,
          estimatedMinutes: 20,
          content: `# Extensions That Multiply Productivity

**Learning objectives:**
- Install the 4 must-have extensions
- Understand what each one does

## The Essentials

### 1. Prettier
Auto-formats your code on save. Every developer in every team uses a formatter — it eliminates style debates and prevents trivial bugs.

**Setup:**
- Install from Extensions tab
- Open Settings → search \`format on save\` → check **Editor: Format On Save**

### 2. ESLint
Static analyzer that flags bugs and style issues *as you type*. E.g., it warns you about unused variables, missing awaits, undefined references.

### 3. MongoDB for VS Code
Connect to your Atlas cluster directly in the editor. Browse collections, run queries, edit documents — no browser needed.

### 4. REST Client
Send API requests from \`.http\` files. Example:

\`\`\`http
GET http://localhost:3000/api/courses
\`\`\`

Click "Send Request" above the line. The response appears beside it. This is a faster alternative to Postman for quick testing.

## Key Takeaways
- Prettier eliminates formatting decisions
- ESLint catches bugs before runtime
- MongoDB extension inspects data
- REST Client tests APIs without leaving VS Code`,
        },
        {
          title: "Keyboard Shortcuts That Save Hours",
          slug: "keyboard-shortcuts",
          order: 2,
          estimatedMinutes: 20,
          content: `# Keyboard Shortcuts That Save Hours

**Learning objectives:**
- Master the 10 shortcuts every professional uses
- Double your editing speed

## The Top 10

| Shortcut | Action | Why |
|----------|--------|-----|
| \`Ctrl + P\` | Quick-open file | Jump to any file by name |
| \`Ctrl + Shift + P\` | Command palette | Access every command |
| \`Ctrl + \`\` | Toggle terminal | Stay in the flow |
| \`Ctrl + /\` | Toggle comment | Comment out code instantly |
| \`Alt + ↑ / ↓\` | Move line up/down | Rearrange code |
| \`Shift + Alt + ↓\` | Duplicate line | Clone and edit |
| \`Ctrl + D\` | Select next occurrence | Rename across lines |
| \`F2\` | Rename symbol | Rename across files |
| \`F12\` | Go to definition | Jump to where a function lives |
| \`Ctrl + Shift + F\` | Search project | Find anything anywhere |

## Practice Drill
Open any file in your project and:
1. \`Ctrl + P\` → open \`server.js\`
2. \`Ctrl + /\` on any line → comment it
3. \`Shift + Alt + ↓\` → duplicate the line
4. \`Ctrl + Z\` × 2 → undo both

## Key Takeaways
- Memorize \`Ctrl + P\` first — it's the most-used
- \`Ctrl + Shift + P\` gives you access to everything
- Multi-cursor (\`Ctrl + D\`) is the single biggest speed boost`,
        },
      ],
    },
  ],
};