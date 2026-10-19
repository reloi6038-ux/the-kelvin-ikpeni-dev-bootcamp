module.exports = {
  course: {
    title: "Express.js & REST APIs",
    slug: "express-apis",
    description: "Routes, middleware, controllers, and building professional REST APIs.",
    level: "intermediate",
    estimatedHours: 14,
    icon: "express",
    order: 8,
    isPublished: true,
  },
  modules: [
    {
      title: "Express Fundamentals",
      description: "Routes, middleware, and error handling.",
      order: 1,
      lessons: [
        {
          title: "Your First Express Route",
          slug: "first-express-route",
          order: 1,
          estimatedMinutes: 20,
          content: `# Your First Express Route

Express maps URLs to **handler functions**.

## Minimal server
\`\`\`js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000);
\`\`\`

## The handler signature
\`\`\`js
app.get("/path", (req, res) => {
  // req — incoming request (params, body, headers, session)
  // res — outgoing response (json, send, status, sendFile)
});
\`\`\`

## Common response methods
- \`res.json({ success: true })\` — send JSON
- \`res.send("text")\` — send plain text
- \`res.status(404)\` — set status code
- \`res.sendFile(path)\` — send an HTML file
- \`res.redirect("/login")\` — redirect

## The pattern
\`\`\`js
router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json({ success: true, courses });
});
\`\`\`

This is exactly the pattern used throughout this bootcamp.`,
        },
        {
          title: "Middleware & Error Handling",
          slug: "middleware-errors",
          order: 2,
          estimatedMinutes: 25,
          content: `# Middleware & Error Handling

**Middleware** is code that runs on every request (or every request to a specific path).

## Basic middleware
\`\`\`js
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // pass to the next middleware
});
\`\`\`

Without \`next()\`, the request **hangs** — nothing responds.

## Common middleware
- **Helmet** — sets security headers
- **Morgan** — logs requests
- **express.json()** — parses JSON bodies
- **express-session** — session management
- **Custom** — rate limiting, auth, CSRF

## The error handler (4 parameters)
\`\`\`js
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});
\`\`\`

Express identifies error handlers by **arity** — exactly 4 parameters. Anywhere in your code, \`next(err)\` jumps directly here.`,
        },
      ],
    },
  ],
};