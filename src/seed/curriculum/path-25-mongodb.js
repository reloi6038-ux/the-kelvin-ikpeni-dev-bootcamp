// Path 25: MongoDB & Database Management
const module1 = require("./path-25/module-1-database-basics");
const module2 = require("./path-25/module-2-connection-crud");
const module3 = require("./path-25/module-3-schemas-validation");
const module4 = require("./path-25/module-4-queries-relations");
const module5 = require("./path-25/module-5-transactions-backup");

module.exports = {
  course: {
    title: "MongoDB & Database Management",
    slug: "mongodb-database-management",
    description:
      "Master MongoDB. Learn to connect, design schemas, validate data, query efficiently, use aggregation, manage transactions, and optimize performance.",
    level: "intermediate",
    estimatedHours: 40,
    icon: "database",
    order: 25,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};