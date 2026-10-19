// ============================================================
// src/routes/enrollments.js
// POST   /api/enrollments            → enroll in a course
// GET    /api/enrollments            → my enrollments
// DELETE /api/enrollments/:courseId  → drop a course
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth } = require("../middleware/auth");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");

// ---------- POST /api/enrollments ----------
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { courseId, slug } = req.body || {};

    if (!courseId && !slug) {
      const err = new Error("courseId or slug is required");
      err.statusCode = 400;
      return next(err);
    }

    const course = courseId
      ? await Course.findById(courseId)
      : await Course.findOne({ slug });

    if (!course || !course.isPublished) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return next(err);
    }

    const existing = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: course._id,
    });

    if (existing) {
      return res.json({
        success: true,
        message: "Already enrolled",
        enrollment: existing,
      });
    }

    const enrollment = await Enrollment.create({
      studentId: req.user._id,
      courseId: course._id,
      status: "active",
    });

    res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    });
  })
);

// ---------- GET /api/enrollments ----------
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ studentId: req.user._id })
      .populate("courseId", "title slug description level estimatedHours")
      .sort({ createdAt: -1 })
      .lean();

    const enriched = await Promise.all(
      enrollments.map(async (enr) => {
        const course = enr.courseId;
        if (!course) return null;

        const totalLessons = await Lesson.countDocuments({
          courseId: course._id,
        });

        const completedLessons = await LessonProgress.countDocuments({
          studentId: req.user._id,
          courseId: course._id,
          status: "completed",
        });

        const percent =
          totalLessons === 0
            ? 0
            : Math.round((completedLessons / totalLessons) * 100);

        return {
          _id: enr._id,
          status: enr.status,
          enrolledAt: enr.enrolledAt,
          completedAt: enr.completedAt,
          course: {
            _id: course._id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            level: course.level,
            estimatedHours: course.estimatedHours,
          },
          progress: {
            completed: completedLessons,
            total: totalLessons,
            percent,
          },
        };
      })
    );

    res.json({
      success: true,
      count: enriched.length,
      enrollments: enriched.filter(Boolean),
    });
  })
);

// ---------- DELETE /api/enrollments/:courseId ----------
router.delete(
  "/:courseId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const result = await Enrollment.findOneAndDelete({
      studentId: req.user._id,
      courseId: req.params.courseId,
    });

    res.json({
      success: true,
      message: result ? "Enrollment removed" : "No enrollment to remove",
    });
  })
);

module.exports = router;