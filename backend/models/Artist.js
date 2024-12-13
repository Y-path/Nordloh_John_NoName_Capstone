const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  images: [String], 
  favoritesCount: { type: Number, default: 0 },
});

artistSchema.methods.incrementFavoritesCount = async function () {
  this.favoritesCount += 1;
  await this.save();
};

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;