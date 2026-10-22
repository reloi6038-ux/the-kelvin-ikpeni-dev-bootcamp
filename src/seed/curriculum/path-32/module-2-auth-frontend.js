module.exports = {
  title: "Module 2: Authentication",
  description: "Login, registration, and protecting routes.",
  order: 2,
  lessons: [
    {
      title: "Displaying MongoDB Data Through APIs",
      slug: "displaying-data",
      order: 1,
      estimatedMinutes: 35,
      content: `# Displaying MongoDB Data Through APIs

**Learning objectives:**
- Connect Express routes to React
- Render arrays with \`.map()\`

## The Flow
1. React calls \`GET /api/courses\`.
2. Express queries MongoDB: \`Course.find()\`.
3. Express returns JSON: \`[{ _id, title, level }]\`.
4. React loops over the array and renders it.

## Implementation
\`\`\`jsx
function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses));
  }, []);

  return (
    <ul>
      {courses.map(course => (
        <li key={course._id}>{course.title}</li>
      ))}
    </ul>
  );
}
\`\`\``
    },
    {
      title: "Creating Frontend Registration Pages",
      slug: "registration-pages",
      order: 2,
      estimatedMinutes: 35,
      content: `# Creating Frontend Registration Pages

**Learning objectives:**
- Build a controlled form
- POST data to the register API

## The Form
\`\`\`jsx
function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      // Registration successful, redirect to login or dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={e => setForm({...form, name: e.target.value})} />
      {/* ... email and password inputs */}
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
\`\`\``
    },
    {
      title: "Building Login and Logout Interfaces",
      slug: "login-logout",
      order: 3,
      estimatedMinutes: 35,
      content: `# Building Login and Logout Interfaces

**Learning objectives:**
- Handle login requests
- Manage logout sessions

## Login
Very similar to registration, but you POST to \`/api/auth/login\`. Upon success, the backend sets an HTTP-only cookie (or returns a JWT).

\`\`\`javascript
const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
  credentials: 'include', // Crucial for cookies
});
\`\`\`

## Logout
Call the logout endpoint and clear local state.
\`\`\`javascript
await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
localStorage.removeItem('token'); // If using JWT
window.location.href = '/login';
\`\`\``
    },
    {
      title: "JWT Authentication in the Frontend",
      slug: "jwt-frontend",
      order: 4,
      estimatedMinutes: 35,
      content: `# JWT Authentication in the Frontend

**Learning objectives:**
- Store the JWT securely
- Send the JWT in headers

## Storing the Token
If your backend returns a JSON Web Token (JWT), you must store it. The two common places are:
1. **localStorage**: Easy, but vulnerable to XSS.
2. **HTTP-only Cookie**: Safer, but requires CSRF protection.

## Sending the Token
If stored in localStorage, attach it to the \`Authorization\` header.

\`\`\`javascript
const token = localStorage.getItem('token');

fetch('/api/protected-route', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\`

## Axios Interceptor
If using Axios, you can automate this:
\`\`\`javascript
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});
\`\`\``
    },
    {
      title: "Managing Authentication State",
      slug: "auth-state",
      order: 5,
      estimatedMinutes: 35,
      content: `# Managing Authentication State

**Learning objectives:**
- Use Context API for auth
- Persist login across reloads

## The Auth Context
Create a context to hold the user object globally.

\`\`\`jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setUser(data.user);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\``
    }
  ]
};