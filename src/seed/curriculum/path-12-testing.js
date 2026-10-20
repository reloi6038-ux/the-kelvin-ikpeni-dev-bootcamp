// Path 12: Testing & Debugging
module.exports = {
  course: {
    title: "Testing & Debugging",
    slug: "testing-debugging",
    description:
      "Unit tests, integration tests, and systematic debugging.",
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

Tests aren't about proving code is correct **today**. They're about **preventing bugs tomorrow** when you change something unrelated.

## Example
You add a feature to \`auth.js\`. The change accidentally breaks \`logout\`. Without tests, you find out from a user next week. With tests, you find out in 3 seconds.

## The Testing Pyramid
\`\`\`
        /\\
       /  \\  E2E (few, slow)
      /----\\
     / Int  \\ Integration (medium)
    /--------\\
   /   Unit   \\ Unit (many, fast)
  /------------\\
\`\`\``,
        },
        {
          title: "Debugging Systematically",
          slug: "debugging-systematically",
          order: 2,
          estimatedMinutes: 20,
          content: `# Debugging Systematically

## The Scientific Method
1. **Reproduce** — find the smallest trigger.
2. **Isolate** — narrow down which file fails.
3. **Understand** — read the error carefully.
4. **Fix** — smallest change that works.
5. **Verify** — confirm nothing else broke.

## Tools
- **Stack traces**: read the FIRST line, find YOUR file.
- **console.log**: check what's actually there.
- **Debugger**: F5 in VS Code, set breakpoints.
- **Divide and conquer**: comment out half the code.`,
        },
      ],
    },
  ],
};