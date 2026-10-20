// Path 8: Express.js & REST APIs
module.exports = {
  course: {
    title: "Express.js & REST APIs",
    slug: "express-apis",
    description:
      "Routes, middleware, controllers, and building professional REST APIs.",
    level: "intermediate",
    estimatedHours: 16,
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

## Minimal Server
\`\`\`javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000);
\`\`\`

## The Handler Signature
\`\`\`javascript
app.get("/path", (req, res) => {
  // req — incoming request
  // res — outgoing response
});
\`\`\`

## Common Response Methods
- \`res.json({ success: true })\` — send JSON
- \`res.send("text")\` — send plain text
- \`res.status(404)\` — set status code
- \`res.redirect("/login")\` — redirect`,
        },
        {
          title: "Middleware & Error Handling",
          slug: "middleware-errors",
          order: 2,
          estimatedMinutes: 25,
          content: `# Middleware & Error Handling

**Middleware** is code that runs on every request (or specific paths).

## Basic Middleware
\`\`\`javascript
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});
\`\`\`

Without \`next()\`, the request hangs.

## Common Middleware
- **Helmet** — security headers
- **Morgan** — logging
- **express.json()** — parse JSON bodies
- **express-session** — sessions

## Error Handler (4 params)
\`\`\`javascript
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});
\`\`\`

Express identifies error handlers by **arity** — exactly 4 parameters.`,
        },
      ],
    },
  ],
};