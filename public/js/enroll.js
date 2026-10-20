// ============================================================
// public/js/enroll.js
// Client helper for enrollment and progress.
// Requires api.js and auth.js
// ============================================================

(function () {
  "use strict";

  async function csrfHeader() {
    const res = await apiRequest("/api/auth/csrf");
    return { "X-CSRF-Token": res.csrfToken };
  }

  window.enrollment = {
    async enrollBySlug(slug) {
      const headers = await csrfHeader();
      return apiRequest("/api/enrollments", {
        method: "POST",
        headers,
        body: { slug },
      });
    },

    async enrollById(courseId, slug) {
      const headers = await csrfHeader();
      const body = { courseId };
      if (slug) body.slug = slug; // Send both just in case
      return apiRequest("/api/enrollments", {
        method: "POST",
        headers,
        body,
      });
    },

    async list() {
      return apiRequest("/api/enrollments");
    },

    async drop(courseId) {
      const headers = await csrfHeader();
      return apiRequest(`/api/enrollments/${courseId}`, {
        method: "DELETE",
        headers,
      });
    },

    async markLessonComplete(lessonId) {
      const headers = await csrfHeader();
      return apiRequest("/api/progress", {
        method: "POST",
        headers,
        body: { lessonId },
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