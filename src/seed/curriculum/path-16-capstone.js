// Path 16: Final Capstone Project
module.exports = {
  course: {
    title: "Final Capstone Project",
    slug: "capstone",
    description:
      "Plan, build, and deploy a complete full-stack application from scratch — your portfolio piece.",
    level: "advanced",
    estimatedHours: 40,
    icon: "capstone",
    order: 16,
    isPublished: true,
  },
  modules: [
    {
      title: "Capstone Project",
      description: "From idea to live deployment.",
      order: 1,
      lessons: [
        {
          title: "Project Planning",
          slug: "project-planning",
          order: 1,
          estimatedMinutes: 35,
          content: `# Project Planning

**Learning objectives:**
- Choose a project scope that's shippable
- Design the data model
- Plan the routes and features

## Choose Your Project

### Good Options
- **Blog** — posts, comments, users, search
- **Task manager** — projects, tasks, tags, due dates
- **School management** — students, courses, grades, attendance
- **E-commerce store** — products, cart, orders, checkout
- **Learning platform** — courses, lessons, progress, certificates (like this one!)

### Bad Options (for a capstone)
- ❌ "Netflix clone" — too big, requires streaming, payments, copyrights
- ❌ "Facebook clone" — too many features, no shippable version
- ❌ Anything with real payments or healthcare data — legal + compliance complexity

## Define the Scope

### Step 1: Data Model
Sketch your collections:
\`\`\`
users (email, passwordHash, name, role)
posts (authorId, title, content, createdAt)
comments (postId, userId, content, createdAt)
\`\`\`

Every collection needs:
- A clear purpose
- A primary key (\`_id\`)
- Fields with types and validation
- References to other collections

### Step 2: Routes
\`\`\`
/                      → homepage
/posts                 → list posts
/posts/:id             → single post
/posts/new             → create (protected)
/dashboard             → my content (protected)
/admin                 → admin panel (protected)
\`\`\`

### Step 3: Features Checklist
- [ ] Registration + login
- [ ] Create / edit / delete posts
- [ ] Comment on posts
- [ ] Search by keyword
- [ ] Author dashboard
- [ ] Admin panel
- [ ] Deployed to Render

## The MVP Principle
Ship the **smallest version that works**, then improve. A working "posts + comments" app beats a half-finished "social network."

## Time Estimation
- Backend: 40%
- Frontend: 40%
- Testing + polish: 20%

If you think it'll take 1 week, plan for 2. Always.

## Key Takeaways
- Choose a scoped, shippable project
- Sketch data model and routes BEFORE coding
- MVP first — features second
- Double your time estimate`,
        },
        {
          title: "Building and Deploying",
          slug: "building-deploying",
          order: 2,
          estimatedMinutes: 45,
          content: `# Building and Deploying

**Learning objectives:**
- Build the project in the right order
- Test as you go
- Deploy with a checklist

## Build Order (Critical)

### Phase 1: Foundation
1. Set up the project (folder structure, package.json)
2. Connect to MongoDB
3. Configure Express + middleware
4. Create your first models
5. Seed test data

### Phase 2: Backend APIs
1. Auth routes (register, login, logout)
2. Protected routes with \`requireAuth\`
3. CRUD for your main collection
4. Validation and error handling

Test each endpoint with Postman or REST Client before moving on.

### Phase 3: Frontend
1. HTML structure (pages)
2. CSS design system
3. Fetch helpers
4. Wire forms to APIs
5. Handle loading/error states

### Phase 4: Deployment
1. Push to GitHub
2. Deploy to Render
3. Set environment variables
4. Test the live app end-to-end

## The Build Checklist

### Backend
- [ ] All models have validation and indexes
- [ ] Auth routes work
- [ ] Protected routes check \`requireAuth\`
- [ ] Input validated on the server
- [ ] Error handler wired up
- [ ] Helmet, rate limiting, CSRF active

### Frontend
- [ ] Semantic HTML
- [ ] Reusable CSS
- [ ] Fetch helper with error handling
- [ ] Forms validate client + server
- [ ] Mobile responsive
- [ ] Accessible (labels, focus, contrast)

### Deployment
- [ ] \`.env\` excluded from GitHub
- [ ] Env vars set on Render
- [ ] Atlas IP whitelist configured
- [ ] \`NODE_ENV=production\`, \`COOKIE_SECURE=true\`
- [ ] Health check passes
- [ ] Full user flow tested live

## The Final Deliverable
- A **live URL** anyone can visit
- A **GitHub repo** with clean commit history
- A **README** explaining the app in 60 seconds

That's a portfolio-quality project. Ship it.

## After Ship
1. Share the URL (LinkedIn, resume, portfolio)
2. Write a blog post about the build
3. Add it to your GitHub profile README
4. Iterate with feedback

## Key Takeaways
- Build in phases — foundation, backend, frontend, deploy
- Test each layer before moving on
- Follow the checklist before deploying
- Ship, share, iterate`,
        },
      ],
    },
  ],
};