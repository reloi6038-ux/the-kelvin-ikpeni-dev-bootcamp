module.exports = {
  title: "Module 3: RBAC & Email Verification",
  description: "User roles, permissions, and verifying identities.",
  order: 3,
  lessons: [
    {
      title: "Role-Based Access Control (RBAC)",
      slug: "rbac",
      order: 1,
      estimatedMinutes: 30,
      content: `# Role-Based Access Control (RBAC)

**Learning objectives:**
- Understand roles and permissions
- Implement middleware for RBAC
- Secure admin routes

## What is RBAC?
RBAC restricts system access based on the roles of individual users within your organization. Common roles:
- **User**: Can view and edit their own data.
- **Moderator**: Can edit others' content.
- **Admin**: Can manage everything.

## Storing Roles
In your User schema, add a \`role\` field:
\`\`\`javascript
role: {
  type: String,
  enum: ['user', 'moderator', 'admin'],
  default: 'user'
}
\`\`\`

## Middleware
Create a middleware to check the role:
\`\`\`javascript
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
\`\`\`

## Applying RBAC
\`\`\`javascript
// Only admins can delete users
app.delete('/api/users/:id', requireAuth, requireAdmin, deleteUser);
\`\`\`

## Never Trust the Client
An attacker can try to change their role by sending a modified token. Always verify the role on the server using data from the database or a signed token.

## Key Takeaways
- Roles define what a user can do.
- Store roles in the database, not in the client.
- Use middleware to enforce roles on protected routes.`
    },
    {
      title: "Admin and User Dashboards",
      slug: "dashboards",
      order: 2,
      estimatedMinutes: 25,
      content: `# Admin and User Dashboards

**Learning objectives:**
- Serve different interfaces based on roles
- Protect API endpoints for dashboards
- Design clean API endpoints

## Serving Different UIs
When a user logs in, check their role. If they are an admin, send them to \`/admin\`. If they are a user, send them to \`/dashboard\`.

## API Endpoints
Don't create separate APIs for admins and users; use role checking.

\`\`\`javascript
// Users see their own data
app.get('/api/me', requireAuth, (req, res) => {
  res.json(req.user);
});

// Admins see all users
app.get('/api/users', requireAuth, requireAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});
\`\`\`

## Design Principle
Keep your endpoints clean. The API should be a reflection of your data model, with authorization checks layered on top.

## Key Takeaways
- Check roles on the backend for every admin request.
- Keep endpoints DRY (Don't Repeat Yourself).
- Serve the dashboard UI based on role.`
    },
    {
      title: "Email Verification",
      slug: "email-verification",
      order: 3,
      estimatedMinutes: 35,
      content: `# Email Verification

**Learning objectives:**
- Understand why email verification is important
- Generate and send verification tokens
- Verify the user via a link

## Why Verify Emails?
- Prevents spam/bot accounts.
- Ensures the user actually owns the email.
- Allows for password recovery.

## The Flow
1. User registers.
2. Server generates a unique token (or a JWT) for verification.
3. Server saves the token to the user's record.
4. Server sends an email with a link containing the token.
5. User clicks the link.
6. Server verifies the token and marks the user as verified.

## Generating the Token
\`\`\`javascript
const crypto = require('crypto');

const verificationToken = crypto.randomBytes(32).toString('hex');
await User.updateOne({ _id: user._id }, { verificationToken });
\`\`\`

## Sending the Email
Use Nodemailer and an email service (like SendGrid).
\`\`\`javascript
const link = \`https://myapp.com/verify?token=\${verificationToken}\`;
await sendEmail(user.email, 'Verify your account', \`Click here: \${link}\`);
\`\`\`

## The Verification Route
\`\`\`javascript
app.get('/api/verify', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });
  
  if (!user) return res.status(400).send("Invalid token");
  
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  
  res.send("Email verified!");
});
\`\`\`

## Key Takeaways
- Verification tokens should be random and long.
- Tokens should expire (e.g., in 24 hours).
- Never store tokens in plain sight; hash them if possible.`
    }
  ]
};