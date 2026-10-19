// Path 3: HTML5 Mastery
module.exports = {
  course: {
    title: "HTML5 Mastery",
    slug: "html5",
    description:
      "Learn semantic markup, forms, accessibility, and SEO — the structure of every web page.",
    level: "beginner",
    estimatedHours: 12,
    icon: "html5",
    order: 3,
    isPublished: true,
  },
  modules: [
    {
      title: "HTML Fundamentals",
      description: "Document structure, elements, and semantic markup.",
      order: 1,
      lessons: [
        {
          title: "Your First HTML Page",
          slug: "first-html-page",
          order: 1,
          estimatedMinutes: 15,
          content: `# Your First HTML Page

Every HTML document starts with the same structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>
\`\`\`

## Breakdown
- \`<!DOCTYPE html>\` — tells the browser this is HTML5
- \`<html lang="en">\` — the root element; \`lang\` helps screen readers
- \`<head>\` — metadata (not shown on the page)
- \`<body>\` — visible content

## Try it
Create an \`index.html\` file and open it in your browser.`,
          exercise: {
            enabled: true,
            starterHtml:
              "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <!-- Add an h1 heading below -->\n  \n</body>\n</html>",
            instructions:
              "Add an `<h1>` element with the text `Hello, HTML!` inside the body.",
            expectedOutput: "<h1>Hello, HTML!</h1>",
          },
        },
        {
          title: "Semantic Elements",
          slug: "semantic-elements",
          order: 2,
          estimatedMinutes: 20,
          content: `# Semantic Elements

Semantic elements describe their meaning — both to the browser and to other developers.

## Bad (generic divs)
\`\`\`html
<div id="header">...</div>
<div id="nav">...</div>
\`\`\`

## Good (semantic)
\`\`\`html
<header>...</header>
<nav>...</nav>
\`\`\`

## Common semantic elements
| Element | Purpose |
|---------|---------|
| \`<header>\` | Introductory content |
| \`<nav>\` | Navigation links |
| \`<main>\` | Primary content (one per page) |
| \`<article>\` | Standalone content (blog post) |
| \`<section>\` | Thematically grouped content |
| \`<footer>\` | Closing content |

## Why it matters
Semantic HTML improves:
- **Accessibility** — screen readers understand structure
- **SEO** — search engines rank content better
- **Maintainability** — other developers can read your code`,
        },
        {
          title: "Forms and Inputs",
          slug: "forms-and-inputs",
          order: 3,
          estimatedMinutes: 25,
          content: `# Forms and Inputs

Forms collect data from users.

## Basic form
\`\`\`html
<form action="/submit" method="POST">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>
\`\`\`

## Input types
- \`text\` — single line
- \`email\` — validates email format
- \`password\` — hides characters
- \`number\` — numeric only
- \`checkbox\` — multiple selections
- \`radio\` — single selection

## Built-in validation
Add \`required\` to make a field mandatory. Add \`minlength="8"\` to enforce length. The browser validates **before** submission — but **always validate on the server too**.`,
        },
      ],
    },
  ],
};