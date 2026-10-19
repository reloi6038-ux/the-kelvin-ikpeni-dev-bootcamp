// Seeds one quiz per course for testing.
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Course = require("../models/Course");
const Module = require("../models/Module");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");

async function run() {
  await connectDB();
  await Quiz.deleteMany({});

  const courses = await Course.find({ isPublished: true }).lean();

  for (const course of courses) {
    const lesson = await Lesson.findOne({ courseId: course._id }).lean();
    if (!lesson) continue;

    await Quiz.create({
      courseId: course._id,
      lessonId: lesson._id,
      title: `${course.title} — Module Quiz`,
      description: `Test your understanding of ${course.title}.`,
      passingScore: 70,
      timeLimitMinutes: 15,
      questions: [
        {
          type: "multiple-choice",
          prompt: `What is the main focus of the ${course.title} course?`,
          options: [
            { text: course.description.slice(0, 80) + "...", isCorrect: true },
            { text: "Unrelated topic A", isCorrect: false },
            { text: "Unrelated topic B", isCorrect: false },
            { text: "Unrelated topic C", isCorrect: false },
          ],
          explanation: "The course description defines its focus.",
          points: 1,
        },
        {
          type: "true-false",
          prompt: "Practice is essential for learning to code.",
          options: [
            { text: "True", isCorrect: true },
            { text: "False", isCorrect: false },
          ],
          explanation: "Hands-on practice is the core learning method.",
          points: 1,
        },
        {
          type: "multiple-answer",
          prompt: "Which of these are valid HTTP methods?",
          options: [
            { text: "GET", isCorrect: true },
            { text: "POST", isCorrect: true },
            { text: "FETCH", isCorrect: false },
            { text: "DELETE", isCorrect: true },
          ],
          explanation: "GET, POST, and DELETE are HTTP methods. FETCH is a JavaScript API.",
          points: 2,
        },
      ],
    });

    console.log(`✅ Quiz for: ${course.title}`);
  }

  const total = await Quiz.countDocuments();
  console.log(`\n📊 Total quizzes: ${total}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});