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
            instructions: "Add an `<h1>` element with the text `Hello, HTML!` inside the body.",
            walkthrough: "1. Find the `<body>` tag.\n2. Inside it, type `<h1>Hello, HTML!</h1>`.\n3. Click 'Run' to see it appear in the preview.",
            expectedOutput: "Hello, HTML!",
            starterHtml: "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <!-- Add your h1 here -->\n  \n</body>\n</html>",
            solutionHtml: "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <h1>Hello, HTML!</h1>\n</body>\n</html>",
            starterCss: "",
            solutionCss: "",
            starterJs: "",
            solutionJs: ""
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
3. **Maintainability**: Other developers instantly know what each section does.`,
          exercise: {
            enabled: true,
            instructions: "Convert the generic `<div>` tags into semantic `<header>` and `<main>` tags.",
            walkthrough: "1. Change `<div id='header'>` to `<header>`.\n2. Change `<div id='content'>` to `<main>`.\n3. Ensure you close the tags with `</header>` and `</main>`.",
            expectedOutput: "<header>",
            starterHtml: "<div id='header'>\n  <h1>Welcome</h1>\n</div>\n<div id='content'>\n  <p>This is the main content.</p>\n</div>",
            solutionHtml: "<header>\n  <h1>Welcome</h1>\n</header>\n<main>\n  <p>This is the main content.</p>\n</main>",
            starterCss: "div, header, main { border: 1px solid blue; padding: 10px; margin-bottom: 10px; }",
            solutionCss: "div, header, main { border: 1px solid blue; padding: 10px; margin-bottom: 10px; }",
            starterJs: "",
            solutionJs: ""
          },
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
\`\`\`

- **href**: The destination URL.
- **target="_blank"**: Opens in a new tab.

## Images
\`\`\`html
<img src="https://via.placeholder.com/150" alt="Placeholder" width="150">
\`\`\`

- **src**: The image file path.
- **alt**: Text description for screen readers (required).`,
          exercise: {
            enabled: true,
            instructions: "Create a link that goes to `https://github.com` and displays the text `Visit GitHub`.",
            walkthrough: "1. Type `<a>`.\n2. Add the attribute `href=\"https://github.com\"`.\n3. Add the text `Visit GitHub` between the opening and closing tags.",
            expectedOutput: "https://github.com",
            starterHtml: "<!-- Create your link below -->\n",
            solutionHtml: "<a href=\"https://github.com\">Visit GitHub</a>",
            starterCss: "a { color: blue; font-size: 18px; }",
            solutionCss: "a { color: blue; font-size: 18px; }",
            starterJs: "",
            solutionJs: ""
          },
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

Forms collect user input.

## The Form Element
\`\`\`html
<form>
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Sign Up</button>
</form>
\`\`\`

### Key Attributes
- \`<label>\`: Tells the user what to enter. \`for\` must match the input's \`id\`.
- \`name\`: The key sent to the server.
- \`required\`: Built-in browser validation.`,
          exercise: {
            enabled: true,
            instructions: "Create an `<input>` of type `text` with the id `username` and the name `username`. Add a `<label>` for it.",
            walkthrough: "1. Add `<label for=\"username\">Username:</label>`.\n2. Add `<input type=\"text\" id=\"username\" name=\"username\">`.",
            expectedOutput: "type=\"text\"",
            starterHtml: "<form>\n  <!-- Add your label and input here -->\n</form>",
            solutionHtml: "<form>\n  <label for=\"username\">Username:</label>\n  <input type=\"text\" id=\"username\" name=\"username\">\n</form>",
            starterCss: "label { display: block; margin-bottom: 5px; }\ninput { padding: 5px; }",
            solutionCss: "label { display: block; margin-bottom: 5px; }\ninput { padding: 5px; }",
            starterJs: "",
            solutionJs: ""
          },
        },
        {
          title: "Form Validation",
          slug: "form-validation",
          order: 2,
          estimatedMinutes: 20,
          content: `# Form Validation

Never trust user input. HTML5 provides built-in attributes to validate before submission.

## Validation Attributes
- \`required\`: Cannot be empty.
- \`minlength="3"\`: Minimum characters.
- \`maxlength="20"\`: Maximum characters.
- \`pattern="[0-9]{5}"\`: A regular expression.`,
          exercise: {
            enabled: true,
            instructions: "Make the existing input required and ensure it cannot be more than 10 characters.",
            walkthrough: "1. Find the `<input>` tag.\n2. Add `required` inside the tag.\n3. Add `maxlength=\"10\"` inside the tag.",
            expectedOutput: "maxlength=\"10\"",
            starterHtml: "<form>\n  <input type=\"text\" id=\"code\">\n  <button>Submit</button>\n</form>",
            solutionHtml: "<form>\n  <input type=\"text\" id=\"code\" required maxlength=\"10\">\n  <button>Submit</button>\n</form>",
            starterCss: "input { border: 2px solid red; }",
            solutionCss: "input { border: 2px solid green; }",
            starterJs: "",
            solutionJs: ""
          },
        },
      ],
    },
  ],
};