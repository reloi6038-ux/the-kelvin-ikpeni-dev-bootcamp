module.exports = {
  title: "Module 5: Advanced Express Features",
  description: "Cookies, uploads, validation, and RESTful APIs.",
  order: 5,
  lessons: [
    {
      title: "Handling 404 Not Found Errors",
      slug: "handling-404-errors",
      order: 1,
      estimatedMinutes: 25,
      content: `# Handling 404 Not Found Errors

**Learning objectives:**
- Catch all unmatched routes
- Return a custom 404 page or JSON
- Prevent Express from hanging on invalid URLs

## The Problem
If a user visits a URL that doesn't exist (e.g., \`/api/unknown\`), Express will return its default HTML error page: "Cannot GET /api/unknown". In an API, we want JSON. In a web app, we want a styled 404 page.

## The Solution: Catch-All Middleware
Place this middleware **after** all your routes but **before** the error handler:

\`\`\`javascript
// All routes are defined above this point
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
\`\`\`

Because middleware runs in order, only requests that didn't match any route will reach this point.

## Custom 404 Page
For a traditional website, send a custom HTML file:

\`\`\`javascript
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
\`\`\`

## Split Routing (API vs Web)
If you have both an API and a website, you can split the 404 handling:

\`\`\`javascript
// API catch-all
app.use('/api', (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Web catch-all
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
\`\`\`

## Key Takeaways
- 404 handlers are just normal middleware
- Order matters: put them **after** all valid routes
- Return JSON for APIs, HTML for websites`
    },
    {
      title: "Working with Cookies",
      slug: "working-with-cookies",
      order: 2,
      estimatedMinutes: 30,
      content: `# Working with Cookies

**Learning objectives:**
- Parse cookies sent by the client
- Set new cookies
- Understand cookie security flags

## Reading Cookies
Express doesn't parse cookies out of the box. You need the \`cookie-parser\` middleware:

\`\`\`bash
npm install cookie-parser
\`\`\`

\`\`\`javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/read-cookie', (req, res) => {
  const myCookie = req.cookies.myCookie;
  res.send(\`Cookie value: \${myCookie}\`);
});
\`\`\`

## Setting Cookies
Use \`res.cookie(name, value, options)\`:

\`\`\`javascript
app.get('/set-cookie', (req, res) => {
  res.cookie('theme', 'dark', { maxAge: 900000 });
  res.send('Cookie has been set');
});
\`\`\`

## Cookie Security Options
When setting cookies, especially for authentication, use these flags:

- \`httpOnly: true\`: The cookie cannot be read by JavaScript in the browser (prevents XSS attacks).
- \`secure: true\`: The cookie is only sent over HTTPS (prevents MITM).
- \`sameSite: 'strict'\` or \`'lax'\`: Prevents the cookie from being sent in cross-site requests (prevents CSRF).

\`\`\`javascript
res.cookie('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
\`\`\`

## Key Takeaways
- Use \`cookie-parser\` to read cookies
- Use \`res.cookie()\` to set them
- Always secure sensitive cookies with \`httpOnly\` and \`secure\``
    },
    {
      title: "File Uploads with Express.js",
      slug: "file-uploads",
      order: 3,
      estimatedMinutes: 40,
      content: `# File Uploads with Express.js

**Learning objectives:**
- Handle multipart/form-data
- Use the \`multer\` middleware
- Save uploaded files to disk or memory

## The Challenge
HTML forms that upload files use \`enctype="multipart/form-data"\`. Express's built-in body parsers can't handle this format.

## Enter Multer
\`multer\` is the standard middleware for handling \`multipart/form-data\`.

\`\`\`bash
npm install multer
\`\`\`

## Basic Setup
\`\`\`javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});
\`\`\`

- \`upload.single('file')\` expects a file in a form field named \`file\`.
- The file is saved to the \`uploads/\` folder on the server.
- File metadata (name, size, path) is available in \`req.file\`.

## Custom Storage Engine
Instead of disk storage, you can store the file in memory, or customize the filename:

\`\`\`javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });
\`\`\`

## Multiple Files
\`\`\`javascript
app.post('/api/upload-multiple', upload.array('photos', 5), (req, res) => {
  res.json({ files: req.files });
});
\`\`\`

## Key Takeaways
- Standard Express can't parse file uploads
- Multer is the standard solution
- Always validate file types and sizes for security`
    },
    {
      title: "API Request Validation",
      slug: "api-request-validation",
      order: 4,
      estimatedMinutes: 35,
      content: `# API Request Validation

**Learning objectives:**
- Understand why server-side validation is mandatory
- Validate request bodies manually
- Use libraries like \`express-validator\`

## The Golden Rule
**Never trust the client.** Even if you have frontend validation, a user can bypass it and send malformed data directly to your API.

## Manual Validation (Simple)
\`\`\`javascript
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || name.length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters" });
  }
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: "Invalid email" });
  }
  
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }
  
  // Proceed with valid data
});
\`\`\`

## Using \`express-validator\`
For complex rules, use a library:

\`\`\`bash
npm install express-validator
\`\`\`

\`\`\`javascript
const { body, validationResult } = require('express-validator');

app.post(
  '/api/users',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Proceed
  }
);
\`\`\`

## Key Takeaways
- Always validate on the server
- Manual checks work for simple cases
- Use \`express-validator\` for complex rules and better error messages`
    },
    {
      title: "Building RESTful APIs",
      slug: "building-restful-apis",
      order: 5,
      estimatedMinutes: 40,
      content: `# Building RESTful APIs

**Learning objectives:**
- Understand REST principles
- Name endpoints and choose methods correctly
- Design resource-oriented URLs

## What is REST?
REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol — in almost all cases, HTTP.

## The Core Principles
1. **Client-Server**: Separate frontend and backend.
2. **Stateless**: Each request contains all the info needed (no server session memory).
3. **Cacheable**: Responses can be cached.
4. **Uniform Interface**: Standard HTTP methods.

## Designing Endpoints
REST APIs are designed around **resources** (nouns), not actions (verbs).

### ❌ Bad (Action-based)
\`\`\`
GET /getAllCourses
POST /createCourse
POST /deleteCourse?id=1
\`\`\`

### ✅ Good (Resource-based)
\`\`\`
GET /api/courses         → List all courses
GET /api/courses/1       → Get course 1
POST /api/courses        → Create a new course
PUT /api/courses/1       → Update course 1 entirely
PATCH /api/courses/1     → Partial update of course 1
DELETE /api/courses/1    → Delete course 1
\`\`\`

## Status Codes
- \`200 OK\`: Success (GET, PUT, PATCH, DELETE)
- \`201 Created\`: Success (POST)
- \`204 No Content\`: Success with no body (often DELETE)
- \`400 Bad Request\`: Validation failed
- \`401 Unauthorized\`: Not logged in
- \`403 Forbidden\`: Logged in but no permission
- \`404 Not Found\`: Resource doesn't exist
- \`500 Internal Server Error\`: Server crashed

## Key Takeaways
- REST = Resources + HTTP verbs
- URLs should be nouns, not verbs
- Use status codes to communicate results`
    },
    {
      title: "Testing Express.js Endpoints",
      slug: "testing-express-endpoints",
      order: 6,
      estimatedMinutes: 40,
      content: `# Testing Express.js Endpoints

**Learning objectives:**
- Understand why API testing matters
- Test endpoints using Supertest
- Test both success and failure paths

## Why Test APIs?
APIs are contracts. If you break an endpoint, every client (web, mobile, partners) breaks with it. Automated tests prevent regressions.

## Tools
- **Jest** or **Mocha**: Test runners.
- **Supertest**: HTTP assertions for Express.

## Setting Up Supertest
\`\`\`bash
npm install --save-dev jest supertest
\`\`\`

## Writing a Test
\`\`\`javascript
const request = require('supertest');
const app = require('../server'); // Export your Express app

describe('GET /api/health', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
\`\`\`

## Testing a POST Endpoint
\`\`\`javascript
describe('POST /api/login', () => {
  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'wrong@example.com', password: 'wrong' });
      
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toBe("Invalid credentials");
  });
});
\`\`\`

## Key Takeaways
- Supertest allows you to test your Express app without starting the server manually
- Always test both the "happy path" and the error cases
- Tests give you confidence to refactor code`
    }
  ]
};