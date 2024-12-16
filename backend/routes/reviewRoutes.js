const express = require("express");
const Review = require("../models/Review");
const router = express.Router();
// const path = require("path");
const multer = require('multer');


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });





// Get 5 reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

// Post a new review
router.post("/", upload.single('photo'), async (req, res) => {
  console.log('Request body:', req.body);
  const { name, review } = req.body;
  const photo = req.file;
  if (!name || !review) {
    return res.status(400).send('Name and review are required');
  }
  console.log('Received review:', { name, review, photo });

  res.status(200).json({ name, review, photoUrl: photo ? `/uploads/${photo.filename}` : null });
  // try {
    
  //   const newReview = new Review({ name, review });
  //   await newReview.save();

  //   res.status(201).json(newReview);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'Error posting review' });
  // }
});
  
//   const { name, review, photo } = req.body;
//     try {
//     const newReview = new Review({ name, review, photo});
//     await newReview.save();
//     res.status(201).json(newReview);
//   } catch (err) {
//     res.status(500).json({ message: "Error posting review", error: err });
//   }
// });

module.exports = router;