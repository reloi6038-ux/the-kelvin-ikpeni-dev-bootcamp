// Path 27: Beginner Frontend Development
const module1 = require("./path-27/module-1-html-basics");
const module2 = require("./path-27/module-2-html-content");
const module3 = require("./path-27/module-3-css-basics");
const module4 = require("./path-27/module-4-css-layouts");
const module5 = require("./path-27/module-5-js-basics");

module.exports = {
  course: {
    title: "Beginner Frontend Development",
    slug: "beginner-frontend-development",
    description:
      "Start your web development journey. Learn HTML, CSS, and JavaScript to build your first responsive, interactive websites from scratch.",
    level: "beginner",
    estimatedHours: 40,
    icon: "frontend",
    order: 27,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};