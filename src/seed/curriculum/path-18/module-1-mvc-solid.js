module.exports = {
  title: "Module 1: MVC & SOLID Principles",
  description: "The foundational patterns every professional backend uses.",
  order: 1,
  lessons: [
    {
      title: "Model-View-Controller (MVC) Architecture",
      slug: "mvc-architecture",
      order: 1,
      estimatedMinutes: 30,
      content: `# Model-View-Controller (MVC) Architecture

**Learning objectives:**
- Understand the three layers of MVC
- Apply MVC to a Node.js application
- Know when MVC is (and isn't) the right choice

## What is MVC?
MVC separates an application into three interconnected components:

| Layer | Responsibility |
|-------|----------------|
| **Model** | Data and business logic |
| **View** | The UI (in API-only backends, this is the JSON response shape) |
| **Controller** | Handles incoming requests, coordinates Model and View |

## How This Bootcamp Uses MVC
Look at any of your existing routes — they already follow MVC:

\`\`\`
Request → Route → Controller → Model → Response
\`\`\`

### The Model
\`\`\`javascript
// src/models/Course.js
const Course = mongoose.model("Course", courseSchema);
\`\`\`

### The Controller
\`\`\`javascript
// src/controllers/auth.js
async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  // business logic
  res.json({ success: true, user });
}
\`\`\`

### The Route (the View in an API context)
\`\`\`javascript
// src/routes/auth.js
router.post("/login", authLimiter, login);
\`\`\`

## Why MVC?
- **Separation of concerns** — each file does one thing
- **Testability** — you can test controllers without HTTP
- **Team scalability** — frontend and backend devs work independently

## Common Mistakes
- ❌ Business logic in routes (should be in controllers)
- ❌ Database queries in controllers (should be in models)
- ❌ Views (responses) containing business logic

## Key Takeaways
- Model = data, View = response, Controller = coordination
- Routes only map URLs to controllers
- Every file has one clear responsibility`
    },
    {
      title: "SOLID Principles in Backend Development",
      slug: "solid-principles",
      order: 2,
      estimatedMinutes: 35,
      content: `# SOLID Principles in Backend Development

**Learning objectives:**
- Understand the 5 SOLID principles
- Apply each one to real Node.js code
- Know when to break the rules (yes, sometimes you should)

## The 5 Principles

### 1. S — Single Responsibility Principle
A class/function should have one reason to change.

\`\`\`javascript
// ❌ One function doing three jobs
function handleUser(email) {
  validateEmail(email);     // validation
  saveToDatabase(email);    // persistence
  sendWelcomeEmail(email);  // notification
}

// ✅ Split it up
function validateEmail(email) { ... }
function saveUser(user) { ... }
function sendWelcomeEmail(user) { ... }
\`\`\`

### 2. O — Open/Closed Principle
Open for extension, closed for modification.

\`\`\`javascript
// ❌ Modifying to add a new payment type
function processPayment(type) {
  if (type === "card") { ... }
  else if (type === "paypal") { ... }
  // add "stripe" → modify this function
}

// ✅ Extend without modifying
const paymentMethods = {
  card: processCardPayment,
  paypal: processPaypalPayment,
};
function processPayment(type) {
  return paymentMethods[type]();
}
\`\`\`

### 3. L — Liskov Substitution Principle
Subtypes must be substitutable for their base types.

### 4. I — Interface Segregation Principle
Don't force clients to depend on methods they don't use.

### 5. D — Dependency Inversion Principle
Depend on abstractions, not concretions.

\`\`\`javascript
// ❌ Hardcoded dependency
const userRepo = new MongoUserRepository();

// ✅ Injected dependency
function UserService(userRepo) {
  return { findAll: () => userRepo.findAll() };
}
\`\`\`

## When to Break SOLID
- **Prototypes** — speed > architecture
- **Small scripts** — 10-line script doesn't need 5 files
- **Premature optimization** — you'll never need the 4th variant

**Rule:** apply SOLID when your code has more than one developer, more than one use case, or lives for more than 6 months.

## Key Takeaways
- SOLID = 5 principles for maintainable code
- Each file/function should do one thing well
- Split before you're forced to
- Don't over-engineer small scripts`
    },
    {
      title: "Service Layer and Repository Patterns",
      slug: "service-repository-patterns",
      order: 3,
      estimatedMinutes: 35,
      content: `# Service Layer and Repository Patterns

**Learning objectives:**
- Understand the difference between services and repositories
- Refactor a controller to use both
- Know when abstraction becomes overhead

## The Two Layers

### Repository
Abstracts database access. One repository per model.

\`\`\`javascript
// src/repositories/userRepository.js
const User = require("../models/User");

module.exports = {
  findByEmail(email) {
    return User.findOne({ email }).select("+passwordHash").lean();
  },
  create(data) {
    return User.create(data);
  },
};
\`\`\`

### Service
Contains business logic. Uses repositories.

\`\`\`javascript
// src/services/authService.js
const bcrypt = require("bcryptjs");
const userRepo = require("../repositories/userRepository");

module.exports = {
  async login(email, password) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    return user;
  },
};
\`\`\`

### Controller (thin!)
\`\`\`javascript
// src/controllers/authController.js
const authService = require("../services/authService");

module.exports = {
  async login(req, res, next) {
    try {
      const user = await authService.login(req.body.email, req.body.password);
      res.json({ success: true, user });
    } catch (err) {
      next(err);
    }
  },
};
\`\`\`

## The Flow
\`\`\`
Route → Controller (HTTP) → Service (business) → Repository (DB) → Model
\`\`\`

Each layer has one clear job:
- **Controller** — knows about HTTP
- **Service** — knows about business rules
- **Repository** — knows about the database

## When to Use Both
- Applications with multiple data sources (MongoDB + Redis + external APIs)
- Teams where DBAs own the repository, backend devs own the service
- Codebases that will live for years

## When It's Overkill
- Prototypes
- Single-developer projects
- Apps where the controller logic is trivially simple (like this bootcamp's early phases)

**Rule:** start with thin controllers + fat models. Add services when business logic grows. Add repositories when data sources multiply.

## Key Takeaways
- Repository = data access
- Service = business logic
- Controller = HTTP handling
- Don't abstract until you have a reason`
    }
  ]
};