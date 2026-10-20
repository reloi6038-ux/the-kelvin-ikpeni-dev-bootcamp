// Path 13: Professional HTML Application Development
module.exports = {
  course: {
    title: "Professional HTML Application Development",
    slug: "html-apps",
    description:
      "Build dynamic, API-driven HTML apps with clean architecture, reusable components, and professional patterns.",
    level: "intermediate",
    estimatedHours: 16,
    icon: "htmlapps",
    order: 13,
    isPublished: true,
  },
  modules: [
    {
      title: "Application Architecture",
      description: "Structure, modularity, and reuse.",
      order: 1,
      lessons: [
        {
          title: "Modular Browser JavaScript",
          slug: "modular-browser-js",
          order: 1,
          estimatedMinutes: 25,
          content: `# Modular Browser JavaScript

**Learning objectives:**
- Split client-side code into focused files
- Understand load order and dependencies
- Avoid global namespace pollution

## The Structure
\`\`\`
public/js/
├── api.js        → fetch helper, error handling
├── auth.js       → login, logout, session check
├── courses.js    → course list rendering
├── lesson.js     → lesson viewer
├── ide.js        → Monaco editor
├── dashboard.js  → dashboard behavior
└── main.js       → nav toggle, footer year
\`\`\`

## The Load Order
\`\`\`html
<script src="/js/api.js"></script>
<script src="/js/main.js"></script>
<script src="/js/auth.js"></script>
<script src="/js/courses.js"></script>
\`\`\`

**Dependencies must load first.** If \`courses.js\` calls \`apiRequest()\`, then \`api.js\` must load before it.

## Common Mistakes

### One giant script.js
Impossible to navigate. Every change risks breaking unrelated code.

### Inline script on every page
No browser caching, no reuse, duplicated logic.

### Global variables everywhere
\`window.courses = ...\` pollutes the global scope. Two pages can conflict.

## The IIFE Pattern
Wrap your file in an immediately-invoked function:
\`\`\`javascript
(function () {
  "use strict";
  // your code here — scoped, doesn't leak
})();
\`\`\`

Benefits:
- No global pollution
- Private variables
- Explicit exports (\`window.myModule = {...}\`)

## The Modern Alternative: ES Modules
\`\`\`html
<script type="module" src="/js/main.js"></script>
\`\`\`

ES modules are cleaner but require \`type="module"\` and HTTP (not \`file://\`). Our platform uses the IIFE pattern for maximum compatibility.

## Key Takeaways
- One file = one responsibility
- Load order matters — dependencies first
- IIFE pattern avoids global pollution
- ES modules are the modern alternative`,
        },
        {
          title: "Reusable Components",
          slug: "reusable-components",
          order: 2,
          estimatedMinutes: 25,
          content: `# Reusable Components

**Learning objectives:**
- Build render functions that return HTML strings
- Compose components together
- Handle dynamic data safely

## The Pattern
Write a function that takes data and returns HTML:
\`\`\`javascript
function renderCourseCard(course) {
  return \`
    <a class="course-card" href="/course-details.html?slug=\${escapeHtml(course.slug)}">
      <h3>\${escapeHtml(course.title)}</h3>
      <p>\${escapeHtml(course.description)}</p>
      <span class="level">\${escapeHtml(course.level)}</span>
    </a>
  \`;
}
\`\`\`

Then use it anywhere:
\`\`\`javascript
grid.innerHTML = courses.map(renderCourseCard).join("");
\`\`\`

## Why This Works
- **Single source of truth** — change the card design once, updates everywhere
- **Composable** — \`renderCourseCard\` can be used in grids, lists, sidebars
- **Testable** — pass sample data, check output

## Escape Everything
Any dynamic value **must** be escaped:
\`\`\`javascript
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
\`\`\`

Without this, a course titled \`<script>alert(1)</script>\` executes in every visitor's browser.

## Component Composition
Build bigger components from smaller ones:
\`\`\`javascript
function renderCourseGrid(courses) {
  return \`<div class="grid">\${courses.map(renderCourseCard).join("")}</div>\`;
}

function renderDashboard(courses, certificates) {
  return \`
    <section>\${renderCourseGrid(courses)}</section>
    <section>\${certificates.map(renderCertCard).join("")}</section>
  \`;
}
\`\`\`

## Key Takeaways
- Component = function that takes data, returns HTML
- Always escape dynamic values
- Compose components to build bigger UIs
- One render function, used everywhere`,
        },
      ],
    },
  ],
};