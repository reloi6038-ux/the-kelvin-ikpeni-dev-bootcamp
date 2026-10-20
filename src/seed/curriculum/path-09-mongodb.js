// Path 9: MongoDB & Mongoose
module.exports = {
  course: {
    title: "MongoDB & Mongoose",
    slug: "mongodb",
    description:
      "Master document databases, schemas, models, CRUD operations, indexes, and MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 18,
    icon: "mongodb",
    order: 9,
    isPublished: true,
  },
  modules: [
    {
      title: "MongoDB Fundamentals",
      description: "Documents, collections, and how MongoDB differs from SQL.",
      order: 1,
      lessons: [
        {
          title: "Documents and Collections",
          slug: "documents-collections",
          order: 1,
          estimatedMinutes: 25,
          content: `# Documents and Collections

**Learning objectives:**
- Describe the MongoDB data model
- Compare MongoDB to SQL databases
- Understand \`_id\` and ObjectId

## What is MongoDB?
MongoDB is a **document database**. Instead of tables and rows, it stores **JSON-like documents** in **collections**.

## The Hierarchy
- **Database** → contains collections (e.g., \`kelvin-bootcamp\`)
- **Collection** → contains documents (e.g., \`courses\`, \`users\`)
- **Document** → a single record (JSON object)

## A Real Document
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "HTML5 Mastery",
  "slug": "html5",
  "level": "beginner",
  "isPublished": true,
  "estimatedHours": 14,
  "createdAt": "2026-01-15T10:00:00Z"
}
\`\`\`

## MongoDB vs SQL
| SQL | MongoDB |
|-----|---------|
| Table | Collection |
| Row | Document |
| Column | Field |
| Foreign key | ObjectId reference |
| JOIN | Manual lookup or \`$lookup\` |

## Why Document Databases?
- **Flexible schema** — different documents can have different fields
- **Nested data** — arrays and sub-objects fit naturally
- **JavaScript-native** — the document is a JS object on the wire
- **Horizontal scaling** — sharding is built in

## The \`_id\` Field
Every document has a unique \`_id\`. If you don't provide one, MongoDB generates an **ObjectId** — a 12-byte identifier (timestamp + machine ID + counter).

You can also use a custom \`_id\` (like a slug), but ObjectId is the default and is very fast to look up.

## Key Takeaways
- MongoDB = databases → collections → documents
- Documents are JSON-like objects
- Every document has an \`_id\`
- Flexible schema vs. SQL's rigid tables`,
        },
        {
          title: "Mongoose Schemas & Models",
          slug: "mongoose-schemas",
          order: 2,
          estimatedMinutes: 30,
          content: `# Mongoose Schemas & Models

**Learning objectives:**
- Define a Mongoose schema with validation
- Create a model from a schema
- Understand \`timestamps\` and indexes

## Why Mongoose?
MongoDB itself doesn't enforce structure. Mongoose adds **schemas**, **validation**, **middleware**, and **references** — turning MongoDB into a safe, structured system.

## A Complete Schema
\`\`\`javascript
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    estimatedHours: { type: Number, min: 1 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
\`\`\`

## Schema Options
- \`required: true\` — must have a value
- \`unique: true\` — no duplicates (creates an index)
- \`default: X\` — value if not provided
- \`enum: [...]\` — restrict to specific values
- \`min\` / \`max\` — numeric range
- \`match: /regex/\` — pattern validation
- \`trim: true\` — remove whitespace
- \`lowercase: true\` — force lowercase

## The \`timestamps\` Option
Adding \`{ timestamps: true }\` automatically adds:
- \`createdAt\` — when the document was created
- \`updatedAt\` — when it was last modified

You don't need to set these manually.

## Model Naming
\`\`\`javascript
mongoose.model("Course", courseSchema);
\`\`\`

The model name is **singular and PascalCase**. Mongoose automatically:
- Creates a collection called \`courses\` (lowercase, plural)
- Returns a class you can query with

## Common Model Methods
\`\`\`javascript
await Course.create({ ... });       // insert
await Course.find({ isPublished: true }); // select all
await Course.findOne({ slug: "html5" }); // select one
await Course.findById(id);          // select by _id
await Course.findByIdAndUpdate(id, { title: "New" });
await Course.findByIdAndDelete(id);
await Course.countDocuments({ level: "beginner" });
\`\`\`

## Key Takeaways
- Schema = the shape and rules of your data
- Model = the query interface for a collection
- \`timestamps: true\` = automatic \`createdAt\` / \`updatedAt\`
- Model names are singular; collections are plural`,
        },
        {
          title: "CRUD Operations",
          slug: "crud-operations",
          order: 3,
          estimatedMinutes: 30,
          content: `# CRUD Operations

**Learning objectives:**
- Perform Create, Read, Update, Delete operations
- Use \`.lean()\` for performance
- Use query operators like \`$gt\`, \`$in\`

## Create
\`\`\`javascript
const course = await Course.create({
  title: "HTML5",
  slug: "html5",
  level: "beginner",
  description: "Master HTML5",
});
console.log(course._id);
\`\`\`

## Read
\`\`\`javascript
// All documents
const all = await Course.find();

// Filtered
const published = await Course.find({ isPublished: true });

// Sorted + limited
const top = await Course.find().sort({ order: 1 }).limit(10);

// One document
const course = await Course.findOne({ slug: "html5" });

// By _id
const course = await Course.findById("507f1f77bcf86cd799439011");
\`\`\`

## Update
\`\`\`javascript
// Full document replace (rare)
await Course.replaceOne({ slug: "html5" }, newData);

// Update specific fields
await Course.updateOne({ slug: "html5" }, { $set: { isPublished: true } });

// Update and return the updated doc
const updated = await Course.findByIdAndUpdate(
  id,
  { title: "New Title" },
  { new: true }
);
\`\`\`

## Delete
\`\`\`javascript
await Course.deleteOne({ slug: "html5" });
await Course.deleteMany({ level: "advanced" });
await Course.findByIdAndDelete(id);
\`\`\`

## Query Operators
| Operator | Meaning |
|----------|---------|
| \`$eq\` | Equal |
| \`$ne\` | Not equal |
| \`$gt\` / \`$gte\` | Greater than (or equal) |
| \`$lt\` / \`$lte\` | Less than (or equal) |
| \`$in\` / \`$nin\` | In array / not in array |
| \`$exists\` | Field exists |
| \`$regex\` | Pattern match |

\`\`\`javascript
// Courses with order > 5
await Course.find({ order: { $gt: 5 } });

// Courses with slug in ["html5", "css3"]
await Course.find({ slug: { $in: ["html5", "css3"] } });
\`\`\`

## The \`.lean()\` Performance Boost
By default, Mongoose returns full **Mongoose documents** with all methods attached. \`.lean()\` returns **plain JS objects** — about 3x faster and less memory.

\`\`\`javascript
// Use for read-only data
const courses = await Course.find({ isPublished: true }).lean();
\`\`\`

**Rule:** use \`.lean()\` when you're just reading data and don't need to call \`.save()\` on the result.

## Key Takeaways
- \`create\`, \`find\`, \`updateOne\`, \`deleteOne\` = basic CRUD
- \`$gt\`, \`$in\`, \`$regex\` = query operators
- \`.lean()\` for fast read-only queries
- \`.sort()\`, \`.limit()\`, \`.skip()\` for pagination`,
        },
      ],
    },
  ],
};