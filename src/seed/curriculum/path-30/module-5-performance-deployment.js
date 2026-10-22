module.exports = {
  title: "Module 5: Performance & Deployment",
  description: "Optimizing, error boundaries, and launching your app.",
  order: 5,
  lessons: [
    {
      title: "Reusable UI Components",
      slug: "reusable-ui-components",
      order: 1,
      estimatedMinutes: 25,
      content: `# Reusable UI Components

**Learning objectives:**
- Build design system components
- Use props for flexibility

## Example: Button Component
\`\`\`jsx
function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={\`btn btn-\${variant}\`} {...props}>
      {children}
    </button>
  );
}
\`\`\`

## Usage
\`\`\`jsx
<Button variant="primary" onClick={handleClick}>Save</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
\`\`\`
Reusable components save time and enforce consistency.`
    },
    {
      title: "Component Composition",
      slug: "component-composition",
      order: 2,
      estimatedMinutes: 25,
      content: `# Component Composition

**Learning objectives:**
- Use the \`children\` prop
- Build layouts

## The \`children\` Prop
It allows you to pass components as data to other components.

\`\`\`jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h1>Title</h1>
      <p>Content</p>
    </Card>
  );
}
\`\`\`

This is how layouts (Sidebar, Modal, Card) are built.`
    },
    {
      title: "Performance Optimization: memo, useMemo, useCallback",
      slug: "performance-optimization",
      order: 3,
      estimatedMinutes: 35,
      content: `# Performance Optimization: memo, useMemo, useCallback

**Learning objectives:**
- Prevent unnecessary re-renders
- Memoize expensive calculations

## React.memo
Prevents a component from re-rendering if its props haven't changed.
\`\`\`jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{data}</div>;
});
\`\`\`

## useMemo
Caches the result of an expensive calculation.
\`\`\`jsx
const filteredList = useMemo(() => {
  return hugeList.filter(item => item.active);
}, [hugeList]);
\`\`\`

## useCallback
Caches a function so it doesn't get recreated on every render.
\`\`\`jsx
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
\`\`\``
    },
    {
      title: "Error Boundaries",
      slug: "error-boundaries",
      order: 4,
      estimatedMinutes: 30,
      content: `# Error Boundaries

**Learning objectives:**
- Catch rendering errors
- Show a fallback UI

## The Problem
If a component throws an error during rendering, React unmounts the entire tree, leaving a blank screen.

## The Solution: Error Boundaries
A component that catches errors in its children and displays a fallback UI.

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

*(Error boundaries must be class components.)*`
    },
    {
      title: "React Application Deployment",
      slug: "react-deployment",
      order: 5,
      estimatedMinutes: 30,
      content: `# React Application Deployment

**Learning objectives:**
- Build the app for production
- Deploy to Render or Netlify

## The Build Step
Vite compiles your React app into static HTML, CSS, and JS files.
\`\`\`bash
npm run build
\`\`\`
This creates a \`dist/\` folder.

## Deployment (Render)
1. Create a new **Static Site** on Render.
2. Connect your repo.
3. Build Command: \`npm install && npm run build\`
4. Publish Directory: \`dist\`

## Deployment (Netlify)
Just drag and drop the \`dist\` folder into Netlify.

## SPA Routing Note
If you use React Router, you must configure your host to redirect all traffic to \`index.html\`. Otherwise, refreshing on \`/about\` will give a 404. On Render/Netlify, add a redirect rule (\`/* /index.html 200\`).`
    }
  ]
};