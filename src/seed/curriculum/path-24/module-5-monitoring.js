module.exports = {
  title: "Module 5: Monitoring & Troubleshooting",
  description: "Keeping your app healthy in production.",
  order: 5,
  lessons: [
    {
      title: "Monitoring and Troubleshooting Backend Applications",
      slug: "monitoring",
      order: 1,
      estimatedMinutes: 35,
      content: `# Monitoring and Troubleshooting Backend Applications

**Learning objectives:**
- Understand what to monitor
- Set up health checks
- Use error tracking tools

## Why Monitor?
You can't fix what you can't see. Monitoring tells you when your app is slow, down, or throwing errors.

## What to Monitor
1. **Uptime**: Is the server responding?
2. **Response Time**: How long do requests take?
3. **Error Rate**: How many 5xx errors are happening?
4. **CPU & Memory**: Is the server running out of resources?
5. **Database**: Are queries slow?

## Health Check Endpoint
Always provide a \`/api/health\` route.
\`\`\`javascript
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
\`\`\`

Tools like Render use this to know if your app is alive. If it fails 3 times, they restart the server.

## Error Tracking (Sentry)
Sentry captures every error with the stack trace, the request data, and the user's browser info.

\`\`\`bash
npm install @sentry/node
\`\`\`

\`\`\`javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Must be before routes
app.use(Sentry.Handlers.requestHandler());

// ... your routes ...

// Must be after routes (before your error handler)
app.use(Sentry.Handlers.errorHandler());
\`\`\`

## Logging in Production
In production, use tools like **Render Logs**, **Logtail**, or **Datadog** to search and alert on logs.

## Key Takeaways
- Monitor uptime, response times, and error rates.
- Use a health check for your hosting provider.
- Use Sentry for real-time error alerts.`
    },
    {
      title: "Integration Testing with Supertest (Advanced)",
      slug: "supertest-advanced",
      order: 2,
      estimatedMinutes: 30,
      content: `# Integration Testing with Supertest (Advanced)

**Learning objectives:**
- Test authenticated routes
- Set up a test database
- Clean up after tests

## Testing Authenticated Routes
If a route requires a session, you must log in first within the test.

\`\`\`javascript
const agent = request.agent(app);

beforeAll(async () => {
  await agent.post('/api/auth/login').send({ email: 'test@test.com', password: 'password' });
});

it('should access protected route', async () => {
  const res = await agent.get('/api/protected');
  expect(res.statusCode).toBe(200);
});
\`\`\`

## Using a Test Database
Never run tests against production or development databases. Create a test database and connect to it only when \`NODE_ENV=test\`.

\`\`\`javascript
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});
\`\`\`

## Cleaning Up
After tests, clear the data so tests don't interfere with each other.

\`\`\`javascript
beforeEach(async () => {
  await User.deleteMany({});
});
\`\`\`

## Key Takeaways
- Use \`request.agent()\` to persist cookies between tests.
- Use a separate test database.
- Clean up data between tests.`
    }
  ]
};