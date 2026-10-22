module.exports = {
  title: "Module 4: Routing & Context API",
  description: "Navigating between pages and sharing global state.",
  order: 4,
  lessons: [
    {
      title: "React Router and Navigation",
      slug: "react-router",
      order: 1,
      estimatedMinutes: 35,
      content: `# React Router and Navigation

**Learning objectives:**
- Set up React Router
- Create links and routes

## Installation
\`\`\`bash
npm install react-router-dom
\`\`\`

## Basic Setup
Wrap your app in a \`BrowserRouter\`, then define \`Routes\` and \`Route\` components.

\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## Navigation
Use the \`Link\` component instead of \`<a>\` so the page doesn't reload.
\`\`\`jsx
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
\`\`\``
    },
    {
      title: "Nested Routes and Protected Pages",
      slug: "nested-protected-routes",
      order: 2,
      estimatedMinutes: 35,
      content: `# Nested Routes and Protected Pages

**Learning objectives:**
- Create nested routes
- Protect routes from unauthenticated users

## Nested Routes
Use \`<Outlet />\` to render child routes inside a parent layout.
\`\`\`jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
\`\`\`

## Protected Routes
Create a wrapper component that checks if the user is logged in before rendering the page.
\`\`\`jsx
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
\`\`\``
    },
    {
      title: "Context API",
      slug: "context-api",
      order: 3,
      estimatedMinutes: 35,
      content: `# Context API

**Learning objectives:**
- Avoid prop drilling
- Share global state

## What is Prop Drilling?
Passing props down through 5 layers of components just to get data to the bottom.

## Context API
Creates a "global" data store for a specific part of your app.

## Example: Theme Context
\`\`\`jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function Button() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
\`\`\``
    },
    {
      title: "Custom React Hooks",
      slug: "custom-hooks",
      order: 4,
      estimatedMinutes: 30,
      content: `# Custom React Hooks

**Learning objectives:**
- Extract reusable logic
- Use the \`use\` prefix

## What is a Custom Hook?
A JavaScript function whose name starts with \`use\` and that calls other hooks.

## Example: useFetch
\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
\`\`\`

## Usage
\`\`\`jsx
function App() {
  const { data, loading } = useFetch('/api/courses');
  if (loading) return <p>Loading...</p>;
  return <div>{data.length} courses</p>;
}
\`\`\``
    }
  ]
};