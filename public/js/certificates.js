(function () {
  "use strict";

  const errEl = document.getElementById("certs-error");
  const grid = document.getElementById("certs-grid");
  if (!grid) return;

  (async function load() {
    try {
      const user = await auth.requireAuthOrRedirect();
      if (!user) return;

      const res = await apiRequest("/api/certificates");
      const certs = res.certificates || [];

      if (certs.length === 0) {
        grid.innerHTML = `
          <div class="state-message" style="grid-column: 1 / -1;">
            You haven't earned any certificates yet.
            <br /><br />
            Complete a course and pass its final examination to claim one.
            <br />
            <a href="/courses.html" class="btn btn-primary mt-4">Browse courses →</a>
          </div>`;
        return;
      }

      grid.innerHTML = certs
        .map((c) => {
          const issued = new Date(c.issuedAt).toLocaleDateString();
          const status = c.revoked
            ? `<span style="color: var(--danger); font-weight: 600;">⚠ Revoked</span>`
            : `<span style="color: var(--success); font-weight: 600;">✓ Valid</span>`;
          const verifyUrl = `${window.location.origin}/verify-certificate.html?id=${encodeURIComponent(c.certificateId)}`;

          return `
            <div class="course-card">
              <div class="course-card-icon" aria-hidden="true">🎓</div>
              <h3>${escapeHtml(c.courseTitle)}</h3>
              <p class="course-card-desc">
                <strong>${c.type === "accomplishment" ? "Statement of Accomplishment" : "Certificate of Completion"}</strong><br>
                Awarded to <strong>${escapeHtml(c.studentName)}</strong><br>
                Issued: ${escapeHtml(issued)}<br>
                Status: ${status}
              </p>
              <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: var(--sp-3);">
                ${escapeHtml(c.certificateId)}
              </p>
              <div style="display:flex; gap: var(--sp-2); flex-wrap: wrap; margin-top: auto;">
                ${c.revoked
                  ? `<button class="btn btn-secondary" disabled>Download unavailable</button>`
                  : `<a class="btn btn-primary" href="/api/certificates/${encodeURIComponent(c.certificateId)}/download">⬇ Download PDF</a>`}
                <a class="btn btn-secondary" href="${escapeHtml(verifyUrl)}" target="_blank" rel="noopener">Verify</a>
              </div>
            </div>`;
        })
        .join("");
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }
  })();
})();