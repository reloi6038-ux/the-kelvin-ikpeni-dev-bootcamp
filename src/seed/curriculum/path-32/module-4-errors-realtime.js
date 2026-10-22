module.exports = {
  title: "Module 4: Errors & Real-Time",
  description: "Handling states and building WebSocket UIs.",
  order: 4,
  lessons: [
    {
      title: "Handling API Errors",
      slug: "handling-api-errors",
      order: 1,
      estimatedMinutes: 30,
      content: `# Handling API Errors

**Learning objectives:**
- Show user-friendly error messages
- Handle network errors vs HTTP errors

## The Problem
If your backend goes down, or returns a 500 error, your React app might crash or show a blank screen.

## Error States
Always store an \`error\` state.
\`\`\`jsx
const [error, setError] = useState(null);

// In the fetch:
try {
  const res = await fetch('/api/data');
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
} catch (err) {
  setError(err.message);
}

// In the UI:
if (error) return <div className="alert alert-danger">{error}</div>;
\`\`\``
    },
    {
      title: "Managing Loading and Empty States",
      slug: "loading-empty-states",
      order: 2,
      estimatedMinutes: 25,
      content: `# Managing Loading and Empty States

**Learning objectives:**
- Prevent blank screens
- Improve UX

## The Three States
Always handle:
1. **Loading**: Show a spinner or skeleton loader.
2. **Empty**: Show a friendly "No results found" message.
3. **Error**: Show a retry button.

\`\`\`jsx
if (loading) return <Spinner />;
if (error) return <ErrorAlert message={error} />;
if (data.length === 0) return <p>No courses found.</p>;

return <CourseList data={data} />;
\`\`\`

## Why It Matters
Users think the app is broken if they see a blank screen. A spinner or skeleton indicates progress.`
    },
    {
      title: "Integrating Payment Gateways",
      slug: "integrating-payments",
      order: 3,
      estimatedMinutes: 40,
      content: `# Integrating Payment Gateways

**Learning objectives:**
- Connect the frontend to Stripe Checkout
- Secure payment flows

## The Flow
1. User clicks "Buy Now".
2. Frontend sends a request to your backend to create a Stripe Checkout Session.
3. Backend returns the Checkout URL.
4. Frontend redirects the user to Stripe.
5. After payment, Stripe redirects back to your success page.

## Frontend Code
\`\`\`javascript
const handleCheckout = async () => {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId: course._id }),
  });
  const { url } = await res.json();
  window.location.href = url; // Redirect to Stripe
};
\`\`\`

**Never handle raw credit card numbers in your React app.** Stripe (and similar providers) handle the sensitive data on their own hosted checkout pages.`
    },
    {
      title: "Building Admin Dashboards",
      slug: "admin-dashboards",
      order: 4,
      estimatedMinutes: 40,
      content: `# Building Admin Dashboards

**Learning objectives:**
- Design data-heavy interfaces
- Fetch metrics from the backend

## The Structure
An admin dashboard usually has:
- **Sidebar**: Navigation (Users, Courses, Analytics).
- **Top Bar**: Admin profile, notifications.
- **Main Content**: Statistics cards, data tables, charts.

## Fetching Stats
\`\`\`javascript
fetch('/api/admin/stats')
  .then(res => res.json())
  .then(data => setStats(data.stats));
\`\`\`

## Data Tables
For large datasets, never render 10,000 rows. Use the pagination techniques learned earlier, and build a reusable \`DataTable\` component that accepts columns and data as props.`
    },
    {
      title: "Real-Time Interfaces with WebSockets",
      slug: "realtime-websockets",
      order: 5,
      estimatedMinutes: 40,
      content: `# Real-Time Interfaces with WebSockets

**Learning objectives:**
- Connect to a Socket.io server
- Update UI on events

## Why WebSockets?
HTTP requires the client to ask for data. WebSockets allow the server to push data to the client instantly (e.g., chat messages, live notifications).

## Installation
\`\`\`bash
npm install socket.io-client
\`\`\`

## Connecting
\`\`\`jsx
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  return <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>;
}
\`\`\``
    }
  ]
};