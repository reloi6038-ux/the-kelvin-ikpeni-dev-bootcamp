module.exports = {
  title: "Module 3: Advanced CSS Features",
  description: "Animations, pseudo-elements, and variables.",
  order: 3,
  lessons: [
    {
      title: "CSS Transitions and Animations",
      slug: "css-transitions-animations",
      order: 1,
      estimatedMinutes: 35,
      content: `# CSS Transitions and Animations

**Learning objectives:**
- Add smooth transitions to hover states
- Create keyframe animations

## Transitions
\`\`\`css
.btn {
  background: blue;
  transition: background 0.3s ease;
}
.btn:hover {
  background: red;
}
\`\`\`

## Keyframes
\`\`\`css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
\`\`\`

## When to Use Which
- **Transitions**: A to B states (hover, focus).
- **Animations**: Multi-step sequences (bouncing, spinning).`
    },
    {
      title: "CSS Pseudo-Classes and Pseudo-Elements",
      slug: "css-pseudo-classes",
      order: 2,
      estimatedMinutes: 30,
      content: `# CSS Pseudo-Classes and Pseudo-Elements

**Learning objectives:**
- Style specific states
- Add decorative content with CSS

## Pseudo-Classes (States)
- \`:hover\`: Mouse over.
- \`:focus\`: Element is selected (keyboard users).
- \`:first-child\`, \`:last-child\`.
- \`:nth-child(2n)\`: Even rows.

\`\`\`css
li:first-child { font-weight: bold; }
input:focus { border-color: blue; }
\`\`\`

## Pseudo-Elements (Parts of Elements)
- \`::before\`, \`::after\`: Insert content.
- \`::placeholder\`: Style input placeholder text.

\`\`\`css
.external-link::after {
  content: " ↗";
  color: gray;
}
\`\`\``
    },
    {
      title: "CSS Variables",
      slug: "css-variables",
      order: 3,
      estimatedMinutes: 30,
      content: `# CSS Variables

**Learning objectives:**
- Create a theme with custom properties
- Change styles globally

## Defining Variables
\`\`\`css
:root {
  --primary: #4a9eff;
  --bg: #0a0e27;
  --text: #e6e9f0;
  --radius: 8px;
}
\`\`\`

## Using Variables
\`\`\`css
body {
  background: var(--bg);
  color: var(--text);
}
.btn {
  background: var(--primary);
  border-radius: var(--radius);
}
\`\`\`

## Why Variables?
They make theming easy. Change the value in \`:root\`, and the entire site updates. They also allow you to define dark/light mode simply by overriding \`:root\` values in a media query or class.`
    }
  ]
};