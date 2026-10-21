module.exports = {
  title: "Module 2: Modern CSS Layouts",
  description: "Flexbox, Grid, and responsive design.",
  order: 2,
  lessons: [
    {
      title: "CSS Flexbox",
      slug: "css-flexbox",
      order: 1,
      estimatedMinutes: 35,
      content: `# CSS Flexbox

**Learning objectives:**
- Lay out items in a single row or column
- Center elements perfectly

## The Flex Container
\`\`\`css
.container {
  display: flex;
  gap: 16px;
}
\`\`\`

## Alignment
- \`justify-content\`: Aligns along the main axis (horizontal for rows).
- \`align-items\`: Aligns along the cross axis (vertical for rows).

## Growing and Shrinking
\`\`\`css
.item {
  flex: 1; /* grow to fill available space */
}
\`\`\`

## Centering Anything
\`\`\`css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\``
    },
    {
      title: "CSS Grid Layout",
      slug: "css-grid-layout",
      order: 2,
      estimatedMinutes: 40,
      content: `# CSS Grid Layout

**Learning objectives:**
- Create 2D layouts (rows and columns)
- Use the \`auto-fill\` and \`minmax\` responsive pattern

## Basic Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
\`\`\`

## The Responsive Magic
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`
This creates as many 300px columns as fit the screen, wrapping to the next row without any media queries.

## Grid vs Flexbox
- **Flexbox**: 1D layouts (navbars, button groups).
- **Grid**: 2D layouts (whole page structure, photo galleries).`
    },
    {
      title: "Responsive Web Design & Media Queries",
      slug: "responsive-media-queries",
      order: 3,
      estimatedMinutes: 35,
      content: `# Responsive Web Design & Media Queries

**Learning objectives:**
- Adapt layouts to different screen sizes
- Write mobile-first CSS

## The Viewport Meta Tag
Always include this in your \`<head>\`:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

## Media Queries
\`\`\`css
/* Base styles (mobile) */
.sidebar { display: none; }

/* Tablet and up */
@media (min-width: 768px) {
  .sidebar { display: block; }
}
\`\`\`

## Mobile-First Approach
Write base CSS for mobile screens, then use \`min-width\` media queries to enhance the layout for larger screens. Never use \`max-width\` queries if you can avoid it.`
    },
    {
      title: "CSS Positioning and Z-Index",
      slug: "css-positioning",
      order: 4,
      estimatedMinutes: 30,
      content: `# CSS Positioning and Z-Index

**Learning objectives:**
- Master \`static\`, \`relative\`, \`absolute\`, \`fixed\`, and \`sticky\`
- Stack elements with z-index

## Position Types
- \`static\`: Default.
- \`relative\`: Moves relative to itself.
- \`absolute\`: Positions relative to the nearest positioned ancestor.
- \`fixed\`: Positions relative to the viewport (stays on screen while scrolling).
- \`sticky\`: Toggles between relative and fixed based on scroll position.

## Z-Index
Only works on positioned elements (relative, absolute, fixed, or sticky). Higher numbers appear on top.
\`\`\`css
.modal {
  position: fixed;
  z-index: 1000;
}
\`\`\``
    }
  ]
};