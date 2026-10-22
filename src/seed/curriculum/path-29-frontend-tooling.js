// Path 29: Frontend Tooling with Node.js and npm
const module1 = require("./path-29/module-1-nodejs-npm");
const module2 = require("./path-29/module-2-vite");
const module3 = require("./path-29/module-3-dependencies-env");
const module4 = require("./path-29/module-4-eslint-prettier-git");

module.exports = {
  course: {
    title: "Frontend Tooling with Node.js & npm",
    slug: "frontend-tooling",
    description:
      "Master the modern frontend workflow. Learn Node.js, npm, package.json, Vite, ESLint, Prettier, and how to structure a professional frontend project.",
    level: "intermediate",
    estimatedHours: 25,
    icon: "tools",
    order: 29,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4],
};