module.exports = {
  title: "Module 1: React Basics & JSX",
  description: "Setting up React and understanding components.",
  order: 1,
  lessons: [
    {
      title: "Introduction to React",
      slug: "intro-to-react",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to React

**Learning objectives:**
- Understand what React is
- Learn the concept of a Single Page Application (SPA)

## What is React?
React is a JavaScript library for building user interfaces, created by Facebook. Instead of manipulating the DOM directly, you describe what the UI should look like based on the current state, and React updates the DOM for you.

## Why React?
- **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative**: You write the code for what you want, not how to do it.
- **Virtual DOM**: React uses a virtual representation of the DOM to calculate the most efficient way to update the browser.

## Single Page Applications (SPA)
In traditional websites, every click loads a new HTML page from the server. In a React SPA, the browser loads one HTML file and React dynamically swaps out the content without reloading the page.`
    },
    {
      title: "Creating a React Project with Vite",
      slug: "react-project-vite",
      order: 2,
      estimatedMinutes: 25,
      content: `# Creating a React Project with Vite

**Learning objectives:**
- Scaffold a React app
- Run the development server

## Setup
Instead of using Create React App (which is deprecated), we use Vite.

\`\`\`bash
npm create vite@latest my-react-app
\`\`\`

1. Choose **React**.
2. Choose **JavaScript**.
3. Run:

\`\`\`bash
cd my-react-app
npm install
npm run dev
\`\`\`

## Project Structure
- \`index.html\`: The single HTML file.
- \`src/main.jsx\`: The entry point that mounts React to the DOM.
- \`src/App.jsx\`: The root component.`
    },
    {
      title: "JSX Fundamentals",
      slug: "jsx-fundamentals",
      order: 3,
      estimatedMinutes: 30,
      content: `# JSX Fundamentals

**Learning objectives:**
- Write JSX
- Embed JavaScript expressions

## What is JSX?
JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript.

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

## Embedding Expressions
You can put any valid JavaScript expression inside curly braces \`{}\`.

\`\`\`jsx
const name = "Alice";
const element = <h1>Hello, {name}!</h1>;

const math = <p>2 + 2 = {2 + 2}</p>;
\`\`\`

## Rules of JSX
1. Always return a single parent element. (Use an empty fragment \`<>\` if needed).
2. Close all tags (e.g., \`<img />\`, \`<br />\`).
3. Use \`className\` instead of \`class\`.
4. Use \`htmlFor\` instead of \`for\` in labels.`
    },
    {
      title: "React Components",
      slug: "react-components",
      order: 4,
      estimatedMinutes: 30,
      content: `# React Components

**Learning objectives:**
- Create functional components
- Use components inside other components

## What is a Component?
A component is a reusable piece of UI. In modern React, we use **Functional Components**.

## Creating a Component
A component is just a JavaScript function that returns JSX. The name MUST start with a capital letter.

\`\`\`jsx
function Welcome() {
  return <h1>Welcome to my app!</h1>;
}
\`\`\`

## Using a Component
\`\`\`jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}
\`\`\``
    }
  ]
};