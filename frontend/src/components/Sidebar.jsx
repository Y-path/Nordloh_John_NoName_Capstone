import React from "react";
import { useState, useEffect } from "react";

// function Sidebar({ artist, closeSidebar, isFavorite, handleFavorite }) {
//   if (!artist) return null; 
const Sidebar = React.forwardRef(({ artist, closeSidebar }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFavorite(false);
  }, [artist]);



  const handleFavorite = async () => {
    setLoading(true);
    try {

      const response = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: artist.id,
          name: artist.name,
          imageUrl: artist.images[0]?.url,
          genres: artist.genres,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to favorite the artist");
      }

      setIsFavorite(true);
      alert("Artist has been added to favorites!");
    } catch (err) {
      console.error("Error: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!artist) return null;

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={closeSidebar}>Close</button>
      <h2 style={{ marginTop: "30px" }}>{artist.name}</h2>
      <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
      <p><strong>Followers:</strong> {artist.followers?.total}</p>
      <p><strong>Genres:</strong> {artist.genres?.join(", ")}</p>
      <p><strong>Popularity:</strong> {artist.popularity}</p>
      &nbsp;&nbsp;
      <a href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">Visit on Spotify</a>&nbsp;&nbsp;
      <div></div>
      <button
        onClick={handleFavorite}
        disabled={isFavorite || loading}
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
      >
        {loading ? "Adding..." : isFavorite ? "Favorited" : "Add to Favorites"}
      </button>
      <div></div>
      {error && <p className="error">{error}</p>}

    </div>
  );
});

export default Sidebar;