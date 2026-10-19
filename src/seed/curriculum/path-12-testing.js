module.exports = {
  course: {
    title: "Testing & Debugging",
    slug: "testing-debugging",
    description: "Unit tests, integration tests, and systematic debugging.",
    level: "intermediate",
    estimatedHours: 10,
    icon: "testing",
    order: 12,
    isPublished: true,
  },
  modules: [
    {
      title: "Testing Fundamentals",
      description: "Why test and how to start.",
      order: 1,
      lessons: [
        {
          title: "Why Tests Matter",
          slug: "why-tests-matter",
          order: 1,
          estimatedMinutes: 15,
          content: `# Why Tests Matter

Tests are code that verify other code works.

## The real reason
Tests aren't about proving code is correct **today**. They're about **preventing bugs tomorrow** when you change something unrelated.

## Example
You add a feature to \`auth.js\`. The change accidentally breaks \`logout\`. Without tests, you find out from a user next week. With tests, you find out in 3 seconds.

## The testing pyramid
\`\`\`
        /\`\`\`\\
       /  E2E  \\        (few, slow, expensive)
      /----------\\
     /Integration\\    (medium)
    /--------------\\
   /   Unit Tests   \\  (many, fast, cheap)
  /------------------\\
\`\`\`

- **Unit** — one function in isolation (fast)
- **Integration** — multiple modules together
- **End-to-end** — full user flow through a real browser (slow)

## Start with what's risky
Test authentication, payments, and anything that touches user data. Don't test trivial getters.`,
        },
        {
          title: "Debugging Systematically",
          slug: "debugging-systematically",
          order: 2,
          estimatedMinutes: 20,
          content: `# Debugging Systematically

Debugging is a **process**, not a guess.

## The scientific method
1. **Reproduce** — find the smallest steps that trigger the bug
2. **Isolate** — narrow down which file/function fails
3. **Understand** — read the error message carefully
4. **Fix** — make the smallest change that fixes it
5. **Verify** — confirm the bug is gone and nothing else broke

## Tools

### 1. The stack trace
Always read the FIRST line, then find the FIRST line in **your** code.

\`\`\`
TypeError: Cannot read property 'name' of undefined
    at getUserName (src/utils/user.js:12:20)
    ^^^ This is where it crashed
\`\`\`

### 2. Console logging
\`\`\`js
console.log("User:", user); // Is it what you expected?
console.log("Step 3 reached"); // Did execution get here?
\`\`\`

### 3. VS Code debugger
- Click the line number to set a breakpoint (red dot)
- Run with \`F5\`
- Execution pauses — inspect all variables

### 4. The divide-and-conquer method
Comment out half the code. Does it still fail?
- Yes → bug is in the remaining half
- No → bug is in the commented half

Repeat until you find the line.`,
        },
      ],
    },
  ],
};