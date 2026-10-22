// Path 33: UI/UX Design and Professional Frontend Skills
const module1 = require("./path-33/module-1-design-fundamentals");
const module2 = require("./path-33/module-2-navigation-landing");
const module3 = require("./path-33/module-3-theming-accessibility");
const module4 = require("./path-33/module-4-performance-seo");
const module5 = require("./path-33/module-5-pwa-animations");

module.exports = {
  course: {
    title: "UI/UX Design & Professional Frontend",
    slug: "ui-ux-frontend",
    description:
      "Master the art of designing and building professional interfaces. Learn wireframing, color theory, accessibility, SEO, performance optimization, and PWAs.",
    level: "intermediate",
    estimatedHours: 35,
    icon: "design",
    order: 33,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};