// ============================================================
// public/js/auth.js
// Client-side auth helper: CSRF token fetch, register, login,
// logout, and current-user lookup.
// Requires api.js loaded first.
// ============================================================

(function () {
  "use strict";

  // Cache the CSRF token after first fetch
  let csrfToken = null;

  async function getCsrfToken() {
    if (csrfToken) return csrfToken;
    const res = await apiRequest("/api/auth/csrf");
    csrfToken = res.csrfToken;
    return csrfToken;
  }

  async function withCsrf(config = {}) {
    const token = await getCsrfToken();
    return apiRequest(config.path, {
      method: config.method || "POST",
      headers: {
        "X-CSRF-Token": token,
        ...(config.headers || {}),
      },
      body: config.body,
    });
  }

  window.auth = {
    async register(data) {
      return withCsrf({ path: "/api/auth/register", body: data });
    },
    async login(data) {
      return withCsrf({ path: "/api/auth/login", body: data });
    },
    async logout() {
      return apiRequest("/api/auth/logout", { method: "POST" });
    },
    async me() {
      try {
        const res = await apiRequest("/api/auth/me");
        return res.user;
      } catch (err) {
        if (err.statusCode === 401) return null;
        throw err;
      }
    },
    async requireAuthOrRedirect() {
      const user = await this.me();
      if (!user) {
        window.location.href = "/login.html";
        return null;
      }
      return user;
    },
  };
})();