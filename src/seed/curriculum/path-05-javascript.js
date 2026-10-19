// Path 5: JavaScript
module.exports = {
  course: {
    title: "JavaScript from Zero",
    slug: "javascript",
    description:
      "Master the language that powers the web — from variables to async/await.",
    level: "beginner",
    estimatedHours: 24,
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
          estimatedMinutes: 20,
          content: `# Variables and Data Types

Variables store values. JavaScript has three keywords:

## \`const\` (preferred)
\`\`\`js
const name = "Alice";
// name = "Bob"; // ❌ error — cannot reassign
\`\`\`

## \`let\` (when reassignment is needed)
\`\`\`js
let count = 0;
count = count + 1; // ✅
\`\`\`

## \`var\` (avoid)
Function-scoped, hoisted. Use \`const\` and \`let\` instead.

## Data types
- **String**: \`"hello"\`, \`'world'\`
- **Number**: \`42\`, \`3.14\`
- **Boolean**: \`true\`, \`false\`
- **Null**: \`null\` (intentionally empty)
- **Undefined**: \`undefined\` (not yet assigned)
- **Object**: \`{ name: "Alice", age: 30 }\`
- **Array**: \`[1, 2, 3]\`

## Rule
**Always use \`const\` unless you need to reassign.** This prevents accidental bugs.`,
        },
        {
          title: "Functions",
          slug: "functions",
          order: 2,
          estimatedMinutes: 25,
          content: `# Functions

Functions are reusable blocks of code.

## Regular function
\`\`\`js
function add(a, b) {
  return a + b;
}
\`\`\`

## Arrow function (modern, preferred)
\`\`\`js
const add = (a, b) => a + b;
\`\`\`

## Calling
\`\`\`js
add(2, 3); // 5
\`\`\`

## Async functions
Any function that does something that takes time (network, file, database) is **async**:

\`\`\`js
async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return await res.json();
}
\`\`\`

- \`async\` — marks the function as returning a Promise
- \`await\` — pauses until the Promise resolves

## Every route in this bootcamp is async
\`\`\`js
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});
\`\`\``,
        },
      ],
    },
    {
      title: "DOM & Events",
      description: "Interacting with HTML from JavaScript.",
      order: 2,
      lessons: [
        {
          title: "Selecting and Modifying Elements",
          slug: "dom-selection",
          order: 1,
          estimatedMinutes: 20,
          content: `# Selecting and Modifying Elements

The **DOM** (Document Object Model) is a JavaScript representation of the page.

## Selecting elements
\`\`\`js
// By CSS selector (any selector works)
const header = document.querySelector("h1");
const allLinks = document.querySelectorAll(".nav a");
\`\`\`

## Modifying elements
\`\`\`js
const title = document.querySelector("#title");
title.textContent = "New heading";        // safe — no HTML parsing
title.innerHTML = "<em>Italic</em>";      // ⚠️ XSS risk — avoid with user data
title.classList.add("highlight");
title.style.color = "red";                 // inline style
\`\`\`

## Security note
**Never use \`innerHTML\` with user-controlled data.** Use \`textContent\` or \`escapeHtml()\` (as this bootcamp does).`,
        },
        {
          title: "Events",
          slug: "events",
          order: 2,
          estimatedMinutes: 20,
          content: `# Events

Events respond to user actions: clicks, typing, submitting forms, scrolling.

## Adding an event listener
\`\`\`js
const button = document.querySelector("#save-btn");
button.addEventListener("click", (event) => {
  console.log("Button clicked!");
});
\`\`\`

## Common events
- \`click\` — mouse click
- \`submit\` — form submission
- \`input\` — while typing in a field
- \`change\` — value change on a form control
- \`keydown\` / \`keyup\` — keyboard

## Preventing default behavior
\`\`\`js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the browser's default form submission
  // do something else
});
\`\`\`

Without \`preventDefault()\`, submitting a form triggers a **full page reload** — which you almost never want in a modern app.`,
        },
        {
          title: "Fetch API",
          slug: "fetch-api",
          order: 3,
          estimatedMinutes: 25,
          content: `# Fetch API

\`fetch()\` makes HTTP requests from the browser.

## Basic GET
\`\`\`js
const res = await fetch("/api/courses");
const data = await res.json();
console.log(data.courses);
\`\`\`

## POST with JSON body
\`\`\`js
const res = await fetch("/api/enrollments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ slug: "html5" }),
});
const data = await res.json();
\`\`\`

## Handling errors
\`\`\`js
try {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const data = await res.json();
} catch (err) {
  console.error("Failed:", err.message);
}
\`\`\`

**\`fetch()\` does NOT throw on 4xx/5xx** — you must check \`res.ok\` yourself. That's why this bootcamp uses the \`apiRequest()\` helper, which handles this for you.`,
        },
      ],
    },
  ],
};