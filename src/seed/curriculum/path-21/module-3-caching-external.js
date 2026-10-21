module.exports = {
  title: "Module 3: Caching & Third-Party APIs",
  description: "Speed up your API and integrate external services.",
  order: 3,
  lessons: [
    {
      title: "API Caching with Redis",
      slug: "api-caching-redis",
      order: 1,
      estimatedMinutes: 35,
      content: `# API Caching with Redis

**Learning objectives:**
- Understand why caching matters
- Set up Redis
- Implement the cache-aside pattern

## Why Cache?
Database queries can take 50–500ms. A Redis cache can serve the same data in under 1ms. Caching is the single biggest performance win in backend development.

## Setting Up Redis
For local development, you can run Redis via Docker or use a cloud provider (like Redis Labs or Upstash).

\`\`\`bash
npm install redis
\`\`\`

\`\`\`javascript
const { createClient } = require('redis');

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();
\`\`\`

## The Cache-Aside Pattern
1. Check the cache.
2. If it's there (cache hit), return it.
3. If not (cache miss), query the database.
4. Save the result in the cache.
5. Return the result.

\`\`\`javascript
app.get('/api/courses', async (req, res) => {
  const cacheKey = 'courses:all';
  
  // 1. Check cache
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return res.json({ source: 'cache', data: JSON.parse(cachedData) });
  }

  // 2. Query DB
  const courses = await Course.find().lean();

  // 3. Save to cache (expire in 1 hour)
  await redis.setEx(cacheKey, 3600, JSON.stringify(courses));

  res.json({ source: 'database', data: courses });
});
\`\`\`

## Invalidation
When you update data, you must delete the cache so users don't see stale data.

\`\`\`javascript
app.post('/api/courses', async (req, res) => {
  const course = await Course.create(req.body);
  
  // Invalidate the cache
  await redis.del('courses:all');
  
  res.status(201).json(course);
});
\`\`\`

## Key Takeaways
- Cache reads, not writes.
- Always set a Time-To-Live (TTL) so the cache self-heals.
- Invalidate the cache when data changes.`
    },
    {
      title: "Sending Emails from Node.js",
      slug: "sending-emails",
      order: 2,
      estimatedMinutes: 30,
      content: `# Sending Emails from Node.js

**Learning objectives:**
- Send transactional emails
- Use Nodemailer
- Configure with an SMTP provider (like SendGrid or Mailgun)

## Why Send Emails?
Welcome emails, password resets, and order confirmations are essential for any real application.

## Nodemailer
Nodemailer is the standard library for sending emails in Node.js.

\`\`\`bash
npm install nodemailer
\`\`\`

## Setup with SendGrid (or Mailgun)
You need an SMTP host, port, user, and password.

\`\`\`javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', // SendGrid uses "apikey" as the username
    pass: process.env.SENDGRID_API_KEY
  }
});
\`\`\`

## Sending an Email
\`\`\`javascript
async function sendWelcomeEmail(to, name) {
  const info = await transporter.sendMail({
    from: '"Kelvin Ikpeni Dev Bootcamp" <no-reply@kelvinbootcamp.com>',
    to: to,
    subject: 'Welcome to the Bootcamp!',
    text: \`Hello \${name}, welcome!\`,
    html: \`<b>Hello \${name}</b>, welcome!\`
  });

  console.log('Message sent: %s', info.messageId);
}
\`\`\`

## Development: Ethereal
Don't want to send real emails while testing? Use **Ethereal Email**.

\`\`\`javascript
const testAccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass
  }
});
\`\`\`

When you send an email, Nodemailer gives you a URL to preview it in the browser.

## Key Takeaways
- Nodemailer + an SMTP provider (SendGrid, Mailgun) is the standard.
- Store API keys in \`.env\`, never in code.
- Use Ethereal for local testing so you don't spam real users.`
    },
    {
      title: "Payment Gateway Integration",
      slug: "payment-gateway",
      order: 3,
      estimatedMinutes: 45,
      content: `# Payment Gateway Integration

**Learning objectives:**
- Understand how Stripe works
- Create a payment intent
- Handle webhooks for payment confirmation

## Never Handle Raw Credit Cards
If you handle raw card numbers, you must be PCI compliant (which is extremely strict). Instead, use a gateway like **Stripe** or **Paystack**.

## The Stripe Flow
1. The frontend collects card details and sends them directly to Stripe (never to your server).
2. Stripe returns a token.
3. The frontend sends the token to your server.
4. Your server creates a charge via the Stripe API.

## Setup
\`\`\`bash
npm install stripe
\`\`\`

\`\`\`javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
\`\`\`

## Creating a Payment Intent
\`\`\`javascript
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents ($50.00)
      currency: 'usd',
      metadata: { orderId: '12345' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
\`\`\`

## Handling Webhooks
The client might close the browser before the payment finishes. Webhooks are how Stripe tells your server "The payment succeeded."

\`\`\`javascript
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // Fulfill the order
    console.log("Payment succeeded for", paymentIntent.id);
  }

  res.json({ received: true });
});
\`\`\`

## Key Takeaways
- Never touch raw credit card numbers.
- Use client-side tokenization.
- Webhooks are the source of truth for payment status.`
    }
  ]
};