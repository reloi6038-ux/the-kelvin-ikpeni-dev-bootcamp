// Path 1: Computer & Internet Fundamentals
module.exports = {
  course: {
    title: "Computer & Internet Fundamentals",
    slug: "computer-fundamentals",
    description:
      "Build a solid mental model of how computers, browsers, servers, HTTP, DNS, and databases work together — the foundation of every line of code you'll ever write.",
    level: "beginner",
    estimatedHours: 8,
    icon: "fundamentals",
    order: 1,
    isPublished: true,
  },
  modules: [
    {
      title: "How the Web Works",
      description: "The client-server model, HTTP, DNS, and the request-response cycle.",
      order: 1,
      lessons: [
        {
          title: "Clients and Servers",
          slug: "clients-and-servers",
          order: 1,
          estimatedMinutes: 25,
          content: `# Clients and Servers

**Learning objectives:**
- Define what a client is and what a server is
- Explain the request-response cycle
- Trace what happens when you type a URL into your browser

## The Restaurant Analogy
Imagine a restaurant. You sit at a table and read the menu. You tell the waiter what you want. The waiter takes your order to the kitchen. The kitchen prepares the food, and the waiter brings it back to you.

- **You** = the client
- **Waiter** = the internet (data transport)
- **Kitchen** = the server

Every website interaction follows this pattern.

## The Client
A **client** is any program that requests information. Your browser (Chrome, Firefox, Safari) is the most common client. When you load a page, your browser sends a request to a remote computer asking for files, data, or computation.

## The Server
A **server** is a computer program that waits for requests and responds to them. Servers run 24/7 in data centers. They store HTML files, images, databases, and application logic.

## The Request-Response Cycle
1. You type \`https://example.com\` into your browser
2. Your browser asks DNS: *"What is the IP address for example.com?"*
3. DNS replies with something like \`93.184.216.34\`
4. Your browser sends an **HTTP request** to that IP
5. The server processes the request
6. The server sends back an **HTTP response** (usually HTML)
7. Your browser parses the HTML, loads images/CSS/JS, and renders the page

## Why This Matters
Every backend feature you'll build — authentication, enrollment, quizzes — is fundamentally a **client asking a server to do something** and **the server responding**. When you later build an API endpoint like \`POST /api/enrollments\`, you are writing the server-side of this exact cycle.

## Key Takeaways
- Every web interaction has two sides: client and server
- HTTP is the language they speak
- Your code will be both — the client (frontend) and the server (backend)`,
        },
        {
          title: "HTTP, HTTPS, and DNS",
          slug: "http-https-dns",
          order: 2,
          estimatedMinutes: 30,
          content: `# HTTP, HTTPS, and DNS

**Learning objectives:**
- Understand HTTP methods and status codes
- Explain why HTTPS is required in production
- Describe what DNS does

## HTTP: The Protocol of the Web
HTTP (HyperText Transfer Protocol) defines how clients and servers exchange data. Every request has a **method** and a **path**, and every response has a **status code** and a **body**.

### Methods
| Method | Purpose | Example |
|--------|---------|---------|
| GET | Fetch data | \`GET /api/courses\` |
| POST | Create data | \`POST /api/auth/register\` |
| PUT / PATCH | Update data | \`PATCH /api/courses/:id\` |
| DELETE | Remove data | \`DELETE /api/enrollments/:id\` |

### Status Codes
| Range | Meaning |
|-------|---------|
| 2xx | Success (200 OK, 201 Created) |
| 3xx | Redirect (301 Moved, 304 Not Modified) |
| 4xx | Client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found) |
| 5xx | Server error (500 Internal Server Error) |

**Pro tip:** When you build APIs, the status code is as important as the response body. Clients (and monitoring tools) rely on it.

## HTTPS: HTTP + Encryption
HTTP sends data in **plain text**. Anyone on the same Wi-Fi (a coffee shop, hotel, airport) could read your passwords.

HTTPS wraps HTTP inside **TLS encryption**. Data is scrambled in transit so attackers can't read it. Every modern site must use HTTPS. Render enables HTTPS automatically.

## DNS: The Internet's Phone Book
Computers speak in IP addresses like \`93.184.216.34\`. Humans prefer names like \`example.com\`. **DNS** translates one to the other.

1. Your browser asks DNS: *"What's the IP for example.com?"*
2. DNS responds: *"93.184.216.34"*
3. Your browser connects to that IP.

## Key Takeaways
- HTTP has methods (verbs) and status codes (results)
- HTTPS encrypts HTTP
- DNS translates domain names into IP addresses
- Every professional app: HTTPS, correct status codes, clear URLs`,
        },
        {
          title: "Putting It All Together",
          slug: "putting-it-together",
          order: 3,
          estimatedMinutes: 20,
          content: `# Putting It All Together

**Learning objectives:**
- Trace a full request from browser to database and back
- Identify where each layer of the stack fits

## A Full Round Trip
Let's trace what happens when a user clicks **"Enroll Now"** on a course.

### Step 1: The Browser
\`\`\`javascript
fetch("/api/enrollments", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-CSRF-Token": token },
  body: JSON.stringify({ slug: "html5" })
});
\`\`\`
Your browser:
1. Reads the URL: \`https://yourapp.com/api/enrollments\`
2. DNS resolves \`yourapp.com\` → an IP address
3. Opens an HTTPS connection (TLS handshake)
4. Sends the POST request with a JSON body

### Step 2: The Server (Express)
The request arrives at Render, which forwards it to your Node.js process. Express middleware runs in order:
1. **Helmet** — sets security headers
2. **Morgan** — logs the request
3. **express.json()** — parses the JSON body into \`req.body\`
4. **express-session** — reads the session cookie, finds the user
5. **Rate limiter** — checks request counts
6. **CSRF** — verifies the token
7. **Route handler** — calls the enrollment controller

### Step 3: The Controller
\`\`\`javascript
router.post("/", requireAuth, async (req, res) => {
  const course = await Course.findOne({ slug: req.body.slug });
  const enrollment = await Enrollment.create({
    studentId: req.user._id,
    courseId: course._id,
  });
  res.status(201).json({ success: true, enrollment });
});
\`\`\`

### Step 4: MongoDB
Mongoose translates this into a MongoDB insert. MongoDB stores the document, generates an \`_id\`, and returns.

### Step 5: The Response Travels Back
Express sends \`{ success: true, enrollment: { ... } }\` with status **201**. Your browser receives it and redirects to \`/dashboard.html\`.

## The Layers of a Full-Stack App
| Layer | Responsibility | Our Technology |
|-------|---------------|----------------|
| Client | Render UI, send requests | HTML, CSS, JS |
| Transport | Move data safely | HTTPS |
| Routing | Map URLs to handlers | Express |
| Auth | Who is this user? | express-session |
| Logic | Business rules | Controllers |
| Data | Persist information | MongoDB + Mongoose |

## Key Takeaways
- A single user click passes through 5+ layers
- Every layer has one clear job
- When something breaks, trace the request layer by layer`,
        },
      ],
    },
  ],
};