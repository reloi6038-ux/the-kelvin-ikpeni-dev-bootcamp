// ============================================================
// public/js/courses.js
// Loads course data and renders cards.
// Requires api.js loaded first.
// ============================================================

(function () {
  "use strict";

  const grid = document.querySelector("[data-courses-grid]");
  if (!grid) return;

  const limit = Number(grid.dataset.limit) || 0; // 0 = no limit
  const levelFilter = grid.dataset.level || null;

  async function loadCourses() {
    showLoading(grid, "Loading courses...");

    try {
      const data = await apiRequest("/api/courses");
      let courses = data.courses || [];

      if (levelFilter) {
        courses = courses.filter((c) => c.level === levelFilter);
      }
      if (limit > 0) {
        courses = courses.slice(0, limit);
      }

      if (courses.length === 0) {
        showEmpty(grid, "No courses match your filter yet. Check back soon!");
        return;
      }

      renderCourses(courses);
    } catch (err) {
      showError(grid, err.message);
    }
  }

  function renderCourses(courses) {
    grid.innerHTML = courses
      .map((course) => {
        const initial = course.title.charAt(0).toUpperCase();
        return `
          <a class="course-card" href="/course-details.html?slug=${encodeURIComponent(course.slug)}">
            <div class="course-card-icon" aria-hidden="true">${escapeHtml(initial)}</div>
            <span class="course-card-level ${escapeHtml(course.level)}">${escapeHtml(course.level)}</span>
            <h3>${escapeHtml(course.title)}</h3>
            <p class="course-card-desc">${escapeHtml(course.description)}</p>
            <div class="course-card-meta">
              <span>📚 ${escapeHtml(String(course.estimatedHours))} hours</span>
              <span>→ View course</span>
            </div>
          </a>
        `;
      })
      .join("");
  }

  // --- Level filter buttons ---
  document.querySelectorAll("[data-filter-level]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter-level]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const level = btn.dataset.filterLevel;
      if (level === "all") {
        grid.dataset.level = "";
      } else {
        grid.dataset.level = level;
      }
      // Re-trigger load
      loadCourses();
    });
  });

  loadCourses();
})();