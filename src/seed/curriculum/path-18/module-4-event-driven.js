module.exports = {
  title: "Module 4: Event-Driven Architecture",
  description: "Message queues, workers, and async processing at scale.",
  order: 4,
  lessons: [
    {
      title: "Message Queues and Event-Driven Architecture",
      slug: "message-queues",
      order: 1,
      estimatedMinutes: 40,
      content: `# Message Queues and Event-Driven Architecture

**Learning objectives:**
- Understand why message queues exist
- Compare RabbitMQ, Kafka, and Redis queues
- Design a simple producer/consumer system

## The Problem
A user clicks "Send Certificate Email."
- **Synchronous:** Server generates PDF → connects to email provider → sends → responds. Takes 8 seconds. User waits.
- **If the email provider is down:** The whole request fails. User has to click again.

## The Solution: Message Queue
1. User clicks "Send Certificate Email."
2. Server saves the request to a **queue**.
3. Server responds immediately: "We'll send it shortly."
4. A **worker** picks up the request and sends the email in the background.

**User doesn't wait. Server doesn't crash.**

## The Core Concepts
- **Producer** — puts messages in the queue
- **Queue** — stores messages until processed
- **Consumer** — reads messages and does work

## RabbitMQ vs Kafka vs Redis

| Tool | Best For | Persistence |
|------|----------|-------------|
| **RabbitMQ** | Task queues, traditional messaging | ✅ Yes |
| **Kafka** | Event streams, log processing, analytics | ✅ Yes (long retention) |
| **Redis** | Simple queues, fast, in-memory | ⚠️ Configurable |

## Simple Redis Queue (BullMQ)
\`\`\`bash
npm install bullmq
\`\`\`

**Producer:**
\`\`\`javascript
const { Queue } = require("bullmq");
const emailQueue = new Queue("email", { connection: redis });

async function enqueueEmail(email) {
  await emailQueue.add("welcome", { email });
  return { queued: true };
}
\`\`\`

**Worker:**
\`\`\`javascript
const { Worker } = require("bullmq");

new Worker("email", async (job) => {
  await sendEmail(job.data.email);
}, { connection: redis });
\`\`\`

## When to Use Queues
- ✅ Sending emails
- ✅ Generating PDFs / images
- ✅ Processing uploads
- ✅ Calling slow external APIs
- ✅ Notifying other services
- ❌ Simple DB writes (no need)
- ❌ Real-time responses (queues are async)

## Event-Driven Architecture
Instead of one service calling another, services emit **events** that other services listen to.

### Monolithic approach
\`\`\`javascript
async function enrollStudent(userId, courseId) {
  await Enrollment.create({ userId, courseId });
  await sendWelcomeEmail(userId);       // coupled
  await updateAnalytics(courseId);      // coupled
  await notifyInstructor(courseId);     // coupled
}
\`\`\`
Any failure breaks the whole flow.

### Event-driven approach
\`\`\`javascript
async function enrollStudent(userId, courseId) {
  await Enrollment.create({ userId, courseId });
  await eventBus.emit("student.enrolled", { userId, courseId });
}

// Separate listeners (can be in different services)
eventBus.on("student.enrolled", async (e) => sendWelcomeEmail(e.userId));
eventBus.on("student.enrolled", async (e) => updateAnalytics(e.courseId));
eventBus.on("student.enrolled", async (e) => notifyInstructor(e.courseId));
\`\`\`
Each listener is independent. If one fails, others still run.

## Key Takeaways
- Queues make slow tasks async
- Producer → Queue → Consumer
- Use queues for emails, PDFs, uploads
- Event-driven = loose coupling`
    },
    {
      title: "Worker Threads and Background Processing",
      slug: "worker-threads",
      order: 2,
      estimatedMinutes: 35,
      content: `# Worker Threads and Background Processing

**Learning objectives:**
- Know when to use Worker Threads vs Child Processes
- Move CPU-heavy work off the main thread
- Avoid the classic pitfalls

## The Problem
Node.js runs on **one thread**. If a request does heavy computation (image resize, PDF generation, encryption), the whole server freezes.

## The Three Solutions

### 1. Cluster Mode (multiple processes)
\`\`\`javascript
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  require("./server");
}
\`\`\`
Runs N copies of your app, one per CPU core.

### 2. Worker Threads (parallel within one process)
\`\`\`javascript
// main.js
const { Worker } = require("worker_threads");

function processImage(imagePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workers/imageProcessor.js", {
      workerData: { imagePath },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}
\`\`\`

\`\`\`javascript
// workers/imageProcessor.js
const { parentPort, workerData } = require("worker_threads");
const sharp = require("sharp");

sharp(workerData.imagePath)
  .resize(200)
  .toFile("./small.jpg")
  .then(() => parentPort.postMessage({ success: true }));
\`\`\`

### 3. Child Processes (separate OS process)
\`\`\`javascript
const { exec } = require("child_process");
exec("python script.py", (err, stdout) => { ... });
\`\`\`

## Which One?
| Use Case | Tool |
|----------|------|
| CPU-heavy work in one app | **Worker Threads** |
| Scaling the whole app | **Cluster** |
| Running external programs | **Child Process** |
| Firing off background jobs | **BullMQ / queues** |

## Common Worker Thread Pitfalls
- ❌ Workers share memory incorrectly
- ❌ Workers crash silently
- ❌ Starting a worker per request (expensive)
- ✅ Use a worker **pool** (reuse workers)

## The Worker Pool Pattern
\`\`\`javascript
class WorkerPool {
  constructor(size) {
    this.workers = Array.from({ length: size }, () =>
      new Worker("./worker.js")
    );
    this.idle = [...this.workers];
  }

  async run(data) {
    const worker = this.idle.pop();
    return new Promise((resolve, reject) => {
      const handler = (msg) => {
        worker.off("message", handler);
        this.idle.push(worker);
        resolve(msg);
      };
      worker.on("message", handler);
      worker.once("error", reject);
      worker.postMessage(data);
    });
  }
}
\`\`\`

## When to Use Workers
- ✅ PDF generation
- ✅ Image processing
- ✅ Video transcoding
- ✅ Cryptography (heavy encryption)
- ✅ Data parsing (large files)
- ❌ Simple DB operations
- ❌ Plain HTTP handling

## Key Takeaways
- Node.js is single-threaded
- Workers prevent blocking the main thread
- Use pools, not one-per-request
- Cluster for scale, workers for CPU`
    },
    {
      title: "Database Performance and Scalability",
      slug: "database-performance",
      order: 3,
      estimatedMinutes: 40,
      content: `# Database Performance and Scalability

**Learning objectives:**
- Diagnose slow queries
- Index correctly
- Understand replication, sharding, and pagination

## Diagnosing Slow Queries

### MongoDB: \`.explain()\`
\`\`\`javascript
const result = await Course.find({ level: "beginner" }).explain("executionStats");
console.log(result.executionStats);
\`\`\`

**Key metrics:**
- \`executionTimeMillis\` — how long
- \`totalDocsExamined\` — how many documents scanned
- \`nReturned\` — how many returned

**If \`totalDocsExamined\` >> \`nReturned\`**, you need an index.

## Indexing
An index is a sorted data structure that lets MongoDB find documents in O(log n) instead of O(n).

### Single-Field Index
\`\`\`javascript
courseSchema.index({ slug: 1 }); // 1 = ascending
\`\`\`

### Compound Index
\`\`\`javascript
courseSchema.index({ isPublished: 1, order: 1 });
\`\`\`
**Rule:** order matters. Index \`{a: 1, b: 1}\` speeds up queries on \`{a}\`, \`{a, b}\`, but not just \`{b}\`.

### Unique Index
\`\`\`javascript
courseSchema.index({ slug: 1 }, { unique: true });
\`\`\`

### Text Index (for search)
\`\`\`javascript
courseSchema.index({ title: "text", description: "text" });
\`\`\`

## When NOT to Index
Each index costs memory and slows writes. Don't index:
- Fields you never query
- Low-cardinality fields (e.g., \`isPublished\`)
- Every field "just in case"

## Pagination
Never return 10,000 records at once.

### Offset Pagination (simple)
\`\`\`javascript
await Course.find().skip((page - 1) * 20).limit(20);
\`\`\`
**Problem:** \`skip(10000)\` scans 10,000 documents before returning 20.

### Cursor Pagination (better)
\`\`\`javascript
const last = await Course.findOne({ slug: lastSlug });
const next = await Course.find({ order: { $gt: last.order } }).limit(20);
\`\`\`
Consistent O(1) performance regardless of page depth.

## Replication
Copies of the database.
- **Primary** — handles writes
- **Replicas** — handle reads (and backup primary)

\`\`\`
Write → Primary → Replicas → Read
\`\`\`

**Use when:**
- Read-heavy traffic (blog, e-commerce)
- High availability (failover)

**Don't use when:**
- Write-heavy traffic (replicas lag)
- Small app (single DB is fine)

## Sharding
Split data across multiple databases by a **shard key**.

### Example: shard by \`userId\`
\`\`\`
Users 1-1M   → Shard A
Users 1M-2M  → Shard B
Users 2M-3M  → Shard C
\`\`\`

**Use when:**
- Single DB can't hold the data
- Single DB can't handle the write throughput

**Don't use when:**
- Under 10M documents
- Cross-shard queries are common (they're slow)

## The Performance Checklist
- [ ] Every \`find\` uses an index
- [ ] \`.explain()\` shows \`totalDocsExamined\` ≈ \`nReturned\`
- [ ] Queries paginate
- [ ] Deep pages use cursor pagination
- [ ] Read-heavy apps have replicas
- [ ] Only shard when single DB maxes out

## Key Takeaways
- Diagnose with \`.explain()\` first
- Index what you query, nothing more
- Paginate — always
- Replicas for reads, shards for writes
- Don't scale until you measure`
    }
  ]
};