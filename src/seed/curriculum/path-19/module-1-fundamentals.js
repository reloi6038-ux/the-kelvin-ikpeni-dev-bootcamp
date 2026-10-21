module.exports = {
  title: "Module 1: Express Fundamentals",
  description: "Servers, projects, routes, and the request/response cycle.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Express.js",
      slug: "intro-to-express",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Express.js

**Learning objectives:**
- Understand what Express.js is and why it's used
- Compare Express to built-in Node.js HTTP modules
- Explore the Express ecosystem

## What is Express?
Express is a minimal and flexible Node.js web application framework. It provides a robust set of features for building web and mobile applications. It's often called the "de facto" standard server framework for Node.js.

## Why Express?
Node.js has a built-in \`http\` module, but it's very low-level. You have to manually parse URLs, handle routing, manage headers, and process request bodies.

Express simplifies all of this:
- **Routing**: Easily map URLs to handler functions.
- **Middleware**: Run functions before/after requests.
- **Simplified responses**: \`res.json()\`, \`res.send()\`, \`res.render()\`.
- **Ecosystem**: Thousands of compatible plugins.

## A Tale of Two Servers

**Raw Node.js:**
\`\`\`javascript
const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(3000);
\`\`\`

**Express.js:**
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({ success: true });
});

app.listen(3000);
\`\`\`

## Key Takeaways
- Express is a lightweight layer on top of Node.js
- It makes routing and handling HTTP requests significantly easier
- It uses middleware to handle cross-cutting concerns`
    },
    {
      title: "Creating an Express.js Project",
      slug: "creating-express-project",
      order: 2,
      estimatedMinutes: 30,
      content: `# Creating an Express.js Project

**Learning objectives:**
- Initialize an Express project from scratch
- Set up a basic server file
- Configure the development script

## Step 1: Initialize Node
Create a new folder and run:
\`\`\`bash
npm init -y
\`\`\`

## Step 2: Install Express
\`\`\`bash
npm install express
npm install --save-dev nodemon
\`\`\`

## Step 3: Create the Server File
Create \`server.js\` in the root directory:

\`\`\`javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
\`\`\`

## Step 4: Update package.json Scripts
Open \`package.json\` and update the scripts section:
\`\`\`json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
\`\`\`

## Step 5: Run the Server
\`\`\`bash
npm run dev
\`\`\`

Your server is now running. Open \`http://localhost:3000\` in your browser to see the output.

## Key Takeaways
- Express is installed via npm just like any other package
- A basic server requires just a few lines of code
- \`nodemon\` auto-restarts the server when you save files`
    },
    {
      title: "Understanding Routes and HTTP Methods",
      slug: "routes-http-methods",
      order: 3,
      estimatedMinutes: 35,
      content: `# Understanding Routes and HTTP Methods

**Learning objectives:**
- Map HTTP verbs to Express methods
- Understand the difference between GET and POST
- Chain methods for the same route

## What is Routing?
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, etc.).

## The Core Methods
Express provides methods for every HTTP verb, named directly after the verb in lowercase:

\`\`\`javascript
app.get('/', (req, res) => res.send('GET request'));
app.post('/', (req, res) => res.send('POST request'));
app.put('/', (req, res) => res.send('PUT request'));
app.delete('/', (req, res) => res.send('DELETE request'));
\`\`\`

## When to Use Which?

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Read data | Fetching a list of courses |
| **POST** | Create data | Submitting a login form |
| **PUT** | Update entire data | Replacing a user profile |
| **PATCH** | Partial update | Changing just an email |
| **DELETE** | Remove data | Deleting a course |

## Route Chaining
You can group routes for the same path using \`app.route()\` to avoid repeating the path string:

\`\`\`javascript
app.route('/api/courses')
  .get((req, res) => res.send('Get all courses'))
  .post((req, res) => res.send('Create a course'))
  .put((req, res) => res.send('Update all courses'));
\`\`\`

## Key Takeaways
- \`app.get()\` handles browser navigation and data fetching
- \`app.post()\` handles form submissions and data creation
- \`app.route()\` is useful for grouping methods on the same path`
    }
  ]
};