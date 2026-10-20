// Path 4: CSS3 & Responsive Design
module.exports = {
  course: {
    title: "CSS3 & Responsive Design",
    slug: "css3",
    description:
      "Style professional interfaces with the box model, Flexbox, Grid, and mobile-first responsive design.",
    level: "beginner",
    estimatedHours: 20,
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
          estimatedMinutes: 25,
          content: `# Selectors and Specificity

**Learning objectives:**
- Write element, class, and ID selectors
- Understand CSS specificity and why your styles sometimes don't apply
- Debug conflicting styles

## Selector Types
\`\`\`css
p { color: blue; }             /* element */
.highlight { color: red; }     /* class */
#main-title { font-size: 3rem; } /* ID */
nav a { color: white; }        /* descendant */
.btn:hover { background: blue; } /* pseudo-class */
\`\`\`

## Specificity Rules
When two rules match the same element, the **most specific** one wins.

| Type | Weight |
|------|--------|
| \`!important\` | Highest (avoid!) |
| Inline style | 1000 |
| ID \`#header\` | 100 |
| Class \`.btn\` | 10 |
| Element \`p\` | 1 |

**Example:**
\`\`\`css
p { color: blue; }         /* 1 */
.text-red { color: red; }  /* 10 — wins */
\`\`\`

## Debugging Why a Style Isn't Applying
1. Open DevTools (F12) → Elements
2. Click the element
3. Look at "Styles" — see which rules apply and which are crossed out

## Best Practices
- ✅ Prefer classes over IDs for styling
- ❌ Avoid \`!important\` — it makes future styling impossible
- ✅ Keep selectors shallow (\`.card__title\`, not \`.main .content div p span\`)

## Key Takeaways
- Specificity = priority. More specific = wins.
- IDs beat classes beat elements.
- DevTools is the fastest way to debug CSS.`,
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
            solutionJs: "",
          },
        },
        {
          title: "The Box Model",
          slug: "box-model",
          order: 2,
          estimatedMinutes: 30,
          content: `# The Box Model

**Learning objectives:**
- Diagram the four layers of every element
- Explain \`box-sizing: border-box\`
- Debug unexpected spacing

## The Four Layers
\`\`\`
┌────────────────────────────────────┐  ← margin (outside)
│  ┌──────────────────────────────┐  │
│  │  border                      │  │
│  │  ┌────────────────────────┐  │  │
│  │  │  padding               │  │  │
│  │  │  ┌──────────────────┐  │  │  │
│  │  │  │  content         │  │  │  │
│  │  │  └──────────────────┘  │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
\`\`\`

- **content** — the actual text/image
- **padding** — space inside the border
- **border** — the visible edge
- **margin** — space outside, between elements

## The box-sizing Trap
By default, \`width: 100px\` + \`padding: 20px\` + \`border: 1px\` = **142px total**. The width refers to *content only*.

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`
With \`border-box\`, \`width: 100px\` = **100px total**. Padding and border eat into the content. This is what everyone expects.

**Rule:** always set \`box-sizing: border-box\` at the top of every CSS file.

## Key Takeaways
- Every element has 4 layers: content, padding, border, margin
- Without \`border-box\`, widths don't match what you'd expect
- Always add \`* { box-sizing: border-box; }\``,
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
            solutionJs: "",
          },
        },
        {
          title: "Typography and CSS Variables",
          slug: "typography-variables",
          order: 3,
          estimatedMinutes: 25,
          content: `# Typography and CSS Variables

**Learning objectives:**
- Set readable typography
- Use \`clamp()\` for fluid font sizes
- Create a design system with CSS variables

## Typography Rules
- Base font size: **16px** (browser default)
- Line height: **1.5–1.7** for body text
- Max line length: **60–75 characters** for readability
- Font stack: system fonts first, custom fonts last

\`\`\`css
body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
\`\`\`

## Fluid Sizing with clamp()
\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
\`\`\`
- Minimum: 2rem
- Preferred: 5% of viewport width
- Maximum: 3.5rem

The heading scales smoothly between mobile and desktop — **no media queries needed**.

## CSS Variables (Custom Properties)
Define once, use everywhere.
\`\`\`css
:root {
  --primary: #4a9eff;
  --bg: #0a0e27;
  --text: #e6e9f0;
}

button { background: var(--primary); }
body { background: var(--bg); color: var(--text); }
\`\`\`

### Why Variables?
- **Consistency** — one source of truth
- **Theming** — change \`:root\` to change everything
- **Performance** — smaller CSS files

## Key Takeaways
- 16px base + 1.6 line-height = readable text
- \`clamp()\` = fluid scaling without media queries
- \`--variables\` = design system foundation`,
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
            solutionJs: "",
          },
        },
      ],
    },
    {
      title: "Modern Layout",
      description: "Flexbox, Grid, and responsive design.",
      order: 2,
      lessons: [
        {
          title: "Flexbox Fundamentals",
          slug: "flexbox",
          order: 1,
          estimatedMinutes: 30,
          content: `# Flexbox Fundamentals

**Learning objectives:**
- Lay out items in a row or column
- Center anything horizontally and vertically
- Use \`justify-content\` and \`align-items\` correctly

## What is Flexbox?
A layout mode for arranging items **in one dimension** (row OR column). Perfect for nav bars, toolbars, card rows, and centering.

## The Setup
\`\`\`css
.container {
  display: flex;
  gap: 1rem;
}
\`\`\`
Every child becomes a flex item, laid out in a row.

## The Direction
\`\`\`css
flex-direction: row;     /* default — left to right */
flex-direction: column;  /* top to bottom */
\`\`\`

## Alignment
\`\`\`css
justify-content: flex-start | center | flex-end | space-between | space-around;
align-items: stretch | center | flex-start | flex-end;
\`\`\`

- **justify-content** = along the main axis (horizontal for rows)
- **align-items** = perpendicular (vertical for rows)

## Centering Anything
\`\`\`css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
\`\`\`
This is the single most-used CSS snippet in the world.

## Flex Properties on Children
\`\`\`css
.item { flex: 1; }         /* grow to fill space equally */
.item { flex-shrink: 0; }  /* never shrink */
.item { flex-grow: 2; }    /* grow twice as much as others */
\`\`\`

## When to Use Flexbox
- Nav bars
- Button rows
- Centering content
- Any single-axis layout
- Card internals

## When NOT to Use It
For 2D layouts (rows AND columns), use Grid instead.

## Key Takeaways
- \`display: flex\` on the parent = row of items
- \`justify-content\` = horizontal, \`align-items\` = vertical
- \`flex: 1\` on children = equal widths`,
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
            solutionJs: "",
          },
        },
        {
          title: "CSS Grid",
          slug: "css-grid",
          order: 2,
          estimatedMinutes: 30,
          content: `# CSS Grid

**Learning objectives:**
- Create 2D layouts with rows and columns
- Use \`auto-fill\` and \`minmax\` for responsive grids
- Choose between Grid and Flexbox

## What is Grid?
A layout mode for arranging items in **two dimensions** — rows AND columns together.

## The Setup
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`
This creates **3 equal columns**. Children auto-fill the grid.

## The 1fr Unit
\`1fr\` = "one fraction." \`repeat(3, 1fr)\` = three equal fractions. \`2fr 1fr\` = one column twice as wide.

## The Responsive Magic
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

**What this does:**
- Each column is at least 300px wide
- Fills available space with equal fractions
- Wraps to the next row when needed
- **No media queries required**

This single rule replaces most \`@media\` breakpoints for card grids.

## Placing Items
\`\`\`css
.hero {
  grid-column: 1 / -1; /* span full width */
  grid-row: 1 / 3;
}
\`\`\`

## Grid vs Flexbox
| Use Case | Use |
|----------|-----|
| Page layout | Grid |
| Nav bar | Flexbox |
| Card grid | Grid with \`auto-fill\` |
| Centering content | Flexbox |
| Complex dashboard | Grid |

**Rule of thumb:** Grid for the outside, Flexbox for the inside.

## Key Takeaways
- \`grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))\` = responsive grid
- \`1fr\` = equal fraction
- Grid for 2D, Flexbox for 1D`,
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
            solutionJs: "",
          },
        },
        {
          title: "Responsive Design",
          slug: "responsive-design",
          order: 3,
          estimatedMinutes: 30,
          content: `# Responsive Design

**Learning objectives:**
- Make layouts work on any screen size
- Write mobile-first media queries
- Test on real device sizes

## The Viewport Meta Tag
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
**Without this**, phones render at ~980px width and zoom out — unreadable. Every page needs it.

## Mobile-First Approach
Write CSS for **mobile first**, then add \`min-width\` queries for larger screens.

\`\`\`css
/* Mobile styles (default) */
.card { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .card { padding: 2rem; }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .card { padding: 3rem; }
}
\`\`\`

### Why Mobile-First?
- Mobile users download fewer CSS rules
- Forces simpler, cleaner design
- Grid scales up, not down
- Works better with \`clamp()\` and \`auto-fill\` grids

## Common Breakpoints
| Name | Width |
|------|-------|
| Mobile | 0–479px |
| Mobile landscape | 480–767px |
| Tablet | 768–1023px |
| Desktop | 1024–1439px |
| Large | 1440px+ |

These aren't strict rules — use them as starting points.

## Testing
In DevTools (F12), click the device toolbar icon (Ctrl + Shift + M). Test at 320px, 375px, 768px, 1024px, and 1920px.

## Key Takeaways
- Viewport meta tag is mandatory
- Mobile-first = base styles for mobile, \`min-width\` for larger
- Test at real device widths, not just browser resize`,
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
            solutionJs: "",
          },
        },
      ],
    },
  ],
};