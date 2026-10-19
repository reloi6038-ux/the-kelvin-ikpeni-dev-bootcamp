module.exports = {
  course: {
    title: "MongoDB & Mongoose",
    slug: "mongodb",
    description: "Schemas, models, CRUD operations, and MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 12,
    icon: "mongodb",
    order: 9,
    isPublished: true,
  },
  modules: [
    {
      title: "MongoDB Basics",
      description: "Collections, documents, and queries.",
      order: 1,
      lessons: [
        {
          title: "Documents and Collections",
          slug: "documents-collections",
          order: 1,
          estimatedMinutes: 20,
          content: `# Documents and Collections

MongoDB is a **document database**. Instead of tables and rows, it stores:

- **Documents** — JSON-like objects
- **Collections** — groups of documents

## Anatomy of a document
\`\`\`json
{
  "_id": ObjectId("..."),
  "title": "HTML5 Mastery",
  "slug": "html5",
  "level": "beginner",
  "isPublished": true,
  "createdAt": "2026-01-15T..."
}
\`\`\`

Every document has a unique \`_id\`. If you don't provide one, MongoDB generates it.

## Collections vs tables
| SQL | MongoDB |
|-----|---------|
| Table | Collection |
| Row | Document |
| Column | Field |
| Foreign key | ObjectId reference |

## Why MongoDB
- Flexible schemas (add a field without migrations)
- Native JSON — perfect for JavaScript
- Scales horizontally easily

## In this bootcamp
Mongoose adds structure — schemas and validation — on top of MongoDB.`,
        },
        {
          title: "Mongoose Schemas & Models",
          slug: "mongoose-schemas",
          order: 2,
          estimatedMinutes: 25,
          content: `# Mongoose Schemas & Models

Mongoose gives MongoDB **structure and validation**.

## Define a schema
\`\`\`js
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);
\`\`\`

## Create a model
\`\`\`js
const Course = mongoose.model("Course", courseSchema);
\`\`\`

The model name \`"Course"\` becomes the collection name \`courses\` (lowercase, plural).

## CRUD operations
\`\`\`js
// Create
const course = await Course.create({ title: "HTML5", slug: "html5" });

// Read
const courses = await Course.find({ isPublished: true });
const one = await Course.findOne({ slug: "html5" });

// Update
await Course.updateOne({ slug: "html5" }, { $set: { isPublished: true } });

// Delete
await Course.deleteOne({ slug: "html5" });
\`\`\`

## Why schemas matter
- **Validation** — reject bad data at the database layer
- **Type safety** — catch bugs before they happen
- **Indexes** — mark fields as \`index: true\` for fast queries`,
        },
        {
          title: "Queries, Indexes & Pagination",
          slug: "queries-indexes",
          order: 3,
          estimatedMinutes: 25,
          content: `# Queries, Indexes & Pagination

## Query operators
\`\`\`js
// Equality
await Course.find({ level: "beginner" });

// Comparison
await Course.find({ order: { $gt: 0 } });

// Compound
await Course.find({ isPublished: true, level: "beginner" });

// Sort + limit
await Course.find({}).sort({ order: 1 }).limit(10);
\`\`\`

## Indexes
Without an index, every query scans **every document**.

\`\`\`js
courseSchema.index({ isPublished: 1, order: 1 });
\`\`\`

This turns an O(n) scan into an O(log n) lookup. **Always index the fields you query by.**

## Pagination
Never return 10,000 records at once.

\`\`\`js
const page = Number(req.query.page) || 1;
const perPage = 20;

const courses = await Course.find({})
  .skip((page - 1) * perPage)
  .limit(perPage);
\`\`\`

## The .lean() trick
\`\`\`js
await Course.find().lean();
\`\`\`

Returns plain JS objects instead of Mongoose documents — **~30% faster** and less memory. Use it for read-only queries.`,
        },
      ],
    },
  ],
};