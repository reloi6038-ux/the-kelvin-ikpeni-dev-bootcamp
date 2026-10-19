require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");

const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");

async function seed() {
  await connectDB();

  console.log("🧹 Clearing existing courses, modules, lessons...");
  await Course.deleteMany({});
  await Module.deleteMany({});
  await Lesson.deleteMany({});

  // ============================================================
  // PATH 1 — Computer & Internet Fundamentals (beginner)
  // ============================================================
  const path1 = await Course.create({
    title: "Computer & Internet Fundamentals",
    slug: "computer-fundamentals",
    description:
      "Understand how computers, browsers, servers, HTTP, DNS, and databases work together before writing your first line of code.",
    level: "beginner",
    estimatedHours: 4,
    icon: "fundamentals",
    order: 1,
    isPublished: true,
  });

  const path1Mod1 = await Module.create({
    courseId: path1._id,
    title: "How the Web Works",
    description: "Clients, servers, HTTP, and the request-response cycle.",
    order: 1,
  });

  const path1Mod2 = await Module.create({
    courseId: path1._id,
    title: "Computers, Files & the Terminal",
    description: "Files, folders, paths, and your first commands.",
    order: 2,
  });

  await Lesson.create([
    {
      moduleId: path1Mod1._id,
      courseId: path1._id,
      title: "What Is a Client and a Server?",
      slug: "clients-and-servers",
      order: 1,
      estimatedMinutes: 15,
      content: `# Clients and Servers

A **client** is the program that requests information — your browser is a client.

A **server** is the program that responds with information — the machine hosting a website.

When you type \`https://example.com\` into your browser:

1. Your browser (client) sends an HTTP request.
2. A web server receives it.
3. The server sends back an HTTP response containing the page.
4. Your browser renders it.

Every website you have ever visited is a conversation between a client and a server.`,
    },
    {
      moduleId: path1Mod1._id,
      courseId: path1._id,
      title: "HTTP, HTTPS & DNS",
      slug: "http-https-dns",
      order: 2,
      estimatedMinutes: 20,
      content: `# HTTP, HTTPS & DNS

## HTTP
The protocol browsers and servers use to communicate. It defines:
- **Methods**: GET (fetch), POST (create), PUT (update), DELETE (remove)
- **Status codes**: 200 (OK), 404 (Not Found), 500 (Server Error)

## HTTPS
HTTP + encryption (TLS). Data is scrambled in transit so passwords and personal information cannot be read by attackers on the network.

## DNS
The Domain Name System translates human-readable names (\`example.com\`) into IP addresses.`,
    },
    {
      moduleId: path1Mod2._id,
      courseId: path1._id,
      title: "Files, Folders & Paths",
      slug: "files-folders-paths",
      order: 1,
      estimatedMinutes: 15,
      content: `# Files, Folders & Paths

A **file** stores data. A **folder** (directory) groups files.

A **path** describes where a file lives:
- **Absolute path**: \`C:\\\\dev\\\\my-project\\\\server.js\`
- **Relative path**: \`./src/app.js\`

In your project, \`server.js\` uses relative paths like \`"./src/app"\` to import other files.`,
    },
    {
      moduleId: path1Mod2._id,
      courseId: path1._id,
      title: "Your First Terminal Commands",
      slug: "first-terminal-commands",
      order: 2,
      estimatedMinutes: 20,
      content: `# Your First Terminal Commands

The terminal lets you control your computer with text.

| Command | What it does |
|---------|--------------|
| \`pwd\` | Print the current folder |
| \`ls\` | List files in this folder |
| \`cd folder\` | Enter a folder |
| \`cd ..\` | Go up one folder |
| \`mkdir name\` | Create a folder |
| \`node file.js\` | Run a JavaScript file |`,
    },
  ]);

  // ============================================================
  // PATH 3 — HTML5 Mastery (beginner)
  // ============================================================
  const path3 = await Course.create({
    title: "HTML5 Mastery",
    slug: "html5",
    description:
      "Learn semantic markup, forms, accessibility, and SEO — the structure of every web page.",
    level: "beginner",
    estimatedHours: 12,
    icon: "html5",
    order: 2,
    isPublished: true,
  });

  const path3Mod1 = await Module.create({
    courseId: path3._id,
    title: "HTML Fundamentals",
    description: "Document structure, elements, and semantic markup.",
    order: 1,
  });

  await Lesson.create([
    {
      moduleId: path3Mod1._id,
      courseId: path3._id,
      title: "Your First HTML Page",
      slug: "first-html-page",
      order: 1,
      estimatedMinutes: 15,
      content: `# Your First HTML Page

Every HTML document starts with the same structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>
\`\`\``,
      exercise: {
        enabled: true,
        starterHtml:
          "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <!-- Write your heading below -->\n  \n</body>\n</html>",
        instructions:
          "Add an `<h1>` element with the text `Hello, HTML!` inside the body.",
        expectedOutput: "<h1>Hello, HTML!</h1>",
      },
    },
    {
      moduleId: path3Mod1._id,
      courseId: path3._id,
      title: "Semantic Elements",
      slug: "semantic-elements",
      order: 2,
      estimatedMinutes: 20,
      content: `# Semantic Elements

Semantic elements describe their meaning to both the browser and developers.

Instead of:
\`\`\`html
<div id="header">...</div>
<div id="nav">...</div>
\`\`\`

Write:
\`\`\`html
<header>...</header>
<nav>...</nav>
\`\`\`

Common semantic elements:
- \`<header>\` — introductory content
- \`<nav>\` — navigation links
- \`<main>\` — primary content
- \`<article>\` — standalone content
- \`<footer>\` — closing content`,
    },
  ]);

  // ============================================================
  // PATH 8 — Node.js & Express.js (intermediate)
  // ============================================================
  const path8 = await Course.create({
    title: "Node.js & Express.js",
    slug: "node-express",
    description:
      "Master server-side JavaScript, REST APIs, middleware, and error handling — the engine of every modern full-stack app.",
    level: "intermediate",
    estimatedHours: 20,
    icon: "nodejs",
    order: 3,
    isPublished: true,
  });

  const path8Mod1 = await Module.create({
    courseId: path8._id,
    title: "Node.js Foundations",
    description: "Server-side JavaScript, the module system, and asynchronous code.",
    order: 1,
  });

  const path8Mod2 = await Module.create({
    courseId: path8._id,
    title: "Express.js & REST APIs",
    description: "Routes, middleware, controllers, and JSON responses.",
    order: 2,
  });

  await Lesson.create([
    {
      moduleId: path8Mod1._id,
      courseId: path8._id,
      title: "What Is Node.js?",
      slug: "what-is-nodejs",
      order: 1,
      estimatedMinutes: 20,
      content: `# What Is Node.js?

Node.js is a **JavaScript runtime** that lets you run JavaScript outside the browser — on a server.

## Why it matters
You already know JavaScript from the browser. Node lets you use the *same language* to build the backend. No context switching between languages.

## The module system
Node uses \`require()\` to load modules:

\`\`\`js
const fs = require("fs");
const path = require("path");
const express = require("express"); // npm-installed
\`\`\`

Your \`server.js\` does exactly this — it's Node.js code running on your machine.`,
    },
    {
      moduleId: path8Mod1._id,
      courseId: path8._id,
      title: "Async / Await & Promises",
      slug: "async-await-promises",
      order: 2,
      estimatedMinutes: 25,
      content: `# Async / Await & Promises

Node.js is **asynchronous**. Reading a file or querying a database doesn't block other requests.

A **Promise** represents a future value:

\`\`\`js
fetch("/api/courses")
  .then((res) => res.json())
  .then((data) => console.log(data));
\`\`\`

**async / await** makes promises look synchronous:

\`\`\`js
async function loadCourses() {
  const res = await fetch("/api/courses");
  const data = await res.json();
  return data;
}
\`\`\`

Every API call in this bootcamp uses \`async/await\` — including your \`src/routes/courses.js\`.`,
    },
    {
      moduleId: path8Mod2._id,
      courseId: path8._id,
      title: "Your First Express Route",
      slug: "first-express-route",
      order: 1,
      estimatedMinutes: 20,
      content: `# Your First Express Route

Express maps URLs to functions called **controllers**:

\`\`\`js
router.get("/", async (req, res) => {
  const courses = await Course.find({ isPublished: true });
  res.json({ success: true, courses });
});
\`\`\`

- \`router.get\` — respond to HTTP GET
- \`"/"\` — the path (relative to the router's mount point)
- \`async (req, res)\` — the handler: \`req\` holds the incoming request, \`res\` sends the response
- \`res.json(...)\` — send JSON back to the client

This is exactly the pattern used by \`src/routes/courses.js\`.`,
    },
  ]);

  // ============================================================
  // PATH 15 — Advanced Full-Stack Engineering (advanced)
  // ============================================================
  const path15 = await Course.create({
    title: "Advanced Full-Stack Engineering",
    slug: "advanced-fullstack",
    description:
      "Production-grade architecture, security hardening, performance tuning, and scalability for real-world applications.",
    level: "advanced",
    estimatedHours: 30,
    icon: "advanced",
    order: 4,
    isPublished: true,
  });

  const path15Mod1 = await Module.create({
    courseId: path15._id,
    title: "Security, Performance & Production Readiness",
    description: "What separates a prototype from a production system.",
    order: 1,
  });

  await Lesson.create([
    {
      moduleId: path15Mod1._id,
      courseId: path15._id,
      title: "Web Security Deep Dive",
      slug: "web-security-deep-dive",
      order: 1,
      estimatedMinutes: 30,
      content: `# Web Security Deep Dive

Real applications defend against:

- **XSS (Cross-Site Scripting)** — user-controlled HTML injection
- **CSRF (Cross-Site Request Forgery)** — unauthorized state changes
- **SQL / NoSQL injection** — malicious query operators
- **Session hijacking** — stolen cookies
- **Brute-force attacks** — repeated login attempts

## Principles
1. **Never trust the client.** Validate on the server, always.
2. **Hash passwords** with bcrypt (never store plaintext).
3. **Set security headers** with Helmet.
4. **Rate-limit** expensive endpoints.
5. **Use HTTP-only, SameSite cookies** for sessions.

Every one of these is implemented in this bootcamp's authentication layer (Phase 5).`,
    },
    {
      moduleId: path15Mod1._id,
      courseId: path15._id,
      title: "Performance & Scaling",
      slug: "performance-scaling",
      order: 2,
      estimatedMinutes: 25,
      content: `# Performance & Scaling

## Database indexes
Queries without indexes scan every document. Every indexed field turns an **O(n)** scan into an **O(log n)** lookup. This bootcamp indexes:
- \`User.email\` (unique)
- \`Course.slug\` (unique)
- \`Course.isPublished + order\` (compound)
- \`Enrollment.studentId + courseId\` (unique)

## Caching
Store frequently-read data in Redis or memory. Invalidate on write.

## Pagination
Never return 10,000 records at once. Use \`.skip(n).limit(20)\`.

## Horizontal scaling
Run multiple Node processes behind a load balancer. Keep sessions in MongoDB (already done) so any process can verify any request.

These are the practices that distinguish a portfolio project from a production system.`,
    },
  ]);

  // ---- Summary ----
  console.log("✅ Seed complete:");
  console.log(`   Courses : ${await Course.countDocuments()}`);
  console.log(`   Modules : ${await Module.countDocuments()}`);
  console.log(`   Lessons : ${await Lesson.countDocuments()}`);
  console.log("   By level:");

  for (const level of ["beginner", "intermediate", "advanced"]) {
    const n = await Course.countDocuments({ level });
    console.log(`     ${level.padEnd(12)}: ${n}`);
  }

  await mongoose.disconnect();
  console.log("🔌 Disconnected.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});