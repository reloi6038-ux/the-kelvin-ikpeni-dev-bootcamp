module.exports = {
  title: "Module 4: Create an API",
  description: "Build a model and endpoints to save and read data.",
  order: 4,
  lessons: [
    {
      title: "Create Your First Model",
      slug: "first-model",
      order: 1,
      estimatedMinutes: 30,
      content: `# Create Your First Model

**Learning objectives:**
- Define a Mongoose schema
- Create a model
- Insert and read documents

## Step 1: Create the model file

Create **\`src/models/Post.js\`** (create the \`models\` folder):

\`\`\`javascript
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
\`\`\`

**What each piece does:**
- \`title\`, \`content\` — required fields
- \`author\` — optional, defaults to "Anonymous"
- \`{ timestamps: true }\` — auto-adds \`createdAt\` / \`updatedAt\`
- \`mongoose.model("Post", ...)\` — creates the \`posts\` collection

## Step 2: Add an API endpoint to create a post

Update \`server.js\` — add this route **before** \`app.listen\`:

\`\`\`javascript
const Post = require("./src/models/Post");

// Create a post
app.post("/api/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// List all posts
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, posts });
});
\`\`\`

## Step 3: Test with PowerShell

The server is running on port 3000. Open **a second terminal** and run:

\`\`\`powershell
$body = '{"title":"My First Post","content":"Hello world!","author":"Kelvin"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -Body $body -ContentType "application/json"
\`\`\`

**Expected response:**
\`\`\`json
{
  "success": true,
  "post": {
    "_id": "6713a...",
    "title": "My First Post",
    "content": "Hello world!",
    "author": "Kelvin",
    "createdAt": "2026-01-15T10:30:00Z",
    "updatedAt": "2026-01-15T10:30:00Z"
  }
}
\`\`\`

## Step 4: Read the posts back

Visit: **http://localhost:3000/api/posts**

**Expected:**
\`\`\`json
{ "success": true, "posts": [ { ... } ] }
\`\`\`

You can also see the post in **MongoDB Atlas** → Browse Collections → \`my-first-website\` → \`posts\`.

## Understanding CRUD

\`\`\`javascript
Post.create(data);      // CREATE
Post.find();            // READ all
Post.findById(id);      // READ one
Post.findByIdAndUpdate(id, data); // UPDATE
Post.findByIdAndDelete(id);       // DELETE
\`\`\`

## Common Errors and Fixes

### ❌ "Post validation failed: title: Path \`title\` is required"
**Cause:** You forgot to send \`title\` in the body.
**Fix:** Include \`"title": "..."\` in your JSON.

### ❌ req.body is empty \`{}\`
**Cause:** \`express.json()\` middleware not loaded.
**Fix:** Ensure \`app.use(express.json())\` is called **before** your routes.

### ❌ "Cannot find module './src/models/Post'"
**Cause:** Wrong path.
**Fix:** Verify file is at \`src/models/Post.js\`.

### ❌ Duplicate error: "E11000 duplicate key"
**Cause:** A unique field already exists.
**Fix:** Not an issue here since \`title\` isn't unique. For unique fields, handle this error explicitly.

## Key Takeaways
- Schema defines the shape of data
- \`mongoose.model()\` creates a queryable collection
- \`timestamps: true\` adds date fields automatically
- \`.lean()\` for read-only queries (faster)`
    }
  ]
};