module.exports = {
  title: "Module 5: Deployment & Configuration",
  description: "Launching separated frontend and backend apps.",
  order: 5,
  lessons: [
    {
      title: "Deploying Frontend and Backend Separately",
      slug: "deploying-separately",
      order: 1,
      estimatedMinutes: 35,
      content: `# Deploying Frontend and Backend Separately

**Learning objectives:**
- Deploy React to Vercel/Netlify
- Deploy Express to Render
- Handle CORS in production

## The Architecture
- **Frontend**: Static files (hosted on Vercel, Netlify, or Render Static Sites).
- **Backend**: Node.js server (hosted on Render).
- **Database**: MongoDB Atlas.

## Steps
1. Deploy Backend first. Note the URL (e.g., \`https://my-api.onrender.com\`).
2. Deploy Frontend. In the Vercel/Netlify build settings, add an environment variable:
   \`VITE_API_URL=https://my-api.onrender.com\`
3. In your React code, use \`import.meta.env.VITE_API_URL\` instead of \`localhost:3000\`.
4. **Crucial**: Update your Express CORS settings to allow your new frontend domain.
   \`\`\`javascript
   app.use(cors({ origin: 'https://my-frontend.vercel.app', credentials: true }));
   \`\`\``
    },
    {
      title: "Configuring Frontend and Backend Environment Variables",
      slug: "environment-variables",
      order: 2,
      estimatedMinutes: 30,
      content: `# Configuring Frontend and Backend Environment Variables

**Learning objectives:**
- Set up production variables
- Understand security boundaries

## Backend Variables (Render)
Stored securely in the Render dashboard. Never exposed to the browser.
- \`MONGODB_URI\`
- \`SESSION_SECRET\`
- \`PORT\`

## Frontend Variables (Vercel/Netlify)
Stored in the hosting platform's dashboard. **Exposed to the public.**
- \`VITE_API_URL\`
- \`VITE_STRIPE_PUBLIC_KEY\`

## The Golden Rule
Never put backend secrets (like your MongoDB connection string or Stripe Secret Key) in the frontend environment variables. They will be visible in the compiled JavaScript bundle.

## CORS + Cookies
If you use cookies for authentication, remember:
1. Frontend fetch must have \`credentials: 'include'\`.
2. Backend CORS must have \`origin: 'https://your-frontend.com'\` (not \`*\`) and \`credentials: true\`.
3. Cookie must have \`sameSite: 'none'\` and \`secure: true\` in production across different domains.`
    }
  ]
};