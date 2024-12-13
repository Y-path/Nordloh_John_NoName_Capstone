import React from "react";

function Sidebar({ artist, closeSidebar }) {
  if (!artist) return null; 

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={closeSidebar}>Close</button>
      <h2>{artist.name}</h2>
      <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
      <p><strong>Followers:</strong> {artist.followers?.total}</p>
      <p><strong>Genres:</strong> {artist.genres?.join(", ")}</p>
      <p><strong>Popularity:</strong> {artist.popularity}</p>
      <a href={artist.external_urls?.spotify} target="_blank" rel="noopener noreferrer">Visit on Spotify</a>
    </div>
  );
}

export default Sidebar;