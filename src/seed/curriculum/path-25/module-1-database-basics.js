module.exports = {
  title: "Module 1: Database Foundations",
  description: "Understanding SQL vs NoSQL and setting up MongoDB.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Database Management",
      slug: "intro-database-management",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to Database Management

**Learning objectives:**
- Understand what a database is and why we need one
- Differentiate between relational and non-relational databases
- Learn about Database Management Systems (DBMS)

## What is a Database?
A database is an organized collection of structured information, or data, typically stored electronically in a computer system. It allows you to store, retrieve, update, and delete data efficiently.

## Why Not Just Use Files?
You could store data in a text file, but databases offer:
- **Concurrency**: Multiple users can read/write at the same time.
- **Security**: Authentication and access control.
- **Integrity**: Rules to ensure data is valid.
- **Speed**: Indexes make searching millions of records instant.

## Relational vs Non-Relational
### Relational (SQL)
- Stores data in tables (rows and columns).
- Requires a strict schema.
- Examples: MySQL, PostgreSQL.
- Best for: Banking, complex transactions, highly structured data.

### Non-Relational (NoSQL)
- Stores data in documents, key-value pairs, or graphs.
- Flexible schema.
- Examples: MongoDB, Redis.
- Best for: Rapid development, unstructured data, scaling.

## Key Takeaways
- A database organizes and secures your data.
- SQL is table-based; NoSQL is document-based.
- Choose the database that fits your data model.`
    },
    {
      title: "Introduction to NoSQL Databases",
      slug: "intro-nosql",
      order: 2,
      estimatedMinutes: 30,
      content: `# Introduction to NoSQL Databases

**Learning objectives:**
- Understand the four types of NoSQL databases
- Learn the CAP Theorem
- Explore when to use NoSQL

## The Four Types of NoSQL
1. **Document Stores** (MongoDB): Data is stored as JSON-like documents.
2. **Key-Value Stores** (Redis): Data is a simple key-value pair.
3. **Wide-Column Stores** (Cassandra): Tables with rows, but columns can vary per row.
4. **Graph Databases** (Neo4j): Data is stored as nodes and relationships.

## The CAP Theorem
In a distributed database, you can only guarantee two of these three:
- **Consistency**: Every read receives the most recent write.
- **Availability**: Every request receives a response.
- **Partition Tolerance**: The system continues to operate despite network failures.

NoSQL databases usually choose **Availability + Partition Tolerance** (AP) or **Consistency + Partition Tolerance** (CP).

## Why Use NoSQL?
- **Flexible Schema**: You can add fields without migrations.
- **Horizontal Scaling**: Add more servers to handle traffic.
- **Speed**: Great for read-heavy applications.

## Key Takeaways
- NoSQL is not a replacement for SQL; it's a different tool.
- MongoDB is a document store.
- NoSQL prioritizes flexibility and scalability over rigid consistency.`
    },
    {
      title: "MongoDB Fundamentals",
      slug: "mongodb-fundamentals",
      order: 3,
      estimatedMinutes: 30,
      content: `# MongoDB Fundamentals

**Learning objectives:**
- Understand Documents and Collections
- Learn the BSON format
- Explore the MongoDB ecosystem

## Documents
A document is a record in MongoDB. It is a JSON-like object.
\`\`\`json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "MongoDB",
  "isActive": true
}
\`\`\`

## Collections
A collection is a group of documents. It is the equivalent of a table in SQL, but without a fixed schema.

## BSON
MongoDB stores documents in **BSON** (Binary JSON). It looks like JSON but is stored in binary, allowing for faster parsing and additional data types (like dates and binary data).

## The \_id Field
Every document has a unique \_id field. If you don't provide one, MongoDB generates an **ObjectId** (a 12-byte unique identifier).

## MongoDB vs SQL
| SQL | MongoDB |
|-----|---------|
| Table | Collection |
| Row | Document |
| Column | Field |
| JOIN | \`$lookup\` (or manual referencing) |

## Key Takeaways
- MongoDB stores JSON-like documents.
- Data is grouped into collections.
- Every document has a unique \_id.`
    },
    {
      title: "Installing MongoDB and Setting Up MongoDB Atlas",
      slug: "setup-mongodb-atlas",
      order: 4,
      estimatedMinutes: 25,
      content: `# Installing MongoDB and Setting Up MongoDB Atlas

**Learning objectives:**
- Set up a cloud database with MongoDB Atlas
- Create a user and whitelist an IP
- Get the connection string

## Why MongoDB Atlas?
MongoDB Atlas is the official cloud-hosted MongoDB service. It has a generous free tier (M0) and requires zero installation on your computer.

## Step-by-Step Setup
1. Go to **mongodb.com/cloud/atlas** and sign up.
2. Create a new project.
3. Click **Build a Database** → **M0 FREE**.
4. Choose a cloud provider and region close to you.
5. Create a Database User (remember the password!).
6. Add your current IP address to the Network Access list.
7. Click **Connect** → **Drivers** to get your connection string.

## The Connection String
\`\`\`text
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myDatabase?retryWrites=true&w=majority
\`\`\`

Replace \`<username>\`, \`<password>\`, and \`myDatabase\` with your actual details.

## Key Takeaways
- Atlas is a free, cloud-hosted MongoDB.
- You must whitelist your IP to connect.
- Always store the connection string in an environment variable.`
    }
  ]
};