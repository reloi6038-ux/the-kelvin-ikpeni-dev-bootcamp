module.exports = {
  title: "Module 4: CSS Layouts & Units",
  description: "Spacing, measurements, and structuring pages.",
  order: 4,
  lessons: [
    {
      title: "Margins, Padding, and Borders",
      slug: "margins-padding-borders",
      order: 1,
      estimatedMinutes: 25,
      content: `# Margins, Padding, and Borders

**Learning objectives:**
- Control space inside and outside elements
- Use shorthand properties

## Shorthand
\`\`\`css
/* All sides */
margin: 10px;

/* Top/bottom left/right */
padding: 10px 20px;

/* Top right bottom left */
padding: 10px 20px 30px 40px;
\`\`\`

## Centering with Margin
\`margin: 0 auto;\` centers a block element horizontally.`
    },
    {
      title: "CSS Units and Measurements",
      slug: "css-units",
      order: 2,
      estimatedMinutes: 30,
      content: `# CSS Units and Measurements

**Learning objectives:**
- Distinguish between absolute and relative units

## Absolute Units
- \`px\`: Pixels (fixed size).

## Relative Units
- \`rem\`: Relative to root font-size (usually 16px).
- \`em\`: Relative to parent font-size.
- \`vw / vh\`: Percentage of viewport width/height.
- \`%\`: Relative to parent.

## Best Practice
Use \`rem\` for fonts and \`%\` or \`vw\` for layouts to ensure responsiveness.`
    }
  ]
};