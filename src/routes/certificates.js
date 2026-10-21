// ============================================================
// src/routes/certificates.js
// POST /api/certificates/issue                 → check eligibility + issue
// GET  /api/certificates                       → my certificates
// GET  /api/certificates/:id/download          → download PDF
// GET  /api/certificates/verify/:id            → PUBLIC verification
// POST /api/certificates/:id/revoke            → admin only
// ============================================================

const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../middleware/errorHandler");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");
const ExamAttempt = require("../models/ExamAttempt");
const Enrollment = require("../models/Enrollment");
const {
  generateCertificateId,
  generateCertificatePdf,
} = require("../services/certificateGenerator");

// ---------- POST /api/certificates/issue ----------
router.post(
  "/issue",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { courseId } = req.body || {};
    if (!courseId) {
      const err = new Error("courseId is required");
      err.statusCode = 400;
      return next(err);
    }

    const course = await Course.findById(courseId);
    if (!course) {
      const err = new Error("Course not found");
      err.statusCode = 404;
      return next(err);
    }

    // Already issued?
    const existing = await Certificate.findOne({
      studentId: req.user._id,
      courseId: course._id,
    });
    if (existing) {
      return res.json({
        success: true,
        alreadyIssued: true,
        certificate: existing,
      });
    }

    // --- Eligibility check 1: enrolled ---
    const enrollment = await Enrollment.findOne({
      studentId: req.user._id,
      courseId: course._id,
    });
    if (!enrollment) {
      const err = new Error("You must be enrolled in this course first");
      err.statusCode = 403;
      return next(err);
    }

    // --- Eligibility check 2: all lessons completed ---
    const totalLessons = await Lesson.countDocuments({ courseId: course._id });
    const completedLessons = await LessonProgress.countDocuments({
      studentId: req.user._id,
      courseId: course._id,
      status: "completed",
    });
    if (totalLessons === 0 || completedLessons < totalLessons) {
      const err = new Error(
        `Course incomplete: ${completedLessons}/${totalLessons} lessons completed`
      );
      err.statusCode = 403;
      return next(err);
    }

    // --- Eligibility check 3: did they pass the exam? ---
    // If they passed, it's an Accomplishment. If not, it's a Completion.
    const passedAttempt = await ExamAttempt.findOne({
      studentId: req.user._id,
      courseId: course._id,
      passed: true,
    });
    
    const certType = passedAttempt ? "accomplishment" : "completion";

    // --- Issue ---
    const certificate = await Certificate.create({
      certificateId: generateCertificateId(),
      studentId: req.user._id,
      courseId: course._id,
      studentName: req.user.name,
      courseTitle: course.title,
      type: certType,
      issuedAt: new Date(),
      revoked: false,
    });

    res.status(201).json({ success: true, certificate });
  })
);

// ---------- GET /api/certificates ----------
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const certs = await Certificate.find({ studentId: req.user._id })
      .sort({ issuedAt: -1 })
      .lean();
    res.json({ success: true, count: certs.length, certificates: certs });
  })
);

// ---------- GET /api/certificates/verify/:id (PUBLIC) ----------
// IMPORTANT: this route must come BEFORE /:id/download
router.get(
  "/verify/:id",
  asyncHandler(async (req, res) => {
    // Enforce uppercase to ensure KIDB-2026-abc matches KIDB-2026-ABC
    const searchId = req.params.id.toUpperCase();
    
    const cert = await Certificate.findOne({
      certificateId: searchId,
    }).lean();

    if (!cert) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: "Certificate not found",
      });
    }

    res.json({
      success: true,
      valid: !cert.revoked,
      certificate: {
        certificateId: cert.certificateId,
        studentName: cert.studentName,
        courseTitle: cert.courseTitle,
        type: cert.type,
        issuedAt: cert.issuedAt,
        revoked: cert.revoked,
        revokedAt: cert.revokedAt,
        revocationReason: cert.revocationReason,
      },
    });
  })
);

// ---------- GET /api/certificates/:id/download ----------
router.get(
  "/:id/download",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const cert = await Certificate.findOne({
      certificateId: req.params.id.toUpperCase(),
    });

    if (!cert) {
      const err = new Error("Certificate not found");
      err.statusCode = 404;
      return next(err);
    }

    // Only the owner or an admin can download
    const isOwner = cert.studentId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      const err = new Error("Not authorized to download this certificate");
      err.statusCode = 403;
      return next(err);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${cert.certificateId}.pdf"`
    );

    try {
      await generateCertificatePdf({ certificate: cert, stream: res });
    } catch (err) {
      next(err);
    }
  })
);

// ---------- POST /api/certificates/:id/revoke ----------
router.post(
  "/:id/revoke",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res, next) => {
    const { reason } = req.body || {};
    if (!reason || typeof reason !== "string") {
      const err = new Error("A revocation reason is required");
      err.statusCode = 400;
      return next(err);
    }

    const cert = await Certificate.findOne({ certificateId: req.params.id.toUpperCase() });
    if (!cert) {
      const err = new Error("Certificate not found");
      err.statusCode = 404;
      return next(err);
    }

    if (cert.revoked) {
      return res.json({ success: true, message: "Already revoked", certificate: cert });
    }

    cert.revoked = true;
    cert.revokedAt = new Date();
    cert.revocationReason = reason;
    await cert.save();

    res.json({ success: true, message: "Certificate revoked", certificate: cert });
  })
);

module.exports = router;