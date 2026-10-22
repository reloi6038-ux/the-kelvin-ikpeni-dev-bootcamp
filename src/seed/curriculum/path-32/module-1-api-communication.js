module.exports = {
  title: "Module 1: API Communication",
  description: "Connecting React and Express using Fetch and Axios.",
  order: 1,
  lessons: [
    {
      title: "Understanding Frontend and Backend Communication",
      slug: "frontend-backend-communication",
      order: 1,
      estimatedMinutes: 25,
      content: `# Understanding Frontend and Backend Communication

**Learning objectives:**
- Understand the separation of concerns
- Learn how JSON is used to pass data

## The Separation of Concerns
In modern web development, the frontend (React) and backend (Node.js/Express) are separate applications.
- The **Frontend** runs in the browser. It handles UI and user interactions.
- The **Backend** runs on a server. It handles business logic, authentication, and database operations.

## The Protocol
They communicate using **HTTP**.
1. Frontend sends an HTTP request to the Backend (e.g., \`GET /api/courses\`).
2. Backend processes the request, queries MongoDB, and formats the data as **JSON**.
3. Frontend receives the JSON and updates the UI.

## CORS
Because the frontend (e.g., \`localhost:5173\`) and backend (e.g., \`localhost:3000\`) usually run on different ports, the browser's Same-Origin Policy will block requests unless the backend enables **CORS** (Cross-Origin Resource Sharing).`
    },
    {
      title: "Connecting React to an Express.js API",
      slug: "connecting-react-express",
      order: 2,
      estimatedMinutes: 30,
      content: `# Connecting React to an Express.js API

**Learning objectives:**
- Serve the React app from Express
- Configure CORS in Express

## Option 1: Development Mode (Two Servers)
During development, React runs on Vite (port 5173), and Express runs on port 3000. You must enable CORS on the backend.

\`\`\`javascript
// Express backend
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
\`\`\`

## Option 2: Production Mode (One Server)
When you build React (\`npm run build\`), it creates static files. Express can serve them.

\`\`\`javascript
// Express backend
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
\`\`\``
    },
    {
      title: "Sending HTTP Requests with Fetch",
      slug: "fetch-requests",
      order: 3,
      estimatedMinutes: 30,
      content: `# Sending HTTP Requests with Fetch

**Learning objectives:**
- Use the native \`fetch\` API in React
- Handle async responses

## The Fetch API
\`fetch\` is built into all modern browsers.

\`\`\`javascript
async function fetchCourses() {
  try {
    const res = await fetch('http://localhost:3000/api/courses');
    
    // Critical: Fetch does NOT throw on 404 or 500 errors!
    if (!res.ok) {
      throw new Error(\`HTTP error! status: \${res.status}\`);
    }
    
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}
\`\`\`

## Sending Data (POST)
\`\`\`javascript
await fetch('http://localhost:3000/api/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Course' }),
  credentials: 'include' // Include cookies for sessions
});
\`\`\``
    },
    {
      title: "Using Axios",
      slug: "using-axios",
      order: 4,
      estimatedMinutes: 30,
      content: `# Using Axios

**Learning objectives:**
- Install and use Axios
- Compare Axios and Fetch

## What is Axios?
A promise-based HTTP client for the browser and Node.js. It is widely used because it has a simpler API than \`fetch\`.

## Installation
\`\`\`bash
npm install axios
\`\`\`

## Why Axios over Fetch?
1. **No double \`.then()\`**: Axios parses JSON automatically.
2. **Throws on 4xx/5xx**: \`fetch\` only throws on network errors. Axios throws on any bad HTTP status.
3. **Interceptors**: Add a token to every request automatically.

## Usage
\`\`\`javascript
import axios from 'axios';

async function getCourses() {
  try {
    const response = await axios.get('http://localhost:3000/api/courses');
    console.log(response.data); // Automatically parsed JSON
  } catch (error) {
    console.error(error.response.data.message);
  }
}
\`\`\``
    }
  ]
};