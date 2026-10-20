// Path 16: Final Capstone Project
module.exports = {
  course: {
    title: "Final Capstone Project",
    slug: "capstone",
    description:
      "Plan, build, and deploy a complete full-stack application from scratch.",
    level: "advanced",
    estimatedHours: 40,
    icon: "capstone",
    order: 16,
    isPublished: true,
  },
  modules: [
    {
      title: "Capstone Project",
      description: "A complete full-stack application.",
      order: 1,
      lessons: [
        {
          title: "Project Planning",
          slug: "project-planning",
          order: 1,
          estimatedMinutes: 30,
          content: `# Project Planning

Before writing code, plan. This saves days of rework.

## Choose Your Project
Ideas:
- A blog with accounts, posts, comments, and search
- A task management app with teams and assignments
- A school management system
- An e-commerce store
- A learning management system

## What to Specify

### 1. Data Model
Sketch your collections:
\`\`\`
users (email, passwordHash, name, role)
posts (authorId, title, content, createdAt)
comments (postId, userId, content, createdAt)
\`\`\`

### 2. Routes / Pages
\`\`\`
/                   → homepage
/posts              → list posts
/posts/:id          → single post
/dashboard          → my posts
/admin              → admin panel
\`\`\`

### 3. Features Checklist
- [ ] User registration and login
- [ ] Create, edit, delete posts
- [ ] Comments on posts
- [ ] Search by keyword
- [ ] Author dashboard
- [ ] Admin panel
- [ ] Deployed to Render`,
        },
        {
          title: "Building and Deploying",
          slug: "building-deploying",
          order: 2,
          estimatedMinutes: 40,
          content: `# Building and Deploying

## The Build Checklist

### Backend
- [ ] Models defined with validation and indexes
- [ ] Auth routes (register, login, logout)
- [ ] Protected routes with \`requireAuth\`
- [ ] Server-side validation on all inputs
- [ ] Error handler wired up
- [ ] Helmet, rate limiting, CSRF in place

### Frontend
- [ ] All pages built with semantic HTML
- [ ] Reusable CSS design system
- [ ] Fetch helpers with loading/error states
- [ ] Forms validate on the client AND server
- [ ] Mobile responsive
- [ ] Accessible

### Deployment
- [ ] \`.env\` excluded from GitHub
- [ ] Environment variables set on Render
- [ ] MongoDB Atlas IP whitelist configured
- [ ] \`NODE_ENV=production\` and \`COOKIE_SECURE=true\`
- [ ] Health check works
- [ ] Full user flow tested on live URL

## The Final Deliverable
A **live URL** anyone can visit, a **GitHub repo** with clean history, and a **README** that explains the app in 60 seconds.

That's a portfolio-quality project. Ship it.`,
        },
      ],
    },
  ],
};