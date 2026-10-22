module.exports = {
  title: "Module 1: TypeScript & Advanced React",
  description: "Type safety and advanced component patterns.",
  order: 1,
  lessons: [
    {
      title: "TypeScript for Frontend Development",
      slug: "typescript-frontend",
      order: 1,
      estimatedMinutes: 40,
      content: `# TypeScript for Frontend Development

**Learning objectives:**
- Understand why TypeScript is the industry standard
- Add TypeScript to a React project
- Define basic types for Props and State

## Why TypeScript?
JavaScript is dynamically typed. This means errors like \`undefined is not a function\` only appear at runtime, often in production. TypeScript adds static types, catching these errors before you even save the file.

## Setting up
With Vite:
\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Typing Props
\`\`\`tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean; // The ? makes it optional
};

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
\`\`\`

## Typing State
\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

TypeScript catches typos, missing props, and incorrect types at compile time, making your codebase much more robust.`
    },
    {
      title: "Advanced React Patterns",
      slug: "advanced-react-patterns",
      order: 2,
      estimatedMinutes: 35,
      content: `# Advanced React Patterns

**Learning objectives:**
- Use Render Props and HOCs
- Build Compound Components

## 1. Render Props
A pattern where a component's prop is a function that returns React elements, allowing the parent to control what is rendered.
\`\`\`tsx
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // ... mouse logic
  return render(pos);
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse at {x}, {y}</p>} />
\`\`\`

## 2. Higher-Order Components (HOC)
A function that takes a component and returns a new component, often used for injecting global data.
\`\`\`tsx
function withAuth(WrappedComponent) {
  return function AuthWrapper(props) {
    const user = useAuth();
    if (!user) return <Login />;
    return <WrappedComponent {...props} user={user} />;
  };
}
\`\`\`

## 3. Compound Components
Components that work together implicitly via Context, like \`<select>\` and \`<option>\`.
\`\`\`tsx
<Tabs>
  <Tabs.List>
    <Tabs.Tab>One</Tabs.Tab>
    <Tabs.Tab>Two</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel>Content 1</Tabs.Panel>
    <Tabs.Panel>Content 2</Tabs.Panel>
  </Tabs.Panels>
</Tabs>
\`\`\``
    }
  ]
};