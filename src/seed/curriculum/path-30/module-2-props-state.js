module.exports = {
  title: "Module 2: Props & State",
  description: "Making components dynamic and interactive.",
  order: 2,
  lessons: [
    {
      title: "Props and Component Reusability",
      slug: "props-reusability",
      order: 1,
      estimatedMinutes: 30,
      content: `# Props and Component Reusability

**Learning objectives:**
- Pass data to components
- Understand read-only data

## What are Props?
Props (properties) are used to pass data from a parent component to a child component. They are read-only.

## Passing Props
\`\`\`jsx
function App() {
  return <Greeting name="Alice" age={25} />;
}
\`\`\`

## Receiving Props
You can destructure props in the function parameters.
\`\`\`jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
\`\`\`

Props make components reusable with dynamic data.`
    },
    {
      title: "State Management with useState",
      slug: "state-management-usestate",
      order: 2,
      estimatedMinutes: 35,
      content: `# State Management with useState

**Learning objectives:**
- Add state to functional components
- Update state safely

## What is State?
State is data that changes over time. When state changes, React re-renders the component to update the UI.

## The useState Hook
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Rules of State
- Never modify state directly (e.g., \`count = count + 1\`).
- Always use the setter function (e.g., \`setCount(count + 1)\`).
- State updates are asynchronous.`
    },
    {
      title: "Handling Events in React",
      slug: "handling-events",
      order: 3,
      estimatedMinutes: 25,
      content: `# Handling Events in React

**Learning objectives:**
- Attach event handlers
- Pass arguments to handlers

## React Events
React events are named using camelCase (e.g., \`onClick\` instead of \`onclick\`). You pass a function as the event handler, not a string.

\`\`\`jsx
function Button() {
  function handleClick() {
    alert('Button clicked!');
  }

  return <button onClick={handleClick}>Click Me</button>;
}
\`\`\`

## Passing Arguments
If you need to pass an argument, wrap it in an arrow function.
\`\`\`jsx
<button onClick={() => handleDelete(id)}>Delete</button>
\`\`\``
    },
    {
      title: "Conditional Rendering",
      slug: "conditional-rendering",
      order: 4,
      estimatedMinutes: 25,
      content: `# Conditional Rendering

**Learning objectives:**
- Show or hide elements based on state
- Use the ternary operator and logical AND

## The If Statement
You cannot use \`if\` statements directly inside JSX. Use them outside the return.

## Ternary Operator
\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
    </div>
  );
}
\`\`\`

## Logical AND (&&)
If you only want to show something when a condition is true (and nothing if false).
\`\`\`jsx
{isLoading && <p>Loading...</p>}
\`\`\``
    },
    {
      title: "Rendering Lists and Using Keys",
      slug: "rendering-lists",
      order: 5,
      estimatedMinutes: 25,
      content: `# Rendering Lists and Using Keys

**Learning objectives:**
- Use \`.map()\` to render arrays
- Understand the importance of \`key\`

## Rendering an Array
\`\`\`jsx
function CourseList() {
  const courses = ['HTML', 'CSS', 'JavaScript'];
  
  return (
    <ul>
      {courses.map((course) => (
        <li>{course}</li>
      ))}
    </ul>
  );
}
\`\`\`

## The \`key\` Prop
React needs a unique identifier for each item in a list to efficiently update the DOM. Add a \`key\`.
\`\`\`jsx
{courses.map((course, index) => (
  <li key={index}>{course}</li>
))}
\`\`\`
If you have unique IDs, use those instead of the index.`
    }
  ]
};