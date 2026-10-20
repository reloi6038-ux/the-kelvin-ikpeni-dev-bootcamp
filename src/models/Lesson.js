const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    content: { type: String, required: true },
    estimatedMinutes: { type: Number, default: 10, min: 1 },
    order: { type: Number, required: true, default: 0 },
    exercise: {
      enabled: { type: Boolean, default: false },
      instructions: String,
      expectedOutput: String,
      starterHtml: String,
      starterCss: String,
      starterJs: String,
      solutionHtml: String,
      solutionCss: String,
      solutionJs: String,
      walkthrough: String,
    },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  },
  { timestamps: true }
);

lessonSchema.index({ moduleId: 1, order: 1 });
lessonSchema.index({ courseId: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model("Lesson", lessonSchema);