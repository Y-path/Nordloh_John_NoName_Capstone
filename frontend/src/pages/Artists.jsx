import { useState, useEffect } from "react";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetchRandomArtist();
  }, []);

  const fetchRandomArtist = async () => {
    setLoading(true);
    setError(null);

    try {

        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        
    //   const clientId = "";
    //   const clientSecret = "";

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
        "https://api.spotify.com/v1/artists?limit=1", 
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.artists.items.length > 0) {
        setArtists(data.artists.items);
        setSelectedArtist(data.artists.items[0]);
      } else {
        setError("No artist found");
      }
    } catch (e) {
      setError("Error fetching artist data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-page">
      <h2>Random Artist</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {selectedArtist && (
        <div className="artist-details">
          <img
            src={selectedArtist.images[0]?.url}
            alt={selectedArtist.name}
            className="artist-image"
          />
          <h3>{selectedArtist.name}</h3>
          <p>{selectedArtist.followers.total} Followers</p>
          <p>{selectedArtist.genres.join(", ")}</p>
          <p>Popularity: {selectedArtist.popularity}</p>
          <a href={selectedArtist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            Visit on Spotify
          </a>
        </div>
      )}
    </div>
  );
}

export default Artists;
