// Path 35: Build a To-Do REST API
const module1 = require("./path-35/module-1-setup");
const module2 = require("./path-35/module-2-crud");
const module3 = require("./path-35/module-3-deployment");

module.exports = {
  course: {
    title: "Build a To-Do REST API (Guided Project)",
    slug: "todo-rest-api",
    description:
      "A complete, step-by-step guided project. Build, test, and deploy a professional REST API using Node.js, Express, MongoDB, and Render.",
    level: "intermediate",
    estimatedHours: 25,
    icon: "project",
    order: 35,
    isPublished: true,
  },
  modules: [module1, module2, module3],
};