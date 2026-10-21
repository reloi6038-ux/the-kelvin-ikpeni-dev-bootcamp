module.exports = {
  title: "Module 5: First Server & Git",
  description: "Building a server and version control.",
  order: 5,
  lessons: [
    {
      title: "Building Your First Node.js Server",
      slug: "first-node-server",
      order: 1,
      estimatedMinutes: 35,
      content: `# Building Your First Node.js Server

**Learning objectives:**
- Use the built-in \`http\` module
- Handle basic routing manually
- Understand why frameworks like Express exist

## Creating a Server
Node.js has a built-in \`http\` module. You don't need any external packages to create a server.

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
\`\`\`

## Handling Routes Manually
The \`http\` module doesn't have a router. You have to check the URL yourself.

\`\`\`javascript
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API Data' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
\`\`\`

## The Pain of Manual Routing
As you can see, this gets messy very quickly. What about parsing JSON bodies? Handling static files? Dealing with cookies?

That is exactly why we use **Express.js**. It handles all this boilerplate, allowing us to write clean routes.

## Key Takeaways
- Node.js can create servers without any packages.
- The \`http\` module is low-level and verbose.
- Frameworks like Express make this much easier.`
    },
    {
      title: "Using Git and GitHub for Backend Projects",
      slug: "git-github-backend",
      order: 2,
      estimatedMinutes: 30,
      content: `# Using Git and GitHub for Backend Projects

**Learning objectives:**
- Initialize a git repository
- Protect sensitive files with \`.gitignore\`
- Push to GitHub

## Why Git?
Git tracks changes in your code. If you break something, you can revert. If you collaborate, you can merge work without overwriting each other.

## Step 1: Initialize
\`\`\`bash
git init
git branch -M main
\`\`\`

## Step 2: The .gitignore File
This is **critical** for backend projects. Create a \`.gitignore\` file in your root folder:

\`\`\`text
node_modules/
.env
*.log
.DS_Store
\`\`\`

**Why?**
- \`node_modules\` is massive and can be recreated with \`npm install\`.
- \`.env\` contains your database passwords and secret keys.

## Step 3: Commit
\`\`\`bash
git add .
git commit -m "Initial backend setup"
\`\`\`

## Step 4: Push to GitHub
1. Create a new repository on GitHub (leave it empty).
2. Connect your local repo:
\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
\`\`\`

## Emergency: Committed .env by mistake?
If you accidentally pushed your \`.env\`, change your database password immediately. The file is permanently in your GitHub history, and bots scan GitHub for exposed credentials.

## Key Takeaways
- \`.gitignore\` is your first line of defense against leaked secrets.
- Commit early and often.
- Always verify your remote repository after pushing.`
    }
  ]
};