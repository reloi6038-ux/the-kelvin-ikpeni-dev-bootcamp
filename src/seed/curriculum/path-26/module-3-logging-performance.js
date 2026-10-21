module.exports = {
  title: "Module 3: Logging & Performance",
  description: "Monitoring your app and making it fast.",
  order: 3,
  lessons: [
    {
      title: "Configuring Production CORS",
      slug: "production-cors",
      order: 1,
      estimatedMinutes: 25,
      content: `# Configuring Production CORS

**Learning objectives:**
- Understand why CORS configuration changes in production
- Allow only your frontend domain
- Handle credentials correctly

## Development vs Production
In development, you might use \`app.use(cors())\` which allows all origins (\`*\`). In production, this is a security risk.

## Production Setup
Only allow your specific frontend URL.

\`\`\`javascript
const cors = require('cors');

const corsOptions = {
  origin: 'https://myfrontend.com',
  credentials: true,
};

app.use(cors(corsOptions));
\`\`\`

## Multiple Origins
If you have a website and a mobile app, you can use a function:

\`\`\`javascript
const allowedOrigins = ['https://myfrontend.com', 'https://admin.myfrontend.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
\`\`\`

## Key Takeaways
- Never use \`*\` in production if you handle cookies.
- Explicitly list your domains.
- CORS is enforced by the browser, so it doesn't protect APIs from Postman.`
    },
    {
      title: "Application Logging and Monitoring",
      slug: "logging-monitoring",
      order: 2,
      estimatedMinutes: 30,
      content: `# Application Logging and Monitoring

**Learning objectives:**
- Set up structured logging
- Use log levels correctly
- Monitor errors with Sentry

## Why Logging Matters
In production, you don't have a console. Logs are your only window into what's happening.

## Structured Logging
Instead of writing plain text, use JSON. This makes logs searchable.

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

logger.info('User logged in', { userId: 1, ip: req.ip });
\`\`\`

## Log Levels
- **debug**: Detailed internal state.
- **info**: Normal events (server start, user login).
- **warn**: Unexpected but non-critical (failed login attempt).
- **error**: Critical failures (database crash).

## Error Monitoring with Sentry
Logs tell you what happened; Sentry tells you exactly *why*.

\`\`\`bash
npm install @sentry/node
\`\`\`

\`\`\`javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.errorHandler());
\`\`\`

Sentry sends you an email when a new error occurs, including the user's IP, the exact line of code, and the stack trace.

## Key Takeaways
- Use JSON logging (Winston or Pino) in production.
- Set the log level based on \`NODE_ENV\`.
- Use Sentry for real-time error tracking.`
    },
    {
      title: "Performance Optimization",
      slug: "performance-optimization",
      order: 3,
      estimatedMinutes: 30,
      content: `# Performance Optimization

**Learning objectives:**
- Use compression
- Optimize database queries
- Cache static assets

## 1. Gzip Compression
Compress responses before sending them to the client. It can reduce payload size by 70%.

\`\`\`bash
npm install compression
\`\`\`

\`\`\`javascript
const compression = require('compression');
app.use(compression());
\`\`\`

## 2. Database Optimization
- Use \`.lean()\` for read-only Mongoose queries.
- Add indexes to fields used in \`find()\` and \`sort()\`.
- Use pagination to prevent massive payloads.

## 3. Caching
Cache static files (images, CSS) and frequent API responses in Redis.

## 4. Remove Console Logs
\`console.log\` is synchronous and blocks the event loop. Use a logger (Winston/Pino) or remove logs before deploying.

## Key Takeaways
- Compression is a one-line fix for speed.
- \`.lean()\` and indexes are essential for database performance.
- Never use \`console.log\` in production.`
    }
  ]
};