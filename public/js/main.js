// ============================================================
// public/js/main.js
// Site-wide behaviors. Load on every page.
// ============================================================

(function () {
  "use strict";

  // --- Mobile navigation toggle ---
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close nav when a link is clicked (mobile UX)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Highlight the active nav link ---
  const path = window.location.pathname;
  document.querySelectorAll("[data-nav-links] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href === path || (href !== "/" && path.startsWith(href))) {
      link.classList.add("active");
    }
  });

  // --- Auto-inject current year into footer ---
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();