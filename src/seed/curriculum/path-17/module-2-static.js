module.exports = {
  title: "Module 2: Add Static Pages",
  description: "Serve HTML, CSS, and JavaScript files from Express.",
  order: 2,
  lessons: [
    {
      title: "Serve HTML from Express",
      slug: "serve-html",
      order: 1,
      estimatedMinutes: 30,
      content: `# Serve HTML from Express

**Learning objectives:**
- Create a \`public/\` folder for static files
- Use \`express.static()\`
- Serve an HTML file at \`/\`

## Step 1: Create the public folder

In VS Code, right-click in the Explorer → **New Folder** → name it \`public\`.

Inside \`public/\`, create a file called \`index.html\`:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #0a0e27; color: #fff; }
    h1 { color: #4a9eff; }
  </style>
</head>
<body>
  <h1>Hello from my first website!</h1>
  <p>This page is served by Express.</p>
</body>
</html>
\`\`\`

## Step 2: Update server.js

Add these two lines to \`server.js\` **before** the \`app.listen\` call:

\`\`\`javascript
const path = require("path");

// Serve everything inside /public as static files
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
\`\`\`

Your full \`server.js\` should now be:

\`\`\`javascript
const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running!" });
});

// Start
app.listen(PORT, () => {
  console.log(\`✅ Server running on http://localhost:\${PORT}\`);
});
\`\`\`

## Step 3: Test

Save everything. Nodemon restarts.

Open **http://localhost:3000/** in the browser.

**Expected:** You see "Hello from my first website!" with a blue heading.

## How express.static Works

\`\`\`javascript
app.use(express.static(path.join(__dirname, "public")));
\`\`\`

This tells Express:
> "If someone requests a file, first look inside \`public/\`."

So:
- \`GET /index.html\` → serves \`public/index.html\` ✅
- \`GET /about.html\` → serves \`public/about.html\` ✅
- \`GET /css/style.css\` → serves \`public/css/style.css\` ✅

It's automatic — you don't need a route for each file.

## Why \`path.join\` Instead of String Concatenation?

\`\`\`javascript
// ❌ breaks on Windows (uses \\ instead of /)
const p = __dirname + "/public";

// ✅ works on every OS
const p = path.join(__dirname, "public");
\`\`\`

Windows uses \`\\\` as its path separator. Linux (Render) uses \`/\`. \`path.join\` handles both.

## Common Errors and Fixes

### ❌ "Cannot GET /"
**Cause:** \`public/index.html\` doesn't exist or you're not serving the right folder.
**Fix:** Verify \`public/index.html\` exists. Check \`__dirname\` points to your project root.

### ❌ Page loads but CSS doesn't work
**Cause:** The stylesheet path in HTML is wrong.
**Fix:** If your HTML is in \`public/index.html\` and CSS in \`public/css/style.css\`, the HTML should use \`<link rel="stylesheet" href="/css/style.css">\` (leading slash = root of public).

### ❌ "ENOENT: no such file or directory"
**Cause:** \`sendFile\` is looking in the wrong place.
**Fix:** Check the path. Log \`__dirname\` to see where Node thinks you are.

## Key Takeaways
- \`express.static("public")\` serves all files in \`public/\`
- \`res.sendFile(...)\` sends a single file
- \`path.join()\` = safe path building
- URLs in HTML should use leading \`/\` (root of public)`
    },
    {
      title: "Add More Pages",
      slug: "add-more-pages",
      order: 2,
      estimatedMinutes: 25,
      content: `# Add More Pages

**Learning objectives:**
- Add multiple HTML pages
- Link between pages with \`<a href>\`
- Organize CSS separately

## Step 1: Create about.html

In \`public/\`, create \`about.html\`:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About — My First Website</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header class="nav">
    <a href="/">Home</a>
    <a href="/about.html">About</a>
  </header>
  <main>
    <h1>About Me</h1>
    <p>I'm learning full-stack development.</p>
    <a href="/">← Back home</a>
  </main>
</body>
</html>
\`\`\`

## Step 2: Create the CSS file

Create \`public/css/style.css\`:

\`\`\`css
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #0a0e27;
  color: #e6e9f0;
  padding: 2rem;
}

.nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a3358;
}

.nav a {
  color: #4a9eff;
  text-decoration: none;
}

h1 { color: #4a9eff; }
\`\`\`

## Step 3: Update index.html to link CSS

Edit \`public/index.html\` to add the stylesheet link in \`<head>\`:

\`\`\`html
<link rel="stylesheet" href="/css/style.css">
\`\`\`

And add navigation to the body:

\`\`\`html
<header class="nav">
  <a href="/">Home</a>
  <a href="/about.html">About</a>
</header>
\`\`\`

## Step 4: Test

- Visit **http://localhost:3000/** → see Home page with nav
- Click "About" → see About page
- Click "Home" → back to Home

Both pages load. Both have the same style.

## The Leading Slash Rule

\`\`\`html
<!-- ✅ Leads to http://localhost:3000/css/style.css -->
<link rel="stylesheet" href="/css/style.css">

<!-- ✅ Leads to http://localhost:3000/about.html -->
<a href="/about.html">About</a>

<!-- ❌ Leads to http://localhost:3000/about/about.html (if you're on /about) -->
<a href="about.html">About</a>
\`\`\`

**Always use leading \`/\`** for internal links and assets. It means "from the root" — consistent across every page.

## Common Errors and Fixes

### ❌ CSS works on home but not on about
**Cause:** On \`/about.html\`, a path like \`css/style.css\` looks for \`/css/style.css\` relative to \`/about.html\`.
**Fix:** Use \`/css/style.css\` (with leading slash).

### ❌ New page returns 404
**Cause:** File isn't in \`public/\`, or extension doesn't match the link.
**Fix:** Verify the filename and link are identical (\`about.html\` not \`About.html\`).

### ❌ Only one page shows up
**Cause:** No \`<a href>\` links, or the links are broken.
**Fix:** Double-check the \`href\` value matches the filename exactly.

## Key Takeaways
- Add pages by creating files in \`public/\`
- \`express.static\` serves them automatically
- Use leading \`/\` in URLs
- Link between pages with \`<a href="/page.html">\``
    }
  ]
};