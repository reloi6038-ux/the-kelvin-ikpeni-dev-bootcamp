// Path 24: Testing & Debugging
const module1 = require("./path-24/module-1-debugging");
const module2 = require("./path-24/module-2-unit-testing");
const module3 = require("./path-24/module-3-api-integration-testing");
const module4 = require("./path-24/module-4-tdd-logging");
const module5 = require("./path-24/module-5-monitoring");

module.exports = {
  course: {
    title: "Testing & Debugging",
    slug: "testing-debugging-pro",
    description:
      "Master the art of finding bugs and preventing them. Learn VS Code debugging, unit tests, Jest, Supertest, mocking, TDD, logging, and production monitoring.",
    level: "intermediate",
    estimatedHours: 35,
    icon: "bug",
    order: 24,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};