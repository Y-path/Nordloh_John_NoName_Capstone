const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const cors = require('cors');
// const bodyParser = require("body-parser");
require('dotenv').config();
// const axios = require('axios');
const reviewRoutes = require("./backend/routes/reviewRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');



app.use(express.static("uploads"));
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());





mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('This project has no name');
  });

const artistRoutes = require("./backend/routes/artistRoutes")
// const reviewRoutes = require("./backend/routes/reviewRoutes");
const favoriteRoutes = require("./backend/routes/favoriteRoutes");

app.use("/artists", artistRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);

//   const getSpotifyToken = async () => {
//     const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
//     const authResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
//       headers: {
//         'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       params: {
//         grant_type: 'client_credentials',
//       },
//     });
  
//     return authResponse.data.access_token;
//   };
  
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));