const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedAnswers: [Number],
  isCorrect: Boolean,
  pointsEarned: { type: Number, default: 0 },
});

const examAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", index: true },
    attemptNumber: { type: Number, default: 1 },
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    answers: [answerSchema],
    score: { type: Number, min: 0, max: 100 },
    passed: { type: Boolean, default: false },
    expiresAt: Date,
  },
  { timestamps: true }
);

examAttemptSchema.index({ studentId: 1, quizId: 1, attemptNumber: -1 });
examAttemptSchema.index({ studentId: 1, courseId: 1, submittedAt: -1 });

module.exports = mongoose.model("ExamAttempt", examAttemptSchema);