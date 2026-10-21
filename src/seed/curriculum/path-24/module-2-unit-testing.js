module.exports = {
  title: "Module 2: Unit Testing",
  description: "Testing small pieces of code in isolation.",
  order: 2,
  lessons: [
    {
      title: "Unit Testing with Node.js",
      slug: "node-unit-testing",
      order: 1,
      estimatedMinutes: 30,
      content: `# Unit Testing with Node.js

**Learning objectives:**
- Understand the testing pyramid
- Write a unit test
- Use Node's built-in test runner

## What is Unit Testing?
Unit testing means testing a single function or module in isolation. It verifies that the smallest pieces of your code work correctly.

## The Testing Pyramid
- **Unit Tests**: Fast, cheap, many. Test individual functions.
- **Integration Tests**: Medium. Test multiple modules together.
- **End-to-End (E2E) Tests**: Slow, expensive, few. Test the whole app from a user's perspective.

## Node.js Built-in Test Runner
As of Node 18+, you don't even need a library to write unit tests. You can use the \`node:test\` module.

Create a file called \`math.js\`:
\`\`\`javascript
function add(a, b) {
  return a + b;
}
module.exports = { add };
\`\`\`

Create \`math.test.js\`:
\`\`\`javascript
const test = require('node:test');
const assert = require('node:assert');
const { add } = require('./math');

test('adds 1 + 2 to equal 3', () => {
  assert.strictEqual(add(1, 2), 3);
});

test('adds negative numbers correctly', () => {
  assert.strictEqual(add(-1, -2), -3);
});
\`\`\`

## Running the Tests
\`\`\`bash
node --test
\`\`\`

You will see a summary of passed and failed tests.

## Key Takeaways
- Unit tests are fast and isolate specific functions.
- Node has a built-in test runner.
- If the test fails, the error tells you exactly which assertion broke.`
    },
    {
      title: "Testing with Jest or Vitest",
      slug: "jest-vitest",
      order: 2,
      estimatedMinutes: 35,
      content: `# Testing with Jest or Vitest

**Learning objectives:**
- Understand the difference between built-in and third-party test runners
- Set up Jest
- Write describe and it blocks

## Why Use Jest or Vitest?
While Node's built-in runner is good, **Jest** is the industry standard. It comes with powerful mocking, snapshot testing, and a great watch mode. **Vitest** is a faster, modern alternative.

## Setting up Jest
\`\`\`bash
npm install --save-dev jest
\`\`\`

Update \`package.json\`:
\`\`\`json
"scripts": {
  "test": "jest"
}
\`\`\`

## Writing a Test
Jest uses \`describe\` (to group tests) and \`it\` (or \`test\`).

\`\`\`javascript
const { add } = require('./math');

describe('Math Module', () => {
  it('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should add negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
\`\`\`

## Common Matchers
- \`expect(value).toBe(x)\`: Strict equality (===)
- \`expect(value).toEqual(x)\`: Deep equality (for objects/arrays)
- \`expect(value).toBeTruthy()\`: Checks if truthy
- \`expect(value).toContain(x)\`: Checks if an array/string contains x
- \`expect(fn).toThrow()\`: Checks if a function throws an error

## Key Takeaways
- Jest is the most popular testing framework.
- \`describe\` groups tests; \`it\` defines a single test.
- Matchers (\`toBe\`, \`toEqual\`) let you assert the expected outcome.`
    }
  ]
};