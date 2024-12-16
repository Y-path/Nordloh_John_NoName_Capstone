const express = require("express");
const Review = require("../models/Review");
const router = express.Router();








// Get 3 reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

// Post a new review
router.post("/", async (req, res) => {
  console.log('Request body:', req.body);
  
  const { name, review } = req.body;
    try {
    const newReview = new Review({ name, review});
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: "Error posting review", error: err });
  }
});

module.exports = router;