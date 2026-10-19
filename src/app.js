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

  // ---- Global API rate limit ----
  app.use("/api", apiLimiter);

  // ---- CSRF protection on state-changing requests ----
  app.use("/api", verifyCsrf);

  // ---- Static assets ----
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
  app.get("/about", sendPage("about.html"));
  app.get("/contact", sendPage("contact.html"));
  app.get("/login", sendPage("login.html"));
  app.get("/register", sendPage("register.html"));
  app.get("/dashboard", sendPage("dashboard.html"));

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