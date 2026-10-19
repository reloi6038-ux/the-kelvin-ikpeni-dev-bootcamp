// Path 1: Computer & Internet Fundamentals
module.exports = {
  course: {
    title: "Computer & Internet Fundamentals",
    slug: "computer-fundamentals",
    description:
      "Understand how computers, browsers, servers, HTTP, DNS, and databases work together before writing your first line of code.",
    level: "beginner",
    estimatedHours: 4,
    icon: "fundamentals",
    order: 1,
    isPublished: true,
  },
  modules: [
    {
      title: "How the Web Works",
      description: "Clients, servers, HTTP, and the request-response cycle.",
      order: 1,
      lessons: [
        {
          title: "What Is a Client and a Server?",
          slug: "clients-and-servers",
          order: 1,
          estimatedMinutes: 15,
          content: `# Clients and Servers

A **client** is a program that requests information. Your browser (Chrome, Firefox) is a client.

A **server** is a program that responds with information. It runs on a computer somewhere on the internet.

## The request-response cycle
When you type \`https://example.com\`:

1. Your browser (client) sends an HTTP request.
2. A web server receives it.
3. The server sends back an HTTP response.
4. Your browser renders the response.

Every website you visit is a conversation between a client and a server.

## Key idea
You are building **both sides** in this bootcamp:
- The **frontend** (HTML, CSS, JS) runs in the client's browser.
- The **backend** (Node.js, Express, MongoDB) runs on the server.`,
        },
        {
          title: "HTTP, HTTPS & DNS",
          slug: "http-https-dns",
          order: 2,
          estimatedMinutes: 20,
          content: `# HTTP, HTTPS & DNS

## HTTP
The protocol browsers and servers use to communicate.

- **Methods**: GET (fetch), POST (create), PUT (update), DELETE (remove)
- **Status codes**: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

## HTTPS
HTTP + TLS encryption. Data is scrambled in transit, so passwords and personal information cannot be read by attackers on the network.

**Always use HTTPS in production.**

## DNS
The Domain Name System translates human-readable names (\`example.com\`) into IP addresses (\`93.184.216.34\`). Think of it as the internet's phone book.`,
        },
      ],
    },
    {
      title: "Computers, Files & the Terminal",
      description: "Files, folders, paths, and your first commands.",
      order: 2,
      lessons: [
        {
          title: "Files, Folders & Paths",
          slug: "files-folders-paths",
          order: 1,
          estimatedMinutes: 15,
          content: `# Files, Folders & Paths

A **file** stores data. A **folder** (directory) groups files.

A **path** describes where a file lives:

- **Absolute path**: \`C:\\\\dev\\\\my-project\\\\server.js\` — starts from the root of the disk
- **Relative path**: \`./src/app.js\` — starts from your current location

## Why this matters
Every \`require("./something")\` in Node is a relative path. Understanding paths is the #1 skill that prevents \`MODULE_NOT_FOUND\` errors.`,
        },
        {
          title: "Your First Terminal Commands",
          slug: "first-terminal-commands",
          order: 2,
          estimatedMinutes: 20,
          content: `# Your First Terminal Commands

The terminal lets you control your computer with text.

## Essential Windows PowerShell commands

| Command | What it does |
|---------|--------------|
| \`pwd\` | Print the current folder |
| \`ls\` | List files in this folder |
| \`cd folder\` | Enter a folder |
| \`cd ..\` | Go up one folder |
| \`mkdir name\` | Create a folder |
| \`node file.js\` | Run a JavaScript file |

## Practice
1. Open PowerShell
2. \`cd C:\\\` (go to root)
3. \`mkdir practice\` (create a folder)
4. \`cd practice\` (enter it)
5. \`pwd\` (confirm you're inside)

You've just used four commands used by professional developers every day.`,
        },
      ],
    },
  ],
};