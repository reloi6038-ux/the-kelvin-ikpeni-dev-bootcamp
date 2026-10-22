module.exports = {
  title: "Module 5: PWAs & Animations",
  description: "Offline support and microinteractions.",
  order: 5,
  lessons: [
    {
      title: "Progressive Web Apps (PWAs)",
      slug: "progressive-web-apps",
      order: 1,
      estimatedMinutes: 35,
      content: `# Progressive Web Apps (PWAs)

**Learning objectives:**
- Understand what makes a PWA
- Add a Web App Manifest

## What is a PWA?
A website that acts like a native app. It can be installed on the user's device and work offline.

## Requirements
1. **HTTPS**: PWAs must be served securely.
2. **Manifest**: A JSON file that tells the OS the app's name, icons, and colors.
3. **Service Worker**: A JavaScript file that runs in the background to cache assets for offline use.

## The Manifest
\`\`\`json
{
  "name": "My Bootcamp",
  "short_name": "Bootcamp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "icons": [{ "src": "icon-192.png", "sizes": "192x192", "type": "image/png" }]
}
\`\`\``
    },
    {
      title: "Web Animations and Microinteractions",
      slug: "web-animations",
      order: 2,
      estimatedMinutes: 30,
      content: `# Web Animations and Microinteractions

**Learning objectives:**
- Use CSS transitions effectively
- Build purposeful animations

## What are Microinteractions?
Small animations that provide feedback to the user, making the app feel alive and polished. Examples:
- A button that slightly depresses when clicked.
- A loading spinner.
- A checkmark that draws itself when a task is complete.

## Best Practices
- **Keep it subtle**: Animations should enhance, not distract.
- **Performance**: Stick to animating \`transform\` and \`opacity\`. Avoid animating \`width\`, \`height\`, or \`margin\` (they force the browser to recalculate layout, causing jank).
- **Accessibility**: Respect users with vestibular disorders by wrapping animations in \`@media (prefers-reduced-motion: reduce)\`.

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``
    }
  ]
};