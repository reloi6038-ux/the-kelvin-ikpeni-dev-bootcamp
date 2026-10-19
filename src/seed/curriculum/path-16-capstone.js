module.exports = {
  course: {
    title: "Final Capstone Project",
    slug: "capstone",
    description: "Plan, build, and deploy a complete full-stack application from scratch.",
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

## Choose your project
Ideas:
- A blog with accounts, posts, comments, and search
- A task management app with teams and assignments
- A school management system with students, courses, and grades
- An e-commerce store with cart, checkout, and orders
- A learning management system (like this bootcamp!)

## What to specify

### 1. Data model
Sketch your collections:
\`\`\`
users (email, passwordHash, name, role)
posts (authorId, title, content, createdAt)
comments (postId, userId, content, createdAt)
\`\`\`

### 2. Routes / pages
\`\`\`
/                   → homepage
/posts              → list posts
/posts/:id          → single post
/dashboard          → my posts
/admin              → admin panel
\`\`\`

### 3. Features checklist
- [ ] User registration and login
- [ ] Create, edit, delete posts
- [ ] Comments on posts
- [ ] Search by keyword
- [ ] Author dashboard
- [ ] Admin panel
- [ ] Deployed to Render

## Estimate in phases
Break the work into 3–4 phases you can ship independently. Each phase should be deployable on its own.`,
        },
        {
          title: "Building and Deploying",
          slug: "building-deploying",
          order: 2,
          estimatedMinutes: 40,
          content: `# Building and Deploying

## The build checklist

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
- [ ] Accessible (focus states, ARIA labels, contrast)

### Deployment
- [ ] \`.env\` excluded from GitHub
- [ ] Environment variables set on Render
- [ ] MongoDB Atlas IP whitelist configured
- [ ] \`NODE_ENV=production\` and \`COOKIE_SECURE=true\`
- [ ] Health check works
- [ ] Full user flow tested on live URL

## The final deliverable
A **live URL** anyone can visit, a **GitHub repo** with clean history, and a **README** that explains the app in 60 seconds.

That's a portfolio-quality project. Ship it.`,
        },
      ],
    },
  ],
};