// ============================================================
// public/js/ide.js
// Monaco editor + live preview for coding lessons.
// Requires: monaco AMD loader (already in HTML), api.js, auth.js
// ============================================================

(function () {
  "use strict";

  const MONACO_BASE = "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs";

  let monacoReady = null;
  let editors = { html: null, css: null, js: null };
  let currentTab = "html";
  let lessonData = null;

  // --- Load Monaco ---
  function ensureMonaco() {
    if (monacoReady) return monacoReady;

    monacoReady = new Promise((resolve, reject) => {
      if (!window.require) {
        reject(new Error("Monaco AMD loader not found. Check the script tag."));
        return;
      }

      window.require.config({ paths: { vs: MONACO_BASE } });

      // Worker proxy for cross-origin CDN
      window.MonacoEnvironment = {
        getWorkerUrl: function () {
          const proxy = `self.MonacoEnvironment={baseUrl:'${MONACO_BASE}/'};importScripts('${MONACO_BASE}/base/worker/workerMain.js');`;
          return `data:text/javascript;charset=utf-8,${encodeURIComponent(proxy)}`;
        },
      };

      window.require(["vs/editor/editor.main"], function () {
        resolve(window.monaco);
      }, reject);
    });

    return monacoReady;
  }

  // --- Create editor for a tab ---
  function createEditor(monaco, containerId, language, value) {
    return monaco.editor.create(document.getElementById(containerId), {
      value: value || "",
      language,
      theme: "vs-dark",
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      fontFamily: "Cascadia Code, Fira Code, Consolas, monospace",
      lineNumbers: "on",
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
    });
  }

  // --- Build the IDE HTML structure ---
  function buildIdeHtml(exercise) {
    return `
      <div class="ide-container">
        <div class="ide-header">
          <span class="ide-title">💻 Coding Exercise</span>
          <div class="ide-tabs">
            <button class="ide-tab active" data-tab="html">HTML</button>
            <button class="ide-tab" data-tab="css">CSS</button>
            <button class="ide-tab" data-tab="js">JS</button>
          </div>
        </div>
        <div class="ide-editor-wrap active" id="editor-html"></div>
        <div class="ide-editor-wrap" id="editor-css"></div>
        <div class="ide-editor-wrap" id="editor-js"></div>
        <div class="ide-toolbar">
          <button class="btn btn-primary" id="ide-run">▶ Run</button>
          <button class="btn btn-secondary" id="ide-reset">Reset</button>
          <button class="btn btn-secondary" id="ide-submit">Submit &amp; Test</button>
          <span class="ide-toolbar-status" id="ide-status"></span>
        </div>
        <div class="ide-preview-label">Live Preview</div>
        <iframe class="ide-preview-iframe" id="ide-preview" sandbox="allow-scripts allow-modals allow-forms allow-popups" referrerpolicy="no-referrer"></iframe>
        <div class="ide-results" id="ide-results" style="display:none;"></div>
      </div>
    `;
  }

  // --- Update preview iframe ---
  function updatePreview() {
    const html = editors.html ? editors.html.getValue() : "";
    const css = editors.css ? editors.css.getValue() : "";
    const js = editors.js ? editors.js.getValue() : "";

    const doc = `<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>${html}
<script>${js}<\/script>
</body>
</html>`;

    const iframe = document.getElementById("ide-preview");
    if (iframe) iframe.srcdoc = doc;
  }

  // --- Switch tab ---
  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".ide-tab").forEach((b) => {
      b.classList.toggle("active", b.dataset.tab === tab);
    });
    document.querySelectorAll(".ide-editor-wrap").forEach((w) => {
      w.classList.toggle("active", w.id === `editor-${tab}`);
    });
    if (editors[tab]) editors[tab].layout();
  }

  // --- Reset to starter code ---
  function resetEditors() {
    if (!lessonData || !lessonData.exercise) return;
    const ex = lessonData.exercise;
    if (editors.html) editors.html.setValue(ex.starterHtml || "");
    if (editors.css) editors.css.setValue(ex.starterCss || "");
    if (editors.js) editors.js.setValue(ex.starterJs || "");
    updatePreview();
    document.getElementById("ide-results").style.display = "none";
    document.getElementById("ide-status").textContent = "Reset to starter code.";
  }

  // --- Submit for grading ---
  async function submitExercise() {
    // SAFETY CHECK: Ensure lessonData and lessonId exist before submitting
    if (!lessonData || !lessonData._id) {
      document.getElementById("ide-status").textContent = "Error: Lesson data missing.";
      return;
    }

    const statusEl = document.getElementById("ide-status");
    const resultsEl = document.getElementById("ide-results");
    const submitBtn = document.getElementById("ide-submit");

    statusEl.textContent = "Submitting...";
    submitBtn.disabled = true;

    try {
      const csrfRes = await fetch("/api/auth/csrf");
      const csrfData = await csrfRes.json();

      const response = await fetch(
        `/api/exercises/${lessonData._id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfData.csrfToken
          },
          body: JSON.stringify({
            html: editors.html ? editors.html.getValue() : "",
            css: editors.css ? editors.css.getValue() : "",
            js: editors.js ? editors.js.getValue() : "",
          }),
        }
      );

      const res = await response.json();
      if (!response.ok) throw new Error(res.message || "Submission failed");

      resultsEl.style.display = "block";
      resultsEl.innerHTML = `
        <h4>${res.passed ? "✅ All tests passed!" : "❌ Some tests failed"}</h4>
        ${res.results
          .map(
            (r) => `
            <div class="ide-result-row">
              <span class="ide-result-icon ${r.passed ? "pass" : "fail"}">${r.passed ? "✓" : "✗"}</span>
              <span>
                <span class="ide-result-name">${escapeHtml(r.name)}:</span>
                <span class="ide-result-message">${escapeHtml(r.message)}</span>
              </span>
            </div>`
          )
          .join("")}
      `;
      statusEl.textContent = res.passed
        ? "✅ Lesson marked complete."
        : "Review results below and try again.";

      if (res.passed && window.__lessonOnComplete) {
        window.__lessonOnComplete();
      }
    } catch (err) {
      statusEl.textContent = err.message || "Submission failed.";
    } finally {
      submitBtn.disabled = false;
    }
  }

  // --- Public API ---
  window.ideController = {
    async mount(lesson) {
      // SAFETY CHECK: Verify the lesson object has an _id
      if (!lesson || !lesson._id) {
        console.error("IDE Mount Error: Lesson object or ID is missing.");
        return;
      }

      lessonData = lesson;
      const ex = lesson.exercise;
      if (!ex || !ex.enabled) return;

      const root = document.getElementById("ide-root");
      if (!root) return;

      root.innerHTML = `
        <div style="background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--sp-4); margin-bottom: var(--sp-4);">
          <strong style="color: var(--primary);">📝 Instructions:</strong>
          <span style="color: var(--text-muted);">${escapeHtml(ex.instructions || "Complete the exercise.")}</span>
        </div>
        ${buildIdeHtml(ex)}
      `;

      const monaco = await ensureMonaco();

      editors.html = createEditor(monaco, "editor-html", "html", ex.starterHtml || "");
      editors.css = createEditor(monaco, "editor-css", "css", ex.starterCss || "");
      editors.js = createEditor(monaco, "editor-js", "javascript", ex.starterJs || "");

      updatePreview();

      document.getElementById("ide-run").addEventListener("click", updatePreview);
      document.getElementById("ide-reset").addEventListener("click", resetEditors);
      document.getElementById("ide-submit").addEventListener("click", submitExercise);

      document.querySelectorAll(".ide-tab").forEach((btn) => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
      });

      let previewTimer = null;
      ["html", "css", "js"].forEach((lang) => {
        if (editors[lang]) {
          editors[lang].onDidChangeModelContent(() => {
            clearTimeout(previewTimer);
            previewTimer = setTimeout(updatePreview, 600);
          });
        }
      });
    },
  };
})();