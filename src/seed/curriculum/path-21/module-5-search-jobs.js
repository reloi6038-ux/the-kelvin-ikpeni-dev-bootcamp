module.exports = {
  title: "Module 5: Search & Background Jobs",
  description: "Autocomplete, task scheduling, and data formats.",
  order: 5,
  lessons: [
    {
      title: "Search Functionality and Autocomplete",
      slug: "search-autocomplete",
      order: 1,
      estimatedMinutes: 35,
      content: `# Search Functionality and Autocomplete

**Learning objectives:**
- Implement basic text search in MongoDB
- Build an autocomplete endpoint
- Use fuzzy matching

## Basic Search
The simplest way to search is with a regex or text index.

\`\`\`javascript
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  const results = await Course.find({
    title: { $regex: query, $options: 'i' } // 'i' = case-insensitive
  }).limit(10);

  res.json(results);
});
\`\`\`

## MongoDB Text Index
Regex is slow on large datasets. MongoDB has a built-in text index for full-text search.

\`\`\`javascript
// In your model
courseSchema.index({ title: 'text', description: 'text' });

// In your query
const results = await Course.find({
  $text: { $search: query }
});
\`\`\`

## Autocomplete
Autocomplete should be instant. Return a short list of names/titles.

\`\`\`javascript
app.get('/api/autocomplete', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  const results = await Course.find({
    title: { $regex: '^' + query, $options: 'i' } // ^ means starts with
  })
  .select('title slug')
  .limit(5);

  res.json(results);
});
\`\`\`

## Scaling Search
For massive datasets (millions of records) or advanced features (fuzzy matching, typo tolerance), use a dedicated search engine:
- **Algolia** (SaaS, very fast)
- **Elasticsearch** (self-hosted)
- **Meilisearch** (modern, open-source)

## Key Takeaways
- Regex is fine for small datasets.
- Use text indexes for full-text search.
- Autocomplete should return minimal fields and be heavily indexed.`
    },
    {
      title: "Background Jobs and Task Scheduling",
      slug: "background-jobs",
      order: 2,
      estimatedMinutes: 35,
      content: `# Background Jobs and Task Scheduling

**Learning objectives:**
- Understand why we need background jobs
- Send emails without blocking the user
- Use BullMQ and Redis for job queues

## The Problem
If a user clicks "Send Welcome Email," and you send the email synchronously, the user waits 2–5 seconds for a response. If the email service is down, the whole request fails.

## The Solution: Job Queues
1. User clicks "Send."
2. Server adds a job to a queue and instantly replies "Success!"
3. A background worker picks up the job and sends the email.

## Setting Up BullMQ
\`\`\`bash
npm install bullmq
\`\`\`

## 1. Create a Queue
\`\`\`javascript
const { Queue } = require('bullmq');
const connection = { host: '127.0.0.1', port: 6379 }; // Redis connection

const emailQueue = new Queue('email', { connection });
\`\`\`

## 2. Add a Job
\`\`\`javascript
app.post('/api/register', async (req, res) => {
  // Create user...
  
  // Add job to queue (don't wait for email to send)
  await emailQueue.add('welcome', { email: req.body.email });
  
  res.json({ success: true, message: "User registered" });
});
\`\`\`

## 3. Process the Job (Worker)
Create a separate file for the worker:
\`\`\`javascript
const { Worker } = require('bullmq');
const nodemailer = require('nodemailer');

new Worker('email', async (job) => {
  if (job.name === 'welcome') {
    await sendEmail(job.data.email);
  }
}, { connection });
\`\`\`

## Scheduling (Cron Jobs)
You can also schedule jobs to run at specific times (e.g., "Send a daily report at 8 AM").

\`\`\`javascript
await emailQueue.add('daily-report', {}, {
  repeat: { cron: '0 8 * * *' } // Every day at 8:00 AM
});
\`\`\`

## Key Takeaways
- Background jobs improve perceived performance.
- Use a queue (BullMQ) to handle async tasks.
- Workers process jobs independently of HTTP requests.`
    },
    {
      title: "Third-Party API Integration",
      slug: "third-party-apis",
      order: 3,
      estimatedMinutes: 30,
      content: `# Third-Party API Integration

**Learning objectives:**
- Consume external APIs
- Handle API keys securely
- Manage rate limits and timeouts

## Why Integrate?
You don't need to build everything yourself. Use Stripe for payments, OpenAI for AI, Twilio for SMS, or Mapbox for maps.

## Making Requests
Use \`fetch\` (built into Node 18+) or \`axios\`.

\`\`\`javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const data = await response.json();
\`\`\`

## Security
Never expose API keys to the frontend. Always call third-party APIs from your backend.

## Handling Failures
Third-party APIs go down. Handle their errors gracefully.

\`\`\`javascript
try {
  const response = await fetch(apiUrl, { timeout: 5000 });
  if (!response.ok) throw new Error(\`API responded with \${response.status}\`);
  const data = await response.json();
  // ...
} catch (err) {
  console.error("Third-party API failed:", err);
  // Return a fallback response to the user
}
\`\`\`

## Caching Third-Party Data
If you query an external API frequently (like weather data), cache the result to save money and stay within rate limits.

## Key Takeaways
- Always call third-party APIs from the server.
- Handle timeouts and failures gracefully.
- Cache results to avoid hitting rate limits.`
    },
    {
      title: "API Response Standardization",
      slug: "response-standardization",
      order: 4,
      estimatedMinutes: 25,
      content: `# API Response Standardization

**Learning objectives:**
- Create a consistent response format
- Handle success and errors predictably
- Help frontend developers consume your API

## The Problem
If your API returns \`{"user": {...}}\` for one endpoint, \`[1, 2, 3]\` for another, and \`"error"\` for a third, the frontend developer has to write custom logic for every endpoint.

## The Solution: Standard Envelope
Return every response in the same shape.

### Success Response
\`\`\`json
{
  "success": true,
  "data": {
    "user": { "id": 1, "name": "Alice" }
  },
  "meta": {
    "timestamp": "2026-10-21T10:00:00Z"
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "message": "Email is required" }
    ]
  },
  "meta": {
    "timestamp": "2026-10-21T10:00:00Z"
  }
}
\`\`\`

## Building a Response Helper
\`\`\`javascript
function sendSuccess(res, data, statusCode = 200, meta = {}) {
  return res.status(statusCode).json({
    success: true,
    data,
    meta: { timestamp: new Date().toISOString(), ...meta }
  });
}

function sendError(res, message, statusCode = 400, code = 'ERROR', details = []) {
  return res.status(statusCode).json({
    success: false,
    error: { code, message, details },
    meta: { timestamp: new Date().toISOString() }
  });
}
\`\`\`

## Usage
\`\`\`javascript
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return sendError(res, "User not found", 404, "NOT_FOUND");
  
  return sendSuccess(res, { user });
});
\`\`\`

## Key Takeaways
- Standardize your response format so clients know what to expect.
- Separate success from errors with a boolean flag.
- Include a timestamp in the \`meta\` field for debugging.`
    },
    {
      title: "Introduction to GraphQL",
      slug: "intro-graphql",
      order: 5,
      estimatedMinutes: 40,
      content: `# Introduction to GraphQL

**Learning objectives:**
- Understand GraphQL vs REST
- Build a basic GraphQL server
- Query and mutate data

## What is GraphQL?
GraphQL is a query language for APIs. Instead of multiple REST endpoints, you have a single endpoint (\`/graphql\`) and the client specifies exactly what data it needs.

## REST vs GraphQL

### REST
\`\`\`
GET /users/1          → user data
GET /users/1/posts    → their posts
GET /users/1/friends  → their friends
\`\`\`
3 requests.

### GraphQL
\`\`\`graphql
query {
  user(id: 1) {
    name
    posts { title }
    friends { name }
  }
}
\`\`\`
1 request.

## Setting Up
\`\`\`bash
npm install graphql express-graphql
\`\`\`

\`\`\`javascript
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(\`
  type User {
    id: Int
    name: String
    email: String
  }
  type Query {
    user(id: Int): User
    users: [User]
  }
\`);

const root = {
  user: ({ id }) => db.findUser(id),
  users: () => db.findAllUsers(),
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Enable the browser UI
}));
\`\`\`

## The Playground
Go to \`http://localhost:3000/graphql\` to see the GraphiQL playground where you can test queries.

## When to Use GraphQL
- ✅ Mobile apps (avoid over-fetching)
- ✅ Complex data with nested relationships
- ✅ Multiple clients with different data needs
- ❌ Simple CRUD APIs (REST is easier)
- ❌ Heavy caching (GraphQL caching is complex)

## Key Takeaways
- GraphQL solves over-fetching and under-fetching.
- It uses one endpoint and a strongly-typed schema.
- It's not a replacement for REST, but a different tool.`
    }
  ]
};