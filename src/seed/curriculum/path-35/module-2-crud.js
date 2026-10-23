module.exports = {
  title: "Module 2: CRUD & Security",
  description: "Building the core functionality of the API.",
  order: 2,
  lessons: [
    {
      title: "Creating the To-Do Task Model",
      slug: "task-model",
      order: 11,
      estimatedMinutes: 25,
      content: `# Creating the To-Do Task Model

**Learning objectives:**
- Define a Mongoose schema
- Add validation

## Step 1: Create the model
Create a file named \`Todo.js\` inside \`src/models/\`.

**src/models/Todo.js**
\`\`\`javascript
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A task must have a title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
\`\`\`

## Explanation
- **title**: Required, trimmed, and limited to 100 characters.
- **completed**: Defaults to false.
- **timestamps**: Automatically adds \`createdAt\` and \`updatedAt\`.`
    },
    {
      title: "Implementing the CREATE Endpoint",
      slug: "create-endpoint",
      order: 12,
      estimatedMinutes: 20,
      content: `# Implementing the CREATE Endpoint

**Learning objectives:**
- Create a POST route
- Save data to MongoDB

## Step 1: Create the route
Update \`src/server.js\` to include the POST route.

**src/server.js**
\`\`\`javascript
// ... previous imports
const Todo = require("./models/Todo");

app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Todo.create({ title });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
\`\`\`

## Step 2: Test with Postman
- Method: **POST**
- URL: \`http://localhost:3000/api/tasks\`
- Body (JSON):
\`\`\`json
{ "title": "Learn Node.js" }
\`\`\`
- Expected Status: **201 Created**`
    },
    {
      title: "Implementing the READ Endpoints",
      slug: "read-endpoints",
      order: 13,
      estimatedMinutes: 25,
      content: `# Implementing the READ Endpoints

**Learning objectives:**
- Create GET routes for all tasks and a single task.

## Step 1: Get all tasks
**src/server.js**
\`\`\`javascript
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
\`\`\`

## Step 2: Get a single task
\`\`\`javascript
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid Task ID" });
  }
});
\`\`\``
    },
    {
      title: "Implementing the UPDATE Endpoint",
      slug: "update-endpoint",
      order: 14,
      estimatedMinutes: 20,
      content: `# Implementing the UPDATE Endpoint

**Learning objectives:**
- Update a task using PUT or PATCH.

## Step 1: Update a task
**src/server.js**
\`\`\`javascript
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
\`\`\`

## Explanation
- \`{ new: true }\`: Returns the updated document, not the original.
- \`{ runValidators: true }\`: Ensures Mongoose checks the schema rules (e.g., title length).`
    },
    {
      title: "Implementing the DELETE Endpoint",
      slug: "delete-endpoint",
      order: 15,
      estimatedMinutes: 15,
      content: `# Implementing the DELETE Endpoint

**Learning objectives:**
- Remove a task from the database.

## Step 1: Delete a task
**src/server.js**
\`\`\`javascript
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Todo.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
\`\`\``
    },
    {
      title: "Implementing Input Validation",
      slug: "input-validation",
      order: 16,
      estimatedMinutes: 20,
      content: `# Implementing Input Validation

**Learning objectives:**
- Prevent bad data from entering the database.

## Why Validate?
Even if you validate on the frontend, a user can bypass it and send bad data directly to your API.

## Manual Validation
We already added a check in the POST route:
\`\`\`javascript
if (!title) {
  return res.status(400).json({ success: false, message: "Title is required" });
}
\`\`\`

## Mongoose Validation
If you try to save an empty title, Mongoose will throw an error because of \`required: true\` in the schema. Our \`catch\` block catches that and returns a 400 Bad Request.`
    },
    {
      title: "Adding Centralized Error-Handling Middleware",
      slug: "error-handling",
      order: 17,
      estimatedMinutes: 20,
      content: `# Adding Centralized Error-Handling Middleware

**Learning objectives:**
- Stop repeating try/catch in every route.

## Step 1: Create the middleware
Create a file named \`errorHandler.js\` inside \`src/middleware/\`.

**src/middleware/errorHandler.js**
\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(\`Route not found: \${req.originalUrl}\`));
};

module.exports = { errorHandler, notFound };
\`\`\`

## Step 2: Use them in server.js
Add these lines **after all routes** in \`src/server.js\`:
\`\`\`javascript
const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(notFound);
app.use(errorHandler);
\`\`\``
    },
    {
      title: "Adding Filtering by Completed and Pending Tasks",
      slug: "filtering",
      order: 18,
      estimatedMinutes: 20,
      content: `# Adding Filtering by Completed and Pending Tasks

**Learning objectives:**
- Filter tasks based on query parameters.

## Update the GET route
Modify the \`GET /api/tasks\` route in \`src/server.js\` to check for a query parameter.

\`\`\`javascript
app.get("/api/tasks", async (req, res) => {
  try {
    let query = {};
    if (req.query.completed) {
      query.completed = req.query.completed === "true";
    }
    
    const tasks = await Todo.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
\`\`\`

## Test
- \`GET /api/tasks?completed=true\` returns only completed tasks.
- \`GET /api/tasks?completed=false\` returns only pending tasks.`
    },
    {
      title: "Implementing Search, Sorting, and Pagination",
      slug: "search-sort-pagination",
      order: 19,
      estimatedMinutes: 30,
      content: `# Implementing Search, Sorting, and Pagination

**Learning objectives:**
- Handle large datasets professionally.

## Update the GET route
\`\`\`javascript
app.get("/api/tasks", async (req, res) => {
  try {
    let query = {};

    // Filtering
    if (req.query.completed) {
      query.completed = req.query.completed === "true";
    }

    // Search
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // Sorting
    const sortBy = req.query.sort || "-createdAt";
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Todo.find(query).sort(sortBy).skip(skip).limit(limit);
    const total = await Todo.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination: { page, limit, total },
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
\`\`\``
    },
    {
      title: "Testing Every Endpoint Using Postman",
      slug: "testing-postman",
      order: 20,
      estimatedMinutes: 20,
      content: `# Testing Every Endpoint Using Postman

**Learning objectives:**
- Verify the API works before deploying.

## Test Checklist
1. **Create**: POST \`/api/tasks\` with \`{"title": "Test Task"}\` → 201
2. **Read All**: GET \`/api/tasks\` → 200 with an array of tasks.
3. **Read One**: GET \`/api/tasks/<id>\` → 200 with the task.
4. **Update**: PUT \`/api/tasks/<id>\` with \`{"completed": true}\` → 200
5. **Delete**: DELETE \`/api/tasks/<id>\` → 200
6. **404 Check**: GET \`/api/tasks/invalidId\` → 404 or 400.
7. **Validation**: POST \`/api/tasks\` with \`{}\` → 400 Bad Request.`
    },
    {
      title: "Understanding Asynchronous JavaScript in the Project",
      slug: "async-javascript",
      order: 21,
      estimatedMinutes: 25,
      content: `# Understanding Asynchronous JavaScript in the Project

**Learning objectives:**
- Understand \`async/await\` and Promises.

## Why Async?
Node.js is single-threaded. When it queries the database, it can't block the entire server waiting for the result. It uses asynchronous Promises.

## The Async/Await Pattern
\`\`\`javascript
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
\`\`\`
- \`async\` marks the function as returning a Promise.
- \`await\` pauses the function until \`Todo.find()\` resolves.
- \`try/catch\` catches errors if the database fails.`
    },
    {
      title: "Refactoring into Routes, Controllers, and Models",
      slug: "refactoring",
      order: 22,
      estimatedMinutes: 35,
      content: `# Refactoring into Routes, Controllers, and Models

**Learning objectives:**
- Separate concerns.

## Step 1: Create the Controller
**src/controllers/todoController.js**
\`\`\`javascript
const Todo = require("../models/Todo");

exports.getTasks = async (req, res) => {
  const tasks = await Todo.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Todo.create(req.body);
  res.status(201).json(task);
};
// ... (move other route logic here)
\`\`\`

## Step 2: Create the Routes
**src/routes/todoRoutes.js**
\`\`\`javascript
const express = require("express");
const { getTasks, createTask } = require("../controllers/todoController");
const router = express.Router();

router.route("/").get(getTasks).post(createTask);

module.exports = router;
\`\`\`

## Step 3: Mount Routes in server.js
\`\`\`javascript
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/tasks", todoRoutes);
\`\`\``
    },
    {
      title: "Adding Basic API Security",
      slug: "api-security",
      order: 23,
      estimatedMinutes: 25,
      content: `# Adding Basic API Security

**Learning objectives:**
- Use Helmet, CORS, and Rate Limiting.

## Step 1: Install
\`\`\`bash
npm install express-rate-limit
\`\`\`

## Step 2: Update server.js
\`\`\`javascript
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Security headers
app.use(helmet());

// Allow cross-origin requests
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later."
});
app.use(limiter);
\`\`\``
    }
  ]
};