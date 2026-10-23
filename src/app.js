// ============================================================
// src/app.js
// Builds and returns the configured Express application.
// ============================================================

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { buildSessionMiddleware } = require("./config/session");
const { apiLimiter } = require("./middleware/rateLimiters");
const { verifyCsrf } = require("./middleware/csrf");

const healthRoutes = require("./routes/health");
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const enrollmentRoutes = require("./routes/enrollments");
const progressRoutes = require("./routes/progress");
const lessonRoutes = require("./routes/lessons");
const exerciseRoutes = require("./routes/exercises");
const quizRoutes = require("./routes/quizzes");
const examRoutes = require("./routes/exams");
const certificateRoutes = require("./routes/certificates");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");

const { notFound, errorHandler } = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  // ---- Security headers ----
  app.use(helmet({ contentSecurityPolicy: false }));

  // ---- Request logging ----
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "tiny"));

  // ---- Body parsing ----
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // ---- Trust proxy ----
  app.set("trust proxy", 1);

  // ---- Sessions ----
  app.use(buildSessionMiddleware());

  // ---- AUTO-LOGIN FOR GUESTS (Bypasses Auth) ----
  app.use(async (req, res, next) => {
    if (!req.session.userId) {
      try {
        const User = require("./models/User");
        let guest = await User.findOne({ email: "guest@kelvinbootcamp.com" });
        if (!guest) {
          guest = await User.create({
            name: "Guest Student",
            email: "guest@kelvinbootcamp.com",
            passwordHash: "no-password-required",
            role: "student",
          });
        }
        req.session.userId = guest._id.toString();
        req.session.role = guest.role;
      } catch (err) {
        console.error("Auto-login error:", err);
      }
    }
    next();
  });

  // ---- Global API rate limit ----
  app.use("/api", apiLimiter);

  // ---- CSRF protection ----
  app.use("/api", verifyCsrf);

  // ---- Static assets (including the APK download) ----
  app.use(express.static(path.join(__dirname, "..", "public")));

  // ---- API routes ----
  app.use("/api/health", healthRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/enrollments", enrollmentRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/exercises", exerciseRoutes);
  app.use("/api/quizzes", quizRoutes);
  app.use("/api/exams", examRoutes);
  app.use("/api/certificates", certificateRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/contact", contactRoutes);

  // ---- HTML page routes (clean URLs) ----
  const sendPage = (file) => (req, res) =>
    res.sendFile(path.join(__dirname, "..", "public", file));

  app.get("/", sendPage("index.html"));
  app.get("/courses", sendPage("courses.html"));
  app.get("/course-details", sendPage("course-details.html"));
  app.get("/lesson", sendPage("lesson.html"));
  app.get("/quiz", sendPage("quiz.html"));
  app.get("/final-exam", sendPage("final-exam.html"));
  app.get("/exam-results", sendPage("exam-results.html"));
  app.get("/certificates", sendPage("certificates.html"));
  
  // Verification pages
  app.get("/verify-certificate", sendPage("verify-certificate.html"));
  app.get("/verify", sendPage("verify-certificate.html")); 

  app.get("/about", sendPage("about.html"));
  app.get("/contact", sendPage("contact.html"));
  app.get("/dashboard", sendPage("dashboard.html"));
  
  // Mobile App Download Page
  app.get("/download", sendPage("download.html")); // <-- NEW ROUTE

  // ---- Admin pages ----
  app.get("/admin", sendPage("admin-dashboard.html"));
  app.get("/admin/manage-courses", sendPage("manage-courses.html"));
  app.get("/admin/manage-students", sendPage("manage-students.html"));
  app.get("/admin/manage-certificates", sendPage("manage-certificates.html"));
  app.get("/admin/manage-exams", sendPage("manage-exams.html"));
  app.get("/admin/manage-messages", sendPage("manage-messages.html"));

  // ---- API 404 (JSON) ----
  app.use("/api", notFound);

  // ---- Page 404 (branded HTML) ----
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
  });

  // ---- Central error handler ----
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };