// Path 23: Authentication & Authorization
const module1 = require("./path-23/module-1-auth-basics");
const module2 = require("./path-23/module-2-sessions-jwt");
const module3 = require("./path-23/module-3-rbac-emails");
const module4 = require("./path-23/module-4-reset-2fa-oauth");
const module5 = require("./path-23/module-5-sessions-bestpractices");

module.exports = {
  course: {
    title: "Authentication & Authorization",
    slug: "authentication-authorization",
    description:
      "Master login systems, bcrypt hashing, sessions, JWTs, OAuth, 2FA, and RBAC. Learn how to build secure auth flows and protect private routes.",
    level: "intermediate",
    estimatedHours: 35,
    icon: "auth",
    order: 23,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};