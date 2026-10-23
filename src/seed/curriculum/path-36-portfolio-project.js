// Path 36: Build a Personal Portfolio Website
const module1 = require("./path-36/module-1-html-planning");
const module2 = require("./path-36/module-2-css-layout");
const module3 = require("./path-36/module-3-js-validation");
const module4 = require("./path-36/module-4-backend");
const module5 = require("./path-36/module-5-testing-deployment");

module.exports = {
  course: {
    title: "Build a Personal Portfolio (Guided Project)",
    slug: "portfolio-project",
    description:
      "A complete, step-by-step guided project. Learn HTML, CSS, JavaScript, Node.js, Express, and MongoDB by building and deploying a professional portfolio website.",
    level: "beginner",
    estimatedHours: 30,
    icon: "portfolio",
    order: 36,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};