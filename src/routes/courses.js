const express = require("express");
const { asyncHandler } = require("../middleware/errorHandler");
const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");

const router = express.Router();

// GET /api/courses
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.find({ isPublished: true })
      .sort({ order: 1, createdAt: 1 })
      .select("title slug description level estimatedHours icon order")
      .lean();

    res.json({ success: true, count: courses.length, courses });
  })
);

// GET /api/courses/:slug
router.get(
  "/:slug",
  asyncHandler(async (req, res, next) => {
    const course = await Course.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!course) {
      const err = new Error(`Course not found: ${req.params.slug}`);
      err.statusCode = 404;
      return next(err);
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

    res.json({ success: true, course, modules: modulesWithLessons });
  })
);

module.exports = router;