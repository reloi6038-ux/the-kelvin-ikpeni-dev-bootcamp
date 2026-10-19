const mongoose = require("mongoose");

const codingSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
      index: true,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", index: true },
    html: String,
    css: String,
    js: String,
    passed: { type: Boolean, default: false },
    testResults: [
      {
        name: String,
        passed: Boolean,
        message: String,
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

codingSubmissionSchema.index({ studentId: 1, lessonId: 1, submittedAt: -1 });

module.exports = mongoose.model("CodingSubmission", codingSubmissionSchema);