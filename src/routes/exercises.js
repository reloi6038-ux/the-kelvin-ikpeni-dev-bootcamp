// ============================================================
// src/routes/exercises.js
// POST /api/exercises/:lessonId/submit
// Grade a student's code submission and save it.
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth } = require("../middleware/auth");
const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");
const CodingSubmission = require("../models/CodingSubmission");
const Enrollment = require("../models/Enrollment");
const { gradeExercise } = require("../services/exerciseGrader");
const achievements = require("../services/achievements");

// ---------- POST /api/exercises/:lessonId/submit ----------
router.post(
  "/:lessonId/submit",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { lessonId } = req.params;
    const { html, css, js } = req.body || {};

    if (!html && !css && !js) {
      const err = new Error("Submission is empty");
      err.statusCode = 400;
      return next(err);
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      const err = new Error("Lesson not found");
      err.statusCode = 404;
      return next(err);
    }

    if (!lesson.exercise || !lesson.exercise.enabled) {
      const err = new Error("This lesson has no exercise");
      err.statusCode = 400;
      return next(err);
    }

    // Must be enrolled
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: lesson.courseId,
    });
    if (!enrollment) {
      const err = new Error("You must be enrolled in this course first");
      err.statusCode = 403;
      return next(err);
    }

    // Grade
    const { passed, results } = gradeExercise(lesson, { html, css, js });

    // Save submission
    const submission = await CodingSubmission.create({
      studentId: req.user._id,
      lessonId: lesson._id,
      courseId: lesson.courseId,
      html: html || "",
      css: css || "",
      js: js || "",
      passed,
      testResults: results,
      submittedAt: new Date(),
    });

    // If passed, mark lesson complete
    if (passed) {
      await LessonProgress.findOneAndUpdate(
        { studentId: req.user._id, lessonId: lesson._id },
        {
          $set: {
            status: "completed",
            completedAt: new Date(),
            lastAccessedAt: new Date(),
            courseId: lesson.courseId,
          },
          $setOnInsert: { studentId: req.user._id, lessonId: lesson._id },
        },
        { new: true, upsert: true }
      );

      await achievements.onFirstLesson(req.user._id);

      // Check course completion
      const totalLessons = await Lesson.countDocuments({
        courseId: lesson.courseId,
      });
      const completedCount = await LessonProgress.countDocuments({
        studentId: req.user._id,
        courseId: lesson.courseId,
        status: "completed",
      });

      if (totalLessons > 0 && completedCount === totalLessons) {
        if (enrollment.status !== "completed") {
          enrollment.status = "completed";
          enrollment.completedAt = new Date();
          await enrollment.save();
        }
      }
    }

    res.json({
      success: true,
      passed,
      results,
      submissionId: submission._id,
      message: passed
        ? "All tests passed! Lesson marked complete."
        : "Some tests failed. Review the results and try again.",
    });
  })
);

module.exports = router;