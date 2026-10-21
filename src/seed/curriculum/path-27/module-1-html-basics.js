module.exports = {
  title: "Module 1: HTML Basics",
  description: "Setting up your environment and writing your first HTML.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Frontend Development",
      slug: "intro-to-frontend",
      order: 1,
      estimatedMinutes: 20,
      content: `# Introduction to Frontend Development

**Learning objectives:**
- Understand what frontend development is
- Learn the three core languages of the web
- Explore what a frontend developer does

## What is Frontend Development?
Frontend development is the practice of creating the user interface (UI) and user experience (UX) of a website or web application. It is everything the user sees and interacts with in their browser.

## The Three Pillars
1. **HTML**: The structure and content (the skeleton).
2. **CSS**: The styling, colors, and layout (the skin and clothes).
3. **JavaScript**: The interactivity and logic (the brain and muscles).

## What Does a Frontend Developer Do?
- Build responsive layouts that look great on mobile and desktop.
- Implement designs provided by UI/UX designers.
- Connect the frontend to backend APIs to display dynamic data.
- Ensure the site is fast, accessible, and works on all browsers.`
    },
    {
      title: "How Websites Work",
      slug: "how-websites-work",
      order: 2,
      estimatedMinutes: 25,
      content: `# How Websites Work

**Learning objectives:**
- Understand the client-server model
- Learn what happens when you type a URL

## The Client-Server Model
When you visit a website, your browser (the client) requests files from a server. The server responds with HTML, CSS, JavaScript, and images.

1. **DNS**: Translates the domain (e.g., google.com) to an IP address.
2. **Request**: Browser sends an HTTP GET request.
3. **Response**: Server sends back the files.
4. **Rendering**: Browser parses the HTML, applies CSS, runs JavaScript, and paints the page.

## The Critical Rendering Path
The browser reads HTML from top to bottom. It blocks rendering when it encounters CSS or JavaScript, which is why optimization matters for performance.`
    },
    {
      title: "Setting Up VS Code for Frontend",
      slug: "setup-vscode-frontend",
      order: 3,
      estimatedMinutes: 20,
      content: `# Setting Up VS Code for Frontend

**Learning objectives:**
- Install the best extensions
- Configure auto-formatting

## Essential Extensions
1. **Live Server**: Click a button to run your HTML in a local server with hot reload.
2. **Prettier**: Automatically formats your code.
3. **HTML CSS Support**: Autocompletes class names in HTML.
4. **IntelliSense for CSS**: Autocompletes CSS properties.

## Using Live Server
1. Create an \`index.html\` file.
2. Right-click inside the file and select **"Open with Live Server"**.
3. It will open your browser at \`http://127.0.0.1:5500\`.
4. Every time you save, the browser updates instantly.`
    },
    {
      title: "Introduction to HTML",
      slug: "intro-to-html",
      order: 4,
      estimatedMinutes: 25,
      content: `# Introduction to HTML

**Learning objectives:**
- Write your first HTML tag
- Understand elements and attributes

## What is HTML?
HyperText Markup Language. It is not a programming language; it's a markup language used to structure content.

## Tags and Elements
A tag is enclosed in angle brackets: \`<p>\`.
An element is the opening tag, content, and closing tag: \`<p>Hello</p>\`.

## Attributes
Attributes provide extra information about an element and live in the opening tag.
\`\`\`html
<a href="https://example.com">Visit</a>
\`\`\`
\`href\` is the attribute.`
    },
    {
      title: "HTML Document Structure",
      slug: "html-document-structure",
      order: 5,
      estimatedMinutes: 25,
      content: `# HTML Document Structure

**Learning objectives:**
- Write the HTML5 boilerplate

## The Boilerplate
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
</head>
<body>
  <h1>Welcome!</h1>
</body>
</html>
\`\`\`

- \`<head>\`: Metadata, links to CSS, the title.
- \`<body>\`: Everything the user sees.
- \`<meta name="viewport">\`: Crucial for mobile responsiveness.`
    }
  ]
};