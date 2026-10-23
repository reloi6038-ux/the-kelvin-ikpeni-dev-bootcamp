module.exports = {
  title: "Module 2: CSS & Responsive Design",
  description: "Styling the portfolio and building responsive layouts.",
  order: 2,
  lessons: [
    {
      title: "Styling the Website with CSS",
      slug: "styling-css",
      order: 13,
      estimatedMinutes: 30,
      content: `# Styling the Website with CSS

**Learning objectives:**
- Understand CSS structure and variables.

## Create public/css/style.css

\`\`\`css
:root {
  --primary: #4a9eff;
  --bg: #0a0e27;
  --text: #e6e9f0;
  --card-bg: #1a2142;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); }
h2 { color: var(--primary); margin-bottom: 1rem; }
section { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
\`\`\``
    },
    {
      title: "Implementing CSS Flexbox and Grid",
      slug: "flexbox-grid",
      order: 14,
      estimatedMinutes: 30,
      content: `# Implementing CSS Flexbox and Grid

**Learning objectives:**
- Use Flexbox for navigation.
- Use Grid for projects.

## Update public/css/style.css

\`\`\`css
/* Navbar */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--card-bg); }

/* Projects */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.project-card { background: var(--card-bg); padding: 1.5rem; border-radius: 8px; }

/* About */
.about-grid { display: flex; gap: 2rem; align-items: center; }
@media (max-width: 768px) { .about-grid { flex-direction: column; } }
\`\`\``
    },
    {
      title: "Creating Responsive Layouts with Media Queries",
      slug: "media-queries",
      order: 15,
      estimatedMinutes: 25,
      content: `# Creating Responsive Layouts with Media Queries

**Learning objectives:**
- Adapt your site to mobile screens.

## Update public/css/style.css

\`\`\`css
/* Mobile-first base styles above */

@media (min-width: 768px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
  section { padding: 6rem 2rem; }
}

@media (min-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(3, 1fr); }
}
\`\`\``
    },
    {
      title: "Building a Responsive Mobile Navigation Menu",
      slug: "mobile-menu",
      order: 16,
      estimatedMinutes: 30,
      content: `# Building a Responsive Mobile Navigation Menu

**Learning objectives:**
- Implement the hamburger menu logic.

## Add to public/css/style.css

\`\`\`css
.hamburger { display: none; cursor: pointer; font-size: 1.5rem; }

@media (max-width: 768px) {
  .hamburger { display: block; }
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: var(--card-bg);
    padding: 1rem;
  }
  .nav-links.active { display: flex; }
}
\`\`\`

## Add to public/js/script.js

\`\`\`javascript
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
\`\`\``
    },
    {
      title: "Adding Colors, Typography, Animations, and Hover Effects",
      slug: "animations-hover",
      order: 17,
      estimatedMinutes: 25,
      content: `# Adding Colors, Typography, Animations, and Hover Effects

**Learning objectives:**
- Polish the UI with transitions.

## Update public/css/style.css

\`\`\`css
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn:hover {
  background: #6bb2ff;
  transform: translateY(-2px);
}

.project-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
\`\`\``
    }
  ]
};