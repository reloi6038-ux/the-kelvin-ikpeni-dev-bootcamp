module.exports = {
  title: "Module 2: Vitest & React Testing Library",
  description: "The modern tools for testing React apps.",
  order: 2,
  lessons: [
    {
      title: "Vitest Fundamentals",
      slug: "vitest-fundamentals",
      order: 1,
      estimatedMinutes: 30,
      content: `# Vitest Fundamentals

**Learning objectives:**
- Set up Vitest with Vite
- Understand expect and matchers

## What is Vitest?
A blazing fast unit-test framework powered by Vite. It's an alternative to Jest that is natively supported by Vite.

## Setup
\`\`\`bash
npm install -D vitest
\`\`\`

Add to \`package.json\`:
\`\`\`json
"scripts": {
  "test": "vitest"
}
\`\`\`

## Matchers
\`\`\`javascript
expect(2 + 2).toBe(4);
expect({ name: 'Alice' }).toEqual({ name: 'Alice' }); // Deep equality
expect([1, 2, 3]).toContain(2);
\`\`\``
    },
    {
      title: "React Testing Library",
      slug: "react-testing-library",
      order: 2,
      estimatedMinutes: 35,
      content: `# React Testing Library

**Learning objectives:**
- Query the DOM like a user
- Fire events (clicks, typing)

## What is RTL?
A library for testing React components. It encourages testing from the user's perspective.

## Queries
- \`getByText\`: Find an element by its text content.
- \`getByRole\`: Find an element by its ARIA role (e.g., 'button', 'textbox').
- \`getByPlaceholderText\`: Find an input by its placeholder.

## Firing Events
\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('increments count on click', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
\`\`\``
    }
  ]
};