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
\`\`\``,
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
            solutionJs: "const myName = 'Kelvin';\n\ndocument.getElementById('output').textContent = typeof myName !== 'undefined' ? myName : 'Waiting...';\n"
          },
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
\`\`\``,
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
            solutionJs: "const multiply = (a, b) => a * b;\n\nif (typeof multiply !== 'undefined') {\n  document.getElementById('result').textContent = 'Result: ' + multiply(5, 4);\n}\n"
          },
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
header.textContent = "New heading";
\`\`\``,
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
            solutionJs: "document.getElementById('title').textContent = 'Updated!';\n"
          },
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
\`\`\``,
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
            solutionJs: "document.getElementById('btn').addEventListener('click', () => {\n  document.getElementById('output').textContent = 'Clicked!';\n});\n"
          },
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
const res = await fetch("/api/data");
const data = await res.json();
\`\`\``,
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
            solutionJs: "async function getData() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');\n  const data = await res.json();\n  console.log(data);\n  document.getElementById('result').textContent = 'Data fetched! Check console.';\n}\n\nconst btn = document.getElementById('fetchBtn');\nbtn.addEventListener('click', () => {\n  if (typeof getData === 'function') getData();\n  else alert('getData function not found');\n});\n"
          },
        },
      ],
    },
  ],
};