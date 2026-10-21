module.exports = {
  title: "Module 4: Async, JSON & Error Handling",
  description: "The core of Node.js: non-blocking code and data.",
  order: 4,
  lessons: [
    {
      title: "Asynchronous JavaScript: Callbacks, Promises, async/await",
      slug: "async-javascript",
      order: 1,
      estimatedMinutes: 40,
      content: `# Asynchronous JavaScript

**Learning objectives:**
- Understand why Node.js is asynchronous
- Write Promises
- Use \`async/await\` for clean code

## The Single Thread
Node.js has a single thread. It cannot wait for a slow operation (like reading a 1GB file) to finish. If it did, the entire server would freeze.

## Callbacks (The Old Way)
\`\`\`javascript
fs.readFile('data.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
\`\`\`
Callbacks lead to "Callback Hell" when you nest them.

## Promises (The Better Way)
A Promise represents a future value.
\`\`\`javascript
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

## async/await (The Modern Way)
It looks like synchronous code, but it's asynchronous.
\`\`\`javascript
async function getData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Failed:", err);
  }
}
\`\`\`

- \`async\` marks a function as returning a Promise.
- \`await\` pauses execution until the Promise resolves.

## Key Takeaways
- Backend code is mostly I/O (database, files, network).
- \`async/await\` is the standard way to handle async tasks in Node.
- Always wrap \`await\` in \`try/catch\`.`
    },
    {
      title: "Error Handling in JavaScript",
      slug: "error-handling-js",
      order: 2,
      estimatedMinutes: 30,
      content: `# Error Handling in JavaScript

**Learning objectives:**
- Use \`try/catch\` blocks
- Throw custom errors
- Handle errors in async functions

## The \`try/catch\` Block
When you think code might fail, wrap it in a try block:
\`\`\`javascript
try {
  const data = JSON.parse('invalid json');
} catch (err) {
  console.error("Parsing failed:", err.message);
}
\`\`\`

If \`JSON.parse\` throws, the \`catch\` block captures it, preventing the server from crashing.

## Throwing Errors
You can create your own errors:
\`\`\`javascript
if (password.length < 8) {
  throw new Error("Password too short");
}
\`\`\`

## Custom Error Properties
For web APIs, it's helpful to attach a status code to the error:
\`\`\`javascript
const err = new Error("User not found");
err.statusCode = 404;
throw err;
\`\`\`

## Async Error Handling
With \`async/await\`, you must use \`try/catch\`:
\`\`\`javascript
async function login() {
  try {
    const user = await db.findUser();
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

## Unhandled Rejections
If a Promise fails and you don't catch it, Node will crash (in newer versions). Always handle your errors.

## Key Takeaways
- \`try/catch\` prevents crashes.
- Use \`throw new Error()\` for custom logic.
- Attach status codes to errors for API responses.`
    },
    {
      title: "Introduction to JSON",
      slug: "intro-to-json",
      order: 3,
      estimatedMinutes: 25,
      content: `# Introduction to JSON

**Learning objectives:**
- Understand JSON syntax
- Convert between JavaScript objects and JSON strings
- Why JSON is the standard for APIs

## What is JSON?
**JavaScript Object Notation**. It's a lightweight format for storing and transporting data. It is the standard language of the web API.

## JSON Syntax
JSON looks like a JavaScript object, but it's strictly text.
\`\`\`json
{
  "name": "Kelvin",
  "role": "Admin",
  "active": true,
  "courses": ["HTML", "CSS"],
  "details": {
    "age": 30
  }
}
\`\`\`

**Strict Rules:**
- Keys **must** be in double quotes.
- No trailing commas.
- No comments.
- No functions.

## Parsing and Stringifying
In Node, you receive JSON as a string and must parse it into an object. When you send data, you convert an object to a JSON string.

\`\`\`javascript
const jsonString = '{"name":"Alice","age":25}';

// String -> Object
const obj = JSON.parse(jsonString);
console.log(obj.name); // "Alice"

// Object -> String
const str = JSON.stringify(obj);
console.log(str); // '{"name":"Alice","age":25}'
\`\`\`

## Why JSON?
JSON is compact, human-readable, and maps directly to JavaScript objects (and arrays/dictionaries in other languages).

## Key Takeaways
- JSON is a text format.
- \`JSON.parse()\` converts string to object.
- \`JSON.stringify()\` converts object to string.`
    },
    {
      title: "Introduction to APIs",
      slug: "intro-to-apis",
      order: 4,
      estimatedMinutes: 30,
      content: `# Introduction to APIs

**Learning objectives:**
- Understand what an API is
- Learn the difference between REST and other types
- Explore endpoint design

## What is an API?
**Application Programming Interface**. It is a messenger that takes requests and tells a system what you want to do, then returns the response back to you.

Think of a restaurant menu. You don't go into the kitchen to cook. You tell the waiter what you want. The waiter (API) tells the kitchen (database), and brings you the result.

## REST APIs
REST (Representational State Transfer) is the most common architectural style for APIs. It uses standard HTTP methods.

### Endpoint Design
An endpoint is a URL that the API exposes.

- \`GET /api/courses\` → Get all courses.
- \`GET /api/courses/1\` → Get course with ID 1.
- \`POST /api/courses\` → Create a new course.
- \`DELETE /api/courses/1\` → Delete course 1.

## API Responses
APIs almost always return JSON.

\`\`\`json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Intro to APIs" }
  ]
}
\`\`\`

## Why APIs?
- **Decoupling**: Frontend doesn't care if the backend is Node, Python, or Java.
- **Reusability**: The same API can serve a website, a mobile app, and a smartwatch.

## Key Takeaways
- API = Messenger between two systems.
- REST uses HTTP verbs to act on resources.
- Responses are typically JSON.`
    }
  ]
};