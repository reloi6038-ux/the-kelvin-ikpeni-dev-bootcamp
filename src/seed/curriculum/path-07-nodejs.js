module.exports = {
  course: {
    title: "Node.js",
    slug: "nodejs",
    description: "Server-side JavaScript, modules, and asynchronous programming.",
    level: "intermediate",
    estimatedHours: 10,
    icon: "nodejs",
    order: 7,
    isPublished: true,
  },
  modules: [
    {
      title: "Node.js Foundations",
      description: "The runtime and its module system.",
      order: 1,
      lessons: [
        {
          title: "What Is Node.js?",
          slug: "what-is-nodejs",
          order: 1,
          estimatedMinutes: 20,
          content: `# What Is Node.js?

Node.js is a **JavaScript runtime** that runs on the server.

## Why it matters
You already know JavaScript from the browser. Node lets you use the **same language** to write backend code. No context switching.

## How it works
- Node is built on **V8** (Chrome's JavaScript engine)
- It adds APIs for files, networks, and processes that browsers don't have
- Your \`server.js\` is Node.js code running on your machine

## The module system
\`\`\`js
const fs = require("fs");             // built-in
const express = require("express");   // npm-installed
const { createApp } = require("./src/app"); // local file
\`\`\`

\`require()\` is how every Node file loads dependencies.`,
        },
        {
          title: "Async, Await & Promises",
          slug: "async-await-promises",
          order: 2,
          estimatedMinutes: 25,
          content: `# Async, Await & Promises

Node.js is **asynchronous** — I/O operations don't block other requests.

## Promises
A Promise represents a future value:
\`\`\`js
fetch("/api/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
\`\`\`

## async/await (modern, preferred)
\`\`\`js
async function loadData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Why async matters at scale
Without async, one slow database query would block every other request. With async, Node handles thousands of concurrent requests on modest hardware — this is why Node powers production APIs at Netflix, PayPal, and Walmart.`,
        },
      ],
    },
  ],
};