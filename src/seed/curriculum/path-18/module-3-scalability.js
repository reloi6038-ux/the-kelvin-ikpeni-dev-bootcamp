module.exports = {
  title: "Module 3: TypeScript & Scalability",
  description: "Types, caching, and the patterns that keep apps fast at scale.",
  order: 3,
  lessons: [
    {
      title: "TypeScript for Node.js Backend Development",
      slug: "typescript-nodejs",
      order: 1,
      estimatedMinutes: 40,
      content: `# TypeScript for Node.js Backend Development

**Learning objectives:**
- Understand why TypeScript dominates professional Node.js
- Set up a basic TypeScript Node.js project
- Migrate a JavaScript file to TypeScript

## Why TypeScript?
JavaScript lets any value be any type. TypeScript catches bugs **at compile time**, before they reach production.

### The Bug That Sinks Companies
\`\`\`javascript
// JavaScript
function getUser(id) {
  return fetch(\`/api/users/\${id}\`);
}

getUser(undefined); // No warning. Crashes at runtime.
\`\`\`

\`\`\`typescript
// TypeScript
function getUser(id: string) {
  return fetch(\`/api/users/\${id}\`);
}

getUser(undefined); // ❌ Compile error: undefined not assignable to string
\`\`\`

**This bug never reaches production.**

## Setting Up
\`\`\`bash
npm install --save-dev typescript @types/node @types/express ts-node
npx tsc --init
\`\`\`

\`tsconfig.json\`:
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
\`\`\`

\`package.json\` scripts:
\`\`\`json
"scripts": {
  "dev": "ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
\`\`\`

## Migration Example
\`\`\`javascript
// Before (JS)
function addCourse(data) {
  return Course.create(data);
}
\`\`\`

\`\`\`typescript
// After (TS)
interface CourseInput {
  title: string;
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
}

function addCourse(data: CourseInput): Promise<Course> {
  return Course.create(data);
}
\`\`\`

## What TypeScript Catches
- Wrong argument types
- Missing properties
- Null/undefined bugs
- Typos in property names
- Missing \`await\` on async functions

## What TypeScript Does NOT Catch
- Logical bugs (wrong formula)
- Runtime errors (network failures)
- Business rules (invalid state transitions)

**TypeScript is a tool, not a guarantee.**

## The Trade-Off
- **Pro:** fewer runtime crashes, better IDE support, better documentation
- **Con:** setup overhead, compilation step, learning curve

## When to Use It
- ✅ Every production app (2026 industry standard)
- ✅ Team of 2+ developers
- ✅ Long-lived codebases
- ❌ Quick scripts
- ❌ Pure learning projects (JS first, then TS)

## Key Takeaways
- TypeScript = JavaScript + types
- Catches bugs before runtime
- Industry standard for production
- Strict mode = maximum safety`
    },
    {
      title: "Building Scalable Applications",
      slug: "scalable-applications",
      order: 2,
      estimatedMinutes: 35,
      content: `# Building Scalable Applications

**Learning objectives:**
- Understand vertical vs horizontal scaling
- Identify the three bottlenecks
- Design for 10x growth from day one

## The Two Types of Scaling

### Vertical Scaling (Scale Up)
Add more power to a single machine.
- More CPU, RAM, disk
- Simple — just pay more
- **Limit:** a single machine can only get so big

### Horizontal Scaling (Scale Out)
Add more machines.
- Multiple servers behind a load balancer
- Complex — requires stateless design
- **Limit:** practically unlimited

## The Three Bottlenecks

### 1. Database
**Problem:** Every request hits the DB. At 10,000 requests/sec, the DB becomes the wall.
**Solutions:**
- **Indexes** — turn O(n) into O(log n)
- **Read replicas** — copies for read queries
- **Caching** (Redis) — store frequent results in memory
- **Sharding** — split data across multiple DBs

### 2. Application Server
**Problem:** A single Node.js process can only use one CPU core.
**Solutions:**
- **Cluster mode** — spawn multiple Node processes on one machine
- **Horizontal scale** — multiple machines behind a load balancer
- **Worker threads** — for CPU-heavy tasks

### 3. Network
**Problem:** Every response travels through the internet.
**Solutions:**
- **CDN** — serve static assets from edge locations
- **Compression** — gzip responses (70% size reduction)
- **HTTP/2** — multiplexing
- **Keep-alive** — reuse TCP connections

## The Stateless Principle
For horizontal scaling, servers must not store state in memory.

### ❌ Stateful (doesn't scale)
\`\`\`javascript
let sessions = {}; // in-memory sessions
app.post("/login", (req, res) => {
  sessions[req.body.email] = req.session;
});
\`\`\`
Second server doesn't know about first server's sessions.

### ✅ Stateless (scales)
\`\`\`javascript
// Sessions stored in MongoDB or Redis
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));
\`\`\`
Any server can verify any session.

## The Rule of Thumb
| Users | Architecture |
|-------|--------------|
| Under 1,000 | Single server, single DB |
| 1k–100k | Add caching, read replicas |
| 100k–1M | Load balancer, multiple servers |
| 1M+ | Microservices, sharding, global CDN |

**Don't over-engineer for 1M users when you have 100.**

## Key Takeaways
- Horizontal scales infinitely; vertical has limits
- Stateless servers = horizontally scalable
- Cache aggressively, cache carefully
- Design for the next 10x, not the next 1000x`
    },
    {
      title: "Redis and Distributed Caching",
      slug: "redis-caching",
      order: 3,
      estimatedMinutes: 35,
      content: `# Redis and Distributed Caching

**Learning objectives:**
- Understand why caching is essential
- Use Redis for session and data caching
- Avoid the classic caching bugs

## The Caching Principle
The fastest database query is the one you never make.

## What is Redis?
**Redis** is an in-memory key-value store. Every read/write is microseconds, not milliseconds.

**Common uses:**
- Session storage
- API response caching
- Rate limiting counters
- Background job queues
- Pub/sub messaging

## Setting Up
\`\`\`bash
npm install redis
\`\`\`

\`\`\`javascript
const { createClient } = require("redis");

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();
\`\`\`

## Basic Usage
\`\`\`javascript
await redis.set("user:1", JSON.stringify(user));
await redis.setEx("user:1", 300, JSON.stringify(user)); // TTL 300s

const user = JSON.parse(await redis.get("user:1"));
await redis.del("user:1");
\`\`\`

## The Cache-Aside Pattern
\`\`\`javascript
async function getCourse(slug) {
  const cacheKey = \`course:\${slug}\`;

  // 1. Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. On miss, query DB
  const course = await Course.findOne({ slug }).lean();

  // 3. Store for next time
  if (course) await redis.setEx(cacheKey, 3600, JSON.stringify(course));

  return course;
}
\`\`\`

## Cache Invalidation (The Hard Problem)
Cache becomes stale when data changes. Common patterns:

### 1. TTL (Time To Live)
\`\`\`javascript
await redis.setEx(key, 3600, value); // expires in 1 hour
\`\`\`
Simple, self-healing, but stale up to 1 hour.

### 2. Write-Through (delete on write)
\`\`\`javascript
async function updateCourse(id, data) {
  const course = await Course.findByIdAndUpdate(id, data, { new: true });
  await redis.del(\`course:\${course.slug}\`);
  return course;
}
\`\`\`
Fresh data, but manual invalidation.

### 3. Version Keys
\`\`\`javascript
const version = await redis.incr("course:version");
const key = \`course:\${slug}:v\${version}\`;
\`\`\`
Incrementing the version invalidates all old cache.

## The Three Caching Bugs

### ❌ Stale data
**Symptom:** Users see old data after updates.
**Fix:** Delete cache on write, or use short TTLs.

### ❌ Cache stampede
**Symptom:** 10,000 users hit the DB simultaneously on cache miss.
**Fix:** Lock the cache key while regenerating, or use short jitter.

### ❌ Cold cache after restart
**Symptom:** Slow first 30 seconds after a deploy.
**Fix:** Use Redis (persists across restarts) not in-memory cache.

## When to Cache
- ✅ Read-heavy endpoints (course catalog, leaderboards)
- ✅ Expensive queries (aggregations)
- ✅ External API responses
- ❌ Write-heavy endpoints (cache invalidates constantly)
- ❌ Per-user data (hard to invalidate)

## Key Takeaways
- Redis = microseconds vs milliseconds
- Cache-aside is the standard pattern
- Invalidate on write or use TTL
- Watch for stampedes and staleness`
    }
  ]
};