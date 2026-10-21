module.exports = {
  title: "Module 5: Transactions & Operations",
  description: "Optimization, transactions, and database management.",
  order: 5,
  lessons: [
    {
      title: "MongoDB Indexing and Query Optimization",
      slug: "indexing-optimization",
      order: 1,
      estimatedMinutes: 30,
      content: `# MongoDB Indexing and Query Optimization

**Learning objectives:**
- Understand how indexes work
- Create indexes in Mongoose
- Analyze query performance

## What is an Index?
An index is a data structure that makes queries faster. Without an index, MongoDB has to scan every document in the collection (a "collection scan").

## Creating Indexes
You define indexes in your schema:

\`\`\`javascript
userSchema.index({ email: 1 }); // Ascending index
userSchema.index({ role: 1, createdAt: -1 }); // Compound index
\`\`\`

## Unique Indexes
Prevents duplicate values (e.g., two users with the same email).

\`\`\`javascript
userSchema.index({ email: 1 }, { unique: true });
\`\`\`

## Analyzing Queries
Use \`.explain("executionStats")\` to see how MongoDB executed a query.

\`\`\`javascript
const result = await User.find({ email: "test@test.com" }).explain("executionStats");
console.log(result.executionStats.totalDocsExamined); // Should be 1
\`\`\`

If \`totalDocsExamined\` is much larger than the number of returned documents, you need an index.

## Key Takeaways
- Indexes speed up reads but slow down writes.
- Always index fields you query and sort by.
- Use \`.explain()\` to verify your indexes are used.`
    },
    {
      title: "Database Transactions",
      slug: "database-transactions",
      order: 2,
      estimatedMinutes: 35,
      content: `# Database Transactions

**Learning objectives:**
- Understand ACID properties
- Implement a transaction in Mongoose
- Handle rollbacks

## What is a Transaction?
A transaction is a group of database operations that must all succeed or all fail together. Think of transferring money: you deduct from Account A and add to Account B. If one fails, the other must be undone.

## ACID Properties
- **Atomicity**: All or nothing.
- **Consistency**: Data goes from one valid state to another.
- **Isolation**: Concurrent transactions don't interfere.
- **Durability**: Once committed, data is saved permanently.

## Transactions in Mongoose
Transactions require a replica set (MongoDB Atlas has this by default).

\`\`\`javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: fromId }, { $inc: { balance: -100 } }, { session });
  await Account.updateOne({ _id: toId }, { $inc: { balance: 100 } }, { session });
  
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
\`\`\`

## Key Takeaways
- Transactions ensure data integrity.
- Pass the \`session\` to every query inside the transaction.
- Always abort the transaction in the \`catch\` block.`
    },
    {
      title: "Database Error Handling",
      slug: "database-error-handling",
      order: 3,
      estimatedMinutes: 30,
      content: `# Database Error Handling

**Learning objectives:**
- Catch MongoDB errors
- Handle duplicate key errors
- Handle validation errors

## Common Database Errors
1. **CastError**: Invalid ID format.
2. **ValidationError**: Data violates schema rules.
3. **MongoServerError (11000)**: Duplicate key (unique constraint).

## Handling Duplicate Keys
When a user tries to sign up with an existing email:

\`\`\`javascript
try {
  await User.create({ email: req.body.email });
} catch (err) {
  if (err.code === 11000) {
    return res.status(409).json({ error: "Email already exists" });
  }
  res.status(500).json({ error: "Server error" });
}
\`\`\`

## Handling CastError
If a user requests \`/api/users/123\` but \`123\` is not a valid ObjectId:

\`\`\`javascript
if (err.name === 'CastError') {
  return res.status(400).json({ error: "Invalid ID format" });
}
\`\`\`

## Centralized Handler
\`\`\`javascript
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key" });
  }
  res.status(500).json({ error: "Server error" });
});
\`\`\`

## Key Takeaways
- Never expose raw database errors to the client.
- Map error codes to user-friendly messages.
- Handle 11000 (duplicate key) explicitly.`
    },
    {
      title: "Managing Database Connections",
      slug: "managing-connections",
      order: 4,
      estimatedMinutes: 25,
      content: `# Managing Database Connections

**Learning objectives:**
- Understand connection pooling
- Handle reconnects
- Graceful shutdown

## Connection Pooling
Opening a new connection for every request is slow. Mongoose (via the MongoDB driver) uses a **connection pool**—it opens a few connections and reuses them.

By default, Mongoose maintains 100 connections. You can adjust this:

\`\`\`javascript
mongoose.connect(uri, {
  maxPoolSize: 10 // Adjust based on your database limits
});
\`\`\`

## Graceful Shutdown
When you deploy a new version, the server stops. You must close the database connection properly before exiting.

\`\`\`javascript
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});
\`\`\`

## Handling Reconnects
Mongoose automatically attempts to reconnect if the connection drops. You can listen to events to log this.

\`\`\`javascript
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected.');
});
\`\`\`

## Key Takeaways
- Reuse connections via pooling.
- Close the connection when the app shuts down.
- Rely on Mongoose for automatic reconnects.`
    }
  ]
};