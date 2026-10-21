module.exports = {
  title: "Module 4: Password Reset, 2FA & OAuth",
  description: "Account recovery and third-party authentication.",
  order: 4,
  lessons: [
    {
      title: "Password Reset and Recovery",
      slug: "password-reset",
      order: 1,
      estimatedMinutes: 30,
      content: `# Password Reset and Recovery

**Learning objectives:**
- Implement a secure password reset flow
- Generate password reset tokens
- Avoid account enumeration

## The Flow
1. User clicks "Forgot Password."
2. User enters their email.
3. Server generates a token, saves it with an expiry (e.g., 1 hour).
4. Server sends an email with a reset link.
5. User clicks link, enters new password.
6. Server verifies token, updates the password, and deletes the token.

## Security Rules
- **Always return a generic message**: "If that email is in our system, a reset link has been sent." This prevents attackers from discovering valid emails.
- **Short expiry**: The reset token should expire in 15-60 minutes.
- **Single use**: The token must be deleted after use.

## Implementation
\`\`\`javascript
app.post('/api/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
    
    const link = \`https://myapp.com/reset?token=\${token}\`;
    await sendEmail(user.email, 'Password Reset', link);
  }
  
  // Always return the same message
  res.json({ message: "If that email exists, a reset link was sent." });
});
\`\`\`

## Key Takeaways
- Never reveal if an email exists in the database.
- Always use short-lived, single-use tokens.
- Send the token via email, not SMS (unless you have SMS verification setup).`
    },
    {
      title: "Two-Factor Authentication",
      slug: "two-factor-auth",
      order: 2,
      estimatedMinutes: 35,
      content: `# Two-Factor Authentication (2FA)

**Learning objectives:**
- Understand the three factors of authentication
- Implement TOTP-based 2FA
- Use \`speakeasy\` and \`qrcode\`

## The Three Factors
1. Something you **know** (password).
2. Something you **have** (a phone).
3. Something you **are** (fingerprint).

2FA requires two of these. Most commonly: a password + a code from an authenticator app.

## How TOTP Works
Time-based One-Time Password. The server and the app share a secret key. Every 30 seconds, they generate the same 6-digit code using the current time.

## Setting Up
\`\`\`bash
npm install speakeasy qrcode
\`\`\`

## Generating a Secret
\`\`\`javascript
const speakeasy = require('speakeasy');

const secret = speakeasy.generateSecret({ name: 'MyApp (user@example.com)' });
// Save secret.base32 to the user record
console.log(secret.otpauth_url); // Use this to generate a QR code
\`\`\`

## Verifying a Code
\`\`\`javascript
const verified = speakeasy.totp.verify({
  secret: user.twoFactorSecret,
  encoding: 'base32',
  token: req.body.code
});

if (!verified) return res.status(400).send("Invalid 2FA code");
\`\`\`

## Key Takeaways
- 2FA dramatically improves account security.
- TOTP is the standard (Google Authenticator, Authy).
- Always provide backup recovery codes in case the user loses their phone.`
    },
    {
      title: "OAuth 2.0 and Social Login",
      slug: "oauth-social-login",
      order: 3,
      estimatedMinutes: 40,
      content: `# OAuth 2.0 and Social Login

**Learning objectives:**
- Understand the OAuth 2.0 flow
- Implement "Log in with Google"
- Use Passport.js

## What is OAuth?
OAuth is an authorization framework that allows third-party applications to obtain limited access to a user's account without sharing passwords.

## The Flow (Simplified)
1. User clicks "Log in with Google."
2. User is redirected to Google.
3. User logs into Google and grants permission.
4. Google redirects back to your app with an authorization code.
5. Your server exchanges the code for an access token.
6. Your server uses the token to fetch the user's profile from Google.

## Using Passport.js
Passport is the standard authentication library for Node.js. It has strategies for Google, GitHub, Facebook, and 500+ others.

\`\`\`bash
npm install passport passport-google-oauth20
\`\`\`

\`\`\`javascript
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create the user in your database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
    done(null, user);
  }
));
\`\`\`

## Routes
\`\`\`javascript
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard')
);
\`\`\`

## Key Takeaways
- OAuth is for delegating access, not passwords.
- Social login improves conversion rates.
- Passport.js makes it easy.`
    }
  ]
};