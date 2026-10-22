module.exports = {
  title: "Module 1: Unit Testing Basics",
  description: "Writing tests for JavaScript and React components.",
  order: 1,
  lessons: [
    {
      title: "JavaScript Unit Testing",
      slug: "javascript-unit-testing",
      order: 1,
      estimatedMinutes: 25,
      content: `# JavaScript Unit Testing

**Learning objectives:**
- Understand the testing pyramid
- Write your first test with Jest

## The Testing Pyramid
1. **Unit Tests**: Fast, cheap, test individual functions in isolation. (Many)
2. **Integration Tests**: Test how multiple modules work together. (Medium)
3. **End-to-End (E2E)**: Test the whole app from a user's perspective. (Few, slow)

## Why Unit Test?
Unit tests act as a safety net when you refactor code. If you change a function, you can run your tests to ensure you didn't break anything.

## Example with Jest
\`\`\`javascript
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
\`\`\``
    },
    {
      title: "React Component Testing",
      slug: "react-component-testing",
      order: 2,
      estimatedMinutes: 30,
      content: `# React Component Testing

**Learning objectives:**
- Test that components render correctly
- Test component props

## The Goal
We want to test the behavior of a component, not its implementation details. We test what the user sees.

## Example
\`\`\`jsx
import { render, screen } from '@testing-library/react';

function Button({ label }) {
  return <button>{label}</button>;
}

test('renders the button with correct label', () => {
  render(<Button label="Click me" />);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});
\`\`\``
    }
  ]
};