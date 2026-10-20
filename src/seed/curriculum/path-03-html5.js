// Path 3: HTML5 Mastery
module.exports = {
  course: {
    title: "HTML5 Mastery",
    slug: "html5",
    description:
      "Master the structure of the web — semantic markup, forms, accessibility, and SEO — with hands-on coding exercises in every lesson.",
    level: "beginner",
    estimatedHours: 16,
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
          estimatedMinutes: 25,
          content: `# Your First HTML Page

**Learning objectives:**
- Write a complete HTML5 document from memory
- Explain every tag in the boilerplate
- Render a heading in the browser

## What is HTML?
**HTML (HyperText Markup Language)** describes the *structure* of a web page using **tags**. Tags look like \`<tagname>\` (open) and \`</tagname>\` (close). Content lives between them.

## The Boilerplate
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

### Every Tag Explained
- \`<!DOCTYPE html>\` — declares this as HTML5
- \`<html lang="en">\` — the root. \`lang\` helps screen readers pronounce content
- \`<head>\` — metadata, not visible
  - \`<meta charset="UTF-8">\` — character encoding (handles emoji, accents)
  - \`<meta name="viewport" ...>\` — makes mobile work correctly
  - \`<title>\` — the browser tab text
- \`<body>\` — everything the user sees

## Headings
\`\`\`html
<h1>Main title</h1>
<h2>Subtitle</h2>
<h3>Sub-subtitle</h3>
\`\`\`
Use only **one \`<h1>\`** per page (for SEO). Use h2–h6 for hierarchy.

## Key Takeaways
- Every HTML page has the same skeleton
- \`<head>\` = invisible metadata, \`<body>\` = visible content
- Only one \`<h1>\` per page`,
          exercise: {
            enabled: true,
            instructions: "Add an `<h1>` element with the text `Hello, HTML!` inside the body.",
            walkthrough: "1. Find the `<body>` tag.\n2. Inside it, type `<h1>Hello, HTML!</h1>`.\n3. Click 'Run' to see it in the preview.",
            expectedOutput: "Hello, HTML!",
            starterHtml: "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <!-- Add your h1 here -->\n  \n</body>\n</html>",
            solutionHtml: "<!DOCTYPE html>\n<html>\n<head><title>Test</title></head>\n<body>\n  <h1>Hello, HTML!</h1>\n</body>\n</html>",
            starterCss: "",
            solutionCss: "",
            starterJs: "",
            solutionJs: "",
          },
        },
        {
          title: "Semantic HTML",
          slug: "semantic-html",
          order: 2,
          estimatedMinutes: 30,
          content: `# Semantic HTML

**Learning objectives:**
- Distinguish semantic from non-semantic tags
- Explain why Google and screen readers care
- Refactor divs into semantic tags

## What is Semantic HTML?
**Semantic** = describing meaning, not appearance. A \`<nav>\` *means* "navigation." A \`<div>\` means nothing.

## The Old Way
\`\`\`html
<div id="header">...</div>
<div id="nav">...</div>
<div id="main">...</div>
<div id="footer">...</div>
\`\`\`
Every element is meaningless. The browser sees a pile of boxes.

## The Modern Way
\`\`\`html
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
\`\`\`
Each tag communicates *what the content is*.

## The Full Semantic Vocabulary
| Tag | Meaning |
|-----|---------|
| \`<header>\` | Top intro section |
| \`<nav>\` | Navigation links |
| \`<main>\` | Primary content (one per page) |
| \`<section>\` | Thematic grouping |
| \`<article>\` | Standalone content (blog post, forum post) |
| \`<aside>\` | Related sidebar |
| \`<footer>\` | Bottom of page |
| \`<figure>\` / \`<figcaption>\` | Image + caption |
| \`<time>\` | Dates and times |

## Why It Matters
1. **SEO** — Google understands your page structure and ranks it higher
2. **Accessibility** — screen readers can jump to \`<main>\` or skip \`<nav>\`
3. **Maintainability** — future-you knows what each section does

## Key Takeaways
- Semantic tags describe *meaning*, not appearance
- Every page needs \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`
- Semantic = better SEO + accessibility + maintainability`,
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
            solutionJs: "",
          },
        },
        {
          title: "Links and Images",
          slug: "links-and-images",
          order: 3,
          estimatedMinutes: 25,
          content: `# Links and Images

**Learning objectives:**
- Create internal and external links
- Add images with proper alt text
- Explain the security implications of \`target="_blank"\`

## Links
The \`<a>\` (anchor) tag creates hyperlinks.
\`\`\`html
<a href="https://example.com">External</a>
<a href="/about.html">Internal</a>
<a href="#section-2">Jump to section</a>
<a href="mailto:hi@example.com">Email</a>
<a href="tel:+15551234567">Call</a>
\`\`\`

### Opening in a New Tab
\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>
\`\`\`
- \`target="_blank"\` — opens in new tab
- \`rel="noopener"\` — prevents the new tab from accessing your page (security)
- \`rel="noreferrer"\` — hides where the link came from

**Never use \`target="_blank"\` without \`rel="noopener"\`** — it's a real security vulnerability (tabnabbing).

## Images
\`\`\`html
<img src="/images/photo.jpg" alt="Sunset over the ocean" width="400" height="300">
\`\`\`

### Attributes
- \`src\` — file path or URL
- \`alt\` — description for screen readers (required for accessibility)
- \`width\` / \`height\` — prevent layout shift while loading

### Why alt Text Matters
- Screen readers read it aloud to blind users
- It displays if the image fails to load
- Google uses it for image search indexing

## Key Takeaways
- \`<a>\` for links, always with \`rel="noopener"\` when opening new tabs
- \`<img>\` always needs \`alt\`
- Relative paths (\`/images/x.jpg\`) are more portable than absolute URLs`,
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
            solutionJs: "",
          },
        },
      ],
    },
    {
      title: "Forms and Accessibility",
      description: "Collect user input and make it usable by everyone.",
      order: 2,
      lessons: [
        {
          title: "Building Forms",
          slug: "building-forms",
          order: 1,
          estimatedMinutes: 30,
          content: `# Building Forms

**Learning objectives:**
- Build a complete form with labels, inputs, and a submit button
- Choose the correct input type
- Understand why \`<label for>\` matters

## The Form Element
\`\`\`html
<form action="/submit" method="POST">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Sign up</button>
</form>
\`\`\`

### Every Part Explained
- \`<form>\` — the container
- \`action\` — the URL to send data to
- \`method\` — \`GET\` for search, \`POST\` for state changes (login, payment)
- \`<label for="X">\` — must match the input's \`id\`
- \`name\` — the *key* your server will see in \`req.body\`
- \`required\` — browser blocks submission if empty

## Input Types
| Type | Use |
|------|-----|
| text | Standard text |
| email | Validates email format |
| password | Hides characters |
| number | Numeric only, shows spinner |
| tel | Phone keyboard on mobile |
| url | Validates URL |
| date | Date picker |
| checkbox | Multi-select |
| radio | Single-select from group |
| file | File upload |

## Textarea and Select
\`\`\`html
<textarea name="message" rows="4" cols="40"></textarea>

<select name="role">
  <option value="student">Student</option>
  <option value="admin">Admin</option>
</select>
\`\`\`

## Accessibility Checklist
- ✅ Every input has a \`<label>\`
- ✅ Labels use \`for=\` to link to \`id=\`
- ✅ Group related inputs with \`<fieldset><legend>\`
- ✅ Use semantic input types (\`email\`, not \`text\`)

## Key Takeaways
- Forms need: \`action\`, \`method\`, labels, and \`name\` attributes
- \`<label for>\` + \`id\` = accessible forms
- Choose the right input type — improves UX and validation`,
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
            solutionJs: "",
          },
        },
        {
          title: "Form Validation",
          slug: "form-validation",
          order: 2,
          estimatedMinutes: 25,
          content: `# Form Validation

**Learning objectives:**
- Use HTML5 validation attributes
- Understand client vs server validation
- Know why you can never trust the client

## The Two Layers of Validation

### Layer 1: Client-Side (HTML5)
Built into the browser. Fast feedback, better UX.
\`\`\`html
<input type="email" required minlength="5" maxlength="100">
<input type="text" pattern="[0-9]{5}">  <!-- US zip -->
\`\`\`

Attributes:
- \`required\` — must not be empty
- \`minlength\` / \`maxlength\` — length constraints
- \`pattern\` — regex the input must match
- \`type="email"\` / \`type="url"\` — format validation

### Layer 2: Server-Side (Always Required)
Client-side validation is **skipped** if:
- The user opens DevTools and modifies the HTML
- The user submits a crafted request via \`curl\` or Postman
- JavaScript is disabled

**The server must always re-validate.** In our platform, \`src/validators/auth.js\` checks email format, password strength, and length — even though the form already does.

## The Golden Rule
> **Never trust the client.** Ever.

If a form field says "max 10 characters," a malicious user can send 10,000. Your server must reject it.

## Key Takeaways
- HTML5 validation = UX layer
- Server validation = security layer
- Both are required. Neither replaces the other.`,
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
            solutionJs: "",
          },
        },
      ],
    },
  ],
};