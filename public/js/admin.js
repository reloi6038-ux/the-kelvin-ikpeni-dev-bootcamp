// ============================================================
// public/js/admin.js
// Shared admin helpers + auto-render for admin pages.
// Requires api.js, auth.js
// ============================================================

(function () {
  "use strict";

  // ---- Admin guard ----
  async function guard() {
    const user = await auth.me();
    if (!user) {
      window.location.href = "/login.html?next=" + encodeURIComponent(window.location.pathname);
      return null;
    }
    if (user.role !== "admin") {
      document.body.innerHTML = `
        <div style="padding: 3rem; text-align:center; color: #e6e9f0; font-family: system-ui;">
          <h1 style="color:#ff4757;">⛔ Access Denied</h1>
          <p>This page requires administrator privileges.</p>
          <a href="/" style="color:#4a9eff;">← Return to site</a>
        </div>`;
      return null;
    }
    return user;
  }

  // ---- Admin API helper (auto-CSRF) ----
  async function adminRequest(path, config = {}) {
    if (config.method && config.method !== "GET") {
      const csrf = await apiRequest("/api/auth/csrf");
      config.headers = { ...(config.headers || {}), "X-CSRF-Token": csrf.csrfToken };
    }
    return apiRequest(path, config);
  }

  // ---- Dashboard stats ----
  const statsGrid = document.getElementById("stats-grid");
  if (statsGrid) {
    (async function () {
      const user = await guard();
      if (!user) return;

      try {
        const res = await adminRequest("/api/admin/stats");
        const s = res.stats;
        const cards = [
          { label: "Students", value: s.totalStudents, icon: "👥" },
          { label: "Admins", value: s.totalAdmins, icon: "🛡️" },
          { label: "Courses", value: s.totalCourses, icon: "📚" },
          { label: "Lessons", value: s.totalLessons, icon: "📖" },
          { label: "Enrollments", value: s.totalEnrollments, icon: "✍️" },
          { label: "Certificates", value: s.totalCertificates, icon: "🎓" },
          { label: "Exam Attempts", value: s.totalAttempts, icon: "📝" },
          { label: "Code Submissions", value: s.totalSubmissions, icon: "💻" },
        ];
        statsGrid.innerHTML = cards
          .map(
            (c) => `
              <div class="course-card" style="text-align:center;">
                <div style="font-size:2.5rem; margin-bottom: var(--sp-2);">${c.icon}</div>
                <div style="font-size:2rem; font-weight:800; color: var(--primary);">${c.value}</div>
                <div style="color: var(--text-muted); font-size:0.9rem;">${c.label}</div>
              </div>`
          )
          .join("");
      } catch (err) {
        document.getElementById("admin-error").textContent = err.message;
        document.getElementById("admin-error").style.display = "block";
      }

      document.getElementById("logout-btn").addEventListener("click", async () => {
        try { await auth.logout(); } catch {}
        window.location.href = "/";
      });
    })();
  }

  // Expose for other admin pages
  window.admin = { guard, adminRequest };
})();