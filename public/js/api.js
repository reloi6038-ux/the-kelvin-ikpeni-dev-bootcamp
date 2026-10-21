// ============================================================
// public/js/api.js
// Reusable fetch helper for all API calls.
// ============================================================

async function apiRequest(path, options = {}) {
  const url = path.startsWith("http") ? path : path;

  // Extract CSRF token from cookies (if it exists)
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrfToken="))
    ?.split("=")[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(csrfToken && { "X-CSRF-Token": csrfToken }), // Attach token
      ...(options.headers || {}),
    },
    credentials: "same-origin",
    ...options,
  };

  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkErr) {
    throw new Error("Could not reach the server. Please check your internet connection.");
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {}

  if (!response.ok) {
    const message = (payload && payload.message) || `Request failed (HTTP ${response.status})`;
    const err = new Error(message);
    err.statusCode = response.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

function showLoading(container, message = "Loading...") {
  container.innerHTML = `
    <div class="state-message" style="grid-column: 1 / -1;">
      <div class="spinner"></div>
      <p style="margin:0;">${message}</p>
    </div>
  `;
}

function showError(container, message) {
  container.innerHTML = `
    <div class="state-message error" style="grid-column: 1 / -1;">
      <p style="margin:0;"><strong>Something went wrong.</strong></p>
      <p style="margin:var(--sp-2) 0 0;">${escapeHtml(message)}</p>
    </div>
  `;
}

function showEmpty(container, message) {
  container.innerHTML = `
    <div class="state-message" style="grid-column: 1 / -1;">
      <p style="margin:0;">${escapeHtml(message)}</p>
    </div>
  `;
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}