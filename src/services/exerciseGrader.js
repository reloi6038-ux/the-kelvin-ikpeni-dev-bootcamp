// ============================================================
// src/services/exerciseGrader.js
// Predefined tests for frontend exercises.
// No arbitrary code execution — pattern matching only.
// ============================================================

/**
 * Grade a submitted exercise against its expected output.
 * Returns { passed, results: [{ name, passed, message }] }
 */
function gradeExercise(lesson, submission) {
  const exercise = lesson.exercise || {};
  const results = [];

  if (!exercise.enabled) {
    return { passed: false, results: [{ name: "Exercise", passed: false, message: "No exercise configured" }] };
  }

  const html = submission.html || "";
  const css = submission.css || "";
  const js = submission.js || "";

  // ---- Test 1: HTML structure matches expected output (loose) ----
  if (exercise.expectedOutput) {
    const normalizedExpected = normalizeWhitespace(exercise.expectedOutput);
    const normalizedHtml = normalizeWhitespace(html);
    const htmlContainsExpected = normalizedHtml.includes(
      normalizedExpected.replace(/<[^>]+>/g, "").trim()
    ) || normalizedHtml.includes(normalizedExpected);

    results.push({
      name: "HTML structure",
      passed: htmlContainsExpected,
      message: htmlContainsExpected
        ? "Your HTML matches the expected structure."
        : "Your HTML doesn't match the expected output. Check the instructions.",
    });
  }

  // ---- Test 2: No obvious errors (unclosed tags, etc.) ----
  const basicHtmlValid = checkBasicHtmlValidity(html);
  results.push({
    name: "HTML validity",
    passed: basicHtmlValid.valid,
    message: basicHtmlValid.message,
  });

  // ---- Test 3: Required element present (e.g., <h1>) ----
  if (exercise.instructions) {
    const requiredTag = extractRequiredTag(exercise.instructions);
    if (requiredTag) {
      const tagPresent = new RegExp(`<${requiredTag}[\\s>]`, "i").test(html);
      results.push({
        name: `Required <${requiredTag}> element`,
        passed: tagPresent,
        message: tagPresent
          ? `Your code includes a <${requiredTag}> element.`
          : `Missing required <${requiredTag}> element.`,
      });
    }
  }

  // ---- Test 4: CSS/JS aren't required but if provided, basic validity ----
  if (css.trim()) {
    results.push({
      name: "CSS included",
      passed: true,
      message: "CSS submitted — will be applied in preview.",
    });
  }

  const allPassed = results.every((r) => r.passed);
  return { passed: allPassed, results };
}

function normalizeWhitespace(str) {
  return (str || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function checkBasicHtmlValidity(html) {
  // Very basic: count opening vs closing tags for common elements
  const tags = ["div", "p", "h1", "h2", "h3", "span", "ul", "li", "body", "html"];
  for (const tag of tags) {
    const opens = (html.match(new RegExp(`<${tag}(\\s|>)`, "gi")) || []).length;
    const closes = (html.match(new RegExp(`</${tag}>`, "gi")) || []).length;
    if (opens !== closes) {
      return {
        valid: false,
        message: `Tag mismatch: <${tag}> opened ${opens} time(s), closed ${closes} time(s).`,
      };
    }
  }
  return { valid: true, message: "HTML tag structure looks balanced." };
}

function extractRequiredTag(instructions) {
  // Look for patterns like "an <h1>" or "a <div>"
  const match = instructions.match(/<([a-z][a-z0-9]*)>/i);
  return match ? match[1].toLowerCase() : null;
}

module.exports = { gradeExercise };