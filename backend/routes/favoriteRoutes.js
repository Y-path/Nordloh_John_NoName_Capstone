const express = require("express");
const Favorite = require("../models/Favorite");
const router = express.Router();

// Add an artist to favorites
// router.post("/", async (req, res) => {
//     const { artistId } = req.body;
//     try {
//       // Check if the artist is already favorited
//       const existingFavorite = await Favorite.findOne({ artistId });
//       if (existingFavorite) {
//         return res.status(400).json({ message: "Artist is already in favorites" });
//       }

//       const favorite = new Favorite({ artistId });
//       await favorite.save();
//       res.status(201).json(favorite);
//     } catch (err) {
//       res.status(500).json({ message: "Error favoriting artist", error: err });
//     }
//   });



router.post("/", async (req, res) => {
  const { artistId, name, genres, imageUrl } = req.body;
  try {

    const existingFavorite = await Favorite.findOne({ artistId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Artist is already in favorites" });
    }


    const newFavorite = new Favorite({ artistId, name, genres, imageUrl });
    await newFavorite.save();

    //   // Increment favorites count
    //   const artist = await artist.findById(artistId);
    //   await artist.incrementFavoritesCount();

    res.status(200).json({ message: "Artist added to favorites!" });
  } catch (err) {
    res.status(500).json({ message: "Error favoriting artist", error: err });
  }
});

// Get all favorites
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find().populate("artistId");
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", error: err });
  }
});

// Get a specific favorite
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return res.status(404).json({ message: 'No favorite found' });
    }
    res.status(200).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Delete a favorite
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Favorite.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json({ message: "Favorite removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing favorite", error: err });
  }
});

module.exports = router;