module.exports = {
  title: "Module 2: Pagination & Documentation (Part 2)",
  description: "API Documentation.",
  order: 3,
  lessons: [
    {
      title: "API Documentation with OpenAPI and Swagger",
      slug: "api-documentation",
      order: 1,
      estimatedMinutes: 40,
      content: `# API Documentation with OpenAPI and Swagger

**Learning objectives:**
- Understand what OpenAPI and Swagger are
- Generate interactive documentation
- Keep documentation up to date

## Why Document Your API?
If other developers can't figure out how to use your API, it's useless. Documentation is the contract between your server and the world.

## Swagger UI
Swagger provides a beautiful, interactive documentation page where users can see every endpoint and even make test requests directly from the browser.

## Setting Up \`swagger-ui-express\`
\`\`\`bash
npm install swagger-ui-express swagger-jsdoc
\`\`\`

## Configuration
\`\`\`javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kelvin Ikpeni Dev Bootcamp API',
      version: '1.0.0',
      description: 'API documentation for the platform.',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

## Documenting a Route
You write documentation comments above your routes.

\`\`\`javascript
/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     responses:
 *       200:
 *         description: A list of courses.
 */
app.get('/api/courses', (req, res) => {
  // ...
});
\`\`\`

## Viewing the Docs
Go to \`http://localhost:3000/api-docs\` in your browser. You will see a beautiful, interactive UI where you can test endpoints.

## Key Takeaways
- OpenAPI is the standard specification for REST APIs.
- Swagger UI turns that spec into interactive documentation.
- Keep your docs next to your code using JSDoc comments.`
    }
  ]
};