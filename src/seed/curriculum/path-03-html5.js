// Path 3: HTML5 Mastery
module.exports = {
  course: {
    title: "HTML5 Mastery",
    slug: "html5",
    description:
      "Learn semantic markup, forms, accessibility, and SEO — the structure of every web page.",
    level: "beginner",
    estimatedHours: 14,
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
          estimatedMinutes: 20,
          content: `# Your First HTML Page

HTML (HyperText Markup Language) is the skeleton of the web. It describes the structure of a webpage using tags.

## The Basic Structure
Every HTML document has the same boilerplate:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>
\`\`\`

### Breaking It Down
- \`<!DOCTYPE html>\`: Tells the browser "I am an HTML5 document."
- \`<html>\`: The root element. \`lang="en"\` helps screen readers.
- \`<head>\`: Contains metadata. The user doesn't see this content.
  - \`<title>\`: The text on the browser tab.
- \`<body>\`: Contains all visible content.`,
          exercise: {
            enabled: true,
            starterHtml:
              "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <!-- Add your h1 here -->\n  \n</body>\n</html>",
            instructions:
              "Add an `<h1>` element with the text `Hello, HTML!` inside the body.",
            expectedOutput: "<h1>Hello, HTML!</h1>",
          },
        },
        {
          title: "Semantic HTML",
          slug: "semantic-html",
          order: 2,
          estimatedMinutes: 25,
          content: `# Semantic HTML

Semantic HTML means using tags that describe the *meaning* of the content, not just how it looks.

## The Old Way
\`\`\`html
<div id="header">...</div>
<div id="nav">...</div>
<div id="article">...</div>
\`\`\`

## The Modern Way
\`\`\`html
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<footer>...</footer>
\`\`\`

### Why is this better?
1. **Accessibility**: Screen readers can jump to \`<main>\` or navigate \`<nav>\`.
2. **SEO**: Google understands your page structure better.
3. **Maintainability**: Other developers instantly know what each section does.

## Common Semantic Tags
- \`<header>\`: Top of the page (logos, navigation).
- \`<nav>\`: A block of navigation links.
- \`<main>\`: The primary content (only one per page).
- \`<section>\`: Thematic grouping of content.
- \`<article>\`: Independent content (blog post, forum post).
- \`<footer>\`: Bottom of the page.`,
        },
        {
          title: "Links and Images",
          slug: "links-and-images",
          order: 3,
          estimatedMinutes: 20,
          content: `# Links and Images

## Links
\`\`\`html
<a href="https://example.com">External link</a>
<a href="/about.html">Internal link</a>
<a href="#section-2">Anchor link</a>
<a href="mailto:hi@example.com">Email link</a>
\`\`\`

- **href**: The destination URL.
- **target="_blank"**: Opens in a new tab.
- **rel="noopener"**: Security best practice for \`target="_blank"\`.

## Images
\`\`\`html
<img src="/images/photo.jpg" alt="A beautiful sunset" width="400" height="300">
\`\`\`

- **src**: The image file path.
- **alt**: Text description for screen readers (required).
- **width/height**: Prevent layout shift during loading.`,
        },
      ],
    },
    {
      title: "Forms and Inputs",
      description: "Collecting data from users safely.",
      order: 2,
      lessons: [
        {
          title: "Building Forms",
          slug: "building-forms",
          order: 1,
          estimatedMinutes: 25,
          content: `# Building Forms

Forms collect user input. They are essential for login pages, search bars, and checkout flows.

## The Form Element
\`\`\`html
<form action="/submit" method="POST">
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Sign Up</button>
</form>
\`\`\`

### Key Attributes
- \`action\`: The URL the form sends data to.
- \`method\`: \`POST\` for sensitive data, \`GET\` for search.
- \`<label>\`: Tells the user what to enter. \`for\` must match the input's \`id\`.
- \`name\`: The key sent to the server.
- \`required\`: Built-in browser validation.

## Input Types
- \`text\`, \`email\`, \`password\`, \`number\`
- \`checkbox\`, \`radio\`, \`file\`
- \`date\`, \`color\`, \`range\``,
        },
        {
          title: "Form Validation",
          slug: "form-validation",
          order: 2,
          estimatedMinutes: 20,
          content: `# Form Validation

Never trust user input. Users will enter garbage data, either by accident or on purpose.

## Client-Side Validation
HTML5 provides built-in attributes to validate before submission.
- \`required\`: Cannot be empty.
- \`minlength="3"\`: Minimum characters.
- \`maxlength="20"\`: Maximum characters.
- \`pattern="[0-9]{5}"\`: A regular expression.

**Warning:** Client-side validation is for user experience. A malicious user can bypass it. **You must always validate on the server.**`,
        },
      ],
    },
  ],
};