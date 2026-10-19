// ============================================================
// src/services/quizGrader.js
// Server-side grading. Answers NEVER leave the server.
// ============================================================

/**
 * Grade a submission against a quiz.
 * @param {object} quiz - Mongoose quiz document (with questions + answers)
 * @param {Array} submittedAnswers - [{ questionId, selectedAnswers: [indices] }]
 * @returns {{ score, passed, totalPoints, earnedPoints, results }}
 */
function gradeQuiz(quiz, submittedAnswers) {
  const results = [];
  let totalPoints = 0;
  let earnedPoints = 0;

  for (const question of quiz.questions) {
    const points = question.points || 1;
    totalPoints += points;

    const submitted = submittedAnswers.find(
      (a) => a.questionId.toString() === question._id.toString()
    );
    const selected = (submitted && submitted.selectedAnswers) || [];

    // Determine correct answer indices
    const correctIndices =
      question.type === "multiple-answer"
        ? question.correctAnswers || []
        : question.options
            .map((opt, i) => (opt.isCorrect ? i : -1))
            .filter((i) => i !== -1);

    // Sort both for comparison
    const a = [...selected].sort((x, y) => x - y);
    const b = [...correctIndices].sort((x, y) => x - y);
    const isCorrect = a.length === b.length && a.every((v, i) => v === b[i]);

    if (isCorrect) earnedPoints += points;

    results.push({
      questionId: question._id.toString(),
      isCorrect,
      pointsEarned: isCorrect ? points : 0,
      pointsPossible: points,
      correctIndices,
      selectedIndices: selected,
      explanation: question.explanation || "",
    });
  }

  const score =
    totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);
  const passed = score >= (quiz.passingScore || 70);

  return { score, passed, totalPoints, earnedPoints, results };
}

/**
 * Strip correct answers from a quiz before sending to the client.
 * This is the ONLY safe way to deliver quiz data to the browser.
 */
function sanitizeQuizForClient(quiz) {
  return {
    _id: quiz._id,
    title: quiz.title,
    description: quiz.description,
    passingScore: quiz.passingScore,
    timeLimitMinutes: quiz.timeLimitMinutes,
    questions: quiz.questions.map((q) => ({
      _id: q._id,
      type: q.type,
      prompt: q.prompt,
      options: q.options.map((opt) => ({ text: opt.text })),
      points: q.points,
      // NO isCorrect, NO correctAnswers, NO explanation
    })),
  };
}

module.exports = { gradeQuiz, sanitizeQuizForClient };