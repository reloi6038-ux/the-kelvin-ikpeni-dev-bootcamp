// Path 10: Full-Stack Integration
module.exports = {
  course: {
    title: "Full-Stack Integration",
    slug: "fullstack",
    description:
      "Wire frontend forms, browser JavaScript, Express APIs, and MongoDB into a complete, working application.",
    level: "intermediate",
    estimatedHours: 20,
    icon: "fullstack",
    order: 10,
    isPublished: true,
  },
  modules: [
    {
      title: "Wiring the Frontend to the Backend",
      description: "Fetch, forms, error states, and CSRF.",
      order: 1,
      lessons: [
        {
          title: "Fetching Data on Page Load",
          slug: "fetching-page-load",
          order: 1,
          estimatedMinutes: 25,
          content: `# Fetching Data on Page Load

**Learning objectives:**
- Trace a full data-fetch round trip
- Render server data into the DOM
- Handle the three states: loading, empty, error

## The Full Flow
1. Browser loads \`/courses.html\` (empty grid)
2. \`courses.js\` runs
3. Calls \`fetch("/api/courses")\`
4. Express returns JSON
5. JavaScript builds HTML and injects it
6. User sees the courses

## The Code
\`\`\`javascript
async function loadCourses() {
  const grid = document.querySelector("[data-courses-grid]");
  grid.innerHTML = \`<div class="spinner"></div>\`;

  try {
    const res = await fetch("/api/courses");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();

    if (data.courses.length === 0) {
      grid.innerHTML = \`<p>No courses yet.</p>\`;
      return;
    }

    grid.innerHTML = data.courses
      .map((c) => \`<div class="course-card">\${escapeHtml(c.title)}</div>\`)
      .join("");
  } catch (err) {
    grid.innerHTML = \`<p class="error">\${err.message}</p>\`;
  }
}

loadCourses();
\`\`\`

## Why This Pattern
- **Empty first paint** — the HTML loads instantly, data comes after
- **Progressive enhancement** — the page works even without JS
- **Single source of truth** — the same API serves web, mobile, and future clients

## Always Escape User Content
\`\`\`javascript
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
\`\`\`

**Never inject unescaped user data into \`innerHTML\`.** It creates XSS vulnerabilities.

## Key Takeaways
- Fetch on page load, then render
- Always check \`res.ok\`
- Handle loading, empty, and error states
- Always escape dynamic text before innerHTML`,
        },
        {
          title: "POST Requests and Forms",
          slug: "forms-post",
          order: 2,
          estimatedMinutes: 30,
          content: `# POST Requests and Forms

**Learning objectives:**
- Read form values safely
- Submit JSON to an API
- Handle validation errors from the server

## The Pattern
\`\`\`javascript
const form = document.getElementById("enroll-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop default page reload

  const formData = new FormData(form);
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": await getCsrfToken(),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Request failed");
    window.location.href = "/dashboard.html";
  } catch (err) {
    document.getElementById("error").textContent = err.message;
  }
});
\`\`\`

## Critical Details
1. **\`e.preventDefault()\`** — without this, the browser reloads the page
2. **\`FormData\`** — reads values correctly even with browser autofill
3. **\`Content-Type: application/json\`** — tells the server how to parse the body
4. **\`JSON.stringify\`** — the body must be a string
5. **CSRF token** — required for state-changing requests in our platform

## Server-Side Validation
Never trust client validation alone. Server responses for bad input should look like:
\`\`\`json
{
  "success": false,
  "message": "Email is required"
}
\`\`\`

Show that message directly to the user — it's already user-friendly.

## Key Takeaways
- \`preventDefault\` is mandatory in SPA-style forms
- \`FormData\` handles autofill correctly
- Always send CSRF token on POST/PUT/DELETE
- Show server error messages to the user`,
        },
        {
          title: "Authentication-Aware UI",
          slug: "auth-aware-ui",
          order: 3,
          estimatedMinutes: 25,
          content: `# Authentication-Aware UI

**Learning objectives:**
- Show different UI for logged-in vs logged-out users
- Refresh state after login/logout
- Never rely on the client for security

## The Pattern
\`\`\`javascript
async function updateNav() {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return showLoggedOutNav();
    const { user } = await res.json();
    showLoggedInNav(user);
  } catch {
    showLoggedOutNav();
  }
}
\`\`\`

## The Two Nav States
**Logged out:**
\`\`\`html
<a href="/login.html">Log in</a>
<a href="/register.html">Get started</a>
\`\`\`

**Logged in:**
\`\`\`html
<a href="/dashboard.html">Dashboard</a>
<button id="logout-btn">Log out</button>
\`\`\`

## Never Trust the Client
The client can show or hide anything. **The server must always verify.**

If your frontend hides the "Delete" button from non-admins, a user can still send the DELETE request manually. The server must check the role on every request.

Our platform implements this correctly: every admin endpoint runs \`requireAuth + requireAdmin\` on the server.

## The Bypass Rule
> **Frontend checks = UX. Backend checks = security. You need both.**

## Key Takeaways
- Fetch \`/api/auth/me\` on page load to know who's logged in
- Toggle UI elements based on user state
- Never enforce security on the client — always on the server
- Logout = POST to \`/api/auth/logout\` + reload`,
        },
      ],
    },
  ],
};