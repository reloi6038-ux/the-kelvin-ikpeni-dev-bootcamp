module.exports = {
  title: "Module 5: Testing & Deployment",
  description: "Connecting the form, optimizing, and deploying.",
  order: 5,
  lessons: [
    {
      title: "Connecting Frontend and Backend",
      slug: "connect-frontend-backend",
      order: 30,
      estimatedMinutes: 25,
      content: `# Connecting Frontend and Backend

**Learning objectives:**
- Send the form data to the API.

## Update public/js/script.js

\`\`\`javascript
async function submitForm(data) {
  const submitBtn = document.getElementById("submit-btn");
  const statusDiv = document.getElementById("form-status");

  submitBtn.disabled = true;
  statusDiv.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    statusDiv.textContent = "✅ Message sent successfully!";
    statusDiv.style.color = "green";
    form.reset();
  } catch (err) {
    statusDiv.textContent = "❌ " + err.message;
    statusDiv.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}
\`\`\``
    },
    {
      title: "Testing with Postman and Debugging",
      slug: "testing-debugging",
      order: 31,
      estimatedMinutes: 25,
      content: `# Testing with Postman and Debugging

**Learning objectives:**
- Verify the API works before deploying.

## Test in Postman
- POST \`http://localhost:3000/api/contact\`
- Body (JSON):
\`\`\`json
{ "name": "Test", "email": "test@test.com", "message": "This is a test message" }
\`\`\`
- Expected: **201 Created** with a success message.

## Common Errors
- **CORS**: Ensure \`cors()\` is enabled.
- **404**: Ensure \`/api/contact\` is mounted correctly.
- **Mongoose Timeout**: Check your IP whitelist in MongoDB Atlas.`
    },
    {
      title: "Optimizing Images, Loading Speed, and Performance",
      slug: "performance",
      order: 32,
      estimatedMinutes: 20,
      content: `# Optimizing Images, Loading Speed, and Performance

**Learning objectives:**
- Speed up your site.

## Tips
- Use WebP for images.
- Add \`loading="lazy"\` to images.
- Minify CSS and JS.
- Use a CDN for fonts.`
    },
    {
      title: "Improving SEO and Social Sharing Metadata",
      slug: "seo-metadata",
      order: 33,
      estimatedMinutes: 20,
      content: `# Improving SEO and Social Sharing Metadata

**Learning objectives:**
- Get found on Google and social media.

## Add to public/index.html <head>

\`\`\`html
<meta name="description" content="Portfolio of Alex Johnson, Full-Stack Developer.">
<meta property="og:title" content="Alex Johnson | Developer">
<meta property="og:image" content="/images/preview.jpg">
<meta property="og:url" content="https://alexjohnson.com">
\`\`\``
    },
    {
      title: "Preparing for Production and Uploading to GitHub",
      slug: "github",
      order: 34,
      estimatedMinutes: 20,
      content: `# Preparing for Production and Uploading to GitHub

**Learning objectives:**
- Push your code.

## Update package.json
\`\`\`json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
\`\`\`

## .gitignore
\`\`\`text
node_modules/
.env
\`\`\`

## Push
\`\`\`bash
git init
git add .
git commit -m "Portfolio website"
git push origin main
\`\`\``
    },
    {
      title: "Deploying to Render and Configuring Environment Variables",
      slug: "deploy-render",
      order: 35,
      estimatedMinutes: 25,
      content: `# Deploying to Render and Configuring Environment Variables

**Learning objectives:**
- Go live.

## Steps
1. Create a new **Web Service** on Render.
2. Connect your GitHub repo.
3. Configure:
   - **Build Command**: \`npm install\`
   - **Start Command**: \`npm start\`
4. Add environment variables:
   - \`MONGODB_URI\`: Your Atlas string.
   - \`NODE_ENV\`: \`production\`
5. Click **Deploy**.
6. Once live, test your contact form on the live URL!`
    }
  ]
};