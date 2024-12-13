const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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