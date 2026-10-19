// ============================================================
// public/js/final-exam.js
// Final exam: countdown timer, server-enforced time, retake rules.
// ============================================================

(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const quizId = params.get("quiz") || params.get("id");
  const courseSlug = params.get("course");

  const errEl = document.getElementById("exam-error");
  const introEl = document.getElementById("exam-intro");
  const container = document.getElementById("exam-container");
  const titleEl = document.getElementById("exam-title");
  const questionsEl = document.getElementById("exam-questions");
  const form = document.getElementById("exam-form");
  const submitBtn = document.getElementById("exam-submit");
  const resultsEl = document.getElementById("exam-results");
  const timerEl = document.getElementById("exam-timer");

  let currentQuiz = null;
  let currentAttemptId = null;
  let expiresAt = null;
  let timerHandle = null;

  if (!quizId) {
    errEl.textContent = "Quiz ID missing from URL.";
    errEl.style.display = "block";
    return;
  }

  (async function load() {
    try {
      const user = await auth.requireAuthOrRedirect();
      if (!user) return;

      const status = await apiRequest(`/api/exams/${encodeURIComponent(quizId)}/status`);

      // Fetch quiz data (sanitized)
      const quizRes = await apiRequest(`/api/quizzes/${encodeURIComponent(quizId)}`);
      currentQuiz = quizRes.quiz;

      // Fill intro
      document.getElementById("intro-course").textContent =
        courseSlug || "Course";
      document.getElementById("intro-questions").textContent =
        currentQuiz.questions.length;
      document.getElementById("intro-time").textContent =
        `${currentQuiz.timeLimitMinutes || 60} minutes`;
      document.getElementById("intro-pass").textContent =
        `${currentQuiz.passingScore}%`;
      document.getElementById("intro-attempts").textContent =
        `${status.attemptsUsed} used · ${status.attemptsRemaining} remaining`;

      // Show history
      if (status.attempts && status.attempts.length > 0) {
        document.getElementById("intro-history").innerHTML = `
          <h3>Previous attempts</h3>
          <div class="course-card" style="padding: var(--sp-4);">
            ${status.attempts
              .map(
                (a) => `
                <div style="display:flex; justify-content:space-between; padding: var(--sp-2) 0; border-bottom: 1px solid var(--border);">
                  <span>Attempt #${a.attemptNumber}</span>
                  <span style="color:${a.passed ? "var(--success)" : "var(--danger)"};">
                    ${a.score}% ${a.passed ? "✓ Passed" : "✗ Failed"}
                  </span>
                </div>`
              )
              .join("")}
          </div>`;
      }

      introEl.style.display = "block";

      document.getElementById("start-btn").addEventListener("click", startExam);
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }
  })();

  async function startExam() {
    try {
      const csrf = await apiRequest("/api/auth/csrf");
      const res = await apiRequest(`/api/exams/${encodeURIComponent(quizId)}/start`, {
        method: "POST",
        headers: { "X-CSRF-Token": csrf.csrfToken },
      });

      currentAttemptId = res.attemptId;
      expiresAt = new Date(res.expiresAt);
      currentQuiz = res.quiz;

      titleEl.textContent = currentQuiz.title;
      questionsEl.innerHTML = currentQuiz.questions
        .map((q, qi) => renderQuestion(q, qi))
        .join("");

      introEl.style.display = "none";
      container.style.display = "block";
      startTimer();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
    }
  }

  function renderQuestion(q, index) {
    const isMulti = q.type === "multiple-answer";
    const inputType = isMulti ? "checkbox" : "radio";
    return `
      <div class="course-card" style="padding: var(--sp-5);">
        <p style="margin-bottom: var(--sp-3);">
          <strong>Q${index + 1}.</strong> ${escapeHtml(q.prompt)}
        </p>
        <div>
          ${q.options
            .map(
              (opt, oi) => `
              <label style="display:flex; align-items:flex-start; gap: var(--sp-2); padding: var(--sp-2) var(--sp-3); cursor:pointer;">
                <input type="${inputType}" name="q-${index}" value="${oi}" style="margin-top: 4px;">
                <span>${escapeHtml(opt.text)}</span>
              </label>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function startTimer() {
    timerEl.style.display = "inline-block";
    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - new Date()) / 1000));
      const min = Math.floor(remaining / 60);
      const sec = remaining % 60;
      timerEl.textContent = `⏱ ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
      if (remaining <= 0) {
        clearInterval(timerHandle);
        submitExam(true);
      }
    };
    tick();
    timerHandle = setInterval(tick, 1000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitExam(false);
  });

  async function submitExam(auto) {
    if (!currentAttemptId) return;
    if (!auto) {
      const confirmed = confirm("Submit your examination? You cannot change answers after this.");
      if (!confirmed) return;
    }
    clearInterval(timerHandle);
    submitBtn.disabled = true;
    submitBtn.textContent = auto ? "Time expired — submitting..." : "Submitting...";

    try {
      const answers = currentQuiz.questions.map((q, qi) => {
        const inputs = document.querySelectorAll(`input[name="q-${qi}"]:checked`);
        return {
          questionId: q._id,
          selectedAnswers: Array.from(inputs).map((i) => Number(i.value)),
        };
      });

      const csrf = await apiRequest("/api/auth/csrf");
      const res = await apiRequest(`/api/exams/${encodeURIComponent(quizId)}/submit`, {
        method: "POST",
        headers: { "X-CSRF-Token": csrf.csrfToken },
        body: { attemptId: currentAttemptId, answers },
      });

      renderResults(res);
      form.style.display = "none";
      timerEl.style.display = "none";
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Examination";
    }
  }

  function renderResults(res) {
    container.style.display = "none";
    resultsEl.style.display = "block";
    const color = res.passed ? "var(--success)" : "var(--danger)";
    resultsEl.innerHTML = `
      <div class="course-card" style="padding: var(--sp-6);">
        <h2 style="color:${color};">${res.passed ? "✅ Examination Passed!" : "❌ Examination Not Passed"}</h2>
        <p style="font-size:1.4rem; font-weight:700;">Score: ${res.score}% (${res.earnedPoints}/${res.totalPoints} points)</p>
        <p style="color: var(--text-muted);">Pass mark: ${res.passingScore}%</p>
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
        <div style="margin-top: var(--sp-5);">
          <a href="/dashboard.html" class="btn btn-primary">Back to Dashboard</a>
        </div>
      </div>`;
  }
})();