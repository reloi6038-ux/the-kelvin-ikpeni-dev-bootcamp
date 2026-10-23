module.exports = {
  title: "Module 3: JavaScript & Validation",
  description: "Interactivity and form validation.",
  order: 3,
  lessons: [
    {
      title: "Implementing JavaScript DOM Manipulation",
      slug: "dom-manipulation",
      order: 18,
      estimatedMinutes: 30,
      content: `# Implementing JavaScript DOM Manipulation

**Learning objectives:**
- Smooth scroll and dynamic year.

## Update public/js/script.js

\`\`\`javascript
// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
\`\`\``
    },
    {
      title: "Validating Contact Forms with JavaScript",
      slug: "form-validation",
      order: 19,
      estimatedMinutes: 35,
      content: `# Validating Contact Forms with JavaScript

**Learning objectives:**
- Prevent empty submissions.
- Validate email formats.

## Update public/js/script.js

\`\`\`javascript
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  if (nameInput.value.trim().length < 2) {
    showError(nameInput, "Name must be at least 2 characters");
    isValid = false;
  }

  const emailRegex = /^\\S+@\\S+\\.\\S+$/;
  if (!emailRegex.test(emailInput.value)) {
    showError(emailInput, "Please enter a valid email");
    isValid = false;
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must be at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    // Send to backend
  }
});

function showError(input, message) {
  input.style.borderColor = "red";
  input.nextElementSibling.textContent = message; // Assuming an error <span> exists
}
\`\`\``
    },
    {
      title: "Displaying Form Errors, Success Messages, and Loading States",
      slug: "form-states",
      order: 20,
      estimatedMinutes: 25,
      content: `# Displaying Form Errors, Success Messages, and Loading States

**Learning objectives:**
- Give the user feedback.

## Update public/js/script.js

\`\`\`javascript
async function submitForm(data) {
  const submitBtn = document.getElementById("submit-btn");
  const statusDiv = document.getElementById("form-status");

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  statusDiv.textContent = "";

  try {
    // POST fetch to backend
    statusDiv.textContent = "Message sent successfully!";
    statusDiv.style.color = "green";
    form.reset();
  } catch (err) {
    statusDiv.textContent = "Failed to send. Please try again.";
    statusDiv.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
}
\`\`\``
    },
    {
      title: "Improving Accessibility and Keyboard Navigation",
      slug: "accessibility",
      order: 21,
      estimatedMinutes: 25,
      content: `# Improving Accessibility and Keyboard Navigation

**Learning objectives:**
- Ensure everyone can use your site.

## Key Fixes
- Always use \`<label>\` with \`for\`.
- Use \`alt\` text for images.
- Use \`aria-live\` for status messages.

## Update public/index.html

\`\`\`html
<div id="form-status" aria-live="polite"></div>
\`\`\``
    }
  ]
};