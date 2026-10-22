module.exports = {
  title: "Module 4: Styling Frameworks",
  description: "Tailwind, Bootstrap, and Sass.",
  order: 4,
  lessons: [
    {
      title: "Tailwind CSS",
      slug: "tailwind-css",
      order: 1,
      estimatedMinutes: 35,
      content: `# Tailwind CSS

**Learning objectives:**
- Understand utility-first CSS
- Set up Tailwind

## What is Tailwind?
Instead of writing custom CSS classes like \`.btn { padding: 10px; }\`, you use utility classes directly in your HTML: \`<button class="p-4 bg-blue-500 text-white">\`.

## Why Tailwind?
- No more inventing class names.
- No more "CSS bloat" (unused styles are purged).
- Highly customizable via \`tailwind.config.js\`.

## Example
\`\`\`html
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="p-8">
    <h1 class="text-2xl font-bold text-gray-900">Hello, Tailwind!</h1>
  </div>
</div>
\`\`\`
It feels weird at first, but once you learn the utility classes, you never go back.`
    },
    {
      title: "Bootstrap",
      slug: "bootstrap",
      order: 2,
      estimatedMinutes: 25,
      content: `# Bootstrap

**Learning objectives:**
- Use the Bootstrap grid
- Add components

## What is Bootstrap?
The most popular CSS framework. It provides pre-built components (navbars, cards, modals) and a 12-column grid system.

## Setup
You can include it via CDN or npm.
\`\`\`html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
\`\`\`

## The Grid System
\`\`\`html
<div class="row">
  <div class="col-md-6">Left half</div>
  <div class="col-md-6">Right half</div>
</div>
\`\`\`

## When to Use Bootstrap
Great for rapid prototyping or admin dashboards. It's less flexible than Tailwind for highly custom designs.`
    },
    {
      title: "Sass and SCSS",
      slug: "sass-scss",
      order: 3,
      estimatedMinutes: 30,
      content: `# Sass and SCSS

**Learning objectives:**
- Write variables and nesting
- Compile Sass to CSS

## What is Sass?
Syntactically Awesome Style Sheets. A CSS preprocessor that adds features missing from plain CSS.

## SCSS Syntax
\`\`\`scss
$primary-color: #4a9eff;

.btn {
  background: $primary-color;
  padding: 10px;
  
  &:hover {
    background: darken($primary-color, 10%);
  }
}
\`\`\`

## Variables and Nesting
Sass allows you to nest selectors and use variables. However, modern CSS now supports native variables (\`--primary\`) and \`@nest\`, so the gap between Sass and plain CSS is closing.`
    }
  ]
};