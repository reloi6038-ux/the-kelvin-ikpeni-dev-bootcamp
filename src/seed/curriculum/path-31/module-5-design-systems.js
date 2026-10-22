module.exports = {
  title: "Module 5: Design Systems",
  description: "Building reusable UI libraries.",
  order: 5,
  lessons: [
    {
      title: "Component Libraries and Design Systems",
      slug: "design-systems",
      order: 1,
      estimatedMinutes: 35,
      content: `# Component Libraries and Design Systems

**Learning objectives:**
- Understand the difference between UI libraries and design systems
- Use component libraries

## What is a Design System?
A design system is a complete set of standards for building products. It includes:
- **Design Tokens**: Colors, fonts, spacing (e.g., \`--primary-500\`).
- **Components**: Buttons, inputs, modals.
- **Guidelines**: When to use which component.

## Popular React Component Libraries
Instead of building every button from scratch, many companies use:
- **Material UI (MUI)**: Google's Material Design.
- **Chakra UI**: Accessible, modular, and simple.
- **shadcn/ui**: Copy-paste components built with Tailwind.

## Example: Chakra UI
\`\`\`tsx
import { Button } from '@chakra-ui/react';

function App() {
  return <Button colorScheme="blue">Click me</Button>;
}
\`\`\`

## Why Use Them?
They provide accessible components (WAI-ARIA compliant), save development time, and maintain a consistent look across the app.`
    }
  ]
};