import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import { Reviews } from "./pages/Reviews";
import { Contact } from "./pages/Contact";

export default function App() {
  const [artists, setArtists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [isArtistClick, setIsArtistClick] = useState(false);

  const genres = ["pop", "rap", "rock", "hip-hop", "jazz", "classical", "electronic", "punk", "classic-rock", "r&b", "hard-rock", "emo", "new-wave", "soul",
    "funk", "grunge", "post-punk", "folk", "country", "metal", "shoegaze", "reggae"];

  useEffect(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    setSelectedGenre(randomGenre);
    getArtistsByGenre(randomGenre);
  }, []);

  useEffect(() => {
    if (selectedGenre && !isArtistClick) {
      getArtistsByGenre(selectedGenre);
    }
    setIsArtistClick(false);
  }, [selectedGenre]);

  const getArtistsByGenre = async (genre) => {
    console.log("Fetching artists for genre:", genre);
    setLoading(true);
    setError(null);
    setSelectedArtist(null);

    try {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

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
    setSearchQuery("");
    setShowSidebar(true);
    setIsArtistClick(true);

    if (artist.genres && artist.genres.length > 0) {
      const artistGenre = artist.genres.find(genre => genres.includes(genre)) || artist.genres[0];
      setSelectedGenre(artistGenre);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      getArtistsByName(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setSelectedArtist(null);
  };

  return (
    <Router>
      <div className={`App ${selectedGenre}`}>
        <Navbar />
        <div className="nav">
          <Routes>
            <Route path="/" element={
              <>
                <div className="Home">
                  {showSidebar && (<Sidebar artist={selectedArtist}
                    closeSidebar={closeSidebar} />)}
                  <Form onSearch={(genre) => {
                    setSelectedGenre(genre);
                    setSelectedArtist(null);
                    setIsArtistClick(false);
                    getArtistsByGenre(genre);
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
                  {loading && <p className="initial-load">Loading...</p>}
                  {error && <p>{error}</p>}
                  {artists.length > 0 && (
                    <div className="artists">
                      <h3>Artists:</h3>
                      <div className="artist-list">
                        {artists.map((artist) => (
                          <div key={artist.id} className="artist-item" onClick={() => handleArtistClick(artist)}>
                            <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
                            <p>{artist.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            }
            />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<Favorites setFavoritesLoading={setFavoritesLoading} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


