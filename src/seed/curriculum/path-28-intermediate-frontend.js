// Path 28: Intermediate HTML, CSS, and JavaScript
const module1 = require("./path-28/module-1-html-accessibility");
const module2 = require("./path-28/module-2-css-layouts");
const module3 = require("./path-28/module-3-css-advanced");
const module4 = require("./path-28/module-4-js-dom-async");
const module5 = require("./path-28/module-5-js-fetch-storage");

module.exports = {
  course: {
    title: "Intermediate HTML, CSS & JavaScript",
    slug: "intermediate-frontend",
    description:
      "Level up your frontend skills. Master Flexbox, Grid, responsive design, animations, modern JS (async/await, fetch, modules), and browser storage.",
    level: "intermediate",
    estimatedHours: 45,
    icon: "frontend-pro",
    order: 28,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};