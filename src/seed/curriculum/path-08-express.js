// Path 8: Express.js & REST APIs
module.exports = {
  course: {
    title: "Express.js & REST APIs",
    slug: "express-apis",
    description:
      "Build professional APIs with routes, middleware, controllers, and error handling.",
    level: "intermediate",
    estimatedHours: 18,
    icon: "express",
    order: 8,
    isPublished: true,
  },
  modules: [
    {
      title: "Express Fundamentals",
      description: "Routes, middleware, and the request-response cycle.",
      order: 1,
      lessons: [
        {
          title: "Your First Express Server",
          slug: "first-express-server",
          order: 1,
          estimatedMinutes: 25,
          content: `# Your First Express Server

**Learning objectives:**
- Set up a minimal Express app
- Understand request and response objects
- Return JSON from a route

## What is Express?
Express is a **minimal, unopinionated web framework** for Node.js. It handles the boring plumbing (routing, HTTP parsing, middleware chaining) so you can focus on your app's logic.

## Setup
\`\`\`bash
npm init -y
npm install express
\`\`\`

## Hello World
\`\`\`javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
\`\`\`

## Anatomy of a Route
\`\`\`javascript
app.get("/path", (req, res) => {
  // req — the incoming request
  // res — the outgoing response
});
\`\`\`

### The \`req\` Object
- \`req.params\` — URL parameters (\`/users/:id\` → \`req.params.id\`)
- \`req.query\` — query string (\`?page=2\` → \`req.query.page\`)
- \`req.body\` — parsed request body (requires \`express.json()\`)
- \`req.headers\` — HTTP headers
- \`req.ip\` — client IP address
- \`req.session\` — session data (requires \`express-session\`)

### The \`res\` Object
- \`res.json(obj)\` — send JSON response
- \`res.send(text)\` — send plain text
- \`res.status(404)\` — set status code
- \`res.sendFile(path)\` — send an HTML file
- \`res.redirect("/login")\` — redirect
- \`res.set(header, value)\` — set a response header

## Returning JSON
Every API endpoint returns JSON:
\`\`\`javascript
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});
\`\`\`

**This is what your platform's \`/api/health\` endpoint does.**

## Key Takeaways
- Express = minimal HTTP framework
- \`req\` = incoming data, \`res\` = outgoing data
- Return JSON for APIs, files for pages
- \`app.listen()\` starts the server`,
        },
        {
          title: "Routing and Route Parameters",
          slug: "routing-parameters",
          order: 2,
          estimatedMinutes: 30,
          content: `# Routing and Route Parameters

**Learning objectives:**
- Organize routes with \`express.Router()\`
- Use route parameters and query strings
- Order routes correctly to avoid conflicts

## Basic Routing
\`\`\`javascript
app.get("/", ...);              // root
app.get("/courses", ...);       // list
app.get("/courses/:slug", ...); // one course
app.post("/enrollments", ...);  // create
app.delete("/enrollments/:id", ...);
\`\`\`

## Route Parameters
Segments starting with \`:\` are **dynamic**:
\`\`\`javascript
app.get("/courses/:slug", (req, res) => {
  const slug = req.params.slug; // "html5" if URL is /courses/html5
  // fetch course from database
  res.json({ slug });
});
\`\`\`

You can have multiple params: \`/courses/:course/lessons/:lesson\` → \`req.params.course\` and \`req.params.lesson\`.

## Query Strings
Anything after \`?\` in the URL is a query parameter:
\`\`\`javascript
// URL: /courses?level=beginner&page=2
app.get("/courses", (req, res) => {
  const level = req.query.level; // "beginner"
  const page = req.query.page;   // "2" (string, cast to number if needed)
});
\`\`\`

## The \`express.Router()\` Pattern
Instead of dumping everything in \`app.js\`, split routes into files:
\`\`\`javascript
// src/routes/courses.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ courses: [] }));
router.get("/:slug", (req, res) => res.json({ slug: req.params.slug }));

module.exports = router;
\`\`\`

Then mount it in \`app.js\`:
\`\`\`javascript
app.use("/api/courses", require("./routes/courses"));
\`\`\`

URLs become \`/api/courses\` and \`/api/courses/:slug\`.

## Route Ordering Matters
Express matches routes **in the order they're defined**.

\`\`\`javascript
// ❌ Wrong order — /:slug will match /new
router.get("/:slug", ...);   // matches /new
router.get("/new", ...);     // never reached

// ✅ Correct order — specific before generic
router.get("/new", ...);     // matches /new
router.get("/:slug", ...);   // matches anything else
\`\`\`

**Rule:** always define specific routes before parameterized ones.

## Key Takeaways
- \`:param\` = URL segment from \`req.params\`
- \`?key=value\` = query string from \`req.query\`
- \`express.Router()\` splits routes into files
- Define specific routes before generic ones`,
        },
      ],
    },
    {
      title: "Middleware & Errors",
      description: "The Express power tool.",
      order: 2,
      lessons: [
        {
          title: "Middleware Fundamentals",
          slug: "middleware",
          order: 1,
          estimatedMinutes: 30,
          content: `# Middleware Fundamentals

**Learning objectives:**
- Understand what middleware is
- Chain multiple middleware functions
- Build your own middleware

## What is Middleware?
Middleware is a function that runs **between** the incoming request and the route handler. It has access to \`req\`, \`res\`, and \`next\`.

\`\`\`javascript
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // pass control to the next middleware
}
\`\`\`

**Without \`next()\`, the request hangs forever.**

## How Middleware is Applied
\`\`\`javascript
// Global — runs on every request
app.use(logger);

// Path-specific — only for /api/*
app.use("/api", logger);

// Route-specific
router.get("/admin", requireAdmin, adminHandler);
\`\`\`

## The Middleware Order
Middleware runs in the order it's registered.
\`\`\`javascript
app.use(helmet());            // 1. security headers
app.use(morgan("dev"));       // 2. logging
app.use(express.json());      // 3. parse JSON
app.use(session(...));        // 4. sessions
app.use("/api", apiLimiter);  // 5. rate limit
app.use("/api", verifyCsrf);  // 6. CSRF
app.use("/api/courses", ...); // 7. actual route
\`\`\`

Order is critical. \`express.json()\` must run before any handler that reads \`req.body\`. Session must run before auth middleware.

## Building Your Own
\`\`\`javascript
function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  next();
}

router.get("/dashboard", requireAuth, (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});
\`\`\`

## Common Built-in Middleware
| Function | Purpose |
|----------|---------|
| \`express.json()\` | Parse JSON bodies |
| \`express.urlencoded()\` | Parse form bodies |
| \`express.static()\` | Serve files from a folder |

## Common Third-Party Middleware
- **helmet** — security headers
- **morgan** — HTTP logging
- **cookie-parser** — parse cookies
- **express-session** — sessions
- **express-rate-limit** — rate limiting

## Key Takeaways
- Middleware = function (\`req, res, next\`)
- Must call \`next()\` or the request hangs
- Order matters — set up parsers before handlers
- Custom middleware is where auth and validation live`,
        },
        {
          title: "Error Handling",
          slug: "error-handling",
          order: 2,
          estimatedMinutes: 25,
          content: `# Error Handling

**Learning objectives:**
- Route errors to a single handler
- Wrap async handlers so errors are caught
- Never leak stack traces to users

## The Error Handler
Express has a dedicated error handler — a middleware with **exactly 4 parameters**:
\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});
\`\`\`

The 4th parameter (\`next\`) is what tells Express this is an error handler. Remove it and Express treats it as normal middleware.

## Triggering the Error Handler
Anywhere in your code:
\`\`\`javascript
next(new Error("Something broke"));
\`\`\`

Or with a custom status:
\`\`\`javascript
const err = new Error("Course not found");
err.statusCode = 404;
return next(err);
\`\`\`

## The Async Trap
Regular try/catch works with sync code. But this **silently hangs**:
\`\`\`javascript
// ❌ HANGS — Express never calls the error handler
router.get("/async-fail", async (req, res) => {
  throw new Error("Boom");
});
\`\`\`

**Fix: wrap async handlers.**
\`\`\`javascript
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get("/async-fail", asyncHandler(async (req, res) => {
  throw new Error("Boom");
}));
\`\`\`

This is exactly what our platform's \`asyncHandler\` does in \`src/middleware/errorHandler.js\`.

## Never Leak Stack Traces in Production
\`\`\`javascript
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res.status(err.statusCode || 500).json({
    success: false,
    message: isProd && !err.statusCode ? "Internal server error" : err.message,
    ...(isProd ? {} : { stack: err.stack }), // only show in dev
  });
});
\`\`\`

## Key Takeaways
- Error handlers = 4 params
- \`next(err)\` jumps to the error handler
- Async routes need \`asyncHandler\` wrapping
- Never expose stack traces in production`,
        },
      ],
    },
  ],
};