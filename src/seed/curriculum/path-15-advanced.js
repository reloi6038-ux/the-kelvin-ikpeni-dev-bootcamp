// Path 15: Advanced Full-Stack Engineering
module.exports = {
  course: {
    title: "Advanced Full-Stack Engineering",
    slug: "advanced-fullstack",
    description:
      "Production-grade architecture, performance tuning, and scalability.",
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
          estimatedMinutes: 30,
          content: `# Web Security Deep Dive

Real applications defend against:

- **XSS** — user-controlled HTML injection
- **CSRF** — unauthorized state changes
- **Injection** — malicious query operators
- **Session hijacking** — stolen cookies
- **Brute force** — repeated login attempts

## Core Principles
1. **Never trust the client.** Validate on the server.
2. **Hash passwords** with bcrypt.
3. **Set security headers** with Helmet.
4. **Rate-limit** expensive endpoints.
5. **Use HttpOnly, SameSite cookies** for sessions.
6. **Escape user content** before rendering HTML.

Every one of these is implemented in this bootcamp's authentication layer.`,
        },
        {
          title: "Performance & Scaling",
          slug: "performance-scaling",
          order: 2,
          estimatedMinutes: 25,
          content: `# Performance & Scaling

## Database Indexes
Queries without indexes scan every document. Indexed fields turn an O(n) scan into an O(log n) lookup.

\`\`\`javascript
courseSchema.index({ isPublished: 1, order: 1 });
\`\`\`

## Caching
Store frequently-read data in Redis or memory. Invalidate on write.

## Pagination
Never return 10,000 records at once:
\`\`\`javascript
await Course.find().skip((page - 1) * 20).limit(20);
\`\`\`

## Horizontal Scaling
Run multiple Node processes behind a load balancer. Keep sessions in MongoDB (already done) so any process can verify any request.`,
        },
      ],
    },
  ],
};