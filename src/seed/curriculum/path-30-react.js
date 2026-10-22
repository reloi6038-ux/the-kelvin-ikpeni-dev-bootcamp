// Path 30: React.js Development
const module1 = require("./path-30/module-1-react-basics");
const module2 = require("./path-30/module-2-props-state");
const module3 = require("./path-30/module-3-hooks-data");
const module4 = require("./path-30/module-4-routing-context");
const module5 = require("./path-30/module-5-performance-deployment");

module.exports = {
  course: {
    title: "React.js Development",
    slug: "reactjs-development",
    description:
      "Master React. Learn JSX, components, state, hooks, routing, context, performance optimization, and how to deploy professional React applications.",
    level: "intermediate",
    estimatedHours: 50,
    icon: "react",
    order: 30,
    isPublished: true,
  },
  modules: [module1, module2, module3, module4, module5],
};