// Path 13: Professional HTML Application Development
module.exports = {
  course: {
    title: "Professional HTML Application Development",
    slug: "html-apps",
    description:
      "Build dynamic, API-driven HTML apps with clean architecture and reusable components.",
    level: "intermediate",
    estimatedHours: 14,
    icon: "htmlapps",
    order: 13,
    isPublished: true,
  },
  modules: [
    {
      title: "Application Architecture",
      description: "Structure, reuse, and maintainability.",
      order: 1,
      lessons: [
        {
          title: "Modular Browser JavaScript",
          slug: "modular-browser-js",
          order: 1,
          estimatedMinutes: 20,
          content: `# Modular Browser JavaScript

Split your code into focused files.

## The Structure
\`\`\`
public/js/
├── api.js        → fetch helper
├── auth.js       → login/session
├── courses.js    → course list
├── dashboard.js  → dashboard
└── main.js       → nav toggle
\`\`\`

## Load Them on Each Page
\`\`\`html
<script src="/js/api.js"></script>
<script src="/js/main.js"></script>
<script src="/js/courses.js"></script>
\`\`\`

## Common Mistakes
- ❌ One 3,000-line script.js
- ❌ Inline \`<script>\` on every page
- ❌ Copy-pasting fetch logic`,
        },
        {
          title: "Reusable Components",
          slug: "reusable-components",
          order: 2,
          estimatedMinutes: 20,
          content: `# Reusable Components

## The Pattern
Write a render function once, use it everywhere.
\`\`\`javascript
function renderCourseCard(course) {
  return \`
    <a class="course-card" href="/course-details.html?slug=\${course.slug}">
      <h3>\${escapeHtml(course.title)}</h3>
      <p>\${escapeHtml(course.description)}</p>
    </a>
  \`;
}
\`\`\`

Use it in any list:
\`\`\`javascript
grid.innerHTML = courses.map(renderCourseCard).join("");
\`\`\`

## Why
- Change once, updates everywhere.
- Testable in isolation.
- Composable.`,
        },
      ],
    },
  ],
};