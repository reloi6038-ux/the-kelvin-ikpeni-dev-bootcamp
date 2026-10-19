// ============================================================
// src/seed/run-full-seed.js
// Seeds all 16 learning paths (courses, modules, lessons).
// Idempotent: clears all existing curriculum before seeding.
// ============================================================

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");

const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const paths = require("./curriculum");

async function run() {
  await connectDB();

  console.log(`\n🧹 Clearing existing curriculum...`);
  await Course.deleteMany({});
  await Module.deleteMany({});
  await Lesson.deleteMany({});
  console.log("   Cleared.");

  let totalCourses = 0;
  let totalModules = 0;
  let totalLessons = 0;

  for (const path of paths) {
    // 1. Create course
    const course = await Course.create(path.course);
    totalCourses++;

    // 2. Create modules and lessons
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

    console.log(
      `✅ ${path.course.title.padEnd(45)} ${path.modules.length} modules, ${path.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)} lessons`
    );
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Courses : ${totalCourses}`);
  console.log(`   Modules : ${totalModules}`);
  console.log(`   Lessons : ${totalLessons}`);

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