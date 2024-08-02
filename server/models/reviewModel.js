const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    bookTitle: { type: String, required: true },
    author: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
