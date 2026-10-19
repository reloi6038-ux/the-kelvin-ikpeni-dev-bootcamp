module.exports = {
  course: {
    title: "Professional HTML Application Development",
    slug: "html-apps",
    description: "Build dynamic, API-driven HTML apps with clean architecture and reusable components.",
    level: "intermediate",
    estimatedHours: 12,
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

Split your code into focused files, each with one job.

## The structure

\`\`\`
public/js/
├── api.js        → fetch helper, error handling
├── auth.js       → login, logout, session check
├── courses.js    → course list rendering
├── dashboard.js  → dashboard behavior
└── main.js       → nav toggle, active link, footer
\`\`\`

## Load them on each page

\`\`\`html
<script src="/js/api.js"></script>
<script src="/js/main.js"></script>
<script src="/js/courses.js"></script>
\`\`\`

## Why this works
Each page loads only what it needs. \`api.js\` and \`main.js\` are common. Page-specific logic lives in its own file.

## Common mistakes
- ❌ One 3,000-line \`script.js\` — impossible to maintain
- ❌ Inline \`<script>\` on every page — no reuse, no caching
- ❌ Copy-pasting the same fetch logic everywhere — bugs multiply

## This bootcamp's pattern
Every page follows: **api.js → main.js → page-specific.js**. Each file does one thing well.`,
        },
      ],
    },
  ],
};