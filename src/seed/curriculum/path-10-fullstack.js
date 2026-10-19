module.exports = {
  course: {
    title: "Full-Stack Integration",
    slug: "fullstack",
    description: "Connect HTML forms, browser JavaScript, Express APIs, and MongoDB into a real application.",
    level: "intermediate",
    estimatedHours: 16,
    icon: "fullstack",
    order: 10,
    isPublished: true,
  },
  modules: [
    {
      title: "Wiring Frontend to Backend",
      description: "Fetch, forms, and dynamic rendering.",
      order: 1,
      lessons: [
        {
          title: "Fetching Data on Page Load",
          slug: "fetching-page-load",
          order: 1,
          estimatedMinutes: 20,
          content: `# Fetching Data on Page Load

The standard pattern: HTML loads, then JavaScript fetches data.

## The flow
1. User opens \`/courses.html\`
2. Browser loads HTML (empty grid)
3. \`courses.js\` runs
4. \`fetch("/api/courses")\` requests data
5. Express returns JSON
6. JavaScript renders cards
7. User sees courses

## The code
\`\`\`js
async function loadCourses() {
  try {
    const data = await apiRequest("/api/courses");
    renderCourses(data.courses);
  } catch (err) {
    showError(container, err.message);
  }
}
\`\`\`

## Why not server-side rendering?
Traditional apps render HTML on the server. **This bootcamp uses client-side rendering** because:
- The same API can serve web, mobile, and other clients
- The frontend is just static files (fast to deploy)
- Modern users expect app-like interactivity`,
        },
        {
          title: "Forms & POST Requests",
          slug: "forms-post-requests",
          order: 2,
          estimatedMinutes: 25,
          content: `# Forms & POST Requests

Sending data from the browser to the server is the other half of full-stack.

## HTML form
\`\`\`html
<form id="enroll-form">
  <input type="email" name="email" required>
  <button type="submit">Enroll</button>
</form>
\`\`\`

## JavaScript handler
\`\`\`js
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the default page reload

  try {
    const data = await apiRequest("/api/enrollments", {
      method: "POST",
      body: { courseId: "..." },
    });

    if (data.success) {
      window.location.href = "/dashboard.html";
    }
  } catch (err) {
    showError(err.message);
  }
});
\`\`\`

## Security reminders
- **Always** \`e.preventDefault()\` — otherwise the browser reloads the page
- **Always** include CSRF token in the header (\`X-CSRF-Token\`)
- **Never** trust client-side validation — the server validates too
- **Always** handle errors — show the user what went wrong`,
        },
        {
          title: "Loading and Error States",
          slug: "loading-error-states",
          order: 3,
          estimatedMinutes: 15,
          content: `# Loading and Error States

Professional apps **never show a blank screen**. Every state is designed.

## The three states

\`\`\`js
async function loadData() {
  showLoading(container, "Loading courses...");
  try {
    const data = await apiRequest("/api/courses");
    if (data.courses.length === 0) {
      showEmpty(container, "No courses yet.");
    } else {
      renderCourses(data.courses);
    }
  } catch (err) {
    showError(container, err.message);
  }
}
\`\`\`

## Why each state matters

| State | Message | Without it |
|-------|---------|-----------|
| **Loading** | "Loading..." with spinner | User thinks app is broken |
| **Empty** | "No courses match" | User thinks app is broken |
| **Error** | "Could not load. Retry." | User doesn't know what happened |
| **Success** | The actual content | — |

## This bootcamp's helper
The \`api.js\` file provides \`showLoading()\`, \`showError()\`, and \`showEmpty()\`. Use them everywhere.`,
        },
      ],
    },
  ],
};