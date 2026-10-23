module.exports = {
  title: "Module 1: Planning & HTML",
  description: "Project setup, planning, and writing semantic HTML.",
  order: 1,
  lessons: [
    {
      title: "Introduction to Personal Portfolio Website Development",
      slug: "intro-portfolio",
      order: 1,
      estimatedMinutes: 20,
      content: `# Introduction to Personal Portfolio Website Development

**Learning objectives:**
- Understand what a portfolio is and why it matters.
- Differentiate between frontend and backend.
- See how the technologies (HTML, CSS, JS, Node, Express, MongoDB) fit together.

## What is a Portfolio?
A portfolio is a personal website that showcases your skills, projects, and experience to potential employers or clients. It is your digital resume.

## Frontend vs Backend
- **Frontend**: Everything the user sees and interacts with in the browser (HTML, CSS, JS).
- **Backend**: The server, database, and logic that runs behind the scenes (Node.js, Express, MongoDB).

## How They Work Together
1. User visits your portfolio.
2. The Frontend renders the design.
3. User fills out the contact form and clicks "Send".
4. The Frontend sends an API request to your Backend.
5. The Backend validates the data and saves it to MongoDB.
6. The Backend sends a success message back to the Frontend.`
    },
    {
      title: "Understanding HTML, CSS, JavaScript, and the Browser",
      slug: "understanding-web-languages",
      order: 2,
      estimatedMinutes: 25,
      content: `# Understanding HTML, CSS, JavaScript, and the Browser

**Learning objectives:**
- Master the roles of the three core web languages.

## The Three Pillars
1. **HTML (Structure)**: The skeleton of your site. Defines headings, paragraphs, and images.
2. **CSS (Style)**: The skin. Defines colors, fonts, layouts, and animations.
3. **JavaScript (Behavior)**: The brain. Defines interactivity, form validation, and API calls.

## How the Browser Renders a Page
1. **Parsing**: The browser reads the HTML.
2. **DOM Construction**: It builds the Document Object Model (a tree of elements).
3. **Styling**: It applies the CSS.
4. **Execution**: It runs the JavaScript.`
    },
    {
      title: "Installing and Configuring VS Code and Node.js",
      slug: "installing-tools",
      order: 3,
      estimatedMinutes: 15,
      content: `# Installing and Configuring VS Code and Node.js

**Learning objectives:**
- Set up your local development environment.

## Step 1: Install Node.js
1. Go to **nodejs.org**.
2. Download the **LTS** version.
3. Install it (keep "Add to PATH" checked).

## Step 2: Install VS Code
1. Go to **code.visualstudio.com**.
2. Download and install.

## Step 3: Install Extensions
- **Live Server**: Right-click HTML to preview.
- **Prettier**: Formats code automatically.`
    },
    {
      title: "Understanding Project Requirements and Website Planning",
      slug: "project-planning",
      order: 4,
      estimatedMinutes: 20,
      content: `# Understanding Project Requirements and Website Planning

**Learning objectives:**
- Plan the structure before coding.

## Features to Build
- Header with navigation.
- Hero section with your name and title.
- About Me.
- Skills list.
- Projects gallery.
- Contact form.
- Footer with social links.

## Design Principles
- **Mobile-first**: Design for small screens, then scale up.
- **Accessibility**: High contrast, keyboard navigable, semantic tags.
- **Performance**: Compress images, lazy load assets.`
    },
    {
      title: "Creating the Project Folder and Initial File Structure",
      slug: "folder-structure",
      order: 5,
      estimatedMinutes: 15,
      content: `# Creating the Project Folder and Initial File Structure

**Learning objectives:**
- Organize your files for frontend and backend.

## Step 1: Create the Folders
\`\`\`bash
mkdir portfolio-website
cd portfolio-website
mkdir public
mkdir public/css public/js public/images
mkdir src
mkdir src/config src/controllers src/middleware src/models src/routes
\`\`\`

## Step 2: Initialize npm
\`\`\`bash
npm init -y
\`\`\`

## The Structure
- \`public/\`: Frontend files (HTML, CSS, JS).
- \`src/\`: Backend files (Express, MongoDB).`
    },
    {
      title: "Writing Semantic HTML for the Portfolio",
      slug: "semantic-html",
      order: 6,
      estimatedMinutes: 30,
      content: `# Writing Semantic HTML for the Portfolio

**Learning objectives:**
- Use semantic tags for accessibility and SEO.

## Create public/index.html

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Johnson | Full-Stack Developer</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="home">
      <h1>Alex Johnson</h1>
      <p>Full-Stack Developer</p>
    </section>

    <section id="about">
      <h2>About Me</h2>
      <p>I build web applications...</p>
    </section>

    <section id="projects">
      <h2>Projects</h2>
    </section>

    <section id="contact">
      <h2>Contact Me</h2>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Johnson</p>
  </footer>
  
  <script src="/js/script.js"></script>
</body>
</html>
\`\`\``
    },
    {
      title: "Building the Header, Navigation, and Hero Section",
      slug: "header-hero",
      order: 7,
      estimatedMinutes: 30,
      content: `# Building the Header, Navigation, and Hero Section

**Learning objectives:**
- Build a sticky header and a compelling hero section.

## Update public/index.html

\`\`\`html
<!-- Inside <header> -->
<nav class="navbar">
  <div class="logo">Alex.dev</div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="hamburger">☰</div>
</nav>

<!-- Inside <section id="home"> -->
<div class="hero-content">
  <h1>Hi, I'm Alex Johnson</h1>
  <p>I build responsive and accessible web applications.</p>
  <a href="#contact" class="btn">Hire Me</a>
</div>
\`\`\``
    },
    {
      title: "Creating the About Me Section",
      slug: "about-section",
      order: 8,
      estimatedMinutes: 20,
      content: `# Creating the About Me Section

**Learning objectives:**
- Introduce yourself professionally.

## Update public/index.html

\`\`\`html
<section id="about">
  <div class="container">
    <h2>About Me</h2>
    <div class="about-grid">
      <img src="/images/profile.jpg" alt="Alex Johnson">
      <div>
        <p>I am a passionate developer with a background in computer science...</p>
        <h3>Skills</h3>
        <ul>
          <li>HTML, CSS, JavaScript</li>
          <li>Node.js, Express.js</li>
          <li>MongoDB, Mongoose</li>
        </ul>
      </div>
    </div>
  </div>
</section>
\`\`\``
    },
    {
      title: "Creating the Skills and Technologies Section",
      slug: "skills-section",
      order: 9,
      estimatedMinutes: 20,
      content: `# Creating the Skills and Technologies Section

**Learning objectives:**
- Visually represent your tech stack.

## Update public/index.html

\`\`\`html
<section id="skills">
  <h2>Technologies I Use</h2>
  <div class="skills-grid">
    <div class="skill-card">HTML5</div>
    <div class="skill-card">CSS3</div>
    <div class="skill-card">JavaScript</div>
    <div class="skill-card">Node.js</div>
    <div class="skill-card">MongoDB</div>
    <div class="skill-card">React</div>
  </div>
</section>
\`\`\``
    },
    {
      title: "Building the Projects and Portfolio Gallery",
      slug: "projects-section",
      order: 10,
      estimatedMinutes: 30,
      content: `# Building the Projects and Portfolio Gallery

**Learning objectives:**
- Display your best work with links.

## Update public/index.html

\`\`\`html
<section id="projects">
  <h2>Featured Projects</h2>
  <div class="projects-grid">
    <div class="project-card">
      <h3>E-Commerce Store</h3>
      <p>A full-stack store built with React and Node.js.</p>
      <div class="tags">
        <span>React</span>
        <span>MongoDB</span>
      </div>
      <a href="https://demo.com" target="_blank">Live Demo</a>
      <a href="https://github.com" target="_blank">GitHub</a>
    </div>
    <!-- Add more project cards -->
  </div>
</section>
\`\`\``
    },
    {
      title: "Creating Education, Experience, and Certifications",
      slug: "education-experience",
      order: 11,
      estimatedMinutes: 20,
      content: `# Creating Education, Experience, and Certifications

**Learning objectives:**
- List your professional background.

## Update public/index.html

\`\`\`html
<section id="resume">
  <h2>Experience</h2>
  <div class="timeline">
    <div class="timeline-item">
      <h3>Junior Developer</h3>
      <p>TechCorp (2024 - Present)</p>
      <p>Built REST APIs and managed MongoDB databases.</p>
    </div>
  </div>
  <h2>Education</h2>
  <div class="timeline">
    <div class="timeline-item">
      <h3>B.Sc. Computer Science</h3>
      <p>State University (2020 - 2024)</p>
    </div>
  </div>
</section>
\`\`\``
    },
    {
      title: "Building the Contact Section and Contact Form",
      slug: "contact-form-html",
      order: 12,
      estimatedMinutes: 30,
      content: `# Building the Contact Section and Contact Form

**Learning objectives:**
- Build a form that sends data to the backend.

## Update public/index.html

\`\`\`html
<section id="contact">
  <h2>Contact Me</h2>
  <form id="contact-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit" id="submit-btn">Send Message</button>
  </form>
  <div id="form-status"></div>
</section>
\`\`\``
    }
  ]
};