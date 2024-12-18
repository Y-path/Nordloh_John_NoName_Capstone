const express = require("express");
const Artist = require("../models/Artist");
const router = express.Router();

// Get all artists
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching artists", error: err });
  }
});

// Add a new artist
router.post("/", async (req, res) => {
  const { name, genre, images } = req.body;
  try {
    const artist = new Artist({ name, genre, images });
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ message: "Error creating artist", error: err });
  }
});

module.exports = router;