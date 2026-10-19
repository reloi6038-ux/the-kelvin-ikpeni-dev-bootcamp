// ============================================================
// src/routes/progress.js
// POST /api/progress              → mark a lesson complete
// GET  /api/progress/lesson/:id   → single lesson status
// GET  /api/progress/:courseSlug  → progress for a course
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth } = require("../middleware/auth");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const LessonProgress = require("../models/LessonProgress");
const achievements = require("../services/achievements");

// ---------- POST /api/progress ----------
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { lessonId } = req.body || {};
    if (!lessonId) {
      const err = new Error("lessonId is required");
      err.statusCode = 400;
      return next(err);
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      const err = new Error("Lesson not found");
      err.statusCode = 404;
      return next(err);
    }

    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: lesson.courseId,
    });
    if (!enrollment) {
      const err = new Error("You must be enrolled in this course first");
      err.statusCode = 403;
      return next(err);
    }

    const progress = await LessonProgress.findOneAndUpdate(
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

      const course = await Course.findById(lesson.courseId).select("title");
      await achievements.onCourseComplete(
        req.user._id,
        lesson.courseId,
        course?.title || "course"
      );
    }

    res.json({
      success: true,
      message: "Lesson marked complete",
      progress,
    });
  })
);

// ---------- GET /api/progress/lesson/:lessonId ----------
// IMPORTANT: this specific route must come BEFORE /:courseSlug
router.get(
  "/lesson/:lessonId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const record = await LessonProgress.findOne({
      studentId: req.user._id,
      lessonId: req.params.lessonId,
    }).lean();

    res.json({
      success: true,
      completed: record?.status === "completed",
      status: record?.status || "not-started",
      completedAt: record?.completedAt || null,
    });
  })
);

// ---------- GET /api/progress/:courseSlug ----------
router.get(
  "/:courseSlug",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({ slug: req.params.courseSlug });
    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return next(err);
    }

    const totalLessons = await Lesson.countDocuments({ courseId: course._id });
    const progressRecords = await LessonProgress.find({
      studentId: req.user._id,
      courseId: course._id,
    })
      .select("lessonId status completedAt")
      .lean();

    const completedIds = progressRecords
      .filter((p) => p.status === "completed")
      .map((p) => p.lessonId.toString());

    res.json({
      success: true,
      courseId: course._id,
      courseSlug: course.slug,
      totalLessons,
      completedLessons: completedIds.length,
      percent:
        totalLessons === 0
          ? 0
          : Math.round((completedIds.length / totalLessons) * 100),
      completedLessonIds: completedIds,
    });
  })
);

module.exports = router;