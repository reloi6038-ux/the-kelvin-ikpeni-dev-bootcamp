module.exports = {
  title: "Module 4: Node.js & Express Backend",
  description: "Building the server and connecting to MongoDB.",
  order: 4,
  lessons: [
    {
      title: "Initializing the Backend Project and Installing Dependencies",
      slug: "init-backend",
      order: 22,
      estimatedMinutes: 20,
      content: `# Initializing the Backend Project and Installing Dependencies

**Learning objectives:**
- Set up Express and MongoDB.

## Install Packages
\`\`\`bash
npm install express mongoose dotenv cors helmet express-rate-limit
npm install --save-dev nodemon
\`\`\``
    },
    {
      title: "Creating an Express.js Server",
      slug: "express-server",
      order: 23,
      estimatedMinutes: 25,
      content: `# Creating an Express.js Server

**Learning objectives:**
- Write the main server file.

## Create src/server.js

\`\`\`javascript
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\``
    },
    {
      title: "Serving Frontend HTML, CSS, and JavaScript from Express",
      slug: "serve-static",
      order: 24,
      estimatedMinutes: 20,
      content: `# Serving Frontend HTML, CSS, and JavaScript from Express

**Learning objectives:**
- Serve the \`public\` folder.

## Update src/server.js

\`\`\`javascript
// Add this before app.listen
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
\`\`\``
    },
    {
      title: "Creating a Contact Form API Endpoint",
      slug: "contact-api",
      order: 25,
      estimatedMinutes: 30,
      content: `# Creating a Contact Form API Endpoint

**Learning objectives:**
- Handle POST requests.

## Create src/routes/contactRoutes.js

\`\`\`javascript
const express = require("express");
const router = express.Router();
const { handleContact } = require("../controllers/contactController");

router.post("/", handleContact);

module.exports = router;
\`\`\`

## Update src/server.js
\`\`\`javascript
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);
\`\`\``
    },
    {
      title: "Connecting Express.js to MongoDB Atlas with Mongoose",
      slug: "connect-mongodb",
      order: 26,
      estimatedMinutes: 25,
      content: `# Connecting Express.js to MongoDB Atlas with Mongoose

**Learning objectives:**
- Create the database connection.

## Create src/config/db.js

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
\`\`\``
    },
    {
      title: "Creating a Contact Message Database Model",
      slug: "contact-model",
      order: 27,
      estimatedMinutes: 20,
      content: `# Creating a Contact Message Database Model

**Learning objectives:**
- Define the schema.

## Create src/models/Contact.js

\`\`\`javascript
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
\`\`\``
    },
    {
      title: "Implementing Server-Side Contact Form Validation and Saving",
      slug: "backend-validation",
      order: 28,
      estimatedMinutes: 30,
      content: `# Implementing Server-Side Contact Form Validation and Saving

**Learning objectives:**
- Validate on the server and save to MongoDB.

## Create src/controllers/contactController.js

\`\`\`javascript
const Contact = require("../models/Contact");

exports.handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (message.length < 10) {
      return res.status(400).json({ success: false, message: "Message too short" });
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message sent!", data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
\`\`\``
    },
    {
      title: "Preventing Spam, Securing the Endpoint, and Error Handling",
      slug: "security-errors",
      order: 29,
      estimatedMinutes: 30,
      content: `# Preventing Spam, Securing the Endpoint, and Error Handling

**Learning objectives:**
- Add rate limiting and global error handling.

## Update src/server.js

\`\`\`javascript
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 requests per 15 mins
});
app.use("/api", limiter);

// After all routes:
app.use(notFound);
app.use(errorHandler);
\`\`\`

## Create src/middleware/errorHandler.js
\`\`\`javascript
const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500).json({ message: err.message });
};
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
};
module.exports = { errorHandler, notFound };
\`\`\``
    }
  ]
};