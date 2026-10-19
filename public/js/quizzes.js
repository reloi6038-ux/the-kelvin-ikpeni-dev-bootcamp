// ============================================================
// public/js/quizzes.js
// Quiz-taking UI. Server grades; client only collects answers.
// ============================================================

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const quizId = params.get("id");
  const lessonId = params.get("lesson");

  const errEl = document.getElementById("quiz-error");
  const container = document.getElementById("quiz-container");
  const titleEl = document.getElementById("quiz-title");
  const descEl = document.getElementById("quiz-description");
  const countEl = document.getElementById("quiz-question-count");
  const passEl = document.getElementById("quiz-passing-score");
  const questionsEl = document.getElementById("quiz-questions");
  const form = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("quiz-submit");
  const resultsEl = document.getElementById("quiz-results");

  if (!quizId) {
    errEl.textContent = "Quiz ID missing from URL.";
    errEl.style.display = "block";
    return;
  }

  (async function load() {
    try {
      const user = await auth.requireAuthOrRedirect();
      if (!user) return;

      const res = await apiRequest(`/api/quizzes/${encodeURIComponent(quizId)}`);
      const quiz = res.quiz;

      titleEl.textContent = quiz.title;
      descEl.textContent = quiz.description || "";
      countEl.textContent = `📝 ${quiz.questions.length} questions`;
      passEl.textContent = `🎯 Pass mark: ${quiz.passingScore}%`;

      questionsEl.innerHTML = quiz.questions
        .map((q, qi) => renderQuestion(q, qi))
        .join("");

      container.style.display = "block";
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }
  })();

  function renderQuestion(q, index) {
    const isMulti = q.type === "multiple-answer";
    const inputType = isMulti ? "checkbox" : "radio";
    const options = q.options
      .map(
        (opt, oi) => `
        <label style="display:flex; align-items:flex-start; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); cursor:pointer;">
          <input type="${inputType}" name="q-${index}" value="${oi}" style="margin-top: 4px;">
          <span>${escapeHtml(opt.text)}</span>
        </label>`
      )
      .join("");

    return `
      <div class="course-card" style="padding: var(--sp-5);">
        <p style="margin-bottom: var(--sp-3);">
          <strong>Q${index + 1}.</strong> ${escapeHtml(q.prompt)}
          <span style="color: var(--text-dim); font-size: 0.85rem;">
            (${q.points} pt${q.points > 1 ? "s" : ""})
          </span>
        </p>
        <div>${options}</div>
      </div>`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Grading...";

    try {
      // Collect answers
      const quiz = await apiRequest(`/api/quizzes/${encodeURIComponent(quizId)}`);
      const answers = quiz.quiz.questions.map((q, qi) => {
        const inputs = document.querySelectorAll(`input[name="q-${qi}"]:checked`);
        return {
          questionId: q._id,
          selectedAnswers: Array.from(inputs).map((i) => Number(i.value)),
        };
      });

      const csrf = await apiRequest("/api/auth/csrf");
      const res = await apiRequest(`/api/quizzes/${encodeURIComponent(quizId)}/submit`, {
        method: "POST",
        headers: { "X-CSRF-Token": csrf.csrfToken },
        body: { answers },
      });

      renderResults(res);
      form.style.display = "none";
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Quiz";
    }
  });

  function renderResults(res) {
    resultsEl.style.display = "block";
    const color = res.passed ? "var(--success)" : "var(--danger)";
    resultsEl.innerHTML = `
      <div class="course-card" style="padding: var(--sp-6);">
        <h2 style="color:${color}; margin:0 0 var(--sp-3);">
          ${res.passed ? "✅ Passed!" : "❌ Not passed"}
        </h2>
        <p style="font-size: 1.4rem; font-weight:700; margin: 0 0 var(--sp-2);">
          Score: ${res.score}% (${res.earnedPoints}/${res.totalPoints} points)
        </p>
        <p style="color: var(--text-muted);">Pass mark: ${res.passingScore}% · Attempt #${res.attemptNumber}</p>

        <details style="margin-top: var(--sp-4);">
          <summary style="cursor:pointer; color: var(--primary);">Review answers</summary>
          <div style="margin-top: var(--sp-3);">
            ${res.results
              .map(
                (r, i) => `
                <div style="padding: var(--sp-2) 0; border-bottom: 1px solid var(--border);">
                  <span style="color:${r.isCorrect ? "var(--success)" : "var(--danger)"}; font-weight:700;">
                    ${r.isCorrect ? "✓" : "✗"}
                  </span>
                  Question ${i + 1} — ${r.pointsEarned}/${r.pointsPossible} pt
                  ${r.explanation ? `<p style="margin:var(--sp-1) 0 0; color: var(--text-muted); font-size:0.9rem;">${escapeHtml(r.explanation)}</p>` : ""}
                </div>`
              )
              .join("")}
          </div>
        </details>

        <div style="margin-top: var(--sp-5); display:flex; gap: var(--sp-3); flex-wrap:wrap;">
          <a href="/lesson.html?course=${encodeURIComponent(params.get("course") || "")}&lesson=${encodeURIComponent(params.get("lesson") || "")}" class="btn btn-secondary">← Back to lesson</a>
          <a href="/dashboard.html" class="btn btn-primary">Dashboard</a>
        </div>
      </div>`;
  }
})();