module.exports = {
  title: "Module 3: Add a Database",
  description: "Connect to MongoDB and store real data.",
  order: 3,
  lessons: [
    {
      title: "Set Up MongoDB Atlas",
      slug: "setup-mongodb-atlas",
      order: 1,
      estimatedMinutes: 30,
      content: `# Set Up MongoDB Atlas

**Learning objectives:**
- Create a free MongoDB Atlas cluster
- Get a connection string
- Store it securely in \`.env\`

## Step 1: Create an Account

1. Go to **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (Google sign-in is fastest)
3. Create an Organization: **"My Projects"**
4. Create a Project: **"my-first-website"**

## Step 2: Create a Free Cluster

1. Click **Build a Database**
2. Choose **M0 FREE**
3. Provider: AWS (recommended)
4. Region: closest to you
5. Cluster Name: **Cluster0** (default)
6. Click **Create**

Wait 15–30 seconds while it provisions.

## Step 3: Create a Database User

The setup wizard appears. Fill in:
- **Username:** \`myapp_user\`
- **Password:** Click **Autogenerate** and **COPY IT NOW**
- **Permissions:** Read and write to any database

Click **Create User**. **Store that password somewhere safe — you can't see it again.**

## Step 4: Add IP Address

1. Choose **Add My Current IP Address**
2. Click **Finish and Close**

If you're deploying to Render later, you'll add \`0.0.0.0/0\` — but for now, your IP is enough.

## Step 5: Get the Connection String

1. Click **Connect** on your cluster
2. Choose **Drivers**
3. Copy the connection string:
\`\`\`
mongodb+srv://myapp_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
\`\`\`

4. **Replace \`<password>\`** with your actual password
5. **Add the database name** before the \`?\`:
\`\`\`
mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/my-first-website?retryWrites=true&w=majority
\`\`\`

## Step 6: Store It Securely

**Install dotenv** in your project:

\`\`\`powershell
npm install dotenv
\`\`\`

Create a file called **\`.env\`** in your project root:

\`\`\`
PORT=3000
MONGODB_URI=mongodb+srv://myapp_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/my-first-website?retryWrites=true&w=majority
\`\`\`

Create **\`.env.example\`** (safe to commit, no real secrets):

\`\`\`
PORT=3000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/my-first-website?retryWrites=true&w=majority
\`\`\`

Create **\`.gitignore\`**:

\`\`\`
node_modules/
.env
\`\`\`

**Never commit \`.env\`.** If you do, anyone can access your database.

## Common Errors and Fixes

### ❌ "MongoDB connection failed: bad auth"
**Cause:** Wrong password in the connection string.
**Fix:** Regenerate the password in Atlas → Database Access → Edit User → Edit Password.

### ❌ "connection timed out"
**Cause:** Your IP isn't whitelisted.
**Fix:** Atlas → Network Access → Add IP Address → Add Current IP.

### ❌ "getaddrinfo ENOTFOUND cluster0.xxxxx.mongodb.net"
**Cause:** Typo in the hostname.
**Fix:** Copy the connection string again from Atlas → Connect → Drivers.

### ❌ Password shows literally as \`<password>\`
**Cause:** You forgot to replace the placeholder.
**Fix:** Replace \`<password>\` with your real password.

### ❌ Password has special characters and connection fails
**Cause:** Special chars (\`@\`, \`:\`, \`/\`) need URL encoding.
**Fix:** Regenerate the password using only letters and numbers.

## Key Takeaways
- Atlas free tier is M0 — always free, no credit card
- The URI must include the database name before \`?\`
- Store secrets in \`.env\`, never in code
- \`.env\` in \`.gitignore\` — always`
    },
    {
      title: "Connect Mongoose to MongoDB",
      slug: "connect-mongoose",
      order: 2,
      estimatedMinutes: 30,
      content: `# Connect Mongoose to MongoDB

**Learning objectives:**
- Install Mongoose
- Write a reusable database connector
- Verify the connection on startup

## Step 1: Install Mongoose

\`\`\`powershell
npm install mongoose
\`\`\`

## Step 2: Create a database connector

Create **\`src/config/database.js\`** (create the \`src\` and \`config\` folders):

\`\`\`javascript
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log(\`✅ MongoDB connected: \${mongoose.connection.name}\`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
\`\`\`

**Why this design:**
- **One connection** for the whole app (Mongoose reuses it)
- **Fails loudly** — if the DB is unreachable, we exit
- **Readable log** — tells you which database you're connected to

## Step 3: Update server.js

Replace \`server.js\` with:

\`\`\`javascript
require("dotenv").config(); // load .env FIRST

const path = require("path");
const express = require("express");
const connectDB = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB, then start
async function start() {
  await connectDB();

  // Middleware
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  // Routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get("/api/health", (req, res) => {
    const dbState =
      require("mongoose").connection.readyState === 1 ? "connected" : "disconnected";
    res.json({ success: true, database: dbState });
  });

  app.listen(PORT, () => {
    console.log(\`✅ Server running on http://localhost:\${PORT}\`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start:", err);
  process.exit(1);
});
\`\`\`

## Step 4: Test

\`\`\`powershell
npm run dev
\`\`\`

**Expected output:**
\`\`\`
✅ MongoDB connected: my-first-website
✅ Server running on http://localhost:3000
\`\`\`

Visit **http://localhost:3000/api/health**:
\`\`\`json
{ "success": true, "database": "connected" }
\`\`\`

## Why dotenv must load first

\`\`\`javascript
require("dotenv").config(); // MUST be first
const express = require("express"); // then everything else
\`\`\`

When Node loads \`database.js\`, it reads \`process.env.MONGODB_URI\`. If \`.env\` hasn't loaded yet, that value is \`undefined\`. **\`.env\` must be loaded before anything that reads env vars.**

## Common Errors and Fixes

### ❌ "Cannot find module './src/config/database'"
**Cause:** Wrong file path.
**Fix:** Ensure the file is at \`src/config/database.js\` (relative to \`server.js\`).

### ❌ "MONGODB_URI is not set"
**Cause:** \`.env\` isn't loaded, or the variable name is wrong.
**Fix:** Verify \`require("dotenv").config()\` is at the top of \`server.js\`. Check for typos in \`.env\`.

### ❌ "MongooseServerSelectionError: connection timed out"
**Cause:** IP not whitelisted in Atlas.
**Fix:** Atlas → Network Access → Add IP Address → your current IP.

### ❌ connected to "test" database instead of yours
**Cause:** Missing database name in the URI.
**Fix:** Add \`/my-first-website\` before the \`?\` in \`.env\`.

## Key Takeaways
- One \`connectDB()\` for the whole app
- \`dotenv\` must be the first line of \`server.js\`
- The URI must include the database name
- \`readyState === 1\` means "connected"`
    }
  ]
};