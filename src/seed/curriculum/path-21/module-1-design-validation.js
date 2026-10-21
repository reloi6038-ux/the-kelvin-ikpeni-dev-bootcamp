module.exports = {
  title: "Module 1: API Design & Validation",
  description: "Master REST principles, versioning, and bulletproof validation.",
  order: 1,
  lessons: [
    {
      title: "REST API Design Principles",
      slug: "rest-api-design",
      order: 1,
      estimatedMinutes: 35,
      content: `# REST API Design Principles

**Learning objectives:**
- Understand the 6 constraints of REST
- Design resource-oriented URLs
- Choose correct HTTP status codes

## What is REST?
REST (Representational State Transfer) is an architectural style for designing networked applications. It is not a protocol or a standard, but a set of constraints.

## The 6 Constraints
1. **Client-Server**: Separation of UI and data storage.
2. **Stateless**: Each request must contain all information needed to process it.
3. **Cacheable**: Responses must define themselves as cacheable or not.
4. **Uniform Interface**: Consistency in how resources are accessed.
5. **Layered System**: Client cannot tell if it's connected directly to the end server or an intermediary.
6. **Code on Demand (Optional)**: Servers can extend client functionality by sending executable code (like JS).

## Resource Naming
Use **nouns** for URLs, not verbs.

### ❌ Bad (Action-oriented)
\`\`\`
GET /getAllUsers
POST /createUser
POST /deleteUser?id=1
\`\`\`

### ✅ Good (Resource-oriented)
\`\`\`
GET /users
GET /users/1
POST /users
DELETE /users/1
\`\`\`

## Status Codes
Use the right code for the right situation:
- **200 OK**: Standard success.
- **201 Created**: Successfully created a resource (return the new resource).
- **204 No Content**: Success but nothing to return (usually DELETE).
- **400 Bad Request**: Client error (validation failed).
- **401 Unauthorized**: Not logged in.
- **403 Forbidden**: Logged in, but no permission.
- **404 Not Found**: Resource doesn't exist.
- **429 Too Many Requests**: Rate limited.
- **500 Internal Server Error**: Server crashed.

## Key Takeaways
- REST is about resources, not actions.
- URLs are nouns; HTTP methods are the verbs.
- Use standard status codes correctly.`
    },
    {
      title: "API Versioning",
      slug: "api-versioning",
      order: 2,
      estimatedMinutes: 25,
      content: `# API Versioning

**Learning objectives:**
- Understand why APIs need versioning
- Compare URI, Header, and Query versioning
- Implement versioning in Express

## Why Version Your API?
When you change an API, you risk breaking existing clients (mobile apps, partner integrations). Versioning allows you to introduce breaking changes without breaking the old clients.

## 1. URI Versioning (Most Common)
Put the version in the URL path.

\`\`\`javascript
app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v2/users', require('./routes/v2/users'));
\`\`\`

**Pros:** Easy to see, easy to cache, easy for clients to understand.
**Cons:** URLs change, which some purists argue breaks REST.

## 2. Header Versioning
Send the version in a custom header.

\`\`\`
GET /api/users
Accept-Version: v1
\`\`\`

**Pros:** URLs stay clean.
**Cons:** Harder to test in a browser, harder to cache.

## 3. Query Parameter Versioning
Send the version in the query string.

\`\`\`
GET /api/users?version=1
\`\`\`

**Pros:** Easy to implement.
**Cons:** Makes URLs messy.

## When to Bump the Version
Only bump the major version (v1 → v2) when you make a **breaking change**:
- Removing a field.
- Changing a field's data type.
- Changing URL structure.

Adding a new field is not a breaking change (clients should ignore unknown fields).

## Key Takeaways
- URI versioning (\`/api/v1/\`) is the industry standard.
- Only version when you make breaking changes.
- Support the old version for a transition period.`
    },
    {
      title: "Advanced Request Validation",
      slug: "advanced-validation",
      order: 3,
      estimatedMinutes: 30,
      content: `# Advanced Request Validation

**Learning objectives:**
- Sanitize incoming data
- Validate complex nested objects
- Use \`joi\` or \`zod\` for schema validation

## The Golden Rule
**Never trust the client.** Even if you have frontend validation, attackers can bypass it and send malformed data directly to your API.

## Manual vs Schema Validation
For simple fields, manual checks work:
\`\`\`javascript
if (!req.body.email.includes('@')) throw new Error("Invalid email");
\`\`\`

For complex data, use a schema validation library like **Joi** or **Zod**.

## Using Joi (Classic)
\`\`\`bash
npm install joi
\`\`\`

\`\`\`javascript
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
  role: Joi.string().valid('student', 'admin').default('student')
});

app.post('/api/users', (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  
  // 'value' contains the sanitized data
  res.json({ user: value });
});
\`\`\`

## Using Zod (Modern)
Zod is TypeScript-first but works great in JavaScript.

\`\`\`javascript
const { z } = require('zod');

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

app.post('/api/users', (req, res) => {
  try {
    const data = schema.parse(req.body);
    res.json({ user: data });
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
});
\`\`\`

## Key Takeaways
- Manual checks work for 1-2 fields.
- Use a validation library for complex schemas.
- Always sanitize and validate before touching the database.`
    }
  ]
};