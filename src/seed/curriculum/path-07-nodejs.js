// Path 7: Node.js
module.exports = {
  course: {
    title: "Node.js",
    slug: "nodejs",
    description:
      "Server-side JavaScript, modules, asynchronous programming, and the built-in libraries that power the backend.",
    level: "intermediate",
    estimatedHours: 14,
    icon: "nodejs",
    order: 7,
    isPublished: true,
  },
  modules: [
    {
      title: "Node.js Foundations",
      description: "The runtime, the module system, and asynchronous JavaScript.",
      order: 1,
      lessons: [
        {
          title: "What Is Node.js?",
          slug: "what-is-nodejs",
          order: 1,
          estimatedMinutes: 25,
          content: `# What Is Node.js?

**Learning objectives:**
- Understand what Node.js is and why it exists
- Explain the V8 engine and the Event Loop
- Run your first Node.js script

## What is Node.js?
Node.js is a **JavaScript runtime built on Chrome's V8 engine**. It allows you to run JavaScript outside the browser — on a server, in a terminal, or on a Raspberry Pi.

## Why Node.js?
Before 2009, JavaScript only ran in browsers. Backend developers used PHP, Ruby, Python, or Java. Node.js unified the stack: you could now write **both** the frontend and backend in the same language.

## The V8 Engine
V8 is the JavaScript compiler inside Chrome. It converts JavaScript into machine code at blazing speed. Node takes V8 out of the browser and wraps it with extra APIs (file system, networking, OS access).

## The Event Loop
Node.js uses a **single-threaded event loop**. Instead of spawning a new thread for every request (like PHP or Ruby), it handles thousands of concurrent connections with one thread, using non-blocking I/O.

\`\`\`
Request A arrives → starts reading a file (async)
Request B arrives → returns data (fast)
Request A's file finishes → callback fires
\`\`\`

This is why Node is perfect for I/O-heavy applications like web servers and APIs.

## Your First Script
Create a file called \`hello.js\`:
\`\`\`javascript
console.log("Hello from Node!");
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
\`\`\`

Run it:
\`\`\`bash
node hello.js
\`\`\`

## The \`process\` Object
The \`process\` object is globally available and represents the current Node process.
- \`process.env\` — environment variables (this is how we read \`MONGODB_URI\`)
- \`process.argv\` — command-line arguments
- \`process.exit(1)\` — exit with error code
- \`process.cwd()\` — current working directory

## Key Takeaways
- Node.js runs JavaScript on the server
- Built on Chrome's V8 engine
- Single-threaded with non-blocking I/O
- \`process.env\` is how we read secrets from \`.env\``,
        },
        {
          title: "The Module System",
          slug: "module-system",
          order: 2,
          estimatedMinutes: 30,
          content: `# The Module System

**Learning objectives:**
- Use \`require()\` to load built-in and local modules
- Use \`module.exports\` to export functionality
- Understand the difference between CommonJS and ES Modules

## CommonJS (What We Use)
Our platform uses CommonJS. Every file is a module.

**Exporting:**
\`\`\`javascript
// utils.js
function greet(name) {
  return \`Hello, \${name}!\`;
}
module.exports = { greet };
\`\`\`

**Importing:**
\`\`\`javascript
// app.js
const { greet } = require("./utils");
console.log(greet("Alice"));
\`\`\`

## The Node Built-in Modules
Node ships with dozens of modules you can use without installing anything:
\`\`\`javascript
const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
\`\`\`

**\`path\`** is used constantly. Never concatenate file paths with \`+\`:
\`\`\`javascript
// ❌ breaks on Windows
const p = __dirname + "/" + "public" + "/" + "index.html";

// ✅ correct on every OS
const p = path.join(__dirname, "public", "index.html");
\`\`\`

## Third-Party Modules
Anything installed via npm is also a module:
\`\`\`javascript
const express = require("express");
const mongoose = require("mongoose");
\`\`\`

## ES Modules (Modern, but not what we use)
\`\`\`javascript
import { greet } from "./utils.js";
export function greet(name) { ... }
\`\`\`
ES modules use \`import\`/\`export\`. They're the future, but CommonJS is still the default in Node.

## \`__dirname\` and \`__filename\`
These are automatic in every CommonJS module:
- \`__filename\` — full path to the current file
- \`__dirname\` — full path to the folder containing it

## Key Takeaways
- Every file is a module in Node
- \`module.exports\` = how you share code
- \`require\` = how you load it
- \`path.join()\` is safer than string concatenation for file paths`,
        },
        {
          title: "Async, Await & the Event Loop",
          slug: "async-await-promises",
          order: 3,
          estimatedMinutes: 35,
          content: `# Async, Await & the Event Loop

**Learning objectives:**
- Explain Promises and how they differ from callbacks
- Write clean async code with \`async/await\`
- Handle errors properly in async code

## The Problem: Blocking Code
If Node is single-threaded, how does it handle 10,000 requests at once?

**Answer:** it doesn't *wait*. When a request triggers a slow operation (database, file, network), Node pauses that specific task, handles other requests, and comes back when the slow operation finishes.

## Callbacks (Old Way)
\`\`\`javascript
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
\`\`\`
Works, but leads to "callback hell" (nested pyramids).

## Promises (Better)
A **Promise** is an object representing a future value.
\`\`\`javascript
const promise = fetch("https://api.example.com/data");
promise
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
\`\`\`

## async/await (Modern)
\`\`\`javascript
async function loadData() {
  try {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Failed:", err.message);
  }
}
\`\`\`

**How it works:**
- \`async\` marks the function as returning a Promise
- \`await\` pauses execution until the Promise resolves
- Errors are caught with regular \`try/catch\`

## Running Multiple Async Operations
\`\`\`javascript
// Sequential (slow — one after another)
const user = await getUser(id);
const posts = await getPosts(user.id);
const comments = await getComments(posts[0].id);

// Parallel (fast — all at once)
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id),
]);
\`\`\`

**Rule:** if operations are independent, run them in parallel with \`Promise.all\`.

## Common Mistakes
\`\`\`javascript
// ❌ Missing await
const res = fetch("/api/data"); // Returns a Promise, not data
console.log(res.json()); // TypeError

// ✅ With await
const res = await fetch("/api/data");
const data = await res.json();

// ❌ Missing try/catch
async function bad() {
  const data = await fetchSomethingThatFails(); // crash if not caught
}

// ✅ Wrapped
async function good() {
  try {
    const data = await fetchSomethingThatFails();
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Key Takeaways
- Promises represent future values
- \`async/await\` makes async code look synchronous
- \`Promise.all\` runs independent operations in parallel
- Always wrap \`await\` calls in \`try/catch\``,
        },
      ],
    },
  ],
};