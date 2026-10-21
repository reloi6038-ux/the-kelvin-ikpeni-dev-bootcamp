// ============================================================
// public/js/enroll.js
// Client helper for enrollment and progress.
// ============================================================

(function () {
  "use strict";

  async function getCsrfHeaders() {
    try {
      const res = await apiRequest("/api/auth/csrf");
      return { "X-CSRF-Token": res.csrfToken };
    } catch (err) {
      console.error("Failed to fetch CSRF token", err);
      throw new Error("Security check failed. Please refresh the page.");
    }
  }

  window.enrollment = {
    async enrollBySlug(slug) {
      const headers = await getCsrfHeaders();
      return apiRequest("/api/enrollments", {
        method: "POST",
        headers,
        body: { slug: slug },
      });
    },

    async enrollById(courseId) {
      const headers = await getCsrfHeaders();
      return apiRequest("/api/enrollments", {
        method: "POST",
        headers,
        body: { courseId: courseId },
      });
    },

    async list() {
      return apiRequest("/api/enrollments");
    },

    async drop(courseId) {
      const headers = await getCsrfHeaders();
      return apiRequest(`/api/enrollments/${courseId}`, {
        method: "DELETE",
        headers,
      });
    },

    async markLessonComplete(lessonId) {
      const headers = await getCsrfHeaders();
      return apiRequest("/api/progress", {
        method: "POST",
        headers,
        body: { lessonId: lessonId },
      });
    },

    async getCourseProgress(slug) {
      return apiRequest(`/api/progress/${encodeURIComponent(slug)}`);
    },

    async isLessonComplete(lessonId) {
      return apiRequest(`/api/progress/lesson/${encodeURIComponent(lessonId)}`);
    },
  };
})();