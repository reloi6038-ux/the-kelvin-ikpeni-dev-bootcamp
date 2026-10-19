const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "first-lesson",
        "course-complete",
        "quiz-perfect",
        "exam-passed",
        "streak-7",
      ],
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    earnedAt: { type: Date, default: Date.now },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

achievementSchema.index({ studentId: 1, type: 1 });

module.exports = mongoose.model("Achievement", achievementSchema);