// Path 2: VS Code & Terminal Fundamentals
module.exports = {
  course: {
    title: "VS Code & Terminal Fundamentals",
    slug: "vscode-terminal",
    description:
      "Set up a professional development workspace with VS Code, the terminal, npm, and package.json.",
    level: "beginner",
    estimatedHours: 6,
    icon: "vscode",
    order: 2,
    isPublished: true,
  },
  modules: [
    {
      title: "VS Code Setup",
      description: "Editor settings, extensions, and shortcuts.",
      order: 1,
      lessons: [
        {
          title: "Installing VS Code",
          slug: "installing-vscode",
          order: 1,
          estimatedMinutes: 10,
          content: `# Installing VS Code

VS Code is a free, powerful editor used by millions of developers.

## Download
1. Visit **https://code.visualstudio.com/**
2. Click **Download for Windows**
3. Run the installer
4. Check **"Add to PATH"** (required)

## Verify
Open PowerShell and run:
\`\`\`
code --version
\`\`\`

You should see a version number. If not, restart your computer.`,
        },
        {
          title: "Essential Extensions",
          slug: "essential-extensions",
          order: 2,
          estimatedMinutes: 15,
          content: `# Essential Extensions

Extensions make VS Code exponentially more powerful. Install these four:

| Extension | Purpose |
|-----------|---------|
| **Prettier** | Automatic code formatting |
| **ESLint** | Catches bugs before they happen |
| **MongoDB for VS Code** | Inspect your database |
| **REST Client** | Test API endpoints |

## Install
1. Open VS Code
2. Click the Extensions icon (left sidebar)
3. Search each name
4. Click **Install**`,
        },
      ],
    },
    {
      title: "Node.js & npm",
      description: "The runtime and package manager.",
      order: 2,
      lessons: [
        {
          title: "Understanding package.json",
          slug: "understanding-package-json",
          order: 1,
          estimatedMinutes: 20,
          content: `# Understanding package.json

Every Node.js project has a \`package.json\` — the "ID card" of the project.

## Anatomy

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
\`\`\`

## Key fields
- **name** — lowercase, no spaces
- **main** — the entry file Node runs first
- **scripts** — short commands (\`npm run dev\` executes \`nodemon server.js\`)
- **dependencies** — packages your app needs in production
- **devDependencies** — packages only for development (like nodemon)

## Install a package
\`\`\`
npm install express
\`\`\`

This adds \`express\` to \`dependencies\` and downloads it into \`node_modules/\`.`,
        },
      ],
    },
  ],
};