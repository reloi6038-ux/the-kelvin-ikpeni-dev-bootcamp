module.exports = {
  title: "Module 1: Web Fundamentals & Setup",
  description: "Understanding the internet and setting up your environment.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Backend Development",
      slug: "intro-backend",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Backend Development

**Learning objectives:**
- Understand what the "backend" actually is
- Differentiate between frontend and backend
- Explore the core responsibilities of a backend developer

## What is the Backend?
When you visit a website, you interact with two distinct parts: the frontend (what you see) and the backend (what happens behind the scenes). 

The **backend** is the server-side of an application. It's responsible for:
- **Data storage**: Saving user accounts, posts, and preferences in databases.
- **Business logic**: Deciding what happens when a user clicks "Buy Now."
- **Security**: Verifying passwords, preventing unauthorized access.
- **Communication**: Sending data back to the frontend in a usable format (usually JSON).

## The Restaurant Analogy
- The **Frontend** is the dining area: the menu, the tables, the decor. It's what the customer sees.
- The **Backend** is the kitchen: the ingredients, the recipes, the chefs. The customer doesn't see it, but it's where the real work happens.
- The **API** is the waiter: taking the order from the frontend to the backend, and bringing the food back.

## The Backend Tech Stack
In this bootcamp, we use the **MERN-like stack**:
- **Node.js**: The runtime environment (lets us run JavaScript on the server).
- **Express.js**: The framework (makes building the server easier).
- **MongoDB**: The database (stores our data).

## Key Takeaways
- The backend handles data, logic, and security.
- It talks to the frontend via an API.
- Backend developers don't just write code; they architect systems.`
    },
    {
      title: "How the Web Works: Clients, Servers, and HTTP",
      slug: "how-web-works",
      order: 2,
      estimatedMinutes: 30,
      content: `# How the Web Works: Clients, Servers, and HTTP

**Learning objectives:**
- Trace a full HTTP request/response cycle
- Understand HTTP methods and status codes
- Explain what DNS and HTTPS do

## The Request-Response Cycle
Every action on the web follows a strict pattern:
1. **Client**: Your browser (or mobile app) sends a request.
2. **DNS**: The browser translates the domain name (\`example.com\`) into an IP address (\`192.168.1.1\`).
3. **Server**: The computer at that IP receives the request.
4. **Processing**: The server checks the database, performs logic, and prepares a response.
5. **Response**: The server sends data back to the client.
6. **Render**: The client displays the result.

## HTTP (HyperText Transfer Protocol)
HTTP is the language clients and servers speak.

### Methods (Verbs)
- **GET**: "Give me data." (Loading a webpage, fetching a list).
- **POST**: "Here is new data." (Signing up, making a post).
- **PUT/PATCH**: "Update this data."
- **DELETE**: "Remove this data."

### Status Codes
Servers reply with 3-digit codes:
- **200 OK**: Everything worked.
- **201 Created**: A new resource was successfully made.
- **400 Bad Request**: The client sent bad data.
- **401 Unauthorized**: The client isn't logged in.
- **404 Not Found**: The resource doesn't exist.
- **500 Server Error**: The server crashed.

## Security: HTTPS
HTTPS is HTTP + Encryption (TLS/SSL). Without HTTPS, anyone on the same Wi-Fi could read the passwords you send to a website. All modern backends must use HTTPS.

## Key Takeaways
- Every web interaction is a Request and a Response.
- HTTP Methods define the action, Status Codes define the result.
- HTTPS is non-negotiable for security.`
    },
    {
      title: "Introduction to JavaScript for Backend",
      slug: "intro-js-backend",
      order: 3,
      estimatedMinutes: 30,
      content: `# Introduction to JavaScript for Backend

**Learning objectives:**
- Understand why JavaScript is used on the backend
- Review the JavaScript concepts most used in backend development
- Compare JavaScript to other backend languages

## Why JavaScript?
Before Node.js, JavaScript only ran in the browser. Backend developers had to use PHP, Ruby, Python, or Java. This meant learning two languages: one for the frontend, one for the backend.

**Node.js changed everything.** Now, you can use one language (JavaScript) for the entire stack. You already know it from the browser, so you can start building servers immediately.

## Key Concepts for the Backend
You don't need to be a JavaScript wizard to start the backend, but you must master these:

### 1. Objects
Almost all data in the backend is an object.
\`\`\`javascript
const user = { id: 1, name: "Alice", role: "admin" };
\`\`\`

### 2. Arrays
Lists of data (like a list of courses).
\`\`\`javascript
const courses = ["HTML", "CSS", "JavaScript"];
\`\`\`

### 3. JSON
The format used to send data between the server and the client.
\`\`\`json
{ "success": true, "data": [1, 2, 3] }
\`\`\`

### 4. Async/Await
The backend constantly waits for things: database queries, file reads, API calls. Async/Await lets us handle this gracefully.

## The JavaScript Engine
Node.js uses Chrome's **V8 engine** to run JavaScript. It's incredibly fast and highly optimized.

## Key Takeaways
- JavaScript is the language of both the browser and Node.js.
- Objects and arrays hold your data.
- Backend code is heavily asynchronous.`
    },
    {
      title: "Installing Node.js, npm, and VS Code",
      slug: "installing-tools",
      order: 4,
      estimatedMinutes: 20,
      content: `# Installing Node.js, npm, and VS Code

**Learning objectives:**
- Install the required tools
- Verify installations via the terminal
- Understand the role of each tool

## 1. Node.js
Node.js is the runtime environment that executes JavaScript on your computer (outside the browser).

**How to install:**
1. Go to **nodejs.org**
2. Download the **LTS** (Long Term Support) version.
3. Run the installer and accept all defaults (make sure "Add to PATH" is checked).

## 2. npm (Node Package Manager)
npm comes automatically with Node.js. It's the tool used to install libraries (like Express) and manage your project.

## 3. VS Code (Visual Studio Code)
The code editor we will use.
1. Go to **code.visualstudio.com**
2. Download and install.

**Recommended Extensions:**
- **Prettier**: Auto-formats your code.
- **ESLint**: Catches errors before you run them.

## Verification
Open a terminal (PowerShell on Windows) and run:
\`\`\`bash
node --version
npm --version
code --version
\`\`\`

If you see version numbers, you're ready to build!

## Common Errors
- **"node is not recognized"**: You didn't check "Add to PATH" during install, or you need to restart your computer.
- **"npm not found"**: Reinstall Node.js (npm comes with it).

## Key Takeaways
- Node runs JavaScript, npm manages packages, VS Code is where you write code.
- Always install the LTS version of Node.
- Verify tools using \`--version\` in the terminal.`
    }
  ]
};