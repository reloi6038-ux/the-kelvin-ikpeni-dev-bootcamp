module.exports = {
  title: "Module 3: CSS Basics",
  description: "Styling your HTML and understanding the box model.",
  order: 3,
  lessons: [
    {
      title: "Introduction to CSS",
      slug: "intro-to-css",
      order: 1,
      estimatedMinutes: 25,
      content: `# Introduction to CSS

**Learning objectives:**
- Understand how CSS works
- Link a CSS file to HTML

## What is CSS?
Cascading Style Sheets. It controls how HTML elements look.

## Three Ways to Add CSS
1. **Inline**: \`<p style="color: red;">\` (Avoid)
2. **Internal**: \`<style>\` tag in the \`<head>\`.
3. **External**: \`<link rel="stylesheet" href="style.css">\` (Best practice).`
    },
    {
      title: "CSS Selectors and Properties",
      slug: "css-selectors",
      order: 2,
      estimatedMinutes: 30,
      content: `# CSS Selectors and Properties

**Learning objectives:**
- Target elements using classes and IDs
- Understand specificity

## Selectors
- **Element**: \`p { color: blue; }\`
- **Class**: \`.highlight { background: yellow; }\`
- **ID**: \`#header { font-size: 24px; }\`

## Specificity
IDs (100) > Classes (10) > Elements (1). 
The more specific rule wins.`
    },
    {
      title: "Colors, Backgrounds, and Borders",
      slug: "colors-backgrounds-borders",
      order: 3,
      estimatedMinutes: 25,
      content: `# Colors, Backgrounds, and Borders

**Learning objectives:**
- Use hex, rgb, and hsl colors
- Add borders and background images

## Colors
\`\`\`css
color: #ff0000;
background-color: rgb(255, 0, 0);
border: 2px solid blue;
border-radius: 8px;
\`\`\`

## Backgrounds
\`\`\`css
background-image: url('hero.jpg');
background-size: cover;
background-position: center;
\`\`\``
    },
    {
      title: "Fonts and Typography",
      slug: "fonts-typography",
      order: 4,
      estimatedMinutes: 30,
      content: `# Fonts and Typography

**Learning objectives:**
- Change font families
- Use web-safe fonts

## Font Family
\`\`\`css
body {
  font-family: system-ui, -apple-system, sans-serif;
}
\`\`\`

## Typography Properties
- \`font-size\`: 16px, 1.5rem.
- \`font-weight\`: 400 (normal), 700 (bold).
- \`line-height\`: 1.6 (spacing between lines).
- \`text-align\`: left, center, right.`
    },
    {
      title: "CSS Box Model",
      slug: "css-box-model",
      order: 5,
      estimatedMinutes: 35,
      content: `# CSS Box Model

**Learning objectives:**
- Master the 4 layers of the box model
- Use \`box-sizing: border-box\`

## The Box Model
Content → Padding → Border → Margin.

## The Critical Fix
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`
This ensures padding and border are included in the element's total width.`
    }
  ]
};