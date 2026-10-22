// Path 32: Connecting the Frontend to your Node.js Backend
const module1 = require("./path-32/module-1-api-communication");
const module2 = require("./path-32/module-2-auth-frontend");
const module3 = require("./path-32/module-3-crud-interfaces");
const module4 = require("./path-32/module-4-errors-realtime");
const module5 = require("./path-32/module-5-deployment");

module.exports = {
  course: {
    title: "Connecting Frontend to Backend",
    slug: "connecting-frontend-backend",
    description:
      "Master full-stack integration. Learn how to connect React to Express, handle JWT authentication, build CRUD interfaces, manage API states, and deploy separated apps.",
    level: "advanced",
    estimatedHours: 45,
    icon: "fullstack",
    order: 32,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};