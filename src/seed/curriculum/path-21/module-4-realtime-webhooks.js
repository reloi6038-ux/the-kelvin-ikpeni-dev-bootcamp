module.exports = {
  title: "Module 4: Real-Time & Webhooks",
  description: "Live data, sockets, and event-driven backends.",
  order: 4,
  lessons: [
    {
      title: "Webhooks and Event Handling",
      slug: "webhooks",
      order: 1,
      estimatedMinutes: 30,
      content: `# Webhooks and Event Handling

**Learning objectives:**
- Understand what webhooks are
- Differentiate webhooks from APIs
- Secure your webhook endpoints

## What is a Webhook?
A webhook is a "reverse API." Instead of your server asking "Did the payment succeed?", the payment provider sends a POST request to your server saying "The payment succeeded!"

## Webhooks vs APIs
| Feature | API (Polling) | Webhook |
|---------|---------------|---------|
| Direction | You ask them | They tell you |
| Timing | Real-time-ish | Instant |
| Overhead | High (constant polling) | Low (only when event happens) |

## Receiving a Webhook
You create a normal POST route.

\`\`\`javascript
app.post('/api/webhooks/payment', (req, res) => {
  const event = req.body;
  
  console.log("Received event:", event.type);
  
  if (event.type === 'payment.succeeded') {
    // Update the order in the database
  }

  // Always respond with 200 OK, or the sender will retry
  res.status(200).send('Webhook received');
});
\`\`\`

## Security
Anyone can POST to your webhook. How do you know it's really from Stripe or GitHub?

### 1. Verify Signatures
Providers sign webhooks with a secret key.
- **Stripe**: Uses \`stripe-signature\` header.
- **GitHub**: Uses \`x-hub-signature-256\` header.

### 2. Verify Source IP
Some providers publish their IP ranges. You can check \`req.ip\`.

## Key Takeaways
- Webhooks are the standard for async event notifications.
- Always verify signatures to prevent fake webhooks.
- Respond with 200 quickly; process the event asynchronously.`
    },
    {
      title: "Real-Time Applications with WebSockets",
      slug: "websockets",
      order: 2,
      estimatedMinutes: 40,
      content: `# Real-Time Applications with WebSockets

**Learning objectives:**
- Understand what WebSockets are
- Set up a WebSocket server
- Send and receive messages in real time

## What is a WebSocket?
HTTP is a request-response protocol. The client asks, the server answers, then the connection closes.

A **WebSocket** is a persistent, two-way connection. The client and server can send messages to each other at any time without the client requesting it.

**Use cases:**
- Live chat
- Real-time notifications
- Multiplayer games
- Live collaborative documents

## Setting Up with Socket.io
\`\`\`bash
npm install socket.io
\`\`\`

\`\`\`javascript
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

server.listen(3000);

// Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for a custom event
  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    
    // Broadcast to everyone (including sender)
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
\`\`\`

## Client-Side Code
\`\`\`html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  
  // Send a message
  socket.emit('chat message', 'Hello, world!');
  
  // Receive a message
  socket.on('chat message', (msg) => {
    console.log('Received:', msg);
  });
</script>
\`\`\`

## Key Takeaways
- WebSockets keep the connection open for real-time data.
- Socket.io handles reconnection and fallbacks automatically.
- Use rooms (\`socket.join('room1')\`) to send messages to specific groups.`
    },
    {
      title: "Building APIs for Mobile Applications",
      slug: "mobile-apis",
      order: 3,
      estimatedMinutes: 30,
      content: `# Building APIs for Mobile Applications

**Learning objectives:**
- Adapt your API for mobile constraints
- Implement token-based authentication (JWT)
- Handle offline scenarios

## Mobile Constraints
Mobile devices have less bandwidth, less battery, and less stable internet than laptops. Your API must be optimized for this.

## 1. Token-Based Auth (JWT)
Mobile apps can't easily use cookies. Instead, use **JSON Web Tokens (JWT)**.

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Login
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });

// Middleware to verify
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "No token" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
\`\`\`

## 2. Reduce Payload Size
- Use field selection: \`?fields=id,name,price\`
- Use compression (\`compression\` middleware)
- Return only what the mobile screen needs

## 3. Handle Offline
Mobile apps may lose signal. Return a \`304 Not Modified\` if nothing has changed, so the app can use its cached data.

## 4. Optimize Images
Serve properly sized images for mobile screens (don't send a 4MB image for a 100px icon).

## Key Takeaways
- Use JWT for mobile authentication.
- Reduce payload size and network calls.
- Design for intermittent connectivity.`
    }
  ]
};