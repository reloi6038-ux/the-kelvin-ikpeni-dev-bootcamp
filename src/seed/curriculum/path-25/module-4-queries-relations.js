module.exports = {
  title: "Module 4: Queries, Aggregation & Relations",
  description: "Advanced data retrieval and relationships.",
  order: 4,
  lessons: [
    {
      title: "MongoDB Queries, Sorting, Filtering, and Pagination",
      slug: "advanced-queries",
      order: 1,
      estimatedMinutes: 35,
      content: `# MongoDB Queries, Sorting, Filtering, and Pagination

**Learning objectives:**
- Master query operators
- Sort and limit results
- Implement pagination

## Query Operators
- \`$gt\`, \`$gte\`: Greater than (or equal).
- \`$lt\`, \`$lte\`: Less than (or equal).
- \`$in\`, \`$nin\`: In an array or not in an array.
- \`$exists\`: Field exists.

\`\`\`javascript
const courses = await Course.find({ price: { $gt: 50 } });
const courses = await Course.find({ level: { $in: ['beginner', 'intermediate'] } });
\`\`\`

## Sorting
\`\`\`javascript
// Ascending
await Course.find().sort({ price: 1 });

// Descending
await Course.find().sort({ price: -1 });
\`\`\`

## Limiting and Skipping
\`\`\`javascript
await Course.find().limit(10).skip(20);
\`\`\`

## Pagination Example
\`\`\`javascript
const page = 2;
const limit = 10;
const skip = (page - 1) * limit;

const results = await Course.find().skip(skip).limit(limit);
\`\`\`

## Key Takeaways
- Use query operators for flexible filtering.
- Sort results before returning them.
- Always paginate to protect memory.`
    },
    {
      title: "MongoDB Aggregation Pipelines",
      slug: "aggregation-pipelines",
      order: 2,
      estimatedMinutes: 40,
      content: `# MongoDB Aggregation Pipelines

**Learning objectives:**
- Understand the aggregation framework
- Group and calculate values
- Build a pipeline

## What is Aggregation?
Aggregation is a way to process data through a series of stages. It's like a factory assembly line: data goes in, gets transformed at each stage, and comes out the other end.

## Basic Stages
- \`$match\`: Filter documents (like \`find\`).
- \`$group\`: Group by a field and calculate totals/averages.
- \`$sort\`: Sort results.
- \`$project\`: Select specific fields.
- \`$lookup\`: Perform a left outer join.

## Example: Calculate total sales per category
\`\`\`javascript
const result = await Order.aggregate([
  { $match: { status: 'completed' } },
  {
    $group: {
      _id: '$category',
      totalSales: { $sum: '$amount' },
      count: { $sum: 1 }
    }
  },
  { $sort: { totalSales: -1 } }
]);
\`\`\`

## Key Takeaways
- Aggregation is used for reporting and analytics.
- Pipelines are evaluated stage by stage.
- \`$group\` and \`$match\` are the most common stages.`
    },
    {
      title: "Database Relationships and Referencing",
      slug: "database-relationships",
      order: 3,
      estimatedMinutes: 35,
      content: `# Database Relationships and Referencing

**Learning objectives:**
- Store references to other documents
- Use \`.populate()\` to join data
- Design 1-to-many relationships

## Referencing
In MongoDB, you reference another document by storing its \_id.

\`\`\`javascript
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});
\`\`\`

## The \`.populate()\` Method
When you query a post, it will only contain the author's ID. You use \`.populate()\` to fetch the full user object.

\`\`\`javascript
const post = await Post.findById(id).populate('author');
console.log(post.author.name); // "Alice"
\`\`\`

## Nested Population
If the user has a profile, you can populate that too:
\`\`\`javascript
.populate({
  path: 'author',
  populate: { path: 'profile' }
})
\`\`\`

## Key Takeaways
- Use \`ObjectId\` with \`ref\` to create relationships.
- Always use \`.populate()\` when returning related data to the client.
- Population performs additional queries, so don't overuse it.`
    }
  ]
};