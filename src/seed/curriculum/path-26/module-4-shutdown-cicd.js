module.exports = {
  title: "Module 4: Shutdown & CI/CD",
  description: "Handling failures and automating deployment.",
  order: 4,
  lessons: [
    {
      title: "Database Connection Pooling",
      slug: "connection-pooling",
      order: 1,
      estimatedMinutes: 25,
      content: `# Database Connection Pooling

**Learning objectives:**
- Understand connection limits
- Configure pooling correctly

## The Problem
Every time a user makes a request, your server needs to talk to the database. Creating a new connection every time is extremely slow and quickly exhausts the database's limits.

## The Solution
Connection pooling keeps a set of connections open and reuses them.

Mongoose handles this automatically. By default, the pool size is 100.

\`\`\`javascript
mongoose.connect(uri, {
  maxPoolSize: 10 // Set based on your database limits
});
\`\`\`

## What Number Should I Use?
- **Small apps**: 10 is plenty.
- **Large apps**: 50-100.
- Check your MongoDB Atlas tier limits. If you have 100 concurrent users and a pool of 5, users will wait in line.

## Key Takeaways
- Pooling reuses connections.
- Don't set \`maxPoolSize\` higher than your DB can handle.
- Mongoose's default (100) is fine for most apps.`
    },
    {
      title: "Graceful Shutdown and Error Recovery",
      slug: "graceful-shutdown",
      order: 2,
      estimatedMinutes: 30,
      content: `# Graceful Shutdown and Error Recovery

**Learning objectives:**
- Prevent data corruption on crash
- Handle uncaught exceptions
- Implement graceful shutdown

## The Danger of Hard Crashes
If you kill your server while it's writing to the database, you can corrupt data or drop in-flight requests.

## Graceful Shutdown
Listen for termination signals (\`SIGINT\`, \`SIGTERM\`), stop accepting new requests, finish current ones, then exit.

\`\`\`javascript
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections.');
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});
\`\`\`

## Uncaught Exceptions
If an error is thrown outside a \`try/catch\`, Node.js crashes. You should log it and exit gracefully.

\`\`\`javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
\`\`\`

## Unhandled Rejections
If a Promise rejects without a \`.catch()\`, you get an unhandled rejection.

\`\`\`javascript
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
\`\`\`

## Key Takeaways
- Handle \`SIGTERM\` to allow in-flight requests to finish.
- Log and exit on uncaught exceptions.
- Never leave the process hanging in an unknown state.`
    },
    {
      title: "Continuous Integration and Continuous Deployment (CI/CD)",
      slug: "ci-cd",
      order: 3,
      estimatedMinutes: 35,
      content: `# Continuous Integration and Continuous Deployment (CI/CD)

**Learning objectives:**
- Automate testing and deployment
- Set up GitHub Actions
- Understand CI vs CD

## What is CI/CD?
- **CI (Continuous Integration)**: Automatically run tests when code is pushed.
- **CD (Continuous Deployment)**: Automatically deploy to production if tests pass.

## GitHub Actions
GitHub Actions is built into GitHub. You define workflows in \`.github/workflows/\`.

## Example: Test on Push
Create \`.github/workflows/test.yml\`:

\`\`\`yaml
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test
\`\`\`

## Example: Deploy to Render
Render already auto-deploys on push. But if you want to test *before* deploying, set up GitHub Actions to run tests, and only merge to \`main\` if tests pass (via branch protection).

## Key Takeaways
- CI catches bugs before they merge.
- CD deploys automatically.
- GitHub Actions is free and integrated into GitHub.`
    }
  ]
};