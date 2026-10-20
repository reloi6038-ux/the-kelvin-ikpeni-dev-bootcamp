// Path 12: Testing & Debugging
module.exports = {
  course: {
    title: "Testing & Debugging",
    slug: "testing-debugging",
    description:
      "Write unit tests, integration tests, and debug methodically with the tools professionals use.",
    level: "intermediate",
    estimatedHours: 12,
    icon: "testing",
    order: 12,
    isPublished: true,
  },
  modules: [
    {
      title: "Testing Fundamentals",
      description: "Why tests matter and how to write them.",
      order: 1,
      lessons: [
        {
          title: "Why Tests Matter",
          slug: "why-tests-matter",
          order: 1,
          estimatedMinutes: 20,
          content: `# Why Tests Matter

**Learning objectives:**
- Understand the purpose of automated tests
- Explain the testing pyramid
- Know what to test first

## The Real Purpose
Tests aren't about proving your code is correct **today**. They're about preventing bugs **tomorrow** when you change unrelated code.

**Example:** You refactor \`auth.js\` for a new feature. The refactor accidentally breaks logout. Without tests, you find out from a user next week. With tests, you find out in 3 seconds.

## The Testing Pyramid
\`\`\`
        /\\
       /  \\  E2E          ← Few, slow, brittle
      /----\\
     / Integ \\ Integration ← Medium
    /--------\\
   /  Unit    \\ Unit        ← Many, fast, cheap
  /------------\\
\`\`\`

### Unit Tests
Test one function in isolation. Fast, cheap, but don't catch integration bugs.

### Integration Tests
Test multiple modules together (e.g., API + database). Medium speed, high value.

### End-to-End Tests
Test a full user flow (click → enroll → certificate). Slow, brittle, but confirm real behavior.

## Start With What's Risky
Don't test trivial getters. **Test**:
- Authentication (login, logout, session)
- Payments (if you have them)
- Data mutations (enrollment, progress)
- Authorization (admin vs student)

## Tests as Documentation
A well-written test suite is executable documentation. New developers can read the tests and understand how the system is *supposed* to behave.

## Key Takeaways
- Tests prevent *future* bugs, not current ones
- Start with the riskiest code
- Many fast unit tests, fewer integration, minimal E2E
- Tests double as documentation`,
        },
        {
          title: "Debugging Systematically",
          slug: "debugging-systematically",
          order: 2,
          estimatedMinutes: 25,
          content: `# Debugging Systematically

**Learning objectives:**
- Use the scientific method for debugging
- Read stack traces effectively
- Use DevTools and VS Code debugger

## The Scientific Method
1. **Reproduce** — find the smallest steps that trigger the bug
2. **Isolate** — narrow down which file/function fails
3. **Understand** — read the error, check assumptions
4. **Fix** — make the smallest change that works
5. **Verify** — confirm the bug is gone and nothing else broke

Skipping steps wastes time.

## Reading Stack Traces
The most important line is the **first one that references your code**:

\`\`\`
TypeError: Cannot read property 'name' of undefined
    at getUserName (src/utils/user.js:12:20)
    at processRequest (src/controllers/user.js:45:15)
    at Layer.handle (node_modules/express/lib/router/layer.js:95:5)
\`\`\`

- Line 1: the error message
- Line 2: **where it happened in YOUR code** (user.js:12)
- Line 3+: the call stack (who called it)

Ignore the \`node_modules\` lines. Focus on \`src/\`.

## Tools
### 1. \`console.log\`
The fastest tool. Insert logs to see actual values:
\`\`\`javascript
console.log("user:", user);      // is it what I expected?
console.log("Step 3 reached");   // does the code get here?
console.log("len:", arr.length); // array populated?
\`\`\`

### 2. DevTools
- **Console** — errors, \`console.log\` output
- **Network** — every HTTP request (inspect requests and responses)
- **Elements** — inspect the live DOM
- **Sources** — set breakpoints, step through code

### 3. VS Code Debugger
- Click the line number to set a breakpoint (red dot)
- Press F5 (Run → Start Debugging)
- Execution pauses at the breakpoint — inspect all variables

## Divide and Conquer
Comment out half your code. Does the bug still happen?
- If yes, it's in the other half.
- If no, it's in the commented half.
Repeat until you find the line.

## The 20-Minute Rule
If you've been stuck for 20 minutes, **ask for help**. Fresh eyes see what you can't. This isn't weakness — it's professional.

## Key Takeaways
- Follow the scientific method (reproduce → isolate → fix → verify)
- Read the FIRST line of YOUR code in the stack trace
- \`console.log\` and DevTools solve 90% of bugs
- Ask for help after 20 minutes`,
        },
      ],
    },
  ],
};