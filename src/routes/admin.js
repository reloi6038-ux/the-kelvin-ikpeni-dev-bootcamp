// ============================================================
// src/routes/admin.js
// All admin endpoints — every one requires authentication + admin role.
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { auditLog } = require("../middleware/auditLog");

const User = require("../models/User");
const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const Certificate = require("../models/Certificate");
const ExamAttempt = require("../models/ExamAttempt");
const CodingSubmission = require("../models/CodingSubmission");
const Quiz = require("../models/Quiz");

// Apply requireAuth + requireAdmin to every route in this file
router.use(requireAuth, requireAdmin);

// ---------- GET /api/admin/stats ----------
router.get(
  "/stats",
  asyncHandler(async (req, res) => {
    const [
      totalStudents,
      totalAdmins,
      totalCourses,
      totalLessons,
      totalEnrollments,
      totalCertificates,
      totalAttempts,
      totalSubmissions,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "admin" }),
      Course.countDocuments({}),
      Lesson.countDocuments({}),
      Enrollment.countDocuments({}),
      Certificate.countDocuments({ revoked: false }),
      ExamAttempt.countDocuments({}),
      CodingSubmission.countDocuments({}),
    ]);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalAdmins,
        totalCourses,
        totalLessons,
        totalEnrollments,
        totalCertificates,
        totalAttempts,
        totalSubmissions,
      },
    });
  })
);

// ---------- GET /api/admin/students ----------
router.get(
  "/students",
  asyncHandler(async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = Math.min(50, parseInt(req.query.perPage) || 20);
    const search = (req.query.search || "").trim();

    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};

    const [students, total] = await Promise.all([
      User.find(filter)
        .select("name email role createdAt lastLoginAt")
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean(),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      students,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  })
);

// ---------- PATCH /api/admin/students/:id/role ----------
router.patch(
  "/students/:id/role",
  auditLog("change-user-role"),
  asyncHandler(async (req, res, next) => {
    const { role } = req.body || {};
    if (!["student", "admin"].includes(role)) {
      const err = new Error('role must be "student" or "admin"');
      err.statusCode = 400;
      return next(err);
    }

    // Prevent self-demotion (last admin guard)
    if (req.params.id === req.user._id.toString() && role !== "admin") {
      const err = new Error("You cannot demote yourself");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  })
);

// ---------- GET /api/admin/courses ----------
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.find({})
      .sort({ order: 1 })
      .lean();

    // Attach counts
    const enriched = await Promise.all(
      courses.map(async (c) => {
        const [modules, lessons, enrollments] = await Promise.all([
          Module.countDocuments({ courseId: c._id }),
          Lesson.countDocuments({ courseId: c._id }),
          Enrollment.countDocuments({ courseId: c._id }),
        ]);
        return { ...c, moduleCount: modules, lessonCount: lessons, enrollmentCount: enrollments };
      })
    );

    res.json({ success: true, courses: enriched });
  })
);

// ---------- POST /api/admin/courses ----------
router.post(
  "/courses",
  auditLog("create-course"),
  asyncHandler(async (req, res, next) => {
    const { title, slug, description, level, estimatedHours, order } = req.body || {};
    if (!title || !slug || !description || !level) {
      const err = new Error("title, slug, description, level are required");
      err.statusCode = 400;
      return next(err);
    }

    const existing = await Course.findOne({ slug });
    if (existing) {
      const err = new Error("A course with this slug already exists");
      err.statusCode = 409;
      return next(err);
    }

    const course = await Course.create({
      title,
      slug,
      description,
      level,
      estimatedHours: estimatedHours || 10,
      order: order || 0,
      isPublished: false,
    });

    res.status(201).json({ success: true, course });
  })
);

// ---------- PATCH /api/admin/courses/:id ----------
router.patch(
  "/courses/:id",
  auditLog("update-course"),
  asyncHandler(async (req, res, next) => {
    const allowed = [
      "title",
      "slug",
      "description",
      "level",
      "estimatedHours",
      "order",
      "isPublished",
      "icon",
    ];
    const updates = {};
    for (const k of allowed) {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    }

    const course = await Course.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, course });
  })
);

// ---------- DELETE /api/admin/courses/:id ----------
router.delete(
  "/courses/:id",
  auditLog("delete-course"),
  asyncHandler(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return next(err);
    }
    // Cascade: delete modules + lessons + quizzes for this course
    await Promise.all([
      Module.deleteMany({ courseId: course._id }),
      Lesson.deleteMany({ courseId: course._id }),
      Quiz.deleteMany({ courseId: course._id }),
    ]);
    res.json({ success: true, message: "Course and related content deleted" });
  })
);

// ---------- GET /api/admin/certificates ----------
router.get(
  "/certificates",
  asyncHandler(async (req, res) => {
    const certs = await Certificate.find({})
      .sort({ issuedAt: -1 })
      .limit(200)
      .lean();
    res.json({ success: true, count: certs.length, certificates: certs });
  })
);

// ---------- POST /api/admin/certificates/:id/revoke ----------
router.post(
  "/certificates/:id/revoke",
  auditLog("revoke-certificate"),
  asyncHandler(async (req, res, next) => {
    const { reason } = req.body || {};
    if (!reason || typeof reason !== "string" || reason.length < 3) {
      const err = new Error("reason is required (min 3 characters)");
      err.statusCode = 400;
      return next(err);
    }

    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) {
      const err = new Error("Certificate not found");
      err.statusCode = 404;
      return next(err);
    }

    cert.revoked = true;
    cert.revokedAt = new Date();
    cert.revocationReason = reason;
    await cert.save();

    res.json({ success: true, message: "Certificate revoked", certificate: cert });
  })
);

// ---------- GET /api/admin/attempts ----------
router.get(
  "/attempts",
  asyncHandler(async (req, res) => {
    const attempts = await ExamAttempt.find({ submittedAt: { $ne: null } })
      .sort({ submittedAt: -1 })
      .limit(100)
      .populate("studentId", "name email")
      .populate("quizId", "title")
      .lean();
    res.json({ success: true, count: attempts.length, attempts });
  })
);

// ---------- GET /api/admin/submissions ----------
router.get(
  "/submissions",
  asyncHandler(async (req, res) => {
    const subs = await CodingSubmission.find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .populate("studentId", "name email")
      .populate("lessonId", "title")
      .lean();
    res.json({ success: true, count: subs.length, submissions: subs });
  })
);

module.exports = router;