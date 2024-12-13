const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Get reviews for an artist
router.get("/:artistId", async (req, res) => {
  try {
    const reviews = await Review.find({ artistId: req.params.artistId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

// Post a new review
router.post("/", async (req, res) => {
  const { artistId, userName, rating, comment } = req.body;
  try {
    const review = new Review({ artistId, userName, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error posting review", error: err });
  }
});

module.exports = router;