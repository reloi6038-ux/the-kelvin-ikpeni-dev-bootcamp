// Path 21: Advanced API Development
const module1 = require("./path-21/module-1-design-validation");
const module2a = require("./path-21/module-2a-pagination");
const module2b = require("./path-21/module-2b-api-documentation");
const module2c = require("./path-21/module-2c-rate-limiting");
const module3 = require("./path-21/module-3-caching-external");
const module4 = require("./path-21/module-4-realtime-webhooks");
const module5 = require("./path-21/module-5-search-jobs");

module.exports = {
  course: {
    title: "Advanced API Development",
    slug: "advanced-api-development",
    description:
      "Take your API skills to the next level. Master versioning, validation, pagination, caching, Redis, emails, payments, webhooks, WebSockets, and GraphQL.",
    level: "advanced",
    estimatedHours: 45,
    icon: "api",
    order: 21,
    isPublished: true,
  },
  modules: [module1, module2a, module2b, module2c, module3, module4, module5],
};