module.exports = {
  title: "Module 1: Setup & Basics",
  description: "Learn the fundamentals and get your server running.",
  order: 1,
  lessons: [
    {
      title: "Understanding the Project Requirements",
      slug: "understanding-requirements",
      order: 1,
      estimatedMinutes: 20,
      content: `# Understanding the Project Requirements

**Learning objectives:**
- Understand what a REST API is
- Learn how a To-Do app works under the hood
- See how the frontend and backend communicate

## What is a REST API?
REST (Representational State Transfer) is an architectural style for building web services. In a REST API, the server exposes "resources" (like tasks) that the client can interact with using standard HTTP methods (GET, POST, PUT, DELETE).

## The Architecture
1. **Client** (e.g., React app, mobile app, or Postman) sends an HTTP request to the API.
2. **API** (Node.js + Express) receives the request, processes the logic.
3. **Database** (MongoDB) stores and retrieves the data.
4. **API** sends a JSON response back to the client.

## Why Node.js and MongoDB?
- **Node.js**: Fast, asynchronous, uses JavaScript (the same language as the frontend).
- **MongoDB**: Flexible document database. Perfect for storing tasks as JSON objects.

## Project Objectives
By the end of this course, you will have built a fully functional API that can:
- Create a task (\`POST /api/tasks\`)
- Read all tasks (\`GET /api/tasks\`)
- Read a single task (\`GET /api/tasks/:id\`)
- Update a task (\`PUT /api/tasks/:id\`)
- Delete a task (\`DELETE /api/tasks/:id\`)
- Deploy it live to the internet using Render.`
    },
    {
      title: "Installing Node.js, npm, and VS Code",
      slug: "installing-tools",
      order: 2,
      estimatedMinutes: 15,
      content: `# Installing Node.js, npm, and VS Code

**Learning objectives:**
- Set up your developer environment.

## Step 1: Install Node.js
1. Go to nodejs.org.
2. Download the **LTS** (Long Term Support) version.
3. Run the installer. Accept all defaults. Make sure "Add to PATH" is checked.

## Step 2: Install VS Code
1. Go to code.visualstudio.com.
2. Download and install. Check "Add to PATH".

## Step 3: Verify
Open your terminal (PowerShell) and run:
\`\`\`bash
node --version
npm --version
\`\`\`
If you see version numbers, you're ready!

## Common Errors
**"node is not recognized"**: You need to restart your computer or reinstall Node.js with the PATH option checked.`
    },
    {
      title: "Creating the Project Folder and Initializing npm",
      slug: "init-project",
      order: 3,
      estimatedMinutes: 15,
      content: `# Creating the Project Folder and Initializing npm

**Learning objectives:**
- Create your project directory
- Generate \`package.json\`

## Step 1: Create the folder
Open your terminal and run:
\`\`\`bash
mkdir todo-api
cd todo-api
\`\`\`

## Step 2: Open in VS Code
\`\`\`bash
code .
\`\`\`

## Step 3: Initialize npm
In the VS Code terminal, run:
\`\`\`bash
npm init -y
\`\`\`
This creates a \`package.json\` file in your root folder.

## Verification
You should see \`package.json\` in the VS Code file explorer.`
    },
    {
      title: "Understanding package.json, Dependencies, and Scripts",
      slug: "understanding-package-json",
      order: 4,
      estimatedMinutes: 20,
      content: `# Understanding package.json, Dependencies, and Scripts

**Learning objectives:**
- Understand the structure of \`package.json\`.

## What is package.json?
It is the identity card of your Node.js project. It tells npm what dependencies to install and what scripts to run.

Open \`package.json\` and update it to look like this:

\`\`\`json
{
  "name": "todo-api",
  "version": "1.0.0",
  "description": "A REST API for a To-Do app",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
\`\`\`

## Explanation
- \`"main"\`: The entry point of the app.
- \`"scripts"\`: Commands you can run with \`npm run <name>\`. 
  - \`start\` runs the production server.
  - \`dev\` runs the server with auto-restart (nodemon).`
    },
    {
      title: "Installing Express.js, Mongoose, and Essential Packages",
      slug: "installing-dependencies",
      order: 5,
      estimatedMinutes: 15,
      content: `# Installing Express.js, Mongoose, and Essential Packages

**Learning objectives:**
- Install the packages needed to build the API.

## Step 1: Install Production Dependencies
\`\`\`bash
npm install express mongoose dotenv cors helmet
\`\`\`

## Step 2: Install Dev Dependencies
\`\`\`bash
npm install --save-dev nodemon
\`\`\`

## What do they do?
- **express**: Web framework for Node.js.
- **mongoose**: ODM for MongoDB.
- **dotenv**: Loads environment variables from a \`.env\` file.
- **cors**: Allows your frontend to communicate with your API.
- **helmet**: Adds security headers.
- **nodemon**: Restarts the server automatically when you save files.`
    },
    {
      title: "Creating the Initial Express Server",
      slug: "initial-server",
      order: 6,
      estimatedMinutes: 20,
      content: `# Creating the Initial Express Server

**Learning objectives:**
- Write a basic Express server.
- Test it locally.

## Step 1: Create the server file
Create a folder named \`src\` and inside it, create a file named \`server.js\`.

**src/server.js**
\`\`\`javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Todo API" });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
\`\`\`

## Step 2: Run the server
\`\`\`bash
npm run dev
\`\`\`

## Step 3: Test it
Open your browser and go to \`http://localhost:3000\`. You should see:
\`\`\`json
{ "message": "Welcome to the Todo API" }
\`\`\`

## Common Mistakes
- **Port in use**: If you get an \`EADDRINUSE\` error, change \`PORT\` to \`3001\`.
- **Cannot find module**: Run \`npm install\` again.`
    },
    {
      title: "Understanding HTTP Methods, Status Codes, Routes",
      slug: "http-methods-routes",
      order: 7,
      estimatedMinutes: 25,
      content: `# Understanding HTTP Methods, Status Codes, Routes

**Learning objectives:**
- Master HTTP verbs
- Use the correct status codes

## Methods
- **GET**: Read data (e.g., get all tasks).
- **POST**: Create data (e.g., add a task).
- **PUT**: Update data (e.g., edit a task).
- **DELETE**: Remove data (e.g., delete a task).

## Routes
Routes are the URLs that trigger the methods.
\`\`\`javascript
app.get("/api/tasks", ...)      // GET request to /api/tasks
app.post("/api/tasks", ...)     // POST request to /api/tasks
\`\`\`

## Status Codes
- **200 OK**: Successful GET, PUT, DELETE.
- **201 Created**: Successful POST.
- **400 Bad Request**: Client sent invalid data.
- **404 Not Found**: The task does not exist.
- **500 Internal Server Error**: The server crashed.`
    },
    {
      title: "Creating a Clean Project Folder Structure",
      slug: "project-structure",
      order: 8,
      estimatedMinutes: 15,
      content: `# Creating a Clean Project Folder Structure

**Learning objectives:**
- Organize your files for scalability.

## The Structure
Create these folders inside \`src\`:
- \`config/\`
- \`controllers/\`
- \`middleware/\`
- \`models/\`
- \`routes/\`

Your folder tree should look like this:
\`\`\`text
todo-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
└── .env
\`\`\`

## Why?
- **config**: Database connection.
- **controllers**: The logic for each route.
- **middleware**: Error handling, security.
- **models**: Mongoose schemas.
- **routes**: URL definitions.`
    },
    {
      title: "Connecting the Application to MongoDB Atlas",
      slug: "connect-mongodb",
      order: 9,
      estimatedMinutes: 30,
      content: `# Connecting the Application to MongoDB Atlas

**Learning objectives:**
- Create a free database cluster
- Connect it to Node.js

## Step 1: Setup MongoDB Atlas
1. Go to mongodb.com/atlas and sign up.
2. Create a free M0 cluster.
3. Create a database user (save the password).
4. Whitelist your current IP address.
5. Click **Connect** → **Drivers** and copy the connection string.

## Step 2: Configure the Connection
Create a file named \`db.js\` inside \`src/config/\`.

**src/config/db.js**
\`\`\`javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

## Step 3: Update server.js
\`\`\`javascript
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Common Errors
**"MongooseServerSelectionError"**: Your IP is not whitelisted in MongoDB Atlas. Go to Network Access and allow your current IP.`
    },
    {
      title: "Configuring Environment Variables Securely",
      slug: "environment-variables",
      order: 10,
      estimatedMinutes: 15,
      content: `# Configuring Environment Variables Securely

**Learning objectives:**
- Hide database credentials.

## Step 1: Create .env
Create a file named \`.env\` in the root folder.

**.env**
\`\`\`env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todo-db?retryWrites=true&w=majority
\`\`\`
Replace \`<username>\` and \`<password>\` with your actual MongoDB Atlas credentials. Add the database name \`/todo-db\` before the \`?\`.

## Step 2: Create .env.example
Create a file named \`.env.example\` in the root folder. This is safe to commit to GitHub.
\`\`\`env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
\`\`\`

## Step 3: Update .gitignore
Create a file named \`.gitignore\` in the root folder to prevent leaking secrets.
\`\`\`text
node_modules/
.env
\`\`\`

## Key Rule
**Never commit your \`.env\` file to GitHub.** If you do, anyone can access your database.`
    }
  ]
};