const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  artistId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;