const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  name: { type: String, required: true },
  // rating: { type: Number, required: true, min: 1, max: 5 },
  review: String,
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;