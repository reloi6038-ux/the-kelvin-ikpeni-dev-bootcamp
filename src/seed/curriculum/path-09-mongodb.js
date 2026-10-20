// Path 9: MongoDB & Mongoose
module.exports = {
  course: {
    title: "MongoDB & Mongoose",
    slug: "mongodb",
    description:
      "Schemas, models, CRUD operations, and MongoDB Atlas.",
    level: "intermediate",
    estimatedHours: 16,
    icon: "mongodb",
    order: 9,
    isPublished: true,
  },
  modules: [
    {
      title: "MongoDB Fundamentals",
      description: "Documents, collections, and queries.",
      order: 1,
      lessons: [
        {
          title: "Documents and Collections",
          slug: "documents-collections",
          order: 1,
          estimatedMinutes: 25,
          content: `# Documents and Collections

MongoDB is a **document database** using JSON-like documents.

## Structure
- **Database**: \`kelvin-bootcamp\`
- **Collection**: \`courses\`, \`users\`
- **Document**: JSON record

\`\`\`json
{
  "_id": ObjectId("..."),
  "title": "HTML5 Mastery",
  "isPublished": true
}
\`\`\`

## \_id and ObjectId
Every document has a unique \`_id\`. If you don't provide one, MongoDB generates it.`,
        },
        {
          title: "Mongoose Schemas & Models",
          slug: "mongoose-schemas",
          order: 2,
          estimatedMinutes: 30,
          content: `# Mongoose Schemas & Models

Mongoose adds structure and validation on top of MongoDB.

## Schema
\`\`\`javascript
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });
\`\`\`

## Model
\`\`\`javascript
const Course = mongoose.model("Course", courseSchema);
\`\`\`

The model name \`"Course"\` becomes the \`courses\` collection.`,
        },
        {
          title: "CRUD Operations",
          slug: "crud-operations",
          order: 3,
          estimatedMinutes: 30,
          content: `# CRUD Operations

## Create
\`\`\`javascript
const course = await Course.create({ title: "HTML5", slug: "html5" });
\`\`\`

## Read
\`\`\`javascript
const course = await Course.findById(id);
const all = await Course.find({ isPublished: true });
\`\`\`

## Update
\`\`\`javascript
await Course.findByIdAndUpdate(id, { title: "Updated" });
\`\`\`

## Delete
\`\`\`javascript
await Course.findByIdAndDelete(id);
\`\`\`

## The .lean() Trick
\`\`\`javascript
await Course.find().lean(); // 3x faster for read-only queries
\`\`\``,
        },
      ],
    },
  ],
};