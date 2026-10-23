module.exports = {
  title: "Module 3: Testing & Deployment",
  description: "Securing, testing, and launching your API.",
  order: 3,
  lessons: [
    {
      title: "Writing Automated Tests",
      slug: "automated-tests",
      order: 24,
      estimatedMinutes: 30,
      content: `# Writing Automated Tests

**Learning objectives:**
- Test the API programmatically.

## Setup
\`\`\`bash
npm install --save-dev jest supertest
\`\`\`

## Create the test file
Create a folder \`tests\` and a file \`todo.test.js\`.

**tests/todo.test.js**
\`\`\`javascript
const request = require("supertest");
const app = require("../src/server");

describe("GET /api/tasks", () => {
  it("should return all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
\`\`\`

## Run the tests
Update \`package.json\` to add the test script:
\`\`\`json
"scripts": {
  "test": "jest"
}
\`\`\`
Run \`npm test\`.`
    },
    {
      title: "Preparing the Application for Production",
      slug: "production-prep",
      order: 25,
      estimatedMinutes: 15,
      content: `# Preparing the Application for Production

**Learning objectives:**
- Ensure the API is production-ready.

## Checklist
1. **Environment Variables**: Ensure \`.env\` is in \`.gitignore\`.
2. **Scripts**: Ensure \`package.json\` has \`"start": "node src/server.js"\`.
3. **Error Handling**: Ensure \`errorHandler\` hides stack traces in production.
4. **Health Check**: Add a \`/api/health\` endpoint to check the server status.
   \`\`\`javascript
   app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));
   \`\`\``
    },
    {
      title: "Uploading the Project to GitHub",
      slug: "github",
      order: 26,
      estimatedMinutes: 15,
      content: `# Uploading the Project to GitHub

**Learning objectives:**
- Version control your code.

## Steps
1. Create a new repository on GitHub (leave it empty).
2. In your terminal, run:
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Todo API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/todo-api.git
git push -u origin main
\`\`\`

**Verify**: Check that your code appears on GitHub and that \`.env\` is NOT there.`
    },
    {
      title: "Creating a MongoDB Atlas Database for Production",
      slug: "production-db",
      order: 27,
      estimatedMinutes: 15,
      content: `# Creating a MongoDB Atlas Database for Production

**Learning objectives:**
- Configure the database for cloud hosting.

## Steps
1. In MongoDB Atlas, go to **Network Access**.
2. Click **Add IP Address**.
3. Select **Allow Access from Anywhere** (\`0.0.0.0/0\`).
4. Click **Confirm**.

This is required because your hosting provider (Render) uses dynamic IP addresses that change frequently.`
    },
    {
      title: "Deploying the API to Render",
      slug: "deploy-render",
      order: 28,
      estimatedMinutes: 25,
      content: `# Deploying the API to Render

**Learning objectives:**
- Launch your API to the world.

## Steps
1. Go to render.com and sign up with GitHub.
2. Click **New +** → **Web Service**.
3. Connect your \`todo-api\` repository.
4. Configure:
   - **Name**: todo-api
   - **Runtime**: Node
   - **Build Command**: \`npm install\`
   - **Start Command**: \`npm start\`
   - **Instance Type**: Free
5. Click **Create Web Service**.
6. Render will build and deploy your app.`
    },
    {
      title: "Configuring Production Environment Variables",
      slug: "production-env",
      order: 29,
      estimatedMinutes: 15,
      content: `# Configuring Production Environment Variables

**Learning objectives:**
- Inject secrets into the production server.

## Steps
1. On your Render dashboard, go to your Web Service.
2. Click **Environment**.
3. Click **Add Environment Variable**.
4. Add:
   - \`MONGODB_URI\`: Your Atlas connection string.
   - \`NODE_ENV\`: \`production\`
5. Click **Save Changes**.
6. Render will automatically restart the server with the new variables.`
    },
    {
      title: "Testing the Deployed API",
      slug: "testing-deployed",
      order: 30,
      estimatedMinutes: 20,
      content: `# Testing the Deployed API

**Learning objectives:**
- Verify the live URL.

## Steps
1. Copy your Render URL (e.g., \`https://todo-api-xyz.onrender.com\`).
2. Open Postman.
3. Test your endpoints:
   - POST \`https://todo-api-xyz.onrender.com/api/tasks\`
   - GET \`https://todo-api-xyz.onrender.com/api/tasks\`

## Troubleshooting
- **App crashes**: Check the Render logs. Usually, it's a missing environment variable.
- **MongoDB connection failed**: Check if \`0.0.0.0/0\` is whitelisted in Atlas.`
    },
    {
      title: "Documenting the API",
      slug: "api-documentation",
      order: 31,
      estimatedMinutes: 20,
      content: `# Documenting the API

**Learning objectives:**
- Create a README for developers.

## README.md
\`\`\`markdown
# Todo API

## Endpoints
- \`GET /api/tasks\` — Get all tasks.
- \`GET /api/tasks/:id\` — Get a single task.
- \`POST /api/tasks\` — Create a task. (Body: \`{"title": "Task"}\`)
- \`PUT /api/tasks/:id\` — Update a task. (Body: \`{"completed": true}\`)
- \`DELETE /api/tasks/:id\` — Delete a task.

## Running Locally
1. \`npm install\`
2. Add \`.env\`
3. \`npm run dev\`
\`\`\``
    },
    {
      title: "Final Project Review and Extension Challenges",
      slug: "final-review",
      order: 32,
      estimatedMinutes: 30,
      content: `# Final Project Review and Extension Challenges

**Learning objectives:**
- Solidify your knowledge.
- Take the project further.

## Review
You have built a fully functional, secure, and deployed REST API.

## Extension Challenges
1. **User Authentication**: Add JWT auth so users can only see their own tasks.
2. **Due Dates**: Add a \`dueDate\` field to the schema.
3. **Priorities**: Add a priority field (\`low\`, \`medium\`, \`high\`).
4. **React Frontend**: Build a React app that consumes this API.

## Final Assessment
Submit your deployed URL and GitHub repository to complete the project.`
    }
  ]
};