module.exports = {
  title: "Module 3: Hooks & Data Fetching",
  description: "Forms, effects, and API integration.",
  order: 3,
  lessons: [
    {
      title: "Forms in React",
      slug: "forms-in-react",
      order: 1,
      estimatedMinutes: 30,
      content: `# Forms in React

**Learning objectives:**
- Build controlled components
- Handle form submission

## Controlled Components
In React, form elements should be controlled by state. This means the value of the input is tied to a state variable, and \`onChange\` updates the state.

\`\`\`jsx
function LoginForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\``
    },
    {
      title: "React Hooks",
      slug: "react-hooks",
      order: 2,
      estimatedMinutes: 25,
      content: `# React Hooks

**Learning objectives:**
- Understand what hooks are
- Follow the rules of hooks

## What are Hooks?
Hooks are functions that let you "hook into" React features from functional components. They were introduced in React 16.8 to avoid writing class components.

## Common Hooks
- \`useState\`: Manages state.
- \`useEffect\`: Handles side effects (like fetching data or timers).
- \`useContext\`: Accesses global state.
- \`useRef\`: References a DOM element.

## Rules of Hooks
1. Only call hooks at the top level of a component. Do not put them inside loops, conditions, or nested functions.
2. Only call hooks from React function components or custom hooks.`
    },
    {
      title: "Using useEffect",
      slug: "using-useeffect",
      order: 3,
      estimatedMinutes: 35,
      content: `# Using useEffect

**Learning objectives:**
- Run side effects
- Understand the dependency array

## What are Side Effects?
Things that happen outside of the normal render cycle, like fetching data, setting timers, or listening to events.

## The Syntax
\`\`\`jsx
import { useEffect } from 'react';

useEffect(() => {
  // Side effect goes here
  console.log('Component mounted or updated');

  return () => {
    // Cleanup function (optional)
    console.log('Component unmounting');
  };
}, [dependencies]);
\`\`\`

## The Dependency Array
- \`[]\`: Runs once when the component mounts.
- \`[data]\`: Runs when the component mounts AND when \`data\` changes.
- (No array): Runs after EVERY render.`
    },
    {
      title: "Fetching API Data in React",
      slug: "fetching-api-data",
      order: 4,
      estimatedMinutes: 35,
      content: `# Fetching API Data in React

**Learning objectives:**
- Combine \`useState\` and \`useEffect\` to fetch data
- Render data in the UI

## The Pattern
1. Create state for \`data\`, \`loading\`, and \`error\`.
2. Use \`useEffect\` to fetch data on mount.
3. Render based on the state.

\`\`\`jsx
import { useState, useEffect } from 'react';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/courses')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {courses.map((c) => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}
\`\`\``
    },
    {
      title: "Loading States and Error Messages",
      slug: "loading-error-states",
      order: 5,
      estimatedMinutes: 25,
      content: `# Loading States and Error Messages

**Learning objectives:**
- Improve UX with loading spinners
- Handle errors gracefully

## The Three States
Every data fetch has three possible states:
1. **Loading**: Waiting for the server. Show a spinner.
2. **Error**: Request failed. Show an error message and a retry button.
3. **Success**: Data arrived. Render it.

## Why It Matters
Showing a blank screen while loading feels broken. Showing a spinner feels responsive. Handling errors prevents your app from crashing silently.`
    }
  ]
};