module.exports = {
  title: "Module 2: Request, Response & Parameters",
  description: "Handling incoming data and sending dynamic responses.",
  order: 2,
  lessons: [
    {
      title: "Request and Response Objects",
      slug: "request-response-objects",
      order: 1,
      estimatedMinutes: 30,
      content: `# Request and Response Objects

**Learning objectives:**
- Explore the \`req\` object properties
- Master the \`res\` object methods
- Understand the request-response lifecycle

## The \`req\` (Request) Object
The request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.

\`\`\`javascript
app.post('/api/users', (req, res) => {
  console.log(req.method);  // "POST"
  console.log(req.path);    // "/api/users"
  console.log(req.ip);      // "::1"
  console.log(req.headers['user-agent']);
});
\`\`\`

## The \`res\` (Response) Object
The response object represents the HTTP response that an Express app sends when it gets an HTTP request.

### Common Methods
- \`res.send(string)\`: Sends a text, HTML, or Buffer response.
- \`res.json(object)\`: Sends a JSON response.
- \`res.status(code)\`: Sets the HTTP status code.
- \`res.redirect(url)\`: Redirects the client.
- \`res.sendFile(path)\`: Sends a file (like an HTML page).

## Chaining Status and JSON
You can chain methods because \`res.status()\` returns the response object:

\`\`\`javascript
app.get('/api/error', (req, res) => {
  res.status(404).json({ error: "Not found" });
});
\`\`\`

**Important:** You can only send **one** response per request. If you call \`res.send()\` twice, Express will throw an error.

## Key Takeaways
- \`req\` holds everything about the incoming request
- \`res\` is used to craft the outgoing reply
- Always return \`res.send()\`, \`res.json()\`, or \`res.sendFile()\``
    },
    {
      title: "Route Parameters and Query Parameters",
      slug: "route-query-parameters",
      order: 2,
      estimatedMinutes: 35,
      content: `# Route Parameters and Query Parameters

**Learning objectives:**
- Capture dynamic segments in the URL
- Read query strings from the request
- Understand when to use each type

## Route Parameters
Route parameters are named URL segments used to capture values at specific positions in the URL. They are defined with a colon (\`:\`).

\`\`\`javascript
app.get('/api/courses/:slug', (req, res) => {
  const slug = req.params.slug;
  res.json({ course: slug });
});
\`\`\`

If a user visits \`/api/courses/html5\`, \`req.params\` will be \`{ slug: 'html5' }\`.

### Multiple Parameters
\`\`\`javascript
app.get('/api/courses/:courseId/lessons/:lessonId', (req, res) => {
  const { courseId, lessonId } = req.params;
  res.json({ courseId, lessonId });
});
\`\`\`

## Query Parameters
Query parameters are appended to the URL after a question mark (\`?\`). They are used for filtering, sorting, and pagination.

\`\`\`javascript
app.get('/api/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ query: q, limit });
});
\`\`\`

If a user visits \`/api/search?q=express&limit=10\`, \`req.query\` will be \`{ q: 'express', limit: '10' }\`.

## Route vs Query
- **Route Parameter**: Identifies a specific resource (\`/users/123\`).
- **Query Parameter**: Modifies how the resource is displayed (\`/users?sort=desc\`).

## Key Takeaways
- \`req.params\` reads the parts of the URL defined with \`:\`
- \`req.query\` reads the key-value pairs after the \`?\`
- Values from both are always strings (parse them if needed)`
    },
    {
      title: "Handling HTML Forms and Request Bodies",
      slug: "forms-and-request-bodies",
      order: 3,
      estimatedMinutes: 35,
      content: `# Handling HTML Forms and Request Bodies

**Learning objectives:**
- Parse incoming JSON payloads
- Parse URL-encoded form submissions
- Access the parsed data via \`req.body\`

## The Problem
When a client submits a form or sends JSON via \`fetch()\`, the data is sent in the request body. Express does **not** parse the body by default.

## The Solution: Built-in Middleware
Express includes middleware to parse incoming bodies.

### 1. JSON Body Parser
For API requests sending JSON (e.g., React, Fetch, Postman):
\`\`\`javascript
app.use(express.json());
\`\`\`

### 2. URL-Encoded Parser
For traditional HTML \`<form>\` submissions:
\`\`\`javascript
app.use(express.urlencoded({ extended: true }));
\`\`\`

## Usage
Once the middleware is applied at the top of your app, you can access the data via \`req.body\`:

\`\`\`javascript
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  
  res.json({ success: true, email });
});
\`\`\`

## Security Warning
Never trust \`req.body\`. A malicious user can send anything (missing fields, injection attacks, huge payloads). Always validate the data on the server.

## Key Takeaways
- \`express.json()\` is required for modern APIs
- \`express.urlencoded()\` is required for standard forms
- Parsed data is available in \`req.body\``
    }
  ]
};