// Path 19: Express.js Mastery
const module1 = require("./path-19/module-1-fundamentals");
const module2 = require("./path-19/module-2-request-response");
const module3 = require("./path-19/module-3-middleware");
const module4 = require("./path-19/module-4-routing-mvc");
const module5 = require("./path-19/module-5-advanced-express");

module.exports = {
  course: {
    title: "Express.js Mastery",
    slug: "express-mastery",
    description:
      "Learn to build scalable web servers, RESTful APIs, and backend applications using the most popular Node.js framework.",
    level: "intermediate",
    estimatedHours: 35,
    icon: "express",
    order: 19,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};