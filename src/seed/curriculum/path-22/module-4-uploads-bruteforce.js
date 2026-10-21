module.exports = {
  title: "Module 4: Uploads & Brute Force",
  description: "Handling files safely and preventing abuse.",
  order: 4,
  lessons: [
    {
      title: "Secure File Uploads",
      slug: "secure-file-uploads",
      order: 1,
      estimatedMinutes: 35,
      content: `# Secure File Uploads

**Learning objectives:**
- Understand the risks of file uploads
- Validate file types
- Store files securely

## The Risks
File uploads are one of the most dangerous features you can build.
- **Remote Code Execution**: Uploading a \`.php\` or \`.js\` file and tricking the server into running it.
- **Cross-Site Scripting (XSS)**: Uploading an SVG or HTML file containing malicious scripts.
- **Denial of Service**: Uploading a 50GB file to fill up the disk.

## 1. Validate File Type
Never trust the \`Content-Type\` header. Always check the file extension **and** the magic bytes (the actual file signature).

\`\`\`javascript
const allowedTypes = ['image/jpeg', 'image/png'];
if (!allowedTypes.includes(req.file.mimetype)) {
  throw new Error("Invalid file type");
}
\`\`\`

## 2. Limit File Size
Use Multer to set a max file size.

\`\`\`javascript
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
\`\`\`

## 3. Rename the File
Never use the original filename. It might contain malicious characters or trick the OS.

\`\`\`javascript
const filename = Date.now() + '-' + crypto.randomUUID() + path.extname(file.originalname);
\`\`\`

## 4. Store Outside the Web Root
If your file is served directly (like \`/uploads/image.jpg\`), make sure the folder doesn't allow execution of scripts. For maximum security, store uploads in a cloud service like AWS S3 or Cloudinary, where they are served from a different domain.

## Key Takeaways
- Never trust file extensions or headers.
- Limit file size to prevent DoS.
- Rename every uploaded file with a UUID.
- Prefer cloud storage (S3/Cloudinary) over local disk.`
    },
    {
      title: "Protecting APIs Against Brute-Force Attacks",
      slug: "bruteforce-protection",
      order: 2,
      estimatedMinutes: 25,
      content: `# Protecting APIs Against Brute-Force Attacks

**Learning objectives:**
- Understand brute-force attacks
- Implement rate limiting
- Implement account lockout

## What is Brute-Force?
An attacker tries thousands of password combinations rapidly to gain access.

## 1. Rate Limiting
Limit the number of requests per IP. We covered this in Path 21, but it is crucial for auth routes.

\`\`\`javascript
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 attempts per 15 mins
  message: "Too many login attempts. Try again later."
});

app.post('/api/auth/login', loginLimiter, loginController);
\`\`\`

## 2. Account Lockout
If a specific email gets 5 failed attempts, lock that account for 30 minutes.

\`\`\`javascript
// Pseudo-code
if (user.failedAttempts >= 5 && user.lockedUntil > Date.now()) {
  return res.status(403).send("Account locked.");
}
\`\`\`

## 3. CAPTCHA
For public-facing forms (like signup or password reset), require a CAPTCHA (like Google reCAPTCHA) after 3 failed attempts.

## 4. Strong Password Policies
Enforce minimum length (8+ characters) and complexity (letters, numbers).

## Key Takeaways
- Brute force relies on speed.
- Rate limiting slows the attacker.
- Account lockout stops targeting a specific user.`
    }
  ]
};