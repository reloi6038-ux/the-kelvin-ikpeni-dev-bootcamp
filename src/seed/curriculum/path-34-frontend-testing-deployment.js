// Path 34: Frontend Testing and Deployment
const module1 = require("./path-34/module-1-unit-testing");
const module2 = require("./path-34/module-2-vitest-rtl");
const module3 = require("./path-34/module-3-e2e-debugging");
const module4 = require("./path-34/module-4-frontend-security");
const module5 = require("./path-34/module-5-deployment-monitoring");

module.exports = {
  course: {
    title: "Frontend Testing & Deployment",
    slug: "frontend-testing-deployment",
    description:
      "Master frontend testing with Vitest and Playwright. Learn debugging, accessibility, security, CI/CD, and how to deploy production-ready apps.",
    level: "advanced",
    estimatedHours: 35,
    icon: "testing",
    order: 34,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};