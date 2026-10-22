module.exports = {
  title: "Module 4: Performance & SEO",
  description: "Images, speed, and search engine visibility.",
  order: 4,
  lessons: [
    {
      title: "Cross-Browser Compatibility",
      slug: "cross-browser-compatibility",
      order: 1,
      estimatedMinutes: 25,
      content: `# Cross-Browser Compatibility

**Learning objectives:**
- Write CSS that works on Safari, Chrome, and Firefox
- Use feature detection

## The Problem
Different browsers render CSS differently. Safari sometimes lacks support for certain properties, and Firefox has its own quirks.

## Solutions
1. **Autoprefixer**: Use tools like PostCSS/Autoprefixer to automatically add vendor prefixes (\`-webkit-\`, \`-moz-\`).
2. **Can I Use**: Check caniuse.com before using a new CSS feature.
3. **Feature Detection**: Use \`@supports\` in CSS.
\`\`\`css
@supports (display: grid) {
  .layout { display: grid; }
}
\`\`\``
    },
    {
      title: "Image Optimization",
      slug: "image-optimization",
      order: 2,
      estimatedMinutes: 30,
      content: `# Image Optimization

**Learning objectives:**
- Use modern image formats
- Lazy load images

## Format
Use **WebP** or **AVIF** instead of JPEG and PNG. They are 30–50% smaller.

## Lazy Loading
Don't load images the user hasn't scrolled to yet. Use the native \`loading="lazy"\` attribute.
\`\`\`html
<img src="huge-image.jpg" loading="lazy" alt="..." />
\`\`\`

## Responsive Images
Use \`srcset\` to serve different sizes based on the screen width.
\`\`\`html
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w" 
  sizes="(max-width: 600px) 480px, 800px"
  src="medium.jpg" 
  alt="..."
/>
\`\`\``
    },
    {
      title: "Frontend Performance Optimization",
      slug: "frontend-performance",
      order: 3,
      estimatedMinutes: 30,
      content: `# Frontend Performance Optimization

**Learning objectives:**
- Reduce render blocking resources
- Minify assets

## The Critical Rendering Path
The browser must download and parse HTML, CSS, and JS before the page shows up.

## Core Web Vitals
- **LCP (Largest Contentful Paint)**: How long until the main content loads. (Target: < 2.5s).
- **FID (First Input Delay)**: How long until the user can click something.
- **CLS (Cumulative Layout Shift)**: How much the page jumps around while loading.

## Optimization Tips
- Minify CSS and JS (Vite/Webpack does this).
- Use CDNs (Cloudflare) to serve static files.
- Preload critical fonts.
- Avoid layout shift by setting explicit \`width\` and \`height\` on images.`
    },
    {
      title: "Search Engine Optimization Fundamentals",
      slug: "seo-fundamentals",
      order: 4,
      estimatedMinutes: 30,
      content: `# Search Engine Optimization Fundamentals

**Learning objectives:**
- Structure HTML for Google
- Write meta tags

## On-Page SEO
- **Title Tag**: The clickable blue link on Google. \`<title>Learn React | MySite</title>\`
- **Meta Description**: The text below the title. \`<meta name="description" content="Learn React from scratch...">\`
- **Headings**: Use one \`<h1>\` per page with your primary keyword.

## The Technical Side
- **Semantic HTML**: Use \`<header>\`, \`<main>\`, \`<article>\`.
- **Sitemap**: Submit an \`sitemap.xml\` to Google Search Console.
- **Robots.txt**: Tell search engines what not to crawl.

## Speed
Google uses page speed (Core Web Vitals) as a ranking factor.`
    }
  ]
};