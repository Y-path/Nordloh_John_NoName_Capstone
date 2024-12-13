const mongoose = require("mongoose");

// const favoriteSchema = new mongoose.Schema({
  
//   artistId: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
//   createdAt: { type: Date, default: Date.now },
// });
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
  }
 
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;