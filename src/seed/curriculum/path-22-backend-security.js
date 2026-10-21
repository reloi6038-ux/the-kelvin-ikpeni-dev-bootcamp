// Path 22: Backend Security
const module1 = require("./path-22/module-1-vulnerabilities");
const module2 = require("./path-22/module-2-csrf-cors-headers");
const module3 = require("./path-22/module-3-auth-secrets");
const module4 = require("./path-22/module-4-uploads-bruteforce");
const module5 = require("./path-22/module-5-dependencies-owasp");

module.exports = {
  course: {
    title: "Backend Security",
    slug: "backend-security",
    description:
      "Protect your applications from vulnerabilities. Learn injection prevention, XSS, CSRF, CORS, password hashing, secrets management, and the OWASP API Top 10.",
    level: "advanced",
    estimatedHours: 30,
    icon: "security",
    order: 22,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};