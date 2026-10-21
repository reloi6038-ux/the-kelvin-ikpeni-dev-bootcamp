module.exports = {
  title: "Module 3: Middleware & Static Files",
  description: "The core of Express: intercepting, modifying, and serving.",
  order: 3,
  lessons: [
    {
      title: "Middleware in Express.js",
      slug: "middleware-in-express",
      order: 1,
      estimatedMinutes: 35,
      content: `# Middleware in Express.js

**Learning objectives:**
- Define what middleware is
- Understand the \`(req, res, next)\` signature
- Learn the order of middleware execution

## What is Middleware?
Middleware functions are functions that have access to the request object (\`req\`), the response object (\`res\`), and the next middleware function in the application's request-response cycle (\`next\`).

Middleware can:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

## The Signature
\`\`\`javascript
function myMiddleware(req, res, next) {
  console.log("Request received!");
  next(); // Pass control to the next handler
}
\`\`\`

**Crucial:** If you don't call \`next()\` and don't send a response, the request will hang indefinitely.

## Application-Level Middleware
Bound to the app object using \`app.use()\`. It runs on **every** request.

\`\`\`javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});
\`\`\`

## The Order Matters
Middleware executes in the exact order it is defined.

\`\`\`javascript
app.use((req, res, next) => { console.log("First"); next(); });
app.use((req, res, next) => { console.log("Second"); next(); });
\`\`\`

## Key Takeaways
- Middleware is the backbone of Express
- Must call \`next()\` to continue
- Order of definition determines execution order`
    },
    {
      title: "Built-in and Custom Middleware",
      slug: "built-in-custom-middleware",
      order: 2,
      estimatedMinutes: 30,
      content: `# Built-in and Custom Middleware

**Learning objectives:**
- Use Express's built-in middleware
- Write your own custom middleware
- Apply third-party middleware

## Built-in Middleware
Express comes with several built-in middleware functions:

- \`express.json()\`: Parses JSON bodies.
- \`express.urlencoded()\`: Parses form bodies.
- \`express.static()\`: Serves static files.
- \`express.Router()\`: Creates a new router object.

## Third-Party Middleware
The Express ecosystem is built on middleware. Common ones you'll use:
- **morgan**: HTTP request logger.
- **helmet**: Security headers.
- **cors**: Enables Cross-Origin Resource Sharing.
- **express-rate-limit**: Limits repeated requests.

## Custom Middleware Example
Let's create a middleware that checks for a specific header:

\`\`\`javascript
function requireApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== 'secret123') {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  next();
}

// Apply to a specific route
app.get('/api/secret', requireApiKey, (req, res) => {
  res.json({ data: "Top secret info" });
});
\`\`\`

## Key Takeaways
- Built-ins handle the essentials (parsing, static files)
- Third-party packages add powerful features
- Custom middleware is just a function with \`(req, res, next)\``
    },
    {
      title: "Serving Static HTML, CSS, and JavaScript Files",
      slug: "serving-static-files",
      order: 3,
      estimatedMinutes: 30,
      content: `# Serving Static HTML, CSS, and JavaScript Files

**Learning objectives:**
- Use \`express.static\` to serve a directory
- Understand the virtual path prefix
- Combine static serving with API routes

## Serving a Folder
To serve images, CSS files, and JavaScript files, use the \`express.static\` built-in middleware function.

\`\`\`javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
\`\`\`

If you have a file at \`public/css/style.css\`, users can access it at \`http://localhost:3000/css/style.css\`.

## Adding a Virtual Prefix
You can specify a mount path for the static directory:

\`\`\`javascript
app.use('/static', express.static(path.join(__dirname, 'public')));
\`\`\`

Now the file is accessed at \`http://localhost:3000/static/css/style.css\`.

## Serving index.html
By default, if a user visits the root URL (\`/\`), Express will automatically serve \`public/index.html\` if it exists.

## Combining Static and API
A common pattern is serving a frontend and an API from the same server:

\`\`\`javascript
// 1. Serve static frontend files
app.use(express.static('public'));

// 2. API routes
app.get('/api/courses', (req, res) => {
  res.json({ courses: [] });
});

// 3. Catch-all for SPA (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
\`\`\`

## Key Takeaways
- \`express.static()\` is the fastest way to serve files
- The folder path is relative to where the script runs
- Use \`path.join()\` to prevent path traversal security issues`
    }
  ]
};