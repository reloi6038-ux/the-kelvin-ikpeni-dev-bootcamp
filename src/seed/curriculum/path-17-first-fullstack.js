// Path 17: Build Your First Full-Stack Website
const module1 = require("./path-17/module-1-setup");
const module2 = require("./path-17/module-2-static");
const module3 = require("./path-17/module-3-database");
const module4 = require("./path-17/module-4-api");
const module5 = require("./path-17/module-5-deploy");

module.exports = {
  course: {
    title: "Build Your First Full-Stack Website",
    slug: "first-fullstack-website",
    description:
      "A complete, step-by-step practical walkthrough: build and deploy a real full-stack website from scratch using VS Code, Node.js, Express, and MongoDB — deployed to Render.",
    level: "beginner",
    estimatedHours: 25,
    icon: "rocket",
    order: 17,
    isPublished: true,
  },
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5
  ],
};