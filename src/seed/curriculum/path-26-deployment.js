// Path 26: Deployment & Production
const module1 = require("./path-26/module-1-prep-deploy");
const module2 = require("./path-26/module-2-env-domains");
const module3 = require("./path-26/module-3-logging-performance");
const module4 = require("./path-26/module-4-shutdown-cicd");
const module5 = require("./path-26/module-5-docker-cloud-maintenance");

module.exports = {
  course: {
    title: "Deployment & Production",
    slug: "deployment-production",
    description:
      "Take your app to the world. Learn to deploy to Render, manage environment variables, configure DNS, optimize performance, and set up CI/CD.",
    level: "intermediate",
    estimatedHours: 35,
    icon: "deploy",
    order: 26,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};