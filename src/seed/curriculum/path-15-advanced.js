// Path 15: Advanced Full-Stack Engineering
module.exports = {
  course: {
    title: "Advanced Full-Stack Engineering",
    slug: "advanced-fullstack",
    description:
      "Production-grade architecture, security hardening, performance tuning, and scalability patterns.",
    level: "advanced",
    estimatedHours: 30,
    icon: "advanced",
    order: 15,
    isPublished: true,
  },
  modules: [
    {
      title: "Production Readiness",
      description: "What separates prototypes from professional systems.",
      order: 1,
      lessons: [
        {
          title: "Web Security Deep Dive",
          slug: "web-security-deep-dive",
          order: 1,
          estimatedMinutes: 35,
          content: `# Web Security Deep Dive

**Learning objectives:**
- Identify the most common production vulnerabilities
- Apply layered defense
- Audit your own code

## The OWASP Top 10 (Simplified)
1. **Broken access control** — users accessing data they shouldn't
2. **Cryptographic failures** — plaintext passwords, weak encryption
3. **Injection** — SQL, NoSQL, OS command injection
4. **Insecure design** — logic flaws
5. **Security misconfiguration** — default credentials, debug mode in prod
6. **Vulnerable components** — outdated npm packages
7. **Authentication failures** — weak passwords, session fixation
8. **Data integrity failures** — unsigned updates
9. **Logging failures** — no audit trail
10. **SSRF** — server tricked into making requests

## What You Must Implement

### 1. Authentication
- Bcrypt with 12+ rounds
- Sessions with \`httpOnly\`, \`secure\`, \`sameSite\` cookies
- Session regeneration on login
- Rate limiting on auth endpoints

### 2. Authorization
- Every protected route checks \`requireAuth\`
- Every admin route checks \`requireAdmin\`
- **Server-side only** — never trust the client

### 3. Input Validation
- Validate on the server (client validation is UX only)
- Reject unknown fields
- Sanitize HTML (escape before rendering)
- Parameterized database queries

### 4. Security Headers (Helmet)
\`\`\`javascript
app.use(helmet());
\`\`\`
Sets 11 headers including:
- \`X-Content-Type-Options: nosniff\`
- \`X-Frame-Options: DENY\`
- \`Content-Security-Policy\`
- \`Strict-Transport-Security\`

### 5. CSRF Protection
- Token in session
- Token in request header
- Verify on every POST/PUT/PATCH/DELETE

### 6. Rate Limiting
\`\`\`javascript
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
\`\`\`

### 7. Environment Variables
- Never hardcode secrets
- \`.env\` in \`.gitignore\`
- Rotate secrets if ever leaked

## The Audit Checklist
- [ ] Every route that mutates data has \`requireAuth\`
- [ ] Every admin route has \`requireAdmin\`
- [ ] Every form is validated on the server
- [ ] Every \`innerHTML\` uses escaped data
- [ ] Every password uses bcrypt
- [ ] Helmet is active
- [ ] Rate limiting is on auth and API
- [ ] CSRF tokens on state-changing requests

## Key Takeaways
- Security is layered — no single defense is enough
- Always verify on the server
- The OWASP Top 10 is your checklist
- Rotate secrets immediately if leaked`,
        },
        {
          title: "Performance & Scaling",
          slug: "performance-scaling",
          order: 2,
          estimatedMinutes: 30,
          content: `# Performance & Scaling

**Learning objectives:**
- Optimize queries with indexes
- Paginate large result sets
- Cache expensive operations

## Database Indexes
Without an index, MongoDB scans **every document** for every query. With millions of records, that's seconds per query.

\`\`\`javascript
// In your model:
courseSchema.index({ isPublished: 1, order: 1 });

// Now this query is instant:
await Course.find({ isPublished: true }).sort({ order: 1 });
\`\`\`

**Rules:**
- Index fields you filter by (\`isPublished\`)
- Index fields you sort by (\`order\`)
- Compound indexes for compound queries
- Each index has a write cost — don't over-index

## Pagination
Never return 10,000 records at once.
\`\`\`javascript
const page = Number(req.query.page) || 1;
const perPage = 20;

const courses = await Course.find()
  .skip((page - 1) * perPage)
  .limit(perPage)
  .lean();

const total = await Course.countDocuments();
\`\`\`

Response:
\`\`\`json
{
  "courses": [...],
  "pagination": { "page": 1, "perPage": 20, "total": 500, "totalPages": 25 }
}
\`\`\`

## Caching
Store frequently-read data in memory or Redis.
\`\`\`javascript
const cache = new Map();
const TTL = 60 * 1000;

async function getCourses() {
  const cached = cache.get("courses");
  if (cached && Date.now() - cached.ts < TTL) return cached.data;

  const data = await Course.find({ isPublished: true }).lean();
  cache.set("courses", { data, ts: Date.now() });
  return data;
}
\`\`\`

**Invalidate on write** — clear cache when a course is created/updated/deleted.

## The N+1 Query Problem
\`\`\`javascript
// ❌ N+1: one query per course
const courses = await Course.find();
for (const c of courses) {
  c.lessons = await Lesson.find({ courseId: c._id }); // N queries
}

// ✅ Populate or batch
const courses = await Course.find().populate("lessons");
\`\`\`

## Compression
Enable gzip to reduce payload size:
\`\`\`javascript
const compression = require("compression");
app.use(compression());
\`\`\`
Typical savings: 70% on JSON responses.

## Horizontal Scaling
Run multiple Node processes behind a load balancer:
- Sessions in MongoDB (already done) → any process can verify any session
- Static files served from CDN
- No in-memory state (except caches — use Redis for those)

## Key Takeaways
- Index every field you query or sort by
- Paginate — never return unbounded results
- Cache reads, invalidate on writes
- \`.lean()\` on read-only queries
- Sessions in DB = horizontal scaling ready`,
        },
      ],
    },
  ],
};