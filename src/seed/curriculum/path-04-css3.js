// Path 4: CSS3 & Responsive Design
module.exports = {
  course: {
    title: "CSS3 & Responsive Design",
    slug: "css3",
    description:
      "Master modern layout with Flexbox and Grid, build responsive designs, and style professional interfaces.",
    level: "beginner",
    estimatedHours: 18,
    icon: "css3",
    order: 4,
    isPublished: true,
  },
  modules: [
    {
      title: "CSS Fundamentals",
      description: "Selectors, box model, colors, and typography.",
      order: 1,
      lessons: [
        {
          title: "Selectors and Specificity",
          slug: "selectors-specificity",
          order: 1,
          estimatedMinutes: 20,
          content: `# Selectors and Specificity

CSS selectors target HTML elements to style.

## Basic selectors
\`\`\`css
p { color: blue; }          /* Element */
.highlight { color: red; }  /* Class */
#header { font-size: 2rem; } /* ID */
\`\`\`

## Specificity Rules
When multiple rules match, the most specific wins:
1. **ID** (\`#header\`)
2. **Class** (\`.highlight\`)
3. **Element** (\`p\`)`,
          exercise: {
            enabled: true,
            instructions: "Change the color of the element with the class `.text-red` to red.",
            walkthrough: "1. Use the selector `.text-red`.\n2. Set `color: red;`.",
            expectedOutput: "color: red",
            starterHtml: "<p class='text-red'>This text should be red.</p>\n<p class='text-blue'>This text is blue.</p>",
            solutionHtml: "<p class='text-red'>This text should be red.</p>\n<p class='text-blue'>This text is blue.</p>",
            starterCss: "/* Add your CSS here */\n",
            solutionCss: ".text-red {\n  color: red;\n}\n.text-blue {\n  color: blue;\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
        {
          title: "The Box Model",
          slug: "box-model",
          order: 2,
          estimatedMinutes: 25,
          content: `# The Box Model

Every element is a rectangular box with four layers.

## Critical Rule: box-sizing
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

Without this, \`width: 100px\` + \`padding: 10px\` = **120px total width**.`,
          exercise: {
            enabled: true,
            instructions: "Add `box-sizing: border-box;` to the universal selector `*`.",
            walkthrough: "1. Select everything using `*`.\n2. Add `box-sizing: border-box;`.",
            expectedOutput: "box-sizing: border-box",
            starterHtml: "<div class='box'>I am 100px wide.</div>",
            solutionHtml: "<div class='box'>I am 100px wide.</div>",
            starterCss: "* {\n  /* Add box-sizing here */\n}\n.box {\n  width: 100px;\n  padding: 20px;\n  border: 1px solid black;\n}",
            solutionCss: "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 100px;\n  padding: 20px;\n  border: 1px solid black;\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
        {
          title: "Typography and Colors",
          slug: "typography-colors",
          order: 3,
          estimatedMinutes: 20,
          content: `# Typography and Colors

## CSS Variables
\`\`\`css
:root {
  --primary: #4a9eff;
  --text: #e6e9f0;
}
button { background: var(--primary); }
\`\`\`

## Font Sizes with clamp()
\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
\`\`\`
This scales smoothly between 2rem and 3.5rem based on viewport width.`,
          exercise: {
            enabled: true,
            instructions: "Use the CSS variable `--primary` to set the background color of the `.btn` class.",
            walkthrough: "1. Select `.btn`.\n2. Add `background-color: var(--primary);`.",
            expectedOutput: "var(--primary)",
            starterHtml: "<button class='btn'>Click Me</button>",
            solutionHtml: "<button class='btn'>Click Me</button>",
            starterCss: ":root {\n  --primary: #ff6b6b;\n}\n.btn {\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  /* Add background here */\n}",
            solutionCss: ":root {\n  --primary: #ff6b6b;\n}\n.btn {\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  background-color: var(--primary);\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
      ],
    },
    {
      title: "Modern Layout",
      description: "Flexbox and CSS Grid.",
      order: 2,
      lessons: [
        {
          title: "Flexbox Fundamentals",
          slug: "flexbox",
          order: 1,
          estimatedMinutes: 25,
          content: `# Flexbox Fundamentals

Flexbox is for laying out items **in one dimension**.

## Basic Usage
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\``,
          exercise: {
            enabled: true,
            instructions: "Make the `.container` use flexbox so the three boxes sit side-by-side, centered, with a 10px gap.",
            walkthrough: "1. Select `.container` and set `display: flex;`.\n2. Add `justify-content: center;` to center them horizontally.\n3. Add `gap: 10px;` for spacing.",
            expectedOutput: "display: flex",
            starterHtml: "<div class='container'>\n  <div class='box'>1</div>\n  <div class='box'>2</div>\n  <div class='box'>3</div>\n</div>",
            solutionHtml: "<div class='container'>\n  <div class='box'>1</div>\n  <div class='box'>2</div>\n  <div class='box'>3</div>\n</div>",
            starterCss: ".container {\n  /* Add flexbox here */\n  background: #eee;\n  padding: 20px;\n}\n.box {\n  background: #4a9eff;\n  color: white;\n  padding: 20px;\n}",
            solutionCss: ".container {\n  display: flex;\n  justify-content: center;\n  gap: 10px;\n  background: #eee;\n  padding: 20px;\n}\n.box {\n  background: #4a9eff;\n  color: white;\n  padding: 20px;\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
        {
          title: "CSS Grid",
          slug: "css-grid",
          order: 2,
          estimatedMinutes: 25,
          content: `# CSS Grid

Grid is for **two-dimensional** layouts.

## Responsive Magic
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`
Automatically creates as many 300px+ columns as fit.`,
          exercise: {
            enabled: true,
            instructions: "Make the `.grid` container have 2 equal columns using CSS Grid.",
            walkthrough: "1. Set `display: grid;` on `.grid`.\n2. Set `grid-template-columns: 1fr 1fr;` (or `repeat(2, 1fr)`).",
            expectedOutput: "display: grid",
            starterHtml: "<div class='grid'>\n  <div class='item'>A</div>\n  <div class='item'>B</div>\n  <div class='item'>C</div>\n  <div class='item'>D</div>\n</div>",
            solutionHtml: "<div class='grid'>\n  <div class='item'>A</div>\n  <div class='item'>B</div>\n  <div class='item'>C</div>\n  <div class='item'>D</div>\n</div>",
            starterCss: ".grid {\n  /* Add grid here */\n  gap: 10px;\n}\n.item {\n  background: #ff6b6b;\n  color: white;\n  padding: 20px;\n}",
            solutionCss: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.item {\n  background: #ff6b6b;\n  color: white;\n  padding: 20px;\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
        {
          title: "Responsive Design",
          slug: "responsive-design",
          order: 3,
          estimatedMinutes: 25,
          content: `# Responsive Design

## Media Queries
\`\`\`css
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
\`\`\``,
          exercise: {
            enabled: true,
            instructions: "Add a media query so that when the screen is `768px` or wider, the `.box` background turns green.",
            walkthrough: "1. Type `@media (min-width: 768px) {`.\n2. Inside, add `.box { background: green; }`.\n3. Close the brace `}`.",
            expectedOutput: "@media (min-width: 768px)",
            starterHtml: "<div class='box'>Resize me</div>",
            solutionHtml: "<div class='box'>Resize me</div>",
            starterCss: ".box {\n  background: blue;\n  color: white;\n  padding: 20px;\n}\n/* Add media query here */",
            solutionCss: ".box {\n  background: blue;\n  color: white;\n  padding: 20px;\n}\n@media (min-width: 768px) {\n  .box { background: green; }\n}",
            starterJs: "",
            solutionJs: ""
          },
        },
      ],
    },
  ],
};