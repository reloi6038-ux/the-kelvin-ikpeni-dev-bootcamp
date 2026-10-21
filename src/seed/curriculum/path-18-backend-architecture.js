// Path 18: Professional Backend Architecture
const module1 = require("./path-18/module-1-mvc-solid");
const module2 = require("./path-18/module-2-clean-architecture");
const module3 = require("./path-18/module-3-scalability");
const module4 = require("./path-18/module-4-event-driven");
const module5 = require("./path-18/module-5-advanced-patterns");

module.exports = {
  course: {
    title: "Professional Backend Architecture",
    slug: "professional-backend-architecture",
    description:
      "Master the patterns and principles used by senior backend engineers: MVC, SOLID, Clean Architecture, TypeScript, caching, queues, microservices, GraphQL, and system design.",
    level: "advanced",
    estimatedHours: 40,
    icon: "architecture",
    order: 18,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};