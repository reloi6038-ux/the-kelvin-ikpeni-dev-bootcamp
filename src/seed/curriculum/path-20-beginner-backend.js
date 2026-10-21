// Path 20: Beginner Backend Development
const module1 = require("./path-20/module-1-web-fundamentals");
const module2 = require("./path-20/module-2-nodejs-basics");
const module3 = require("./path-20/module-3-filesystem-env");
const module4 = require("./path-20/module-4-async-json");
const module5 = require("./path-20/module-5-servers-git");

module.exports = {
  course: {
    title: "Beginner Backend Development",
    slug: "beginner-backend-development",
    description:
      "The perfect starting point for backend developers. Learn how the web works, install Node.js, handle the file system, manage environment variables, and build your first server.",
    level: "beginner",
    estimatedHours: 30,
    icon: "beginner",
    order: 20,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};