module.exports = {
  title: "Module 2: Navigation & Landing Pages",
  description: "Menus, mobile navigation, and hero sections.",
  order: 2,
  lessons: [
    {
      title: "Designing Navigation Menus",
      slug: "navigation-menus",
      order: 1,
      estimatedMinutes: 25,
      content: `# Designing Navigation Menus

**Learning objectives:**
- Build clear, intuitive menus
- Understand primary vs secondary navigation

## Primary Navigation
The main menu. Usually at the top or left. It should contain 3-6 core links.
- **Logo**: Home.
- **Links**: Courses, About, Contact.
- **Call to Action**: Log In / Sign Up.

## Secondary Navigation
Smaller links like Terms, Privacy, and FAQs, usually in the footer.

## Best Practices
- Use descriptive words (not "Click Here").
- Visually highlight the current page (active state).
- Keep it consistent across all pages.`
    },
    {
      title: "Creating Professional Landing Pages",
      slug: "landing-pages",
      order: 2,
      estimatedMinutes: 30,
      content: `# Creating Professional Landing Pages

**Learning objectives:**
- Structure a high-converting landing page
- Design an effective hero section

## The Anatomy of a Landing Page
1. **Hero**: The first thing users see. It must have:
   - A clear, benefit-driven headline.
   - A subheadline with more details.
   - A Call to Action (CTA) button.
2. **Social Proof**: Logos, testimonials, or stats.
3. **Features**: What the product does.
4. **FAQ**: Address objections.
5. **Final CTA**: A last push to convert.

## The Hero Formula
Headline = The big promise.
Subhead = How it works.
Button = The next step.`
    },
    {
      title: "Responsive Navigation and Mobile Menus",
      slug: "responsive-nav",
      order: 3,
      estimatedMinutes: 30,
      content: `# Responsive Navigation and Mobile Menus

**Learning objectives:**
- Build a mobile hamburger menu
- Hide and show elements based on screen size

## The Problem
Horizontal nav links don't fit on small screens.

## The Solution
1. Hide the links on mobile.
2. Show a hamburger icon (\`☰\`).
3. When clicked, show a full-screen overlay or dropdown menu.

\`\`\`css
.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-toggle {
  display: none;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-toggle { display: block; }
  
  /* Add JS to toggle a class that displays the menu */
}
\`\`\``
    }
  ]
};