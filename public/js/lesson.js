// ============================================================
// public/js/lesson.js
// Lesson viewer: fetch lesson, render markdown, sidebar, prev/next.
// Requires: api.js, main.js, auth.js, enroll.js
// ============================================================

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const courseSlug = params.get("course");
  const lessonSlug = params.get("lesson");

  const layout = document.getElementById("lesson-layout");
  const errEl = document.getElementById("lesson-error");
  const treeEl = document.getElementById("lesson-tree");
  const titleEl = document.getElementById("lesson-title");
  const contentEl = document.getElementById("lesson-content");
  const durationEl = document.getElementById("lesson-duration");
  const positionEl = document.getElementById("lesson-position");
  const breadcrumb = document.getElementById("breadcrumb");
  const markBar = document.getElementById("mark-complete-bar");
  const navEl = document.getElementById("lesson-nav");

  if (!courseSlug || !lessonSlug) {
    showFatal("Invalid lesson URL — course and lesson are required.");
    return;
  }

  // --- Minimal markdown → HTML renderer ---
  function renderMarkdown(md) {
    let html = escapeHtml(md || "");

    const codeBlocks = [];
    html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
      const token = `@@CODEBLOCK${codeBlocks.length}@@`;
      codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
      return token;
    });

    const tables = [];
    html = html.replace(/((?:^\|.+\|\n)+)/gm, (block) => {
      const lines = block.trim().split("\n").filter(Boolean);
      if (lines.length < 2) return block;
      const sepIdx = lines.findIndex((l) => /^\|[\s\-:|]+\|$/.test(l.trim()));
      if (sepIdx === -1) return block;

      const headerCells = lines[0].split("|").slice(1, -1).map((s) => s.trim());
      const rowLines = lines.slice(sepIdx + 1);
      const rows = rowLines.map((l) =>
        l.split("|").slice(1, -1).map((s) => s.trim())
      );

      const tbl = `<table><thead><tr>${headerCells
        .map((c) => `<th>${c}</th>`)
        .join("")}</tr></thead><tbody>${rows
        .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
      const token = `@@TABLE${tables.length}@@`;
      tables.push(tbl);
      return token;
    });

    html = html
      .replace(/^###### (.+)$/gm, "<h6>$1</h6>")
      .replace(/^##### (.+)$/gm, "<h5>$1</h5>")
      .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>");

    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    html = html.replace(/(?:^[-*] .+\n?)+/gm, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => l.replace(/^[-*] /, "").trim())
        .map((t) => `<li>${t}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    });

    html = html.replace(/(?:^\d+\. .+\n?)+/gm, (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => l.replace(/^\d+\. /, "").trim())
        .map((t) => `<li>${t}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    });

    html = html
      .split(/\n{2,}/)
      .map((block) => {
        if (/^\s*<(h[1-6]|ul|ol|pre|table|blockquote)/.test(block.trim())) return block;
        if (/^@@(CODEBLOCK|TABLE)\d+@@/.test(block.trim())) return block;
        return `<p>${block.replace(/\n/g, "<br>")}</p>`;
      })
      .join("\n");

    html = html.replace(/@@CODEBLOCK(\d+)@@/g, (_, i) => codeBlocks[i]);
    html = html.replace(/@@TABLE(\d+)@@/g, (_, i) => tables[i]);

    return html;
  }

  function showFatal(message) {
    errEl.textContent = message;
    errEl.style.display = "block";
    layout.style.display = "none";
  }

  (async function load() {
    try {
      const data = await apiRequest(
        `/api/lessons/${encodeURIComponent(courseSlug)}/${encodeURIComponent(lessonSlug)}`
      );

      const { course, lesson, previous, next, position, completed, enrolled } = data;

      document.title = `${lesson.title} — ${course.title}`;
      titleEl.textContent = lesson.title;
      durationEl.textContent = `⏱ ${lesson.estimatedMinutes} min read`;
      positionEl.textContent = `Lesson ${position.index} of ${position.total}`;
      contentEl.innerHTML = renderMarkdown(lesson.content || "");

      breadcrumb.innerHTML = `
        <a href="/courses.html">Courses</a>
        <span>›</span>
        <a href="/course-details.html?slug=${encodeURIComponent(course.slug)}">${escapeHtml(course.title)}</a>
        <span>›</span>
        <span>${escapeHtml(lesson.title)}</span>
      `;

      navEl.innerHTML = "";
      if (previous) {
        navEl.innerHTML += `
          <a class="lesson-nav-btn prev" href="/lesson.html?course=${encodeURIComponent(course.slug)}&lesson=${encodeURIComponent(previous.slug)}">
            <span class="label">← Previous</span>
            <span class="title">${escapeHtml(previous.title)}</span>
          </a>`;
      } else {
        navEl.innerHTML += `<span></span>`;
      }
      if (next) {
        navEl.innerHTML += `
          <a class="lesson-nav-btn next" href="/lesson.html?course=${encodeURIComponent(course.slug)}&lesson=${encodeURIComponent(next.slug)}">
            <span class="label">Next →</span>
            <span class="title">${escapeHtml(next.title)}</span>
          </a>`;
      }

      const user = await auth.me();
      if (!user) {
        markBar.innerHTML = `
          <p style="margin:0; color: var(--text-muted);">
            <a href="/login.html?next=${encodeURIComponent(window.location.pathname + window.location.search)}">Log in</a>
            to track your progress.
          </p>`;
      } else if (!enrolled) {
        markBar.innerHTML = `
          <p style="margin:0; color: var(--text-muted);">
            <a href="/course-details.html?slug=${encodeURIComponent(course.slug)}">Enroll in this course</a>
            to track your progress.
          </p>`;
      } else if (completed) {
        markBar.innerHTML = `
          <p style="margin:0; color: var(--success); font-weight:600;">✅ You've completed this lesson</p>`;
      } else {
        markBar.innerHTML = `
          <button class="btn btn-primary" id="mark-complete-btn">Mark as complete</button>`;
        const btn = document.getElementById("mark-complete-btn");
        btn.addEventListener("click", async () => {
          btn.disabled = true;
          btn.textContent = "Saving...";
          try {
            await enrollment.markLessonComplete(lesson._id);
            btn.textContent = "✅ Completed";
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-secondary");
            await loadTree();
          } catch (err) {
            btn.disabled = false;
            btn.textContent = "Mark as complete";
            alert(err.message || "Failed to save progress.");
          }
        });
      }

      layout.style.display = "grid";
      await loadTree();
    } catch (err) {
      showFatal(err.message || "Failed to load lesson.");
    }
  })();

  async function loadTree() {
    try {
      const tree = await apiRequest(`/api/lessons/${encodeURIComponent(courseSlug)}`);
      const completedSet = new Set(tree.completedLessonIds || []);

      treeEl.innerHTML = tree.modules
        .map((mod) => {
          const lessons = (mod.lessons || [])
            .map((l) => {
              const isCurrent = l.slug === lessonSlug;
              const isComplete = completedSet.has(l._id);
              return `
                <li>
                  <a href="/lesson.html?course=${encodeURIComponent(courseSlug)}&lesson=${encodeURIComponent(l.slug)}"
                     class="${isCurrent ? "active" : ""} ${isComplete ? "completed" : ""}">
                    <span class="lesson-check">${isComplete ? "✅" : "○"}</span>
                    <span>${escapeHtml(l.title)}</span>
                  </a>
                </li>`;
            })
            .join("");
          return `
            <div class="lesson-sidebar-module">
              <h4>${escapeHtml(mod.title)}</h4>
              <ul class="lesson-sidebar-list">${lessons}</ul>
            </div>`;
        })
        .join("");
    } catch {
      treeEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Could not load course contents.</p>`;
    }
  }
})();