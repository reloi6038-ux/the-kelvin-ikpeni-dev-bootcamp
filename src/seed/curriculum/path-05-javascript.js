// Path 5: JavaScript from Zero
module.exports = {
  course: {
    title: "JavaScript from Zero",
    slug: "javascript",
    description:
      "Master the language that powers the web — variables, functions, the DOM, events, and async/await — with hands-on practice in every lesson.",
    level: "beginner",
    estimatedHours: 28,
    icon: "javascript",
    order: 5,
    isPublished: true,
  },
  modules: [
    {
      title: "JavaScript Basics",
      description: "Variables, data types, and functions.",
      order: 1,
      lessons: [
        {
          title: "Variables and Data Types",
          slug: "variables-data-types",
          order: 1,
          estimatedMinutes: 25,
          content: `# Variables and Data Types

**Learning objectives:**
- Declare variables with \`const\` and \`let\`
- Identify the 7 primitives
- Use \`typeof\` to inspect types

## Modern Variable Declarations
JavaScript has three keywords, but you only need two:

\`\`\`javascript
const name = "Alice";  // cannot be reassigned
let score = 100;       // can be reassigned
\`\`\`

**Rule:** use \`const\` by default. Switch to \`let\` only when you truly need to reassign.

\`var\` is the old way — avoid it. It has confusing scoping rules.

## The 7 Primitive Types
| Type | Example | Notes |
|------|---------|-------|
| string | \`"hello"\` | text |
| number | \`42\`, \`3.14\` | all numbers are floats |
| boolean | \`true\`, \`false\` | logic |
| null | \`null\` | intentional absence |
| undefined | \`undefined\` | not yet assigned |
| bigint | \`42n\` | very large integers |
| symbol | \`Symbol()\` | unique identifiers |

Plus one structural type: **object** (which includes arrays and functions).

## The typeof Operator
\`\`\`javascript
typeof "hello";  // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
typeof undefined; // "undefined"
typeof null;     // "object" (a famous historical bug)
typeof [];       // "object"
\`\`\`

## Common Bugs to Avoid
\`\`\`javascript
// ❌ Reassigning a const throws
const x = 10;
x = 20; // TypeError

// ✅ Use let if you need to reassign
let y = 10;
y = 20;

// ❌ Undeclared variables pollute global scope
z = 10; // silent bug — becomes global

// ✅ Always declare
let z = 10;
\`\`\`

## Key Takeaways
- \`const\` by default, \`let\` when needed, never \`var\`
- \`typeof null === "object"\` is a known bug — don't rely on \`typeof\` alone
- Always declare variables explicitly`,
          exercise: {
            enabled: true,
            instructions: "Create a constant named `myName` and assign it the string `'Kelvin'`.",
            walkthrough: "1. Type `const`.\n2. Name the variable `myName`.\n3. Assign it the value `\"Kelvin\"`.",
            expectedOutput: "const myName",
            starterHtml: "<h1 id='output'>Waiting...</h1>",
            solutionHtml: "<h1 id='output'>Waiting...</h1>",
            starterCss: "h1 { color: blue; }",
            solutionCss: "h1 { color: blue; }",
            starterJs: "// Declare your constant below\n\n// Don't change this line\ndocument.getElementById('output').textContent = typeof myName !== 'undefined' ? myName : 'Waiting...';\n",
            solutionJs: "const myName = 'Kelvin';\n\ndocument.getElementById('output').textContent = typeof myName !== 'undefined' ? myName : 'Waiting...';\n",
          },
        },
        {
          title: "Functions and Arrow Functions",
          slug: "functions",
          order: 2,
          estimatedMinutes: 30,
          content: `# Functions and Arrow Functions

**Learning objectives:**
- Write standard and arrow functions
- Explain the difference and when to use which
- Understand return values

## Standard Functions
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

Parts:
- \`add\` — the name (used to call it)
- \`(a, b)\` — parameters
- \`{ ... }\` — the body
- \`return\` — the output. **Without \`return\`, the function returns \`undefined\`.**

## Arrow Functions (ES6)
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

### Three Forms
\`\`\`javascript
// 1. Full body (multiple statements)
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

// 2. Expression body (implicit return)
const add = (a, b) => a + b;

// 3. Single parameter (no parens needed)
const double = n => n * 2;
\`\`\`

## The Big Difference: this
Arrow functions don't have their own \`this\` — they inherit it from the surrounding scope. This matters when:
- Using \`this\` inside object methods
- Passing callbacks to event listeners
- Working with class methods

For most modern code, **use arrow functions**. Use standard functions when you need \`this\` to bind dynamically.

## Async Functions
\`\`\`javascript
async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return await res.json();
}
\`\`\`

- \`async\` — the function returns a Promise
- \`await\` — pauses execution until the Promise resolves

Every Express route handler in this platform uses \`async (req, res) => {...}\`.

## Key Takeaways
- \`function foo() {}\` = named function
- \`const foo = () => {}\` = arrow function
- Implicit return only works with expressions, not blocks
- \`async/await\` makes async code look synchronous`,
          exercise: {
            enabled: true,
            instructions: "Create an arrow function called `multiply` that takes two numbers and returns their product.",
            walkthrough: "1. Type `const multiply = `.\n2. Add the parameters `(a, b)`.\n3. Use the arrow `=>`.\n4. Return the product `a * b`.",
            expectedOutput: "=>",
            starterHtml: "<h2 id='result'>Result: ...</h2>",
            solutionHtml: "<h2 id='result'>Result: ...</h2>",
            starterCss: "h2 { color: green; }",
            solutionCss: "h2 { color: green; }",
            starterJs: "// Create the multiply function here\n\n// Don't change this line\nif (typeof multiply !== 'undefined') {\n  document.getElementById('result').textContent = 'Result: ' + multiply(5, 4);\n}\n",
            solutionJs: "const multiply = (a, b) => a * b;\n\nif (typeof multiply !== 'undefined') {\n  document.getElementById('result').textContent = 'Result: ' + multiply(5, 4);\n}\n",
          },
        },
        {
          title: "Arrays and Objects",
          slug: "arrays-objects",
          order: 3,
          estimatedMinutes: 30,
          content: `# Arrays and Objects

**Learning objectives:**
- Create and manipulate arrays
- Create and access object properties
- Use the most common array methods

## Arrays
Ordered lists of values.
\`\`\`javascript
const colors = ["red", "green", "blue"];
colors[0];        // "red"
colors.length;    // 3
colors.push("yellow"); // adds to end
colors[1];        // "green"
\`\`\`

## The Essential Array Methods
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
nums.filter(n => n > 2);       // [3, 4, 5]
nums.find(n => n === 3);       // 3
nums.reduce((sum, n) => sum + n, 0); // 15
nums.includes(3);              // true
\`\`\`

| Method | Purpose | Returns |
|--------|---------|---------|
| map | Transform each item | New array |
| filter | Keep items that match | New array |
| find | First matching item | The item |
| reduce | Combine into one value | The result |
| includes | Check existence | Boolean |

## Objects
Key-value pairs.
\`\`\`javascript
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
};

user.name;         // "Alice"
user["age"];       // 30
user.role = "admin"; // add a property
\`\`\`

## Object Methods You'll Use
\`\`\`javascript
Object.keys(user);    // ["name", "age", "email", "role"]
Object.values(user);  // ["Alice", 30, ...]
Object.entries(user); // [["name", "Alice"], ...]
\`\`\`

## Arrays of Objects (The Most Common Pattern)
\`\`\`javascript
const courses = [
  { title: "HTML5", level: "beginner" },
  { title: "CSS3", level: "beginner" },
  { title: "Node.js", level: "intermediate" },
];

const beginners = courses.filter(c => c.level === "beginner");
\`\`\`

This is exactly how API responses look in this platform.

## Key Takeaways
- \`map\` transforms, \`filter\` selects, \`find\` retrieves, \`reduce\` aggregates
- Objects store named properties, arrays store ordered items
- Arrays of objects = the shape of most real data`,
        },
      ],
    },
    {
      title: "DOM & Events",
      description: "Make your page interactive.",
      order: 2,
      lessons: [
        {
          title: "Selecting and Changing Elements",
          slug: "dom-selection",
          order: 1,
          estimatedMinutes: 25,
          content: `# Selecting and Changing Elements

**Learning objectives:**
- Select elements with \`querySelector\`
- Modify text, classes, and styles
- Avoid the \`innerHTML\` security trap

## Selecting Elements
\`\`\`javascript
// First matching element
const header = document.querySelector("h1");
const button = document.querySelector("#save-btn");
const card = document.querySelector(".course-card");

// All matching elements (returns NodeList)
const links = document.querySelectorAll(".nav a");
\`\`\`

## Changing Content
\`\`\`javascript
// Safe — treats string as text
el.textContent = "New text";

// Dangerous — parses as HTML
el.innerHTML = "<strong>Bold</strong>"; // ⚠️ XSS risk
\`\`\`

**Never use \`innerHTML\` with user-controlled data.** A malicious user submits \`<script>stealCookies()</script>\` and it executes.

Instead use \`textContent\` or an escape helper:
\`\`\`javascript
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
el.innerHTML = \`<strong>\${escapeHtml(userInput)}</strong>\`;
\`\`\`

## Working with Classes
\`\`\`javascript
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("open"); // add if missing, remove if present
el.classList.contains("active"); // true/false
\`\`\`

## Working with Styles
\`\`\`javascript
el.style.color = "red";
el.style.display = "none";
// Or set multiple at once
el.style.cssText = "color: red; font-size: 20px;";
\`\`\`

## Key Takeaways
- \`querySelector\` for one, \`querySelectorAll\` for many
- \`textContent\` for text, \`innerHTML\` only for trusted HTML
- \`classList\` is cleaner than manipulating \`className\` directly`,
          exercise: {
            enabled: true,
            instructions: "Select the element with the id `title` and change its text to `Updated!`.",
            walkthrough: "1. Use `document.getElementById('title')`.\n2. Set its `.textContent` to `\"Updated!\"`.",
            expectedOutput: "Updated!",
            starterHtml: "<h1 id='title'>Original Text</h1>",
            solutionHtml: "<h1 id='title'>Original Text</h1>",
            starterCss: "h1 { color: red; }",
            solutionCss: "h1 { color: green; }",
            starterJs: "// Change the text below\n",
            solutionJs: "document.getElementById('title').textContent = 'Updated!';\n",
          },
        },
        {
          title: "Handling Events",
          slug: "handling-events",
          order: 2,
          estimatedMinutes: 30,
          content: `# Handling Events

**Learning objectives:**
- Attach event listeners
- Prevent default behavior
- Read the event object

## The Event Listener
\`\`\`javascript
const button = document.querySelector("#save-btn");
button.addEventListener("click", (event) => {
  console.log("Clicked!", event);
});
\`\`\`

## Common Events
| Event | Fires When |
|-------|-----------|
| click | Mouse or touch |
| submit | Form submitted |
| input | User types in an input |
| change | Input loses focus after change |
| keydown | Key pressed |
| mouseover | Mouse enters an element |
| focus / blur | Input gains / loses focus |

## Preventing Default Behavior
\`\`\`javascript
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page from reloading
  // handle submission manually
});
\`\`\`

Without \`preventDefault\`, submitting a form reloads the entire page — which is never what you want in modern JS.

## The Event Object
\`\`\`javascript
button.addEventListener("click", (e) => {
  e.target;       // the element that was clicked
  e.preventDefault();
  e.stopPropagation(); // stop parent handlers from firing
});
\`\`\`

## Event Delegation
Instead of adding listeners to every item, add one to the parent:
\`\`\`javascript
list.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    deleteItem(e.target.dataset.id);
  }
});
\`\`\`

Why: fewer listeners, works for dynamically added items.

## Key Takeaways
- \`addEventListener\` is the modern API
- \`preventDefault\` stops native behavior
- Event delegation scales better than per-item listeners`,
          exercise: {
            enabled: true,
            instructions: "Add an event listener to the button that changes the text to 'Clicked!' when clicked.",
            walkthrough: "1. Select the button by ID.\n2. Use `.addEventListener('click', () => { ... })`.\n3. Inside the callback, update the text.",
            expectedOutput: "addEventListener",
            starterHtml: "<button id='btn'>Click me</button>\n<p id='output'>Waiting...</p>",
            solutionHtml: "<button id='btn'>Click me</button>\n<p id='output'>Waiting...</p>",
            starterCss: "button { padding: 10px 20px; background: blue; color: white; border: none; border-radius: 5px; }",
            solutionCss: "button { padding: 10px 20px; background: blue; color: white; border: none; border-radius: 5px; }",
            starterJs: "// Add your event listener here\n",
            solutionJs: "document.getElementById('btn').addEventListener('click', () => {\n  document.getElementById('output').textContent = 'Clicked!';\n});\n",
          },
        },
        {
          title: "Fetch API and Async",
          slug: "fetch-api",
          order: 3,
          estimatedMinutes: 30,
          content: `# Fetch API and Async

**Learning objectives:**
- Make GET and POST requests with \`fetch\`
- Handle errors correctly
- Understand why \`res.ok\` matters

## The Basic GET
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

## The Error Trap
**\`fetch\` does NOT throw on 404 or 500.** It only throws on network failure. You must check \`res.ok\`:

\`\`\`javascript
try {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const data = await res.json();
} catch (err) {
  console.error("Failed:", err.message);
}
\`\`\`

## Why This Matters
A common beginner bug: code "succeeds" even though the API returned 400. They never check \`res.ok\` and wonder why the app is broken.

Our platform's \`apiRequest()\` helper wraps all this — but you should know what's under the hood.

## The async/await Pattern
\`\`\`javascript
async function loadCourses() {
  try {
    const res = await fetch("/api/courses");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    renderCourses(data.courses);
  } catch (err) {
    showError(err.message);
  }
}
\`\`\`

## Key Takeaways
- \`fetch\` doesn't throw on HTTP errors — check \`res.ok\`
- Always \`await res.json()\` before reading the body
- Wrap in try/catch for both network and HTTP errors`,
          exercise: {
            enabled: true,
            instructions: "Write an async function called `getData` that fetches from `'https://jsonplaceholder.typicode.com/todos/1'` and logs the data to the console.",
            walkthrough: "1. Create an `async function getData() { ... }`.\n2. Inside, `const res = await fetch(...)`.\n3. Then `const data = await res.json()`.\n4. `console.log(data)`.",
            expectedOutput: "fetch",
            starterHtml: "<button id='fetchBtn'>Run Fetch</button>\n<p id='result'>Check console</p>",
            solutionHtml: "<button id='fetchBtn'>Run Fetch</button>\n<p id='result'>Check console</p>",
            starterCss: "button { padding: 10px 20px; background: purple; color: white; }",
            solutionCss: "button { padding: 10px 20px; background: green; color: white; }",
            starterJs: "// Create the async function here\n\n// Bind to button\nconst btn = document.getElementById('fetchBtn');\nbtn.addEventListener('click', () => {\n  if (typeof getData === 'function') getData();\n  else alert('getData function not found');\n});\n",
            solutionJs: "async function getData() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');\n  const data = await res.json();\n  console.log(data);\n  document.getElementById('result').textContent = 'Data fetched! Check console.';\n}\n\nconst btn = document.getElementById('fetchBtn');\nbtn.addEventListener('click', () => {\n  if (typeof getData === 'function') getData();\n  else alert('getData function not found');\n});\n",
          },
        },
      ],
    },
  ],
};
