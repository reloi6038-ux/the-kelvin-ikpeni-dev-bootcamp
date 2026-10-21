module.exports = {
  title: "Module 4: Advanced JavaScript",
  description: "DOM, events, async, and modern syntax.",
  order: 4,
  lessons: [
    {
      title: "Advanced DOM Manipulation",
      slug: "advanced-dom-manipulation",
      order: 1,
      estimatedMinutes: 35,
      content: `# Advanced DOM Manipulation

**Learning objectives:**
- Create and remove elements dynamically
- Use DocumentFragment

## Creating Elements
\`\`\`javascript
const card = document.createElement("div");
card.className = "card";
card.textContent = "Hello!";
document.body.appendChild(card);
\`\`\`

## Removing Elements
\`\`\`javascript
card.remove();
\`\`\`

## Efficient Batch Updates
Instead of appending inside a loop (which forces multiple reflows), use a DocumentFragment.
\`\`\`javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
document.getElementById("list").appendChild(fragment);
\`\`\``
    },
    {
      title: "Event Listeners and Event Delegation",
      slug: "event-delegation",
      order: 2,
      estimatedMinutes: 30,
      content: `# Event Listeners and Event Delegation

**Learning objectives:**
- Add and remove events
- Use delegation for dynamic elements

## Basic Listener
\`\`\`javascript
const btn = document.querySelector("#btn");
btn.addEventListener("click", handleClick);
\`\`\`

## Event Delegation
If you have a list of items that change dynamically, don't add a listener to every item. Add one to the parent.
\`\`\`javascript
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    e.target.closest("li").remove();
  }
});
\`\`\`
This is faster, uses less memory, and works for future items.`
    },
    {
      title: "JavaScript Modules",
      slug: "javascript-modules",
      order: 3,
      estimatedMinutes: 30,
      content: `# JavaScript Modules

**Learning objectives:**
- Split code into multiple files
- Use \`import\` and \`export\`

## Why Modules?
Large files are hard to maintain. Modules allow you to split functionality.

## Exporting
\`\`\`javascript
// math.js
export function add(a, b) {
  return a + b;
}
\`\`\`

## Importing
\`\`\`html
<script type="module" src="app.js"></script>
\`\`\`
\`\`\`javascript
// app.js
import { add } from "./math.js";
console.log(add(2, 3));
\`\`\`

## Note
Modules are strict by default and only work over HTTP (not file://), so you need a server (like Live Server or Express).`
    },
    {
      title: "Destructuring and Spread Syntax",
      slug: "destructuring-spread",
      order: 4,
      estimatedMinutes: 30,
      content: `# Destructuring and Spread Syntax

**Learning objectives:**
- Extract data from objects and arrays quickly
- Clone and merge objects

## Object Destructuring
\`\`\`javascript
const user = { name: "Alice", age: 25 };
const { name, age } = user;
console.log(name); // "Alice"
\`\`\`

## Array Destructuring
\`\`\`javascript
const [first, second] = ["a", "b"];
\`\`\`

## Spread Operator
\`\`\`javascript
// Clone object
const userCopy = { ...user };

// Merge objects
const updatedUser = { ...user, age: 26 };

// Spread array
const newArr = [...oldArr, 4, 5];
\`\`\``
    },
    {
      title: "Array Methods: map(), filter(), and reduce()",
      slug: "array-methods",
      order: 5,
      estimatedMinutes: 35,
      content: `# Array Methods: map(), filter(), and reduce()

**Learning objectives:**
- Transform and filter data
- Understand functional programming

## map()
Transforms every item and returns a new array.
\`\`\`javascript
const prices = [10, 20, 30];
const doubled = prices.map(p => p * 2); // [20, 40, 60]
\`\`\`

## filter()
Keeps only items that return true.
\`\`\`javascript
const evens = prices.filter(p => p % 2 === 0); // [10, 20]
\`\`\`

## reduce()
Boils the array down to a single value.
\`\`\`javascript
const sum = prices.reduce((total, p) => total + p, 0); // 60
\`\`\`

## Chaining
\`\`\`javascript
const result = prices.filter(p => p > 10).map(p => p * 2);
\`\`\``
    }
  ]
};