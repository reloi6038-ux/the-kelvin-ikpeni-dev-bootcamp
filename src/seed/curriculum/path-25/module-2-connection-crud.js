module.exports = {
  title: "Module 2: Connection & CRUD",
  description: "Connecting from Node.js and performing operations.",
  order: 2,
  lessons: [
    {
      title: "Connecting Node.js to MongoDB",
      slug: "connecting-nodejs-mongodb",
      order: 1,
      estimatedMinutes: 30,
      content: `# Connecting Node.js to MongoDB

**Learning objectives:**
- Install Mongoose
- Connect to the database
- Handle connection errors

## Why Mongoose?
You can use the native MongoDB driver, but Mongoose is the standard for Node.js. It provides schemas, validation, and a cleaner API.

## Installation
\`\`\`bash
npm install mongoose
\`\`\`

## The Connection Code
\`\`\`javascript
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

connectDB();
\`\`\`

## Handling Disconnects
Mongoose emits events. You can listen to them to log disconnects or attempt reconnection.

\`\`\`javascript
mongoose.connection.on('disconnected', () => {
  console.warn("MongoDB disconnected. Attempting to reconnect...");
});
\`\`\`

## Key Takeaways
- Use Mongoose for schema-based MongoDB.
- Always catch connection errors.
- Store your connection string in \`.env\`.`
    },
    {
      title: "Working with MongoDB Collections and Documents",
      slug: "mongodb-collections-documents",
      order: 2,
      estimatedMinutes: 25,
      content: `# Working with MongoDB Collections and Documents

**Learning objectives:**
- Create documents
- Read documents
- Understand collections and subdocuments

## Creating Documents
\`\`\`javascript
const user = new User({ name: "Alice", email: "alice@example.com" });
await user.save();
\`\`\`

## Reading Documents
\`\`\`javascript
const user = await User.findOne({ email: "alice@example.com" });
const allUsers = await User.find();
\`\`\`

## Subdocuments
MongoDB allows you to nest documents inside documents.

\`\`\`javascript
const post = new Post({
  title: "My Post",
  author: {
    name: "Alice",
    email: "alice@example.com"
  }
});
\`\`\`

This is useful when data belongs together and won't be queried independently.

## Document Size Limit
A single MongoDB document cannot exceed **16MB**. If you need to store large files (images, videos), use **GridFS** or a cloud storage service like AWS S3.

## Key Takeaways
- Mongoose models create and read documents.
- Subdocuments are great for nested data.
- Documents have a 16MB size limit.`
    },
    {
      title: "CRUD Operations with MongoDB",
      slug: "crud-mongodb",
      order: 3,
      estimatedMinutes: 30,
      content: `# CRUD Operations with MongoDB

**Learning objectives:**
- Create, Read, Update, and Delete documents
- Understand the different update operators
- Delete single and multiple records

## Create
\`\`\`javascript
const course = await Course.create({ title: "Node.js", slug: "nodejs" });
\`\`\`

## Read
\`\`\`javascript
const course = await Course.findById(id);
const allCourses = await Course.find({ isPublished: true });
\`\`\`

## Update
You can use \`save()\` or update methods directly.

### Update with Save
\`\`\`javascript
const course = await Course.findById(id);
course.title = "Updated Title";
await course.save();
\`\`\`

### Update with Query
\`\`\`javascript
await Course.findByIdAndUpdate(id, { title: "Updated Title" }, { new: true });
\`\`\`

## Delete
\`\`\`javascript
await Course.findByIdAndDelete(id);
await Course.deleteMany({ isPublished: false });
\`\`\`

## Key Takeaways
- Mongoose provides intuitive methods for all CRUD operations.
- Use \`{ new: true }\` to return the updated document.
- \`.lean()\` makes read queries significantly faster.`
    }
  ]
};