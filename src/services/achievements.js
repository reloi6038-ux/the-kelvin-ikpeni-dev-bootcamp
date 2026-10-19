// ============================================================
// src/services/achievements.js
// Award achievements on milestone events.
// ============================================================

const Achievement = require("../models/Achievement");

async function award(studentId, type, title, description, metadata = {}) {
  try {
    const existing = await Achievement.findOne({ studentId, type });
    if (existing) return null;

    return await Achievement.create({
      studentId,
      type,
      title,
      description,
      metadata,
      earnedAt: new Date(),
    });
  } catch (err) {
    console.error("Achievement award failed:", err.message);
    return null;
  }
}

async function onFirstLesson(studentId) {
  return award(
    studentId,
    "first-lesson",
    "First Steps",
    "Completed your first lesson"
  );
}

async function onCourseComplete(studentId, courseId, courseTitle) {
  return award(
    studentId,
    "course-complete",
    "Course Complete",
    `Finished ${courseTitle}`,
    { courseId }
  );
}

async function onQuizPerfect(studentId, quizId, quizTitle) {
  return award(
    studentId,
    "quiz-perfect",
    "Perfect Score",
    `100% on ${quizTitle}`,
    { quizId }
  );
}

async function onExamPassed(studentId, examId, examTitle) {
  return award(
    studentId,
    "exam-passed",
    "Examination Passed",
    `Passed ${examTitle}`,
    { examId }
  );
}

module.exports = {
  award,
  onFirstLesson,
  onCourseComplete,
  onQuizPerfect,
  onExamPassed,
};