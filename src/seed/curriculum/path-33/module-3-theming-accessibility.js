module.exports = {
  title: "Module 3: Dark Mode & Accessibility",
  description: "Theming, WCAG, and keyboard navigation.",
  order: 3,
  lessons: [
    {
      title: "Dark Mode and Theme Switching",
      slug: "dark-mode",
      order: 1,
      estimatedMinutes: 30,
      content: `# Dark Mode and Theme Switching

**Learning objectives:**
- Implement dark mode with CSS variables
- Save the user's preference

## The CSS
Use CSS variables for colors, and override them based on a class on the \`<body>\`.

\`\`\`css
:root {
  --bg: #ffffff;
  --text: #000000;
}

[data-theme="dark"] {
  --bg: #121212;
  --text: #ffffff;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}
\`\`\`

## The JavaScript
\`\`\`javascript
const toggleTheme = () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  document.body.setAttribute("data-theme", isDark ? "light" : "dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
};

// On page load
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);
\`\`\``
    },
    {
      title: "Accessibility and Keyboard Navigation",
      slug: "accessibility-keyboard",
      order: 2,
      estimatedMinutes: 30,
      content: `# Accessibility and Keyboard Navigation

**Learning objectives:**
- Enable keyboard navigation
- Manage focus states

## Keyboard Navigation
Many users cannot use a mouse. They rely on the \`Tab\`, \`Enter\`, and arrow keys.

- **Tab Index**: Interactive elements (links, buttons, inputs) must be reachable via Tab. Do not use \`tabindex="0"\` on non-interactive divs unless you add JS behavior.
- **Focus States**: Never remove \`outline: none\` without replacing it. Users need to see what is currently focused.

\`\`\`css
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
\`\`\`

## Skip Links
Add a hidden "Skip to main content" link at the very top of the page for screen readers.`
    },
    {
      title: "WCAG Accessibility Fundamentals",
      slug: "wcag-fundamentals",
      order: 3,
      estimatedMinutes: 30,
      content: `# WCAG Accessibility Fundamentals

**Learning objectives:**
- Understand the POUR principles
- Make images accessible

## WCAG (Web Content Accessibility Guidelines)
The global standard for accessibility.

## The POUR Principles
1. **Perceivable**: Users can perceive the information (use alt text for images, captions for videos).
2. **Operable**: Users can navigate (keyboard access, no seizure-inducing flashing).
3. **Understandable**: Users can understand (simple language, predictable navigation).
4. **Robust**: Works with assistive technologies (valid HTML, ARIA attributes).

## The Alt Text Rule
Every \`<img>\` must have an \`alt\` attribute.
- If the image is informative: \`alt="A man coding on a laptop"\`.
- If decorative: \`alt=""\`.` 
    }
  ]
};