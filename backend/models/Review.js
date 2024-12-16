const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  // rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  photo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;