const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "multiple-answer"],
      required: true,
    },
    prompt: { type: String, required: true },
    options: [{ text: String, isCorrect: Boolean }],
    correctAnswers: [{ type: Number }],
    explanation: String,
    points: { type: Number, default: 1, min: 1 },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", index: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", index: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: String,
    questions: [questionSchema],
    passingScore: { type: Number, default: 70, min: 0, max: 100 },
    timeLimitMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);