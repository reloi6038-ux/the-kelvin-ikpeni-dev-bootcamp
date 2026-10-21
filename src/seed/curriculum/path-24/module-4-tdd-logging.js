module.exports = {
  title: "Module 4: TDD & Logging",
  description: "Writing tests first and logging like a pro.",
  order: 4,
  lessons: [
    {
      title: "Test-Driven Development (TDD)",
      slug: "tdd",
      order: 1,
      estimatedMinutes: 30,
      content: `# Test-Driven Development (TDD)

**Learning objectives:**
- Understand the TDD cycle
- Write a test before the code
- Refactor with confidence

## What is TDD?
TDD is a development methodology where you write the test **before** you write the code.

## The Red-Green-Refactor Cycle
1. **Red**: Write a test that fails (because the function doesn't exist yet).
2. **Green**: Write the minimal code to make the test pass.
3. **Refactor**: Clean up the code while keeping the test passing.

## Example
**Step 1 (Red)**:
\`\`\`javascript
test('validates email', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});
\`\`\`
This fails because \`isValidEmail\` doesn't exist.

**Step 2 (Green)**:
\`\`\`javascript
function isValidEmail(email) {
  return email.includes('@');
}
\`\`\`
The test passes.

**Step 3 (Refactor)**:
Improve the regex without breaking the test.

## Benefits of TDD
- **Design**: Writing tests first forces you to think about how the API will be used.
- **Coverage**: You never forget to write a test.
- **Confidence**: You can refactor without fear.

## Key Takeaways
- TDD = Test First.
- Red → Green → Refactor.
- It leads to cleaner, more maintainable code.`
    },
    {
      title: "Logging with Winston or Pino",
      slug: "logging",
      order: 2,
      estimatedMinutes: 30,
      content: `# Logging with Winston or Pino

**Learning objectives:**
- Understand why \`console.log\` isn't enough
- Set up Winston or Pino
- Log to files and external services

## Why Not console.log?
\`console.log\` is fine for development. But in production:
- It doesn't have severity levels (info, error, warn).
- It doesn't format timestamps.
- It can't easily save to files or external tools.
- It can't handle JSON formatting for structured logging.

## Winston
Winston is the most popular logging library.

\`\`\`bash
npm install winston
\`\`\`

\`\`\`javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.info('Server started');
logger.error('Database failed', { error: err.message });
\`\`\`

## Pino (Faster Alternative)
Pino is designed for high performance (it's faster than Winston).

\`\`\`bash
npm install pino pino-pretty
\`\`\`

\`\`\`javascript
const pino = require('pino');
const logger = pino({ level: 'info' });

logger.info('Server started');
logger.error({ err }, 'Database failed');
\`\`\`

## Log Levels
- **debug**: Detailed debugging info.
- **info**: General events (server start, user login).
- **warn**: Potential issues.
- **error**: Failures that need attention.

## Key Takeaways
- Use a logger in production, not \`console.log\`.
- Winston is feature-rich; Pino is faster.
- Log levels let you control what gets printed.`
    }
  ]
};