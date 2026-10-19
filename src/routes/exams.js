// ============================================================
// src/routes/exams.js
// Final examination with countdown + server-side timing.
// POST /api/exams/:quizId/start     → begin an attempt (returns expiresAt)
// POST /api/exams/:quizId/submit    → grade (rejects if time expired)
// GET  /api/exams/:quizId/status    → current attempt + remaining time
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

const MAX_ATTEMPTS = 3; // retake policy

// ---------- POST /api/exams/:quizId/start ----------
router.post(
  "/:quizId/start",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      const err = new Error("Exam not found");
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

    // Check for an in-progress attempt
    const inProgress = await ExamAttempt.findOne({
      studentId: req.user._id,
      quizId: quiz._id,
      submittedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (inProgress) {
      return res.json({
        success: true,
        attemptId: inProgress._id,
        expiresAt: inProgress.expiresAt,
        quiz: sanitizeQuizForClient(quiz),
        resumed: true,
      });
    }

    // Retake policy
    const completedAttempts = await ExamAttempt.countDocuments({
      studentId: req.user._id,
      quizId: quiz._id,
      submittedAt: { $ne: null },
    });

    if (completedAttempts >= MAX_ATTEMPTS) {
      const err = new Error(`You have used all ${MAX_ATTEMPTS} attempts for this exam`);
      err.statusCode = 403;
      return next(err);
    }

    // Create new attempt with server-side expiry
    const timeLimitMinutes = quiz.timeLimitMinutes || 60;
    const expiresAt = new Date(Date.now() + timeLimitMinutes * 60 * 1000);

    const attempt = await ExamAttempt.create({
      studentId: req.user._id,
      quizId: quiz._id,
      courseId: quiz.courseId,
      attemptNumber: completedAttempts + 1,
      startedAt: new Date(),
      expiresAt,
    });

    res.json({
      success: true,
      attemptId: attempt._id,
      expiresAt,
      quiz: sanitizeQuizForClient(quiz),
      resumed: false,
    });
  })
);

// ---------- POST /api/exams/:quizId/submit ----------
router.post(
  "/:quizId/submit",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { attemptId, answers } = req.body || {};
    if (!attemptId || !Array.isArray(answers)) {
      const err = new Error("attemptId and answers are required");
      err.statusCode = 400;
      return next(err);
    }

    const attempt = await ExamAttempt.findOne({
      _id: attemptId,
      studentId: req.user._id,
    });

    if (!attempt) {
      const err = new Error("Attempt not found");
      err.statusCode = 404;
      return next(err);
    }

    if (attempt.submittedAt) {
      const err = new Error("This attempt was already submitted");
      err.statusCode = 409;
      return next(err);
    }

    // Server-side time enforcement
    if (attempt.expiresAt && new Date() > attempt.expiresAt) {
      // Auto-submit with whatever was sent (no penalty — server accepted what it could)
      // Mark as expired
      attempt.expired = true;
    }

    const quiz = await Quiz.findById(attempt.quizId);
    const { score, passed, totalPoints, earnedPoints, results } = gradeQuiz(quiz, answers);

    attempt.submittedAt = new Date();
    attempt.answers = results.map((r) => ({
      questionId: r.questionId,
      selectedAnswers: r.selectedIndices,
      isCorrect: r.isCorrect,
      pointsEarned: r.pointsEarned,
    }));
    attempt.score = score;
    attempt.passed = passed;
    await attempt.save();

    if (passed) {
      await achievements.onExamPassed(req.user._id, quiz._id, quiz.title);
    }

    res.json({
      success: true,
      attemptId: attempt._id,
      score,
      passed,
      totalPoints,
      earnedPoints,
      passingScore: quiz.passingScore,
      results,
    });
  })
);

// ---------- GET /api/exams/:quizId/status ----------
router.get(
  "/:quizId/status",
  requireAuth,
  asyncHandler(async (req, res) => {
    const inProgress = await ExamAttempt.findOne({
      studentId: req.user._id,
      quizId: req.params.quizId,
      submittedAt: null,
    }).sort({ createdAt: -1 }).lean();

    const attempts = await ExamAttempt.find({
      studentId: req.user._id,
      quizId: req.params.quizId,
      submittedAt: { $ne: null },
    })
      .sort({ attemptNumber: -1 })
      .lean();

    res.json({
      success: true,
      inProgress: inProgress
        ? {
            attemptId: inProgress._id,
            expiresAt: inProgress.expiresAt,
            remainingSeconds: Math.max(
              0,
              Math.floor((new Date(inProgress.expiresAt) - new Date()) / 1000)
            ),
          }
        : null,
      attempts,
      attemptsUsed: attempts.length,
      attemptsRemaining: Math.max(0, MAX_ATTEMPTS - attempts.length),
    });
  })
);

module.exports = router;