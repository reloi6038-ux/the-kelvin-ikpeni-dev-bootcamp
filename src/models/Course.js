const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"],
    },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      index: true,
    },
    estimatedHours: { type: Number, min: 1, required: true },
    icon: String,
    order: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: false, index: true },
    prerequisites: [{ type: String }],
  },
  { timestamps: true }
);

courseSchema.index({ isPublished: 1, order: 1 });

module.exports = mongoose.model("Course", courseSchema);