const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;