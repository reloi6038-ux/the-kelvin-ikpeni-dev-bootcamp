module.exports = {
  title: "Module 5: Fetch, JSON & Storage",
  description: "Communicating with APIs and storing data.",
  order: 5,
  lessons: [
    {
      title: "Promises and async/await",
      slug: "promises-async-await",
      order: 1,
      estimatedMinutes: 35,
      content: `# Promises and async/await

**Learning objectives:**
- Understand asynchronous code
- Avoid callback hell

## What is a Promise?
An object representing the eventual completion (or failure) of an async operation. States: Pending, Fulfilled, Rejected.

## async/await
Makes async code look synchronous.
\`\`\`javascript
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed:", error);
  }
}
\`\`\`

## Why Use It?
It's cleaner and easier to debug than chaining \`.then()\` blocks. Always wrap \`await\` in a \`try/catch\`.`
    },
    {
      title: "Fetch API",
      slug: "fetch-api",
      order: 2,
      estimatedMinutes: 35,
      content: `# Fetch API

**Learning objectives:**
- Make HTTP requests
- Send data to a server

## GET Request
\`\`\`javascript
const res = await fetch("/api/courses");
const data = await res.json();
\`\`\`

## POST Request
\`\`\`javascript
await fetch("/api/courses", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Course" })
});
\`\`\`

## The Error Trap
Fetch only rejects on network failures. For 404 or 500 errors, you must check \`res.ok\`.
\`\`\`javascript
if (!res.ok) throw new Error("HTTP error " + res.status);
\`\`\``
    },
    {
      title: "Working with JSON",
      slug: "working-with-json",
      order: 3,
      estimatedMinutes: 25,
      content: `# Working with JSON

**Learning objectives:**
- Parse JSON strings
- Stringify JavaScript objects

## What is JSON?
JavaScript Object Notation. A text format used to exchange data.

## Parse
Convert a JSON string into a JS object.
\`\`\`javascript
const jsonString = '{"name":"Alice","age":25}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // Alice
\`\`\`

## Stringify
Convert a JS object into a JSON string.
\`\`\`javascript
const json = JSON.stringify(obj);
// '{"name":"Alice","age":25}'
\`\`\``
    },
    {
      title: "Browser Storage: Local Storage and Session Storage",
      slug: "browser-storage",
      order: 4,
      estimatedMinutes: 30,
      content: `# Browser Storage: Local Storage and Session Storage

**Learning objectives:**
- Persist data in the browser
- Understand the difference between local and session storage

## LocalStorage
Data persists even after the browser is closed. No expiration.
\`\`\`javascript
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();
\`\`\`

## SessionStorage
Data is cleared when the tab is closed. Useful for sensitive temporary data.
\`\`\`javascript
sessionStorage.setItem("draft", "...");
\`\`\`

## Rules
- Only stores strings. Use \`JSON.stringify\` and \`JSON.parse\` for objects.
- Never store passwords or sensitive tokens in LocalStorage (vulnerable to XSS).`
    },
    {
      title: "Form Validation with JavaScript",
      slug: "form-validation-js",
      order: 5,
      estimatedMinutes: 30,
      content: `# Form Validation with JavaScript

**Learning objectives:**
- Prevent default form submission
- Show custom error messages

## HTML5 Validation is Not Enough
HTML5 provides basic validation (\`required\`, \`type="email"\`), but you need JS for real-time validation, custom messages, and logic.

## Intercepting the Form
\`\`\`javascript
const form = document.getElementById("signup-form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  
  const email = form.email.value.trim();
  if (!email.includes("@")) {
    showError("Invalid email address");
    return;
  }
  // Submit via fetch
});
\`\`\``
    },
    {
      title: "Error Handling and Debugging",
      slug: "error-handling-debugging",
      order: 6,
      estimatedMinutes: 30,
      content: `# Error Handling and Debugging

**Learning objectives:**
- Use \`try/catch\` and \`throw\`
- Debug with DevTools

## try/catch
\`\`\`javascript
try {
  JSON.parse("invalid json");
} catch (error) {
  console.error("Parsing failed:", error.message);
}
\`\`\`

## Throw
\`\`\`javascript
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
\`\`\`

## Debugging Tools
- **console.log**: Quick checks.
- **Breakpoints**: In DevTools Sources, click a line number to pause execution and inspect variables.
- **debugger**: Add \`debugger;\` in your code, and it will pause the browser when DevTools is open.`
    },
    {
      title: "Browser Developer Tools",
      slug: "browser-dev-tools",
      order: 7,
      estimatedMinutes: 25,
      content: `# Browser Developer Tools

**Learning objectives:**
- Navigate the DevTools panels
- Edit CSS and JS live

## The Panels
- **Elements**: Inspect the DOM, edit HTML, and tweak CSS.
- **Console**: Run JS, view logs and errors.
- **Sources**: Debug JS with breakpoints.
- **Network**: View HTTP requests, payloads, and response times.
- **Application**: Inspect LocalStorage, SessionStorage, Cookies, and Cache.

## Best Practices
- Use the Device Toolbar (Ctrl+Shift+M) to test mobile layouts.
- Use the Network tab to find slow API calls.
- Use the Console to test API endpoints with \`fetch()\` before writing code.`
    }
  ]
};