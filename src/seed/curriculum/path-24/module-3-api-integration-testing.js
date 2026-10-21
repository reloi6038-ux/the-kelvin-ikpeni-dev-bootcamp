module.exports = {
  title: "Module 3: API & Integration Testing",
  description: "Testing real HTTP requests and mocking the database.",
  order: 3,
  lessons: [
    {
      title: "API Testing with Postman",
      slug: "postman-testing",
      order: 1,
      estimatedMinutes: 25,
      content: `# API Testing with Postman

**Learning objectives:**
- Test endpoints manually
- Organize requests in collections
- Use environment variables

## What is Postman?
Postman is a GUI tool for sending HTTP requests. It allows you to test your API without writing any frontend code.

## Testing a Route
1. Open Postman.
2. Select the method (GET, POST, etc.) and paste the URL (e.g., \`http://localhost:3000/api/courses\`).
3. For POST requests, go to the **Body** tab, select **raw**, and choose **JSON**.
4. Paste your JSON payload: \`{"title": "New Course"}\`.
5. Click **Send**.

## Environment Variables
Instead of typing \`http://localhost:3000\` everywhere, create an environment:
1. Click the gear icon → Environments → Add.
2. Add a variable: \`baseUrl\` = \`http://localhost:3000\`.
3. In your requests, use \`{{baseUrl}}/api/courses\`.

## Collections
Group related requests into a collection (e.g., "Auth", "Courses"). You can export this collection and share it with your team.

## Key Takeaways
- Postman is for manual API testing.
- Environments keep your URLs clean.
- Collections organize your requests.`
    },
    {
      title: "Integration Testing with Supertest",
      slug: "supertest-integration",
      order: 2,
      estimatedMinutes: 35,
      content: `# Integration Testing with Supertest

**Learning objectives:**
- Test your Express API programmatically
- Use Supertest with Jest
- Verify status codes and response bodies

## What is Integration Testing?
Instead of testing a single function, you test the whole HTTP flow (route → controller → database). This ensures all the pieces work together.

## Setting up Supertest
\`\`\`bash
npm install --save-dev supertest
\`\`\`

## The Setup
You need to export your Express \`app\` without listening on a port.
\`\`\`javascript
// app.js
module.exports = app;

// server.js
const app = require('./app');
app.listen(3000);
\`\`\`

## Writing the Test
\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/health', () => {
  it('should return 200 OK and success true', async () => {
    const res = await request(app).get('/api/health');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
\`\`\`

## Testing a POST Route
\`\`\`javascript
it('should create a new course', async () => {
  const res = await request(app)
    .post('/api/courses')
    .send({ title: 'New Course', slug: 'new-course' });
    
  expect(res.statusCode).toBe(201);
  expect(res.body.course.title).toBe('New Course');
});
\`\`\`

## Key Takeaways
- Supertest lets you test your API without starting a server manually.
- It mimics a real client (status codes, headers, body).
- Always test both success and failure scenarios.`
    },
    {
      title: "Mocking Databases and External Services",
      slug: "mocking",
      order: 3,
      estimatedMinutes: 35,
      content: `# Mocking Databases and External Services

**Learning objectives:**
- Understand why we mock
- Mock a function with Jest
- Mock the database for fast tests

## Why Mock?
Your integration tests shouldn't touch the real database. If they do:
- They are slow.
- They mutate real data.
- They fail if the database is down.

## Mocking a Function
Jest lets you create fake functions.
\`\`\`javascript
const sendEmail = jest.fn();

sendEmail('test@example.com');
expect(sendEmail).toHaveBeenCalledWith('test@example.com');
\`\`\`

## Mocking a Module
If your controller imports \`User\`, you can mock it.

\`\`\`javascript
jest.mock('../models/User');

const User = require('../models/User');

User.findById.mockResolvedValue({ id: 1, name: 'Alice' });
\`\`\`

Now, when the controller calls \`User.findById()\`, it returns the mock data instantly, without touching MongoDB.

## Mocking an External API
If your code calls Stripe or OpenAI, don't make real requests in tests. Mock \`axios\` or \`fetch\`.

\`\`\`javascript
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);
\`\`\`

## Key Takeaways
- Mock databases and third-party APIs for fast, isolated tests.
- Use \`jest.mock()\` to replace modules.
- Use \`jest.fn()\` to create fake functions.`
    }
  ]
};