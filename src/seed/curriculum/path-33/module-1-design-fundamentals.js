module.exports = {
  title: "Module 1: Design Fundamentals",
  description: "Wireframing, color theory, and visual hierarchy.",
  order: 1,
  lessons: [
    {
      title: "UI/UX Design Fundamentals",
      slug: "ui-ux-fundamentals",
      order: 1,
      estimatedMinutes: 25,
      content: `# UI/UX Design Fundamentals

**Learning objectives:**
- Differentiate between UI and UX
- Understand the design process

## UI vs UX
- **UX (User Experience)**: The overall feel of the experience. It answers: "Does this solve the user's problem efficiently?"
- **UI (User Interface)**: The visual and interactive elements. It answers: "Does this look good and respond correctly?"

## The UX Honeycomb
A great experience is:
1. **Useful**: Solves a problem.
2. **Usable**: Easy to use.
3. **Desirable**: Looks good.
4. **Findable**: Content is easy to locate.
5. **Accessible**: Works for everyone.
6. **Credible**: Trustworthy.
7. **Valuable**: Delivers value.`
    },
    {
      title: "Website Wireframing and Prototyping",
      slug: "wireframing-prototyping",
      order: 2,
      estimatedMinutes: 30,
      content: `# Website Wireframing and Prototyping

**Learning objectives:**
- Create wireframes
- Build interactive prototypes

## Wireframes (Low-Fidelity)
A blueprint of the page. No colors, no images, just boxes and placeholder text. It answers: "Where does everything go?"

**Tools**: Figma, Balsamiq, paper and pencil.

## Prototypes (High-Fidelity)
An interactive version that looks like the real app. You can click through it to test the flow.

**Tools**: Figma, Framer.

## The Process
1. Sketch on paper.
2. Build a wireframe.
3. Add real content (Hi-Fi).
4. Test with real users before writing code.`
    },
    {
      title: "Color Theory and Typography",
      slug: "color-typography",
      order: 3,
      estimatedMinutes: 30,
      content: `# Color Theory and Typography

**Learning objectives:**
- Choose accessible color palettes
- Select readable fonts

## Color Theory
- **60-30-10 Rule**: 60% primary color (background), 30% secondary (text), 10% accent (buttons).
- **Contrast**: Text must have a contrast ratio of at least 4.5:1 against the background (WCAG AA).

## Typography
- **Hierarchy**: Use size and weight to show importance (H1 > H2 > Body).
- **Pairing**: Pair a serif heading font with a sans-serif body font, or stick to one font family with different weights.
- **Line Length**: Keep line length between 45–75 characters for readability.
- **Line Height**: Use 1.5 for body text, 1.2 for headings.`
    },
    {
      title: "Layout Design and Visual Hierarchy",
      slug: "layout-hierarchy",
      order: 4,
      estimatedMinutes: 30,
      content: `# Layout Design and Visual Hierarchy

**Learning objectives:**
- Guide the user's eye
- Use white space effectively

## Visual Hierarchy
The arrangement of elements to show their order of importance. Guide the user's eye using:
1. **Size**: Bigger = more important.
2. **Color**: Bright, contrasting colors draw attention.
3. **Position**: Top and left (in LTR languages) get noticed first.
4. **White Space**: Isolation makes an element stand out.

## The Grid System
Use an 8pt or 12-column grid to align elements. Consistent spacing creates a polished, professional look.`
    }
  ]
};