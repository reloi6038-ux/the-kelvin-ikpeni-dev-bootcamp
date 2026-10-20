// Path 10: Full-Stack Integration
module.exports = {
  course: {
    title: "Full-Stack Integration",
    slug: "fullstack",
    description:
      "Connect HTML forms, browser JavaScript, Express APIs, and MongoDB into a real application.",
    level: "intermediate",
    estimatedHours: 18,
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

## The Flow
1. User opens \`/courses.html\`.
2. Browser loads HTML (empty grid).
3. \`courses.js\` runs.
4. \`fetch("/api/courses")\` requests data.
5. Express returns JSON.
6. JavaScript renders cards.
7. User sees courses.

## The Code
\`\`\`javascript
async function loadCourses() {
  try {
    const data = await apiRequest("/api/courses");
    renderCourses(data.courses);
  } catch (err) {
    showError(container, err.message);
  }
}
\`\`\``,
        },
        {
          title: "Forms & POST Requests",
          slug: "forms-post-requests",
          order: 2,
          estimatedMinutes: 25,
          content: `# Forms & POST Requests

## The Pattern
\`\`\`javascript
form.addEventListener("submit", async (e) => {
  e.preventDefault();

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

## Security Reminders
- **Always** \`preventDefault()\` — otherwise page reloads.
- **Always** include CSRF token.
- **Always** handle errors.
- **Never** trust client-side validation.`,
        },
        {
          title: "Loading and Error States",
          slug: "loading-error-states",
          order: 3,
          estimatedMinutes: 15,
          content: `# Loading and Error States

Professional apps **never show a blank screen**.

## The Three States
\`\`\`javascript
async function loadData() {
  showLoading(container, "Loading...");
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

## Why Each State Matters
| State | Message | Without It |
|-------|---------|-----------|
| Loading | "Loading..." + spinner | User thinks app is broken |
| Empty | "No courses match" | User thinks app is broken |
| Error | "Could not load. Retry." | User doesn't know what happened |`,
        },
      ],
    },
  ],
};