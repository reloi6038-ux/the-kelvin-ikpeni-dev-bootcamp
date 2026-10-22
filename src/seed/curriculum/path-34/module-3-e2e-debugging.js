module.exports = {
  title: "Module 3: E2E Testing & Debugging",
  description: "Playwright, debugging, and accessibility tests.",
  order: 3,
  lessons: [
    {
      title: "End-to-End Testing with Playwright",
      slug: "e2e-playwright",
      order: 1,
      estimatedMinutes: 35,
      content: `# End-to-End Testing with Playwright

**Learning objectives:**
- Automate a real browser
- Test the full user flow

## What is Playwright?
A framework by Microsoft for E2E testing. It launches a real browser (Chromium, Firefox, WebKit) and clicks through your app.

## Example
\`\`\`javascript
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Assert redirect to dashboard
  await expect(page).toHaveURL('http://localhost:5173/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
\`\`\``
    },
    {
      title: "Browser Debugging",
      slug: "browser-debugging",
      order: 2,
      estimatedMinutes: 25,
      content: `# Browser Debugging

**Learning objectives:**
- Use DevTools effectively
- Read stack traces

## The DevTools Tabs
- **Console**: View errors and logs. You can run JS directly here.
- **Network**: See every fetch request, its payload, and response. Check for 4xx and 5xx errors.
- **Sources**: Set breakpoints. The \`debugger;\` statement will pause execution here.
- **Elements**: Inspect the DOM and live-edit CSS.

## Debugging Tip
If your state isn't updating, add a \`console.log\` inside your component, or use the React DevTools extension to inspect the props and state.`
    },
    {
      title: "Accessibility Testing",
      slug: "accessibility-testing",
      order: 3,
      estimatedMinutes: 25,
      content: `# Accessibility Testing

**Learning objectives:**
- Use Lighthouse and Axe
- Write accessible tests

## Automated Tools
- **Lighthouse** (built into Chrome DevTools): Run an audit and check the "Accessibility" score.
- **axe DevTools**: A browser extension that scans for WCAG violations.

## Testing in Code
Jest-axe or \`vitest-axe\` can run accessibility checks inside your unit tests.
\`\`\`javascript
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
\`\`\``
    }
  ]
};