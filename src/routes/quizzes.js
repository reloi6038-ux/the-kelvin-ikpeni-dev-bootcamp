// ============================================================
// src/routes/quizzes.js
// GET  /api/quizzes/:quizId         → sanitized quiz (no answers)
// POST /api/quizzes/:quizId/submit  → grade + record attempt
// GET  /api/quizzes/:quizId/results → my attempt history
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth } = require("../middleware/auth");
const Quiz = require("../models/Quiz");
const ExamAttempt = require("../models/ExamAttempt");
const Enrollment = require("../models/Enrollment");
const { gradeQuiz, sanitizeQuizForClient } = require("../services/quizGrader");
const achievements = require("../services/achievements");

// ---------- GET /api/quizzes/:quizId ----------
router.get(
  "/:quizId",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      const err = new Error("Quiz not found");
      err.statusCode = 404;
      return next(err);
    }

    // Must be enrolled
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: quiz.courseId,
    });
    if (!enrollment) {
      const err = new Error("You must be enrolled in this course first");
      err.statusCode = 403;
      return next(err);
    }

    res.json({
      success: true,
      quiz: sanitizeQuizForClient(quiz),
    });
  })
);

// ---------- POST /api/quizzes/:quizId/submit ----------
router.post(
  "/:quizId/submit",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      const err = new Error("Quiz not found");
      err.statusCode = 404;
      return next(err);
    }

    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: quiz.courseId,
    });
    if (!enrollment) {
      const err = new Error("You must be enrolled in this course first");
      err.statusCode = 403;
      return next(err);
    }

    const { answers } = req.body || {};
    if (!Array.isArray(answers)) {
      const err = new Error("answers must be an array");
      err.statusCode = 400;
      return next(err);
    }

    const { score, passed, totalPoints, earnedPoints, results } = gradeQuiz(quiz, answers);

    // Attempt tracking
    const previousAttempts = await ExamAttempt.countDocuments({
      studentId: req.user._id,
      quizId: quiz._id,
    });

    const attempt = await ExamAttempt.create({
      studentId: req.user._id,
      quizId: quiz._id,
      courseId: quiz.courseId,
      attemptNumber: previousAttempts + 1,
      submittedAt: new Date(),
      answers: results.map((r) => ({
        questionId: r.questionId,
        selectedAnswers: r.selectedIndices,
        isCorrect: r.isCorrect,
        pointsEarned: r.pointsEarned,
      })),
      score,
      passed,
    });

    // Award achievement for perfect score
    if (score === 100) {
      await achievements.onQuizPerfect(req.user._id, quiz._id, quiz.title);
    }

    res.json({
      success: true,
      attemptId: attempt._id,
      attemptNumber: attempt.attemptNumber,
      score,
      passed,
      totalPoints,
      earnedPoints,
      passingScore: quiz.passingScore,
      results,
    });
  })
);

// ---------- GET /api/quizzes/:quizId/results ----------
router.get(
  "/:quizId/results",
  requireAuth,
  asyncHandler(async (req, res) => {
    const attempts = await ExamAttempt.find({
      studentId: req.user._id,
      quizId: req.params.quizId,
    })
      .sort({ attemptNumber: -1 })
      .lean();

    res.json({ success: true, attempts });
  })
);

module.exports = router;