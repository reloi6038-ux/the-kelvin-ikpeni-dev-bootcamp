// ============================================================
// public/js/ide.js
// Monaco editor + live preview + walkthrough + solution.
// ============================================================

(function () {
  "use strict";

  const MONACO_BASE = "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs";
  let monacoReady = null;
  let editors = { html: null, css: null, js: null };
  let currentTab = "html";
  let lessonData = null;

  function ensureMonaco() {
    if (monacoReady) return monacoReady;
    monacoReady = new Promise((resolve, reject) => {
      if (!window.require) return reject(new Error("Monaco AMD loader not found."));
      window.require.config({ paths: { vs: MONACO_BASE } });
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
          <button class="btn btn-secondary" id="ide-solution" style="margin-left: auto; border-color: var(--warning); color: var(--warning);">💡 View Solution</button>
          <span class="ide-toolbar-status" id="ide-status"></span>
        </div>
        
        <div id="ide-walkthrough" style="display:none; padding: var(--sp-4); background: var(--bg-card); border-top: 1px solid var(--border);">
          <strong style="color: var(--primary);">Walkthrough:</strong>
          <div style="margin-top: var(--sp-2); color: var(--text-muted);">${escapeHtml(exercise.walkthrough || "No walkthrough available.")}</div>
        </div>

        <div class="ide-preview-label">Live Preview</div>
        <iframe class="ide-preview-iframe" id="ide-preview" sandbox="allow-scripts allow-modals allow-forms allow-popups" referrerpolicy="no-referrer"></iframe>
        <div class="ide-results" id="ide-results" style="display:none;"></div>
      </div>
    `;
  }

  function updatePreview() {
    const html = editors.html ? editors.html.getValue() : "";
    const css = editors.css ? editors.css.getValue() : "";
    const js = editors.js ? editors.js.getValue() : "";

    const doc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
    const iframe = document.getElementById("ide-preview");
    if (iframe) iframe.srcdoc = doc;
  }

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".ide-tab").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    document.querySelectorAll(".ide-editor-wrap").forEach((w) => w.classList.toggle("active", w.id === `editor-${tab}`));
    if (editors[tab]) editors[tab].layout();
  }

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

  function showSolution() {
    if (!lessonData || !lessonData.exercise) return;
    const ex = lessonData.exercise;
    if (ex.solutionHtml !== undefined) editors.html.setValue(ex.solutionHtml);
    if (ex.solutionCss !== undefined) editors.css.setValue(ex.solutionCss);
    if (ex.solutionJs !== undefined) editors.js.setValue(ex.solutionJs);
    updatePreview();
    document.getElementById("ide-status").textContent = "Solution loaded. Study it carefully!";
  }

  async function submitExercise() {
    if (!lessonData || !lessonData._id) return;
    const statusEl = document.getElementById("ide-status");
    const resultsEl = document.getElementById("ide-results");
    const submitBtn = document.getElementById("ide-submit");

    statusEl.textContent = "Submitting...";
    submitBtn.disabled = true;

    try {
      const csrfRes = await fetch("/api/auth/csrf");
      const csrfData = await csrfRes.json();

      const response = await fetch(`/api/exercises/${lessonData._id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfData.csrfToken },
        body: JSON.stringify({
          html: editors.html ? editors.html.getValue() : "",
          css: editors.css ? editors.css.getValue() : "",
          js: editors.js ? editors.js.getValue() : "",
        }),
      });

      const res = await response.json();
      if (!response.ok) throw new Error(res.message || "Submission failed");

      resultsEl.style.display = "block";
      resultsEl.innerHTML = `
        <h4>${res.passed ? "✅ All tests passed!" : "❌ Some tests failed"}</h4>
        ${res.results.map(r => `
          <div class="ide-result-row">
            <span class="ide-result-icon ${r.passed ? "pass" : "fail"}">${r.passed ? "✓" : "✗"}</span>
            <span><span class="ide-result-name">${escapeHtml(r.name)}:</span> <span class="ide-result-message">${escapeHtml(r.message)}</span></span>
          </div>`).join("")}
      `;
      statusEl.textContent = res.passed ? "✅ Lesson marked complete." : "Review results below and try again.";

      if (res.passed && window.__lessonOnComplete) window.__lessonOnComplete();
    } catch (err) {
      statusEl.textContent = err.message || "Submission failed.";
    } finally {
      submitBtn.disabled = false;
    }
  }

  window.ideController = {
    async mount(lesson) {
      if (!lesson || !lesson._id) return;
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
      
      // Toggle Walkthrough & Solution
      document.getElementById("ide-solution").addEventListener("click", () => {
        showSolution();
        const wt = document.getElementById("ide-walkthrough");
        if (wt) wt.style.display = wt.style.display === "none" ? "block" : "none";
      });

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