module.exports = {
  title: "Module 3: File System & Environment",
  description: "Interacting with the OS and managing secrets.",
  order: 3,
  lessons: [
    {
      title: "Working with Paths (path)",
      slug: "working-with-paths",
      order: 1,
      estimatedMinutes: 25,
      content: `# Working with Paths (path)

**Learning objectives:**
- Build cross-platform file paths
- Understand \`__dirname\` and \`__filename\`
- Join and resolve paths

## The Problem
Windows uses \`\\\` for file paths. Mac/Linux uses \`/\`. If you hardcode paths like \`"src/models/User"\`, your app will break on Windows.

## The Solution: The \`path\` Module
\`\`\`javascript
const path = require('path');

// Joins paths using the correct separator for the OS
const filePath = path.join('src', 'models', 'User.js');
// Windows: src\\models\\User.js
// Mac/Linux: src/models/User.js
\`\`\`

## Global Variables
Node provides two global variables in every file:
- \`__dirname\`: The absolute path to the directory containing the current file.
- \`__filename\`: The absolute path to the current file itself.

\`\`\`javascript
console.log(__dirname); // C:\\dev\\my-project\\src
\`\`\`

## Resolving Absolute Paths
\`\`\`javascript
// Safely point to a file in the project root
const envPath = path.join(__dirname, '..', '.env');
\`\`\`

## Key Takeaways
- Never use string concatenation (\`"folder/" + "file"\`) for paths.
- Always use \`path.join()\`.
- \`__dirname\` is your anchor for finding files.`
    },
    {
      title: "Working with the File System (fs)",
      slug: "working-with-fs",
      order: 2,
      estimatedMinutes: 30,
      content: `# Working with the File System (fs)

**Learning objectives:**
- Read and write files asynchronously
- Understand the difference between sync and async \`fs\` methods
- Use Promises for file operations

## The \`fs\` Module
The \`fs\` module allows you to interact with the hard drive. You can read files, write files, create directories, and delete them.

## Async vs Sync
\`fs\` has two versions of every method:
- **Sync**: \`fs.readFileSync()\` blocks the entire server until the file is read. **Never use this in a web server.**
- **Async**: \`fs.readFile()\` runs in the background and calls a callback when done.

## Using Promises (Modern Way)
Node includes \`fs.promises\` for cleaner async/await syntax.

\`\`\`javascript
const fs = require('fs').promises;

async function readMyFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error("File not found", err);
  }
}
readMyFile();
\`\`\`

## Writing Files
\`\`\`javascript
await fs.writeFile('output.txt', 'Hello, world!');
\`\`\`
If the file doesn't exist, \`writeFile\` creates it. If it does exist, it overwrites it.

## Key Takeaways
- Use \`fs.promises\` for clean async file handling.
- Never use Sync methods in a web server (it will freeze the server).
- \`readFile\` and \`writeFile\` are your most common tools.`
    },
    {
      title: "Reading and Writing Files",
      slug: "reading-writing-files",
      order: 3,
      estimatedMinutes: 25,
      content: `# Reading and Writing Files

**Learning objectives:**
- Append data to files
- Delete files
- Check if files exist

## Appending to a File
If you want to add to a file without overwriting it:
\`\`\`javascript
const fs = require('fs').promises;

await fs.appendFile('log.txt', 'User logged in.\\n');
\`\`\`

## Deleting a File
\`\`\`javascript
await fs.unlink('old-data.txt');
\`\`\`
This permanently deletes the file. Be careful!

## Checking if a File Exists
\`\`\`javascript
const fs = require('fs');

if (fs.existsSync('config.json')) {
  console.log("Config exists!");
} else {
  console.log("No config found.");
}
\`\`\`

## Creating Directories
\`\`\`javascript
await fs.mkdir('uploads/avatars', { recursive: true });
\`\`
The \`{ recursive: true }\` flag ensures the parent folders are created if they don't exist.

## Real-World Use Case
The \`fs\` module is often used for:
- Writing application logs to a file.
- Reading configuration files.
- Handling file uploads from users.

## Key Takeaways
- \`fs.promises\` provides \`appendFile\`, \`unlink\`, \`mkdir\`.
- File operations can fail (permissions, missing files). Always wrap them in \`try/catch\`.`
    },
    {
      title: "Environment Variables and .env Files",
      slug: "environment-variables",
      order: 4,
      estimatedMinutes: 35,
      content: `# Environment Variables and .env Files

**Learning objectives:**
- Understand what environment variables are
- Use the \`dotenv\` package
- Keep secrets out of GitHub

## The Problem
Your app needs secrets: database passwords, API keys, session secrets. If you hardcode them in \`app.js\`, and push to GitHub, your database will be hacked within minutes.

## Environment Variables
These are variables that live on the host machine, outside your code.

\`\`\`javascript
// Reading an environment variable in Node
const port = process.env.PORT;
const dbPassword = process.env.DB_PASSWORD;
\`\`\`

## The \`dotenv\` Package
For local development, we store these in a \`.env\` file.

1. Install:
\`\`\`bash
npm install dotenv
\`\`\`

2. Create a \`.env\` file in your root folder:
\`\`\`env
PORT=3000
MONGODB_URI=mongodb+srv://admin:password@cluster0...
SESSION_SECRET=super-secret-key
\`\`\`

3. Load them at the top of your app:
\`\`\`javascript
require('dotenv').config();
\`\`\`

Now, \`process.env.PORT\` will be "3000", and \`process.env.MONGODB_URI\` will be your connection string.

## Security: Never Commit .env
Add \`.env\` to your \`.gitignore\` file.
\`\`\`
node_modules/
.env
\`\`\`

If you commit your \`.env\` file, anyone on the internet can access your database.

## Key Takeaways
- Never hardcode secrets in your code.
- Use \`.env\` locally and \`process.env\` in production.
- \`.env\` must always be in \`.gitignore\`.`
    }
  ]
};