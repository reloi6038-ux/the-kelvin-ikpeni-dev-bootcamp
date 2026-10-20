// ============================================================
// public/js/auth.js
// Guest auto-login (No login required)
// ============================================================

(function () {
  "use strict";

  window.auth = {
    async me() {
      try {
        const res = await apiRequest("/api/auth/me");
        return res.user;
      } catch (err) {
        // Fallback if API fails
        return { name: "Guest Student", role: "student" };
      }
    },
    
    async requireAuthOrRedirect() {
      // Never redirects. Always returns the guest user.
      return await this.me();
    },
    
    async logout() {
      // No-op since there is no login
      window.location.reload();
    },
  };
})();