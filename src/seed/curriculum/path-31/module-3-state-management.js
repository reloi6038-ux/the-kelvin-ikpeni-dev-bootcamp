module.exports = {
  title: "Module 3: State & Data Management",
  description: "Global state and API caching.",
  order: 3,
  lessons: [
    {
      title: "State Management with Redux Toolkit",
      slug: "redux-toolkit",
      order: 1,
      estimatedMinutes: 40,
      content: `# State Management with Redux Toolkit

**Learning objectives:**
- Understand global state
- Create a Redux slice

## Why Redux?
In a large app, passing state through dozens of components (prop drilling) becomes unmanageable. Redux provides a single, centralized store for the entire app.

## Redux Toolkit (RTK)
The official, recommended way to write Redux. It removes the old boilerplate.

## Installation
\`\`\`bash
npm install @reduxjs/toolkit react-redux
\`\`\`

## Creating a Slice
\`\`\`tsx
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
\`\`\`

Redux Toolkit uses Immer under the hood, allowing you to "mutate" state safely.`
    },
    {
      title: "State Management with Zustand",
      slug: "zustand",
      order: 2,
      estimatedMinutes: 30,
      content: `# State Management with Zustand

**Learning objectives:**
- Set up a lightweight global store
- Compare Zustand to Redux

## What is Zustand?
A small, fast, and scalable state management library. It's much simpler than Redux and requires less boilerplate.

## Installation
\`\`\`bash
npm install zustand
\`\`\`

## Creating a Store
\`\`\`tsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
\`\`\`

## Using the Store
\`\`\`tsx
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>Count: {count}</button>;
}
\`\`\`

Zustand is perfect for medium-sized apps where Redux feels too heavy.`
    },
    {
      title: "API Data Management with TanStack Query",
      slug: "tanstack-query",
      order: 3,
      estimatedMinutes: 40,
      content: `# API Data Management with TanStack Query

**Learning objectives:**
- Fetch, cache, and update server data
- Avoid boilerplate loading/error states

## What is TanStack Query?
Formerly known as React Query. It is the industry standard for managing server state. It handles caching, background syncing, pagination, and error states automatically.

## Installation
\`\`\`bash
npm install @tanstack/react-query
\`\`\`

## Setup
\`\`\`tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
\`\`\`

## Fetching Data
\`\`\`tsx
import { useQuery } from '@tanstack/react-query';

function Courses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetch('/api/courses').then(res => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;
  return <ul>{data.map(c => <li key={c.id}>{c.title}</li>)}</ul>;
}
\`\`\`

It caches the data automatically, so revisiting the page loads instantly.`
    }
  ]
};