// ============================================================
// public/js/api.js
// Reusable fetch helper for all API calls.
// Load this FIRST on any page that talks to the backend.
// ============================================================

/**
 * Make an API request and return the parsed JSON response.
 * Throws an Error with a friendly message on any failure.
 *
 * @param {string} path — e.g. "/api/courses"
 * @param {object} options — fetch options (method, body, headers)
 * @returns {Promise<any>} parsed JSON on success
 */
async function apiRequest(path, options = {}) {
  const url = path.startsWith("http") ? path : path;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "same-origin",
    ...options,
  };

  // If body is a plain object, JSON-encode it
  if (config.body && typeof config.body === "object" && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkErr) {
    throw new Error(
      "Could not reach the server. Please check your internet connection and try again."
    );
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // Response wasn't JSON (e.g., 500 HTML) — fall through
  }

  if (!response.ok) {
    const message =
      (payload && payload.message) ||
      `Request failed (HTTP ${response.status})`;
    const err = new Error(message);
    err.statusCode = response.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

/**
 * Render a loading spinner into a container.
 * @param {HTMLElement} container
 * @param {string} message
 */
function showLoading(container, message = "Loading...") {
  container.innerHTML = `
    <div class="state-message" style="grid-column: 1 / -1;">
      <div class="spinner"></div>
      <p style="margin:0;">${message}</p>
    </div>
  `;
}

/**
 * Render an error message into a container.
 * @param {HTMLElement} container
 * @param {string} message
 */
function showError(container, message) {
  container.innerHTML = `
    <div class="state-message error" style="grid-column: 1 / -1;">
      <p style="margin:0;"><strong>Something went wrong.</strong></p>
      <p style="margin:var(--sp-2) 0 0;">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Render an empty-state message.
 * @param {HTMLElement} container
 * @param {string} message
 */
function showEmpty(container, message) {
  container.innerHTML = `
    <div class="state-message" style="grid-column: 1 / -1;">
      <p style="margin:0;">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Escape user-controlled strings before injecting into HTML.
 * ALWAYS use this when inserting dynamic text into innerHTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}