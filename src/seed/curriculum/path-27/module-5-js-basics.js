module.exports = {
  title: "Module 5: JavaScript Basics",
  description: "Variables, logic, and interacting with the DOM.",
  order: 5,
  lessons: [
    {
      title: "Introduction to JavaScript",
      slug: "intro-to-javascript",
      order: 1,
      estimatedMinutes: 30,
      content: `# Introduction to JavaScript

**Learning objectives:**
- Add JS to your HTML
- Output to the console

## Adding JS
\`\`\`html
<script src="script.js"></script>
\`\`\`
Place this just before the closing \`</body>\` tag.

## Console Output
\`\`\`javascript
console.log("Hello, world!");
\`\`\`
Open DevTools (F12) to see the console.`
    },
    {
      title: "Variables, Data Types, and Operators",
      slug: "variables-data-types",
      order: 2,
      estimatedMinutes: 30,
      content: `# Variables, Data Types, and Operators

**Learning objectives:**
- Declare variables with \`const\` and \`let\`
- Use operators

## Variables
\`\`\`javascript
const name = "Alice"; // cannot be reassigned
let age = 25;         // can be reassigned
\`\`\`

## Data Types
String, Number, Boolean, Null, Undefined, Object, Array.

## Operators
\`+\`, \`-\`, \`*\`, \`/\`, \`%<\`, \`===\`, \`!==\`, \`>=\`, \`<=\``
    },
    {
      title: "Conditional Statements",
      slug: "conditional-statements",
      order: 3,
      estimatedMinutes: 25,
      content: `# Conditional Statements

**Learning objectives:**
- Use \`if\`, \`else if\`, and \`else\`
- Use the ternary operator

## If/Else
\`\`\`javascript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
\`\`\`

## Ternary
\`\`\`javascript
const status = age >= 18 ? "Adult" : "Minor";
\`\`\``
    },
    {
      title: "Loops and Iteration",
      slug: "loops-and-iteration",
      order: 4,
      estimatedMinutes: 30,
      content: `# Loops and Iteration

**Learning objectives:**
- Use \`for\` and \`while\` loops

## For Loop
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

## While Loop
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\``
    },
    {
      title: "Functions and Scope",
      slug: "functions-and-scope",
      order: 5,
      estimatedMinutes: 30,
      content: `# Functions and Scope

**Learning objectives:**
- Write reusable functions
- Understand variable scope

## Function Declaration
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Arrow Functions
\`\`\`javascript
const greet = (name) => "Hello, " + name;
\`\`\`

## Scope
Variables inside a function are not accessible outside.`
    },
    {
      title: "Arrays and Objects",
      slug: "arrays-and-objects",
      order: 6,
      estimatedMinutes: 35,
      content: `# Arrays and Objects

**Learning objectives:**
- Store lists of data in arrays
- Store key-value pairs in objects

## Arrays
\`\`\`javascript
const colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
\`\`\`

## Objects
\`\`\`javascript
const user = { name: "Alice", age: 25 };
console.log(user.name); // "Alice"
\`\`\``
    },
    {
      title: "JavaScript Events",
      slug: "javascript-events",
      order: 7,
      estimatedMinutes: 30,
      content: `# JavaScript Events

**Learning objectives:**
- Listen for clicks and typing

## Event Listeners
\`\`\`javascript
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  alert("Clicked!");
});
\`\`\``
    },
    {
      title: "Introduction to the DOM",
      slug: "intro-to-dom",
      order: 8,
      estimatedMinutes: 35,
      content: `# Introduction to the DOM

**Learning objectives:**
- Select HTML elements with JS
- Change content and styles

## Selecting Elements
\`\`\`javascript
const title = document.querySelector("h1");
const btn = document.getElementById("btn");
\`\`\`

## Changing Elements
\`\`\`javascript
title.textContent = "New Title!";
title.style.color = "red";
\`\`\``
    }
  ]
};