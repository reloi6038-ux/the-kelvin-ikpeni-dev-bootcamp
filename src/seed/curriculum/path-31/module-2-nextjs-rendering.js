module.exports = {
  title: "Module 2: Next.js & Rendering",
  description: "Routing and the three rendering paradigms.",
  order: 2,
  lessons: [
    {
      title: "Next.js Fundamentals",
      slug: "nextjs-fundamentals",
      order: 1,
      estimatedMinutes: 35,
      content: `# Next.js Fundamentals

**Learning objectives:**
- Understand what Next.js is
- Create a Next.js app

## What is Next.js?
Next.js is a React framework for building full-stack web applications. It handles routing, rendering, and optimization out of the box.

## Why Next.js over plain React?
Plain React renders entirely in the browser. Next.js can render on the server, which is faster, better for SEO, and better for slow devices.

## Creating an App
\`\`\`bash
npx create-next-app@latest my-next-app
\`\`\`

## The \`app/\` Directory
Next.js 13+ uses the \`app/\` router. Every folder is a route, and \`page.tsx\` is the UI for that route.
\`\`\`tsx
// app/page.tsx (Homepage)
export default function Home() {
  return <h1>Hello from Next.js!</h1>;
}
\`\`\``
    },
    {
      title: "File-Based Routing",
      slug: "file-based-routing",
      order: 2,
      estimatedMinutes: 30,
      content: `# File-Based Routing

**Learning objectives:**
- Create pages with the file system
- Use dynamic routes

## Static Routes
Create a folder with a \`page.tsx\`.
\`\`\`text
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
└── courses/
    └── page.tsx      → /courses
\`\`\`

## Dynamic Routes
Use square brackets for dynamic segments.
\`\`\`text
app/
└── courses/
    └── [slug]/
        └── page.tsx  → /courses/html5
\`\`\`

## Accessing Params
\`\`\`tsx
export default function CoursePage({ params }) {
  return <h1>Course: {params.slug}</h1>;
}
\`\`\``
    },
    {
      title: "Server-Side Rendering (SSR)",
      slug: "server-side-rendering",
      order: 3,
      estimatedMinutes: 30,
      content: `# Server-Side Rendering (SSR)

**Learning objectives:**
- Understand SSR
- Fetch data on every request

## What is SSR?
The page is generated on the server *at request time*. Every time a user refreshes, the server fetches fresh data and builds the HTML.

## When to Use SSR
- Dashboards showing live data.
- Search results.
- Any page where data changes frequently.

## Implementation (Next.js)
In the \`app/\` router, components are Server Components by default. Just fetch data using \`fetch\`:
\`\`\`tsx
export default async function Page() {
  const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  const data = await res.json();
  return <div>{data.title}</div>;
}
\`\`\`
The \`{ cache: 'no-store' }\` option forces SSR.`
    },
    {
      title: "Static Site Generation (SSG)",
      slug: "static-site-generation",
      order: 4,
      estimatedMinutes: 30,
      content: `# Static Site Generation (SSG)

**Learning objectives:**
- Understand SSG
- Generate pages at build time

## What is SSG?
The page is generated at **build time**. When you run \`npm run build\`, Next.js fetches the data and creates static HTML files. These files are served from a CDN instantly.

## When to Use SSG
- Blogs.
- Marketing pages.
- Documentation.
- Data that doesn't change often.

## Implementation
In Next.js, \`fetch\` is cached by default. To force SSG, use:
\`\`\`tsx
const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });
\`\`\`
Or use \`generateStaticParams\` for dynamic routes to pre-render all paths at build time.`
    },
    {
      title: "Client-Side Rendering (CSR)",
      slug: "client-side-rendering",
      order: 5,
      estimatedMinutes: 25,
      content: `# Client-Side Rendering (CSR)

**Learning objectives:**
- Understand CSR
- Use it for personalized data

## What is CSR?
The page loads as an empty shell, and the browser fetches data and renders it using JavaScript.

## When to Use CSR
- User dashboards (data specific to the logged-in user).
- Interactive widgets that don't need SEO.
- Content that changes rapidly after load.

## Implementation (Next.js)
Add the \`"use client"\` directive at the top of the file.
\`\`\`tsx
"use client";
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/me').then(res => res.json()).then(setUser);
  }, []);
  
  if (!user) return <p>Loading...</p>;
  return <p>Welcome, {user.name}</p>;
}
\`\`\``
    },
    {
      title: "React Server Components Fundamentals",
      slug: "react-server-components",
      order: 6,
      estimatedMinutes: 35,
      content: `# React Server Components Fundamentals

**Learning objectives:**
- Differentiate Server and Client components
- Understand the boundary

## The Paradigm Shift
In Next.js 13+, components are **Server Components** by default.
- **Server Components**: Run only on the server. No state, no event listeners. They can directly query the database.
- **Client Components**: Run in the browser. Have state, effects, and event listeners. Marked with \`"use client"\`.

## The Rule
Keep components as Server Components as much as possible. Only use Client Components at the "leaves" of your component tree (interactive parts).

## Passing Data
You can pass data from Server Components down to Client Components via props. You cannot import a Server Component into a Client Component.`
    }
  ]
};