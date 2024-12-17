const express = require("express");
const Review = require("../models/Review");
const router = express.Router();
// const path = require("path");
const multer = require('multer');



// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const upload = multer({ dest: "/../../frontend/uploads/" });
const upload = multer({ 
  dest: 'uploads/', 
  limits: { fileSize: 5 * 1024 * 1024 } // Max file size 5MB
});

// Post a new review
router.post("/", upload.single('photo'), async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  const { name, review } = req.body;
  const photo = req.file;
  if (!name || !review) {
    return res.status(400).send('Name and review are required');
  }

  const newReview = new Review ({
    name,
    review,
    // photo: photo ? photo.path : null,
    photoUrl: photo ? photo.path : null, 
    createdAt: new Date(),  
  });

  
  console.log(newReview);
  try {
    await newReview.save();
    res.status(200).json(newReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: 'Failed to save review', error: err.message || 'Unknown error', });
  }
});

  // console.log('Received review:', { name, review, photo });

  // res.status(200).json({ name, review, photoUrl: photo ? `/../..frontend/uploads/${photo.filename}` : null });

// });

// Get 5 reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

// Get a specific review
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'No review found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Put to update a review
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, review, photo } = req.body;

  try {
    const updatedReview = await Review.findOneAndUpdate({ _id: id },

      { name, review, photo },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'No review found' });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Delete a review
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Review.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing review", error: err });
  }
});

module.exports = router;



// try {

//   const newReview = new Review({ name, review });
//   await newReview.save();

//   res.status(201).json(newReview);
// } catch (err) {
//   console.error(err);
//   res.status(500).json({ message: 'Error posting review' });
// }
// });

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