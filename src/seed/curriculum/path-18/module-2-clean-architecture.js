module.exports = {
  title: "Module 2: Clean Architecture & Dependency Injection",
  description: "Structuring Node.js apps to be testable, portable, and long-lived.",
  order: 2,
  lessons: [
    {
      title: "Clean Architecture for Node.js",
      slug: "clean-architecture",
      order: 1,
      estimatedMinutes: 40,
      content: `# Clean Architecture for Node.js

**Learning objectives:**
- Understand the layers of Clean Architecture
- Apply the dependency rule
- Know when Clean Architecture pays off

## The Core Idea
Clean Architecture puts **business logic at the center** and treats everything else (database, web framework, HTTP) as replaceable details.

## The Layers (Outside → Inside)
\`\`\`
Frameworks & Drivers   ← Express, MongoDB
        ↓
Adapters               ← Controllers, Repositories
        ↓
Application            ← Services, Use Cases
        ↓
Entities               ← Business rules
\`\`\`

**The Dependency Rule:** dependencies only point **inward**. Inner layers know nothing about outer layers.

## What This Means in Practice
- Your **entities** don't import Express
- Your **use cases** don't import Mongoose
- Your **controllers** don't contain business logic

## A Concrete Example
\`\`\`javascript
// entities/User.js — pure business logic, no imports
class User {
  constructor(email) { this.email = email; }
  isValidEmail() { return /\\S+@\\S+\\.\\S+/.test(this.email); }
}

// use-cases/registerUser.js — business flow, no HTTP, no DB
async function registerUser(userData, userRepo) {
  const user = new User(userData.email);
  if (!user.isValidEmail()) throw new Error("Invalid email");
  return await userRepo.save(user);
}

// controllers/userController.js — HTTP layer
async function register(req, res) {
  const user = await registerUser(req.body, userRepo);
  res.json({ success: true, user });
}
\`\`\`

## The Payoff
- **Testable** — test business logic without a database or HTTP server
- **Portable** — swap Express for Fastify, MongoDB for Postgres, without touching business logic
- **Team-friendly** — business rules are readable in one place

## The Cost
- **More files** — a simple CRUD app becomes 10+ files
- **More indirection** — 4 function calls to get data from the DB
- **Overkill for MVPs** — a weekend project shouldn't have 20 layers

## When to Use It
- ✅ Enterprise apps (5+ year lifespans)
- ✅ Regulated industries (audit trails matter)
- ✅ Complex domains (banking, healthcare, logistics)
- ❌ Simple CRUD apps
- ❌ Prototypes
- ❌ Solo projects under 3 months

## Key Takeaways
- Inner = business rules, outer = tech details
- Dependencies point inward only
- Test business logic without a framework
- It's a tool, not a religion — use when it pays off`
    },
    {
      title: "Dependency Injection",
      slug: "dependency-injection",
      order: 2,
      estimatedMinutes: 30,
      content: `# Dependency Injection

**Learning objectives:**
- Understand what dependency injection (DI) is
- Apply DI in Node.js without a library
- Know when to reach for a DI container

## The Problem
\`\`\`javascript
// ❌ Tightly coupled
const userRepo = new MongoUserRepository();
const emailService = new SendgridEmailService();
function register(email) {
  userRepo.save(email);
  emailService.sendWelcome(email);
}
\`\`\`

Testing this is painful — you can't fake the repository or the email service.

## The Solution
**Pass dependencies as arguments.**
\`\`\`javascript
// ✅ Injected
function register(email, { userRepo, emailService }) {
  userRepo.save(email);
  emailService.sendWelcome(email);
}

// Testing becomes trivial
register("test@example.com", {
  userRepo: { save: jest.fn() },
  emailService: { sendWelcome: jest.fn() },
});
\`\`\`

## Three Ways to Inject

### 1. Constructor Injection (most common)
\`\`\`javascript
function UserService(userRepo) {
  return {
    findAll: () => userRepo.findAll(),
  };
}

const service = UserService(mongoRepo);
\`\`\`

### 2. Parameter Injection
\`\`\`javascript
function register(email, userRepo) { ... }
register(email, mongoRepo);
\`\`\`

### 3. Factory Injection
\`\`\`javascript
function makeUserService({ userRepo, emailService }) {
  return {
    register: async (email) => {
      await userRepo.save(email);
      await emailService.sendWelcome(email);
    },
  };
}
\`\`\`

## DI Containers (When to Use Them)
Containers manage dependency graphs automatically.

### \`awilix\` (recommended for Node)
\`\`\`javascript
const { createContainer, asClass, asFunction } = require("awilix");

const container = createContainer();
container.register({
  userRepo: asClass(MongoUserRepository),
  emailService: asClass(SendgridEmailService),
  userService: asClass(UserService),
});

const service = container.resolve("userService");
\`\`\`

## When You Need a Container
- 20+ services
- Circular dependency risk
- Multiple environments (dev, staging, prod)
- Different implementations per environment (mock in tests)

## When You Don't
- Under 10 services → pass them manually
- Single environment → hardcoding is fine
- Testing is easy without it → skip it

## Key Takeaways
- DI = pass dependencies, don't create them
- Enables easy testing (fakes/mocks)
- Containers are for big apps only
- Manual DI is often enough`
    },
    {
      title: "Modular Backend Application Design",
      slug: "modular-design",
      order: 3,
      estimatedMinutes: 35,
      content: `# Modular Backend Application Design

**Learning objectives:**
- Organize a large Express app into modules
- Understand vertical vs horizontal slicing
- Scale from 1 developer to 10

## The Problem
A 3,000-line \`app.js\` is a nightmare. Every change risks breaking unrelated features. New developers take weeks to onboard.

## The Solution: Modules
Group code by **feature**, not by technical layer.

### ❌ Horizontal (by layer)
\`\`\`
controllers/
  authController.js
  coursesController.js
  usersController.js
services/
  authService.js
  coursesService.js
models/
  User.js
  Course.js
\`\`\`

Every feature spans 4 folders. Hard to see what belongs together.

### ✅ Vertical (by feature)
\`\`\`
modules/
  auth/
    authController.js
    authService.js
    User.js
    routes.js
  courses/
    coursesController.js
    coursesService.js
    Course.js
    routes.js
\`\`\`

Every feature is self-contained.

## Mount Modules in app.js
\`\`\`javascript
const authModule = require("./modules/auth");
const coursesModule = require("./modules/courses");

app.use("/api/auth", authModule);
app.use("/api/courses", coursesModule);
\`\`\`

Each module exports its own Express router.

## The Module Boundary Rules
- A module **owns** its models
- A module **exports** only its routes (and maybe a service API)
- Modules **cannot** import from each other's internals
- Cross-module communication = via services or events

## Benefits at Scale
- **10 developers** — each owns 2–3 modules
- **Refactor safely** — change is contained
- **Onboard quickly** — new dev reads one module, understands one feature
- **Test in isolation** — mock other modules

## The Cost
- **More boilerplate** — each module needs its own structure
- **Duplication** — shared utilities need a \`shared/\` folder
- **Upfront planning** — you need to identify features early

## When to Go Modular
- ✅ 5+ developers
- ✅ 20+ routes
- ✅ Months of ongoing development
- ❌ MVPs under 2 weeks
- ❌ Single-developer projects

## Key Takeaways
- Group by **feature**, not by **layer**
- Each module = self-contained
- Mount in \`app.js\` via \`app.use("/api/feature", module)\`
- Modular architecture = org chart for code`
    }
  ]
};