// Path 31: Advanced Frontend Frameworks and Libraries
const module1 = require("./path-31/module-1-typescript-advanced-react");
const module2 = require("./path-31/module-2-nextjs-rendering");
const module3 = require("./path-31/module-3-state-management");
const module4 = require("./path-31/module-4-styling-options");
const module5 = require("./path-31/module-5-design-systems");

module.exports = {
  course: {
    title: "Advanced Frontend Frameworks & Libraries",
    slug: "advanced-frontend-frameworks",
    description:
      "Master the modern frontend ecosystem. Learn TypeScript, Next.js (SSR/SSG), Redux, Zustand, TanStack Query, Tailwind, and design systems.",
    level: "advanced",
    estimatedHours: 55,
    icon: "framework",
    order: 31,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};