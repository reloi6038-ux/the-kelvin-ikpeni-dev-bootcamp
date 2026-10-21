module.exports = {
  title: "Module 5: Microservices, GraphQL & System Design",
  description: "The final frontier of backend engineering.",
  order: 5,
  lessons: [
    {
      title: "Microservices Fundamentals",
      slug: "microservices-fundamentals",
      order: 1,
      estimatedMinutes: 40,
      content: `# Microservices Fundamentals

**Learning objectives:**
- Understand microservices vs monoliths
- Know when microservices pay off
- Avoid the most common migration failures

## What Are Microservices?
Instead of one big app, you build **many small apps** that communicate over the network.

### Monolith
\`\`\`
┌──────────────────────────────┐
│  Users + Courses + Payments  │
│  + Certificates + Admin      │
│  One deployment, one DB      │
└──────────────────────────────┘
\`\`\`

### Microservices
\`\`\`
┌──────┐  ┌──────┐  ┌──────┐
│Users │  │Course│  │Pays  │
└──────┘  └──────┘  └──────┘
   ↓         ↓         ↓
 Each has its own DB and deployment
\`\`\`

## Why Microservices?
- **Independent deploys** — deploy users service without redeploying payments
- **Independent scale** — payments needs 10x the CPU? Scale just that service.
- **Independent teams** — team A owns users, team B owns payments
- **Language freedom** — Node for real-time, Python for ML, Go for speed

## Why Not Microservices?
- **Complexity** — network failures, distributed transactions, service discovery
- **Operational overhead** — 10 services = 10 deploy pipelines, 10 monitoring setups
- **Latency** — network calls between services are slow
- **Debugging nightmare** — a bug spans 3 services and 5 log files

## The Distributed Monolith
The worst of both worlds: you split into microservices but every request crosses all 8 services synchronously.

**Symptom:** any service down → everything breaks.
**Cause:** services aren't truly independent.
**Fix:** async communication, caching, fault tolerance.

## When to Split
The **"split when it hurts"** rule:

1. Start with a **monolith**
2. When a feature has different scaling needs → split it
3. When a feature has a different team → split it
4. Otherwise → keep it together

## Communication Patterns

### Synchronous (HTTP/gRPC)
\`\`\`javascript
const user = await fetch("http://users-service/api/users/123").then(r => r.json());
\`\`\`
**Pro:** simple, immediate response
**Con:** one failure cascades

### Asynchronous (events/queues)
\`\`\`javascript
await eventBus.emit("user.created", { userId });
\`\`\`
**Pro:** resilient, decoupled
**Con:** eventual consistency (data lags)

## The Rule
> **Don't build microservices until a monolith hurts.**

Most companies that "need" microservices actually need:
- Better caching
- Better indexes
- Better deployment automation

## Key Takeaways
- Microservices = many small apps, own DBs
- Great for large teams, disaster for small ones
- Start with a monolith
- Split when scaling or teams demand it`
    },
    {
      title: "GraphQL with Node.js",
      slug: "graphql-nodejs",
      order: 2,
      estimatedMinutes: 40,
      content: `# GraphQL with Node.js

**Learning objectives:**
- Understand GraphQL vs REST
- Build a basic GraphQL server
- Know when GraphQL pays off

## GraphQL vs REST

### REST (what this bootcamp uses)
\`\`\`
GET /api/courses           → all courses
GET /api/courses/:slug     → one course
GET /api/courses/:slug/lessons → its lessons
\`\`\`
3 requests to render one course page.

### GraphQL
\`\`\`
query {
  course(slug: "html5") {
    title
    lessons { title }
  }
}
\`\`\`
1 request. Client asks for exactly what it needs.

## The Problems GraphQL Solves
- **Over-fetching** — REST returns all fields, client uses 3
- **Under-fetching** — REST needs multiple requests to gather related data
- **Versioning** — REST needs \`/v1\`, \`/v2\`. GraphQL evolves without versions.

## Setting Up
\`\`\`bash
npm install graphql express-graphql
\`\`\`

\`\`\`javascript
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(\`
  type Course {
    title: String!
    slug: String!
    lessons: [Lesson]
  }

  type Lesson {
    title: String
  }

  type Query {
    courses: [Course]
    course(slug: String!): Course
  }
\`\`\`

## Resolvers
Each field needs a function:
\`\`\`javascript
const Course = require("./models/Course");
const Lesson = require("./models/Lesson");

const root = {
  courses: () => Course.find({ isPublished: true }),
  course: ({ slug }) => Course.findOne({ slug }),
};
\`\`\`

## Mounting
\`\`\`javascript
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true, // browser playground in dev
}));
\`\`\`

## Querying from the client
\`\`\`javascript
fetch("/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: \`{ course(slug: "html5") { title lessons { title } } }\`,
  }),
});
\`\`\`

## When GraphQL Wins
- ✅ Mobile apps (limited bandwidth)
- ✅ Multiple frontend clients (web, iOS, Android) with different data needs
- ✅ Rapidly changing UI
- ❌ Simple CRUD APIs
- ❌ Caching-heavy APIs (GraphQL caching is harder than REST)
- ❌ File uploads (REST is simpler)

## Key Takeaways
- GraphQL = client asks for exact data
- One endpoint, one query language
- Solves over/under-fetching
- Not a replacement for REST — a different tool`
    },
    {
      title: "Backend System Design Fundamentals",
      slug: "system-design-fundamentals",
      order: 3,
      estimatedMinutes: 45,
      content: `# Backend System Design Fundamentals

**Learning objectives:**
- Approach any system design problem
- Understand the building blocks
- Know the trade-offs

## The System Design Interview
"Design Twitter."
"Design a URL shortener."
"Design a payment system."

**You are not expected to know everything.** You are expected to reason clearly.

## The Framework
1. **Clarify requirements** — functional + non-functional
2. **Estimate scale** — users, requests/sec, storage
3. **Design the data model** — entities and relationships
4. **Design the API** — endpoints, methods
5. **Design the architecture** — components and data flow
6. **Identify bottlenecks** — what breaks first?
7. **Address bottlenecks** — indexes, caching, sharding

## The Building Blocks

### Load Balancer
Distributes traffic across servers.
\`\`\`
User → Load Balancer → Server A
                    → Server B
                    → Server C
\`\`\`

### Cache (Redis / Memcached)
Stores frequent reads in memory.

### Database
- **SQL** (Postgres, MySQL) — structured, ACID
- **NoSQL** (MongoDB, Cassandra) — flexible, scalable

### Message Queue (RabbitMQ, Kafka)
Async processing.

### CDN (Cloudflare, CloudFront)
Serves static assets from edge servers.

### Object Storage (S3, Cloudflare R2)
Files, images, videos.

## Example: URL Shortener

### Requirements
- Shorten \`https://example.com/long/url\` → \`https://sho.rt/aB3x
- Redirect \`sho.rt/aB3x\` → original URL
- 100M URLs, 10K redirects/sec

### Data Model
\`\`\`
urls {
  _id,
  shortCode: "aB3x",
  originalUrl,
  createdAt,
  clickCount
}
\`\`\`

### API
\`\`\`
POST /api/shorten { url } → { shortCode }
GET /:shortCode → 302 Redirect
\`\`\`

### Architecture
\`\`\`
Create flow:
  Client → LB → API → Redis (check) → DB (save)
  
Redirect flow:
  Client → LB → API → Redis (cache hit) → 302 redirect
\`\`\`

### Bottlenecks
1. **Read-heavy** — 10K redirects/sec
2. **Shortcode collision** — two URLs get same code

### Solutions
1. **Cache in Redis** — every redirect hits cache first
2. **Counter-based ID + base62** — no collisions
3. **Read replicas** — scale reads further

## The Trade-Off Vocabulary
Every design decision is a trade-off. Know these:

| Choice | Pro | Con |
|--------|-----|-----|
| Cache | Fast reads | Stale data risk |
| Replicas | More read capacity | Replication lag |
| Sharding | Unlimited scale | Complex queries |
| Denormalization | Fast reads | Write complexity |
| Async queues | Resilience | Eventual consistency |
| GraphQL | Flexible queries | Caching complexity |
| Microservices | Independent scale | Operational overhead |

## The Rules
1. **Start simple** — a single server handles 99% of apps
2. **Measure before optimizing** — where's the real bottleneck?
3. **Cache the read path** — most apps are read-heavy
4. **Paginate everything** — never return 10k rows
5. **Index aggressively** — the #1 performance win

## Key Takeaways
- Framework: clarify → estimate → design → identify → fix
- Everything is a trade-off
- Start simple, scale when it hurts
- The read path is 90% of performance
- System design is reasoning, not memorization`
    }
  ]
};