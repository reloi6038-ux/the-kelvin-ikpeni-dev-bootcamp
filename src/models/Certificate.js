const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
    revoked: { type: Boolean, default: false, index: true },
    revokedAt: Date,
    revocationReason: String,
    pdfUrl: String,
  },
  { timestamps: true }
);

certificateSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Certificate", certificateSchema);