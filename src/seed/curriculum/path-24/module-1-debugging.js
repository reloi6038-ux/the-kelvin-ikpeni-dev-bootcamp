module.exports = {
  title: "Module 1: Debugging & Inspection",
  description: "Mastering VS Code Debugger and the Node.js Inspector.",
  order: 1,
  lessons: [
    {
      title: "Debugging Node.js Applications in VS Code",
      slug: "vscode-debugging",
      order: 1,
      estimatedMinutes: 30,
      content: `# Debugging Node.js Applications in VS Code

**Learning objectives:**
- Stop relying on \`console.log()\`
- Set breakpoints and step through code
- Inspect variables and the call stack

## Why Use a Debugger?
\`console.log()\` is fine for quick checks, but it becomes messy. A debugger lets you pause the execution of your code, inspect every variable, and step through it line by line.

## Setting up VS Code
1. Open your project in VS Code.
2. Click the **Run and Debug** icon on the left sidebar (or press \`Ctrl+Shift+D\`).
3. Click **"create a launch.json file"**.
4. Select **Node.js**.

VS Code will generate a \`.vscode/launch.json\` file. It usually looks like this:

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "\${workspaceFolder}\\\\server.js"
    }
  ]
}
\`\`\`

## The Debugging Workflow
1. Open any of your JavaScript files (e.g., \`server.js\`).
2. Click in the **gutter** to the left of a line number. A **red dot** (breakpoint) appears.
3. Press **F5** (or click the green play button).
4. Make a request to your server.
5. VS Code will pause execution at the red dot.

## The Debug Toolbar
When paused, a toolbar appears at the top:
- **Continue (F5)**: Resume execution until the next breakpoint.
- **Step Over (F10)**: Run the current line, move to the next.
- **Step Into (F11)**: Go inside the function being called.
- **Step Out (Shift+F11)**: Finish the current function.

## Inspecting Variables
On the left side, the **Variables** panel shows all variables in scope. You can hover over any variable in the code editor to see its current value.

## Key Takeaways
- Breakpoints stop your code so you can inspect the state.
- Step Over runs a line; Step Into goes inside a function.
- Never guess—use the debugger to see exactly what's happening.`
    },
    {
      title: "Using the Node.js Inspector",
      slug: "node-inspector",
      order: 2,
      estimatedMinutes: 25,
      content: `# Using the Node.js Inspector

**Learning objectives:**
- Debug without VS Code
- Use \`node --inspect\`
- Debug a running server in the browser

## What is the Inspector?
The Node.js Inspector is a built-in debugging tool. It opens a WebSocket server that debugging clients (like Chrome DevTools) can connect to.

## How to Use It
Run your app with the \`--inspect\` flag:
\`\`\`bash
node --inspect server.js
\`\`\`

You will see:
\`\`\`
Debugger listening on ws://127.0.0.1:9229/xxxx-xxxx
\`\`\`

## Connecting via Chrome
1. Open Google Chrome.
2. Go to \`chrome://inspect\`.
3. Click **"Open dedicated DevTools for Node"**.
4. A full DevTools window opens, connected to your Node process.

## Using the DevTools
- Go to the **Sources** tab.
- Press **Ctrl+P** to find a file (e.g., \`server.js\`).
- Set a breakpoint by clicking a line number.
- Trigger the code by making a request.
- Use the DevTools console to type JavaScript live.

## The \`--inspect-brk\` Flag
If your app starts too fast, use \`--inspect-brk\` to pause on the very first line.

\`\`\`bash
node --inspect-brk server.js
\`\`\`

## Key Takeaways
- The Node Inspector lets you debug from Chrome.
- Use \`--inspect\` to attach.
- Use \`--inspect-brk\` to pause on the first line.`
    }
  ]
};