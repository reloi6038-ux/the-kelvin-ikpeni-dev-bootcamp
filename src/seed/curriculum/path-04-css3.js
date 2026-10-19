// Path 4: CSS3
module.exports = {
  course: {
    title: "CSS3 & Responsive Design",
    slug: "css3",
    description:
      "Master modern layout with Flexbox and Grid, build responsive designs, and style professional interfaces.",
    level: "beginner",
    estimatedHours: 16,
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

## Specificity rules
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
          estimatedMinutes: 20,
          content: `# The Box Model

Every element is a rectangular box with four layers:

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

## Critical rule: \`box-sizing\`
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

Without this, \`width: 100px\` + \`padding: 10px\` = **120px total width**.
With \`border-box\`, it stays at 100px — padding eats into the content area. **Always set this.**`,
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

## Basic usage
\`\`\`css
.container {
  display: flex;
  gap: 1rem;
}
\`\`\`

## Key properties (on container)
- \`flex-direction\` — \`row\` (default) or \`column\`
- \`justify-content\` — horizontal alignment: \`flex-start\`, \`center\`, \`space-between\`
- \`align-items\` — vertical alignment: \`stretch\`, \`center\`, \`flex-start\`
- \`gap\` — space between items
- \`flex-wrap\` — allow wrapping: \`wrap\`

## Key properties (on children)
- \`flex: 1\` — grow to fill available space
- \`flex-shrink: 0\` — prevent shrinking

## Common patterns
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

## Basic usage
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

This creates **3 equal columns**.

## Responsive magic
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

This automatically creates as many 300px+ columns as fit the viewport — **no media queries needed**.

## Flexbox vs Grid
- **Flexbox** — one dimension (a nav bar, a row of cards)
- **Grid** — two dimensions (a page layout, a photo gallery)

Use both together: Grid for the overall page, Flexbox inside components.`,
        },
        {
          title: "Responsive Design",
          slug: "responsive-design",
          order: 3,
          estimatedMinutes: 20,
          content: `# Responsive Design

Users visit your site on phones, tablets, laptops, and desktops. The layout must adapt.

## The viewport meta tag
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

**Without this**, phones render the site at desktop width and zoom out — unreadable.

## Media queries
\`\`\`css
/* Mobile-first: start with mobile styles, then add */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\`

## Mobile-first approach
1. Write base styles for mobile
2. Add \`min-width\` media queries for larger screens
3. **Never** write \`max-width\` breakpoints if you can avoid it

Mobile-first produces cleaner, faster-loading sites because phones download fewer CSS rules.`,
        },
      ],
    },
  ],
};