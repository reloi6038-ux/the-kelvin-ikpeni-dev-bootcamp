// Path 4: CSS3 & Responsive Design
module.exports = {
  course: {
    title: "CSS3 & Responsive Design",
    slug: "css3",
    description:
      "Master modern layout with Flexbox and Grid, build responsive designs, and style professional interfaces.",
    level: "beginner",
    estimatedHours: 18,
    icon: "css3",
    order: 4,
    isPublished: true,
  },
  modules: [
    {
      title: "CSS Fundamentals",
      description: "Selectors, box model, colors, and typography.",
      order: 1,
      lessons: [
        {
          title: "Selectors and Specificity",
          slug: "selectors-specificity",
          order: 1,
          estimatedMinutes: 20,
          content: `# Selectors and Specificity

CSS selectors target HTML elements to style.

## Basic selectors
\`\`\`css
/* Element */
p { color: blue; }

/* Class */
.highlight { background: yellow; }

/* ID */
#header { font-size: 2rem; }

/* Descendant */
nav a { color: white; }
\`\`\`

## Specificity Rules
When multiple rules match, the **most specific** wins:
1. **ID** (\`#header\`) — highest
2. **Class** (\`.highlight\`), attribute, pseudo-class
3. **Element** (\`p\`, \`nav\`) — lowest

## Tip
Prefer classes over IDs for styling. IDs are for JavaScript hooks and anchor links.`,
        },
        {
          title: "The Box Model",
          slug: "box-model",
          order: 2,
          estimatedMinutes: 25,
          content: `# The Box Model

Every element is a rectangular box with four layers.

## The Layers
\`\`\`
┌─────────────────────────────────┐
│         margin (outside)        │
│  ┌───────────────────────────┐  │
│  │     border                │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   padding            │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   content     │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
\`\`\`

## Critical Rule: box-sizing
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

Without this, \`width: 100px\` + \`padding: 10px\` = **120px total width**. With \`border-box\`, it stays at 100px. **Always set this.**`,
        },
        {
          title: "Typography and Colors",
          slug: "typography-colors",
          order: 3,
          estimatedMinutes: 20,
          content: `# Typography and Colors

## Typography
\`\`\`css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: 0.01em;
}
\`\`\`

## Font Sizes with clamp()
\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
\`\`\`
This scales smoothly between 2rem and 3.5rem based on viewport width.

## Colors
\`\`\`css
/* Hex */
color: #4a9eff;

/* RGB */
color: rgb(74, 158, 255);

/* HSL (easier to tweak) */
color: hsl(211, 100%, 65%);

/* With opacity */
color: rgba(74, 158, 255, 0.5);
\`\`\`

## CSS Variables
\`\`\`css
:root {
  --primary: #4a9eff;
  --text: #e6e9f0;
}
button { background: var(--primary); }
\`\`\``,
        },
      ],
    },
    {
      title: "Modern Layout",
      description: "Flexbox and CSS Grid.",
      order: 2,
      lessons: [
        {
          title: "Flexbox Fundamentals",
          slug: "flexbox",
          order: 1,
          estimatedMinutes: 25,
          content: `# Flexbox Fundamentals

Flexbox is for laying out items **in one dimension** (row or column).

## Basic Usage
\`\`\`css
.container {
  display: flex;
  gap: 1rem;
}
\`\`\`

## Key Properties (on container)
- \`flex-direction\`: \`row\` (default) or \`column\`
- \`justify-content\`: horizontal alignment
- \`align-items\`: vertical alignment
- \`gap\`: space between items
- \`flex-wrap\`: allow wrapping

## Key Properties (on children)
- \`flex: 1\`: grow to fill available space
- \`flex-shrink: 0\`: prevent shrinking

## Common Patterns
**Center anything:**
\`\`\`css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\``,
        },
        {
          title: "CSS Grid",
          slug: "css-grid",
          order: 2,
          estimatedMinutes: 25,
          content: `# CSS Grid

Grid is for **two-dimensional** layouts (rows AND columns).

## Basic Usage
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## Responsive Magic
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`
Automatically creates as many 300px+ columns as fit. **No media queries needed.**

## Flexbox vs Grid
- **Flexbox** — one dimension (nav bar, row of cards)
- **Grid** — two dimensions (page layout, photo gallery)

Use both together: Grid for the overall page, Flexbox inside components.`,
        },
        {
          title: "Responsive Design",
          slug: "responsive-design",
          order: 3,
          estimatedMinutes: 25,
          content: `# Responsive Design

Users visit on phones, tablets, laptops, and desktops. Layouts must adapt.

## The Viewport Meta Tag
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
**Without this**, phones render at desktop width and zoom out — unreadable.

## Media Queries
\`\`\`css
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

## Mobile-First Approach
1. Write base styles for mobile.
2. Add \`min-width\` media queries for larger screens.
3. **Never** write \`max-width\` if you can avoid it.

Mobile-first produces cleaner, faster-loading sites.`,
        },
      ],
    },
  ],
};