// Path 1: Computer & Internet Fundamentals
module.exports = {
  course: {
    title: "Computer & Internet Fundamentals",
    slug: "computer-fundamentals",
    description:
      "Understand how computers, browsers, servers, HTTP, DNS, and databases work together before writing your first line of code.",
    level: "beginner",
    estimatedHours: 6,
    icon: "fundamentals",
    order: 1,
    isPublished: true,
  },
  modules: [
    {
      title: "How the Web Works",
      description: "Clients, servers, HTTP, and the request-response cycle.",
      order: 1,
      lessons: [
        {
          title: "What Is a Client and a Server?",
          slug: "clients-and-servers",
          order: 1,
          estimatedMinutes: 20,
          content: `# Clients and Servers

Every interaction on the web is a conversation between two programs: a **client** and a **server**.

## The Client
A client is any device or program that requests information. Your web browser (Chrome, Firefox, Safari) is the most common client. When you type a URL and press Enter, your browser acts as the client. It sends a request asking for a specific webpage.

## The Server
A server is a computer that stores files, data, and application logic. Its job is to listen for requests from clients, process them, and send back a response. Servers run 24/7 and are usually located in data centers.

## The Request-Response Cycle
1. You type \`https://example.com\` into your browser.
2. Your browser (the client) uses DNS to find the server's IP address.
3. It sends an HTTP request to that server.
4. The server processes the request (e.g., reads a file or queries a database).
5. The server sends back an HTTP response.
6. Your browser receives the response and renders the HTML into a visible webpage.

## Real-World Analogy
Think of a restaurant. You (the client) sit at a table and look at a menu. You tell the waiter what you want. The waiter takes your order to the kitchen (the server). The kitchen prepares the food and gives it to the waiter, who brings it back to you. In this analogy, the waiter is the internet (transporting data), and the kitchen is the web server.`,
        },
        {
          title: "HTTP, HTTPS & DNS",
          slug: "http-https-dns",
          order: 2,
          estimatedMinutes: 25,
          content: `# HTTP, HTTPS & DNS

## HTTP (HyperText Transfer Protocol)
HTTP is the protocol (set of rules) that defines how clients and servers communicate. It relies on a **request-response model**.

### HTTP Methods
- **GET**: Retrieve data (e.g., loading a webpage or fetching a list of courses).
- **POST**: Send data to the server (e.g., submitting a form or enrolling in a course).
- **PUT / PATCH**: Update existing data.
- **DELETE**: Remove data.

### HTTP Status Codes
Status codes are 3-digit numbers the server sends back to tell the client what happened.
- **200 OK**: The request succeeded.
- **201 Created**: A new resource was created (e.g., a new account).
- **400 Bad Request**: The client sent invalid data.
- **401 Unauthorized**: The client needs to log in.
- **404 Not Found**: The requested resource doesn't exist.
- **500 Server Error**: The server crashed.

## HTTPS (HTTP Secure)
HTTPS is HTTP with **encryption (TLS/SSL)**. When you use HTTPS, the data sent between your browser and the server is scrambled. This prevents hackers from reading sensitive information like passwords, credit card numbers, or personal messages. **Always use HTTPS in production.**

## DNS (Domain Name System)
Computers communicate using IP addresses (e.g., \`93.184.216.34\`). Humans are bad at remembering numbers. DNS translates human-readable domain names (\`example.com\`) into IP addresses. It's the internet's phone book.`,
        },
      ],
    },
    {
      title: "Files, Terminals & Editors",
      description: "The fundamental tools every developer uses daily.",
      order: 2,
      lessons: [
        {
          title: "Understanding the Terminal",
          slug: "understanding-terminal",
          order: 1,
          estimatedMinutes: 20,
          content: `# Understanding the Terminal

The terminal (or command line) is a text-based interface to your computer. Instead of clicking icons, you type commands. Professionals use it because it's faster, scriptable, and often the only way to do certain tasks.

## Essential Commands
### Navigation
- \`pwd\` (Print Working Directory): Shows exactly which folder you are currently inside.
- \`ls\` (List): Shows all files and folders in your current location.
- \`cd folderName\` (Change Directory): Moves you into a folder.
- \`cd ..\`: Moves you up one folder.

### File Management
- \`mkdir folderName\`: Creates a new folder (Make Directory).
- \`touch fileName.txt\`: Creates an empty file.
- \`rm fileName.txt\`: Deletes a file.

## Why It Matters
Every time you run \`npm run dev\`, you are using the terminal to start a Node.js server. Every time you push code to GitHub, you use \`git push\`. The terminal is the control center for modern development.`,
        },
        {
          title: "Your First Code Editor (VS Code)",
          slug: "first-code-editor",
          order: 2,
          estimatedMinutes: 15,
          content: `# Your First Code Editor (VS Code)

While you *can* write code in Notepad, professional developers use an IDE (Integrated Development Environment) or a code editor. Visual Studio Code (VS Code) is the industry standard.

## Why VS Code?
- **Syntax Highlighting**: It colors your code to make it easier to read (e.g., HTML tags are blue, strings are orange).
- **IntelliSense**: It auto-completes code and shows errors before you run it.
- **Extensions**: It has a massive ecosystem of plugins (Prettier for formatting, ESLint for catching bugs).
- **Integrated Terminal**: You can run your code without leaving the editor.

## Essential Extensions
1. **Prettier**: Automatically formats your code when you save.
2. **ESLint**: Warns you about unused variables or syntax errors.
3. **Live Server**: Preview HTML files instantly as you type.`,
        },
      ],
    },
  ],
};