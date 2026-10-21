module.exports = {
  title: "Module 2: HTML Content & Forms",
  description: "Elements, media, tables, and user input.",
  order: 2,
  lessons: [
    {
      title: "HTML Elements and Attributes",
      slug: "html-elements-attributes",
      order: 1,
      estimatedMinutes: 25,
      content: `# HTML Elements and Attributes

**Learning objectives:**
- Understand global attributes like \`id\` and \`class\`
- Learn inline vs block elements

## Global Attributes
- \`id\`: Unique identifier for one element.
- \`class\`: Used to group multiple elements for styling.
- \`style\`: Inline CSS (avoid when possible).

## Block vs Inline
- **Block**: Takes up full width (e.g., \`<div>\`, \`<p>\`, \`<h1>\`).
- **Inline**: Takes up only needed width (e.g., \`<span>\`, \`<a>\`, \`<img>\`).`
    },
    {
      title: "Headings, Paragraphs, Links, and Images",
      slug: "headings-paragraphs-links",
      order: 2,
      estimatedMinutes: 30,
      content: `# Headings, Paragraphs, Links, and Images

**Learning objectives:**
- Use headings for structure
- Create links and add images

## Headings
Use \`<h1>\` through \`<h6>\`. Only one \`<h1>\` per page for SEO.

## Paragraphs
\`<p>\` for blocks of text.

## Links
\`\`\`html
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
\`\`\`

## Images
\`\`\`html
<img src="image.jpg" alt="Description" width="300">
\`\`\`
Always include the \`alt\` attribute for accessibility.`
    },
    {
      title: "Lists and Tables in HTML",
      slug: "lists-and-tables",
      order: 3,
      estimatedMinutes: 30,
      content: `# Lists and Tables in HTML

**Learning objectives:**
- Create unordered and ordered lists
- Create data tables

## Lists
\`\`\`html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
\`\`\`
Use \`<ol>\` for ordered lists.

## Tables
\`\`\`html
<table>
  <thead>
    <tr><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>25</td></tr>
  </tbody>
</table>
\`\`\`
Use \`<thead>\` and \`<tbody>\` for semantic structure.`
    },
    {
      title: "HTML Forms and Input Fields",
      slug: "html-forms",
      order: 4,
      estimatedMinutes: 35,
      content: `# HTML Forms and Input Fields

**Learning objectives:**
- Build a form
- Use different input types

## The Form Element
\`\`\`html
<form action="/submit" method="POST">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Submit</button>
</form>
\`\`\`

## Input Types
- \`text\`, \`email\`, \`password\`
- \`number\`, \`date\`, \`checkbox\`, \`radio\``
    },
    {
      title: "Semantic HTML",
      slug: "semantic-html",
      order: 5,
      estimatedMinutes: 30,
      content: `# Semantic HTML

**Learning objectives:**
- Replace divs with semantic tags
- Improve accessibility and SEO

## Why Semantic HTML?
Semantic tags describe their meaning to the browser and screen readers.

## Common Tags
- \`<header>\`: Top of page.
- \`<nav>\`: Navigation links.
- \`<main>\`: Primary content.
- \`<article>\`: Independent content (blog post).
- \`<section>\`: Thematic grouping.
- \`<footer>\`: Bottom of page.`
    }
  ]
};