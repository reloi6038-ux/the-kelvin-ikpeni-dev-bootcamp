// Path 5: JavaScript from Zero
module.exports = {
  course: {
    title: "JavaScript from Zero",
    slug: "javascript",
    description:
      "Master the language that powers the web — from variables to async/await.",
    level: "beginner",
    estimatedHours: 26,
    icon: "javascript",
    order: 5,
    isPublished: true,
  },
  modules: [
    {
      title: "JavaScript Basics",
      description: "Variables, data types, functions.",
      order: 1,
      lessons: [
        {
          title: "Variables and Data Types",
          slug: "variables-data-types",
          order: 1,
          estimatedMinutes: 25,
          content: `# Variables and Data Types

Variables are containers for storing data.

## Modern Declarations
1. \`const\`: Constant. Cannot be reassigned. **Use this by default.**
2. \`let\`: Can be reassigned. Use only when needed.

\`\`\`javascript
const name = "Alice";
let score = 100;
score = 150; // ✅ allowed
// name = "Bob"; // ❌ ERROR
\`\`\`

## Data Types
- **String**: \`"hello"\`, \`'world'\`
- **Number**: \`42\`, \`3.14\`
- **Boolean**: \`true\`, \`false\`
- **Null**: Intentional absence
- **Undefined**: Not yet assigned
- **Object**: \`{ name: "Alice" }\`
- **Array**: \`[1, 2, 3]\`

## Checking Types
\`\`\`javascript
typeof "hello"; // "string"
typeof 42;      // "number"
typeof [];      // "object"
\`\`\``,
        },
        {
          title: "Functions and Arrow Functions",
          slug: "functions",
          order: 2,
          estimatedMinutes: 30,
          content: `# Functions and Arrow Functions

Functions are reusable blocks of code.

## Standard Functions
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

## Arrow Functions (ES6)
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

## Why Arrow Functions?
Besides being shorter, arrow functions handle the \`this\` keyword differently.

## Async Functions
\`\`\`javascript
async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return await res.json();
}
\`\`\`

- \`async\`: marks the function as returning a Promise.
- \`await\`: pauses until the Promise resolves.`,
        },
      ],
    },
    {
      title: "DOM & Events",
      description: "Interacting with HTML from JavaScript.",
      order: 2,
      lessons: [
        {
          title: "Selecting and Changing Elements",
          slug: "dom-selection",
          order: 1,
          estimatedMinutes: 25,
          content: `# Selecting and Changing Elements

The DOM (Document Object Model) is JavaScript's representation of the page.

## Selecting Elements
\`\`\`javascript
const header = document.querySelector("h1");
const allLinks = document.querySelectorAll(".nav a");
\`\`\`

## Modifying Elements
\`\`\`javascript
const title = document.querySelector("#title");
title.textContent = "New heading";   // safe
title.innerHTML = "<em>Italic</em>"; // ⚠️ XSS risk
title.classList.add("highlight");
title.style.color = "red";
\`\`\`

## Security Note
**Never use \`innerHTML\` with user-controlled data.** Use \`textContent\` or an escape helper.`,
        },
        {
          title: "Handling Events",
          slug: "handling-events",
          order: 2,
          estimatedMinutes: 30,
          content: `# Handling Events

Events respond to user actions.

## The Event Listener
\`\`\`javascript
const button = document.querySelector("#save-btn");
button.addEventListener("click", (event) => {
  console.log("Button clicked!");
});
\`\`\`

## Common Events
- \`click\`: mouse click
- \`submit\`: form submission
- \`input\`: while typing
- \`keydown\` / \`keyup\`: keyboard

## Preventing Default Behavior
\`\`\`javascript
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload
  // handle manually
});
\`\`\`

Without \`preventDefault()\`, form submissions reload the page.`,
        },
        {
          title: "Fetch API and Async",
          slug: "fetch-api",
          order: 3,
          estimatedMinutes: 30,
          content: `# Fetch API and Async

\`fetch()\` makes HTTP requests from the browser.

## Basic GET
\`\`\`javascript
const res = await fetch("/api/courses");
const data = await res.json();
console.log(data.courses);
\`\`\`

## POST with JSON
\`\`\`javascript
const res = await fetch("/api/enrollments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slug: "html5" }),
});
const data = await res.json();
\`\`\`

## Handling Errors
\`\`\`javascript
try {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const data = await res.json();
} catch (err) {
  console.error("Failed:", err.message);
}
\`\`\`

**\`fetch()\` does NOT throw on 4xx/5xx** — you must check \`res.ok\`.`,
        },
      ],
    },
  ],
};