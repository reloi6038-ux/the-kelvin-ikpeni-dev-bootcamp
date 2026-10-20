// ============================================================
// src/seed/run-full-seed.js
// Seeds all 16 learning paths + quizzes (courses, modules, lessons, quizzes).
// Idempotent: clears all existing curriculum before seeding.
// ============================================================

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");

const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");
const paths = require("./curriculum");

async function run() {
  await connectDB();

  console.log(`\n🧹 Clearing existing curriculum...`);
  await Course.deleteMany({});
  await Module.deleteMany({});
  await Lesson.deleteMany({});
  await Quiz.deleteMany({});
  console.log("   Cleared.");

  let totalCourses = 0;
  let totalModules = 0;
  let totalLessons = 0;
  let totalQuizzes = 0;

  for (const path of paths) {
    // Create course
    const course = await Course.create(path.course);
    totalCourses++;

    for (const mod of path.modules) {
      const createdModule = await Module.create({
        courseId: course._id,
        title: mod.title,
        description: mod.description,
        order: mod.order,
      });
      totalModules++;

      if (mod.lessons && mod.lessons.length) {
        for (const lesson of mod.lessons) {
          await Lesson.create({
            ...lesson,
            moduleId: createdModule._id,
            courseId: course._id,
          });
          totalLessons++;
        }
      }
    }

    // Attach a quiz per course
    const firstLesson = await Lesson.findOne({ courseId: course._id }).lean();
    if (firstLesson) {
      await Quiz.create({
        courseId: course._id,
        lessonId: firstLesson._id,
        title: `${course.title} — Module Quiz`,
        description: `Test your understanding of ${course.title}.`,
        passingScore: 70,
        timeLimitMinutes: 15,
        questions: [
          {
            type: "multiple-choice",
            prompt: `What is the main focus of "${course.title}"?`,
            options: [
              { text: course.description.slice(0, 80) + "...", isCorrect: true },
              { text: "An unrelated topic", isCorrect: false },
              { text: "Another unrelated topic", isCorrect: false },
              { text: "None of the above", isCorrect: false },
            ],
            explanation: "The course description defines its scope.",
            points: 1,
          },
          {
            type: "true-false",
            prompt: "Hands-on practice is essential for learning this material.",
            options: [
              { text: "True", isCorrect: true },
              { text: "False", isCorrect: false },
            ],
            explanation: "Every lesson includes practical exercises.",
            points: 1,
          },
          {
            type: "multiple-answer",
            prompt: "Which of the following are valid HTTP methods?",
            options: [
              { text: "GET", isCorrect: true },
              { text: "POST", isCorrect: true },
              { text: "FETCH", isCorrect: false },
              { text: "DELETE", isCorrect: true },
            ],
            explanation: "GET, POST, and DELETE are HTTP methods. FETCH is a browser API.",
            points: 2,
          },
        ],
      });
      totalQuizzes++;
    }

    console.log(
      `✅ ${path.course.title.padEnd(45)} ${path.modules.length} modules, ${path.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} lessons`
    );
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Courses : ${totalCourses}`);
  console.log(`   Modules : ${totalModules}`);
  console.log(`   Lessons : ${totalLessons}`);
  console.log(`   Quizzes : ${totalQuizzes}`);

  console.log(`\n📈 By level:`);
  for (const level of ["beginner", "intermediate", "advanced"]) {
    const count = await Course.countDocuments({ level });
    console.log(`   ${level.padEnd(12)}: ${count}`);
  }

  await mongoose.disconnect();
  console.log("\n🔌 Disconnected.\n");
}

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});