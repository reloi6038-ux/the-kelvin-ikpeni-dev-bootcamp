module.exports = {
  title: "Module 4: Advanced Routing & MVC",
  description: "Organizing code for scale with routers and controllers.",
  order: 4,
  lessons: [
    {
      title: "Organizing Routes into Separate Files",
      slug: "organizing-routes",
      order: 1,
      estimatedMinutes: 35,
      content: `# Organizing Routes into Separate Files

**Learning objectives:**
- Use \`express.Router()\` to modularize routes
- Mount routers in the main app
- Keep \`app.js\` clean and readable

## The Problem
Putting every route in \`server.js\` becomes a nightmare as the app grows. You end up with a 1,000-line file.

## The Solution: \`express.Router\`
A router is a mini-Express application. It has its own routes and middleware, and can be mounted onto the main app.

### Step 1: Create the Router File
Create \`routes/courses.js\`:

\`\`\`javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "All courses" });
});

router.get('/:id', (req, res) => {
  res.json({ message: \`Course \${req.params.id}\` });
});

module.exports = router;
\`\`\`

### Step 2: Mount the Router
In \`server.js\`:

\`\`\`javascript
const express = require('express');
const app = express();
const courseRoutes = require('./routes/courses');

// Mount the router at /api/courses
app.use('/api/courses', courseRoutes);

app.listen(3000);
\`\`\`

## The Resulting URLs
- \`GET /\` in the router becomes \`GET /api/courses\`
- \`GET /:id\` in the router becomes \`GET /api/courses/:id\`

## Key Takeaways
- \`express.Router()\` isolates route logic
- \`app.use()\` mounts the router at a base path
- Route paths inside the router are relative to that base path`
    },
    {
      title: "Controllers and the MVC Architecture",
      slug: "controllers-mvc",
      order: 2,
      estimatedMinutes: 40,
      content: `# Controllers and the MVC Architecture

**Learning objectives:**
- Separate business logic from routing
- Create controller files
- Apply the Model-View-Controller pattern

## What is MVC?
MVC separates an application into three main components:
- **Model**: Data and business logic (database).
- **View**: The UI (in an API, this is the JSON response).
- **Controller**: Handles incoming requests, orchestrates the Model, and returns the View.

## The Problem with Routes Doing Everything
\`\`\`javascript
router.post('/login', async (req, res) => {
  // 1. Validate input
  if (!req.body.email) return res.status(400).send('Email required');
  
  // 2. Query database
  const user = await User.findOne({ email: req.body.email });
  
  // 3. Check password
  const valid = await bcrypt.compare(req.body.password, user.passwordHash);
  
  // 4. Create session
  req.session.userId = user._id;
  
  // 5. Send response
  res.json({ success: true });
});
\`\`\`
This logic belongs in a controller, not a route file.

## Building a Controller
Create \`controllers/authController.js\`:

\`\`\`javascript
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const valid = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    
    req.session.userId = user._id;
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
\`\`\`

## Using the Controller in the Route
\`\`\`javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;
\`\`\`

## Key Takeaways
- Routes map URLs to controllers.
- Controllers contain the business logic.
- Models handle data access.
- This separation makes testing and debugging much easier.`
    },
    {
      title: "Centralized Error Handling",
      slug: "centralized-error-handling",
      order: 3,
      estimatedMinutes: 35,
      content: `# Centralized Error Handling

**Learning objectives:**
- Catch errors across the entire app in one place
- Create an error-handling middleware
- Handle async errors gracefully

## The Error-Handling Middleware
Express has a special type of middleware specifically for errors. It takes **four** arguments instead of three:

\`\`\`javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});
\`\`\`

**Important:** This must be the **last** \`app.use()\` defined in your app.

## Triggering the Error Handler
Call \`next(err)\` to pass an error to the centralized handler:

\`\`\`javascript
app.get('/api/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error); // Forward to error handler
    }
    res.json(user);
  } catch (err) {
    next(err); // Forward to error handler
  }
});
\`\`\`

## Customizing the Response
You can inspect the error object to set the status code:

\`\`\`javascript
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  // Don't leak stack traces in production
  const details = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  
  res.status(status).json({ error: message, details });
});
\`\`\`

## Key Takeaways
- Centralizing errors prevents duplicate \`try/catch\` blocks
- 4-argument middleware is for errors only
- Never expose raw stack traces in production`
    }
  ]
};