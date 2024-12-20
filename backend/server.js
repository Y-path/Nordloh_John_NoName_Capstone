const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const reviewRoutes = require("./routes/reviewRoutes");
const artistRoutes = require("./routes/artistRoutes")
const favoriteRoutes = require("./routes/favoriteRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

// const corsOptions = {
//   origin: 'https://nordloh-john-noname-capstone-frontend.onrender.com', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, 
// };

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.connect(
  process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("This project has no name");
});


app.use("/artists", artistRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));