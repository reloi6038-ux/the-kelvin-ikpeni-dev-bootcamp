module.exports = {
  title: "Module 1: Advanced HTML & Accessibility",
  description: "Building robust forms and ensuring your site works for everyone.",
  order: 1,
  lessons: [
    {
      title: "Advanced HTML Forms",
      slug: "advanced-html-forms",
      order: 1,
      estimatedMinutes: 30,
      content: `# Advanced HTML Forms

**Learning objectives:**
- Master complex form elements
- Use datalists and custom validation

## Datalist
Provides an "autocomplete" dropdown without restricting user input.
\`\`\`html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>
\`\`\`

## Fieldset and Legend
Used to group related form controls.
\`\`\`html
<fieldset>
  <legend>Choose your plan:</legend>
  <input type="radio" id="free" name="plan" value="free">
  <label for="free">Free</label>
  <input type="radio" id="pro" name="plan" value="pro">
  <label for="pro">Pro</label>
</fieldset>
\`\`\`

## Custom Validation Attributes
- \`pattern="[0-9]{5}"\`
- \`minlength="8"\`
- \`required\`
- \`type="email"\``
    },
    {
      title: "HTML Accessibility",
      slug: "html-accessibility",
      order: 2,
      estimatedMinutes: 35,
      content: `# HTML Accessibility

**Learning objectives:**
- Understand WCAG guidelines
- Use ARIA attributes effectively

## What is Accessibility (a11y)?
Designing websites so people with disabilities (visual, auditory, motor, cognitive) can use them.

## Semantic HTML is Accessibility
Using \`<button>\` instead of \`<div onclick="...">\` ensures screen readers announce "button" and keyboard users can press Tab and Enter.

## ARIA Attributes
ARIA (Accessible Rich Internet Applications) adds meaning to non-semantic elements.
- \`aria-label\`: Provides a label when no text is visible.
- \`aria-expanded\`: Indicates if a menu is open.
- \`aria-hidden="true"\`: Hides decorative icons from screen readers.
- \`role\`: Explicitly defines an element's purpose.

\`\`\`html
<button aria-label="Close menu">X</button>
\`\`\``
    }
  ]
};