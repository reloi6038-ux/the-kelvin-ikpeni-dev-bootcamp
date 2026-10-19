// ============================================================
// src/routes/lessons.js
// GET /api/lessons/:courseSlug          → full lesson tree
// GET /api/lessons/:courseSlug/:slug    → a single lesson
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { attachUser } = require("../middleware/auth");
const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");
const Enrollment = require("../models/Enrollment");

// ---------- GET /api/lessons/:courseSlug ----------
router.get(
  "/:courseSlug",
  attachUser,
  asyncHandler(async (req, res, nextErr) => {
    const course = await Course.findOne({
      slug: req.params.courseSlug,
      isPublished: true,
    }).lean();

    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return nextErr(err);
    }

    const modules = await Module.find({ courseId: course._id })
      .sort({ order: 1 })
      .lean();

    const modulesWithLessons = await Promise.all(
      modules.map(async (mod) => {
        const lessons = await Lesson.find({ moduleId: mod._id })
          .sort({ order: 1 })
          .select("title slug estimatedMinutes order")
          .lean();
        return { ...mod, lessons };
      })
    );

    let completedIds = [];
    if (req.user) {
      const progress = await LessonProgress.find({
        studentId: req.user._id,
        courseId: course._id,
        status: "completed",
      })
        .select("lessonId")
        .lean();
      completedIds = progress.map((p) => p.lessonId.toString());
    }

    res.json({
      success: true,
      course,
      modules: modulesWithLessons,
      completedLessonIds: completedIds,
    });
  })
);

// ---------- GET /api/lessons/:courseSlug/:slug ----------
router.get(
  "/:courseSlug/:slug",
  attachUser,
  asyncHandler(async (req, res, nextErr) => {
    const course = await Course.findOne({
      slug: req.params.courseSlug,
      isPublished: true,
    }).lean();

    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return nextErr(err);
    }

    const lesson = await Lesson.findOne({
      courseId: course._id,
      slug: req.params.slug,
    }).lean();

    if (!lesson) {
      const err = new Error("Lesson not found");
      err.statusCode = 404;
      return nextErr(err);
    }

    const modules = await Module.find({ courseId: course._id })
      .sort({ order: 1 })
      .lean();
    const moduleOrderMap = new Map(
      modules.map((m) => [m._id.toString(), m.order])
    );

    const allLessons = await Lesson.find({ courseId: course._id }).lean();
    allLessons.sort((a, b) => {
      const ma = moduleOrderMap.get(a.moduleId.toString()) || 0;
      const mb = moduleOrderMap.get(b.moduleId.toString()) || 0;
      if (ma !== mb) return ma - mb;
      return a.order - b.order;
    });

    const idx = allLessons.findIndex(
      (l) => l._id.toString() === lesson._id.toString()
    );
    const prevLesson = idx > 0 ? allLessons[idx - 1] : null;
    const nextLesson = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

    let completed = false;
    let enrolled = false;
    if (req.user) {
      const [progress, enrollment] = await Promise.all([
        LessonProgress.findOne({
          studentId: req.user._id,
          lessonId: lesson._id,
          status: "completed",
        }).lean(),
        Enrollment.findOne({
          studentId: req.user._id,
          courseId: course._id,
        }).lean(),
      ]);
      completed = Boolean(progress);
      enrolled = Boolean(enrollment);
    }

    res.json({
      success: true,
      course: {
        _id: course._id,
        title: course.title,
        slug: course.slug,
      },
      lesson,
      previous: prevLesson
        ? { title: prevLesson.title, slug: prevLesson.slug }
        : null,
      next: nextLesson
        ? { title: nextLesson.title, slug: nextLesson.slug }
        : null,
      position: { index: idx + 1, total: allLessons.length },
      completed,
      enrolled,
    });
  })
);

module.exports = router;