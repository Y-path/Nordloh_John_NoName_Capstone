
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Favorites from './pages/Favorites';
import { Reviews } from "./pages/Reviews";
// import Reviews from "./pages/Reviews";

export default function App() {
  const [artists, setArtists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  const genres = ["pop", "rock", "hip-hop", "jazz", "classical", "electronic", "punk", "emo", "new-wave", "soul",
    "funk", "grunge", "post-punk", "folk", "country", "classic-rock", "alternative", "metal", "rap", "shoegaze", "reggae",];

  useEffect(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    setSelectedGenre(randomGenre);
    getArtistsByGenre(randomGenre);
  }, []);


  const getArtistsByGenre = async (genre) => {
    setLoading(true);
    setError(null);
    setSelectedArtist(null);

    // the below does not work if stored in .env file
  try {
      // Get Spotify client credentials from .env file
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// console.log(clientId);

    // try {
    //   const clientId = "";
    //   const clientSecret = "";

      if (!clientId || !clientSecret) {
        throw new Error("Missing Spotify client credentials");
      }


      const authResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      const authData = await authResponse.json();
      const accessToken = authData.access_token;


      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${genre}&type=artist&limit=30`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.artists.items.length > 0) {
        setArtists(data.artists.items);
      } else {
        setError("No artists found for this genre");
        setArtists([]);
      }
    } catch (e) {
      console.error(e);
      setError("Error fetching artist data");
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };



  const getArtistsByName = async (name) => {
    setLoading(true);
    setError(null);
    setSelectedArtist(null);

   
    try {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    // try {
    //   const clientId = "";
    //   const clientSecret = "";

      if (!clientId || !clientSecret) {
        throw new Error("Missing Spotify client credentials");
      }

      const authResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      const authData = await authResponse.json();
      const accessToken = authData.access_token;

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=5`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.artists.items.length > 0) {
        setArtists(data.artists.items);

        const artist = data.artists.items[0];

        if (artist.genres && artist.genres.length > 0) {

          const matchingGenre = artist.genres.find(genre => genres.includes(genre));

          if (matchingGenre) {
            setSelectedGenre(matchingGenre);  
          }
        }


      } else {
        setError("No artists found for this name");
        setArtists([]);
      }
    } catch (e) {
      console.error(e);
      setError("Error fetching artist data");
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };




  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setShowSidebar(true);
    setSearchQuery("");
    if (artist.genres && artist.genres.length > 0) {
      setSelectedGenre(artist.genres[0]);
    }
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setSelectedArtist(null);
  };



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      getArtistsByName(searchQuery);
    }
  };


  return (

    <Router>
      <div className={`App ${selectedGenre}`}>
         <Navbar/>  
      {/*{!favoritesLoading && <Navbar />}*/}
        <Routes>
          <Route path="/" element={
            <>
              <div className="Home">


                {showSidebar && (<Sidebar artist={selectedArtist}
                  // isFavorite={isFavorite}handleFavorite={handleFavorite} 
                  closeSidebar={closeSidebar} />)}
                {/* <h1 className="title">Genreator</h1>  */}
                <Form onSearch={(genre) => {
                  setSelectedGenre(genre);
                  setSelectedArtist(null);
                  getArtistsByGenre(genre);
                  setShowSidebar(false);
                }} genres={genres} />


                <form onSubmit={handleSearchSubmit} className="search-form">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Artist name"
                  />
                  <button type="submit">Search</button>
                </form>



                {selectedGenre && <h2>{selectedGenre}</h2>}


                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {artists.length > 0 && (
                  <div className="artists">
                    <h3>Artists:</h3>
                    <div className="artist-list">
                      {artists.map((artist) => (
                        <div key={artist.id} className="artist-item" onClick={() => handleArtistClick(artist)}>
                          {/* <Link to={`/artist/${artist.id}`} className="artist-link"> */}
                          <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
                          <p>{artist.name}</p>
                          {/* </Link> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </>
          }
          />
          <Route path="/reviews" element={<Reviews/>}/>
          <Route path="/favorites" element={<Favorites setFavoritesLoading={setFavoritesLoading} />}
          />
        </Routes>
      </div>


    </Router>
  );
}


