// import { useParams, useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react";

// export default function ArtistDetails({ setArtist }) {
//   const [artist, setArtist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams(); // Get artist ID from URL
//   const [artistDetails, setArtistDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchArtistDetails = async () => {
//       try {
//         const clientId = ""; 
//         const clientSecret = ""; 

//         if (!clientId || !clientSecret) {
//             setError("Missing Spotify client credentials");
//             return;
//           }

//         const authResponse = await fetch("https://accounts.spotify.com/api/token", {
//           method: "POST",
//           headers: {
//             "Authorization": "Basic " + btoa(`${clientId}:${clientSecret}`),
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: "grant_type=client_credentials",
//         });

//         const authData = await authResponse.json();
//         const accessToken = authData.access_token;

//         // Fetch artist details by ID
//         const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
//           headers: {
//             "Authorization": `Bearer ${accessToken}`,
//           },
//         });

//         const artistData = await response.json();
//         console.log(artistData)
//         setArtistDetails(artistData);
//         setArtist(artistData);
//         setLoading(false);
//       } catch (e) {
//         setError("Error fetching artist details");
//         setLoading(false);
//       }
//     };

//     fetchArtistDetails();
//   }, [id, setArtist]);

//   if (loading) return <p>Loading artist details...</p>;
//   if (error) return <p>{error}</p>;

//   if (artist) {
//   return (
//     <div className="artist-details">
//       <h2>{artist.name}</h2>
//       <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
//       <p>{artist.followers.total} Followers</p>
//       <p>{artistDetails.genres.join(", ")}</p>
//       <p>{artistDetails.popularity} Popularity</p>
//       <a href={artistDetails.external_urls.spotify} target="_blank" rel="noopener noreferrer">Visit on Spotify</a>
//     </div>
//   );
// }
// return null;
// }

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ArtistDetails({ setArtist }) {
  // const { id } = useParams(); 
  const [artistDetails, setArtistDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { artistId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  // const artist = artistDetails;

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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

        const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        const artistData = await response.json();
        setArtistDetails(artistData);
        setArtist(artistData);
        setLoading(false);
      } catch (e) {
        setError("Error fetching artist details");
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId, setArtist]);



  const handleFavorite = async () => {
    try {
      const response = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: artistDetails.id, 
          name: artistDetails.name, 
          genre: artistDetails.genres[0],   
          imageUrl: artistDetails.images[0]?.url  
          

        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error("Failed to favorite the artist");
      }

      setIsFavorite(true);
      alert("Artist has been added to favorites!");
    } catch (err) {
      console.error("Error: ", err);
    alert(err.message || 'An error occurred');
      // setError(err.message);
    }
  };


  

  if (loading) return <p>Loading artist details...</p>;
  if (error) return <p>{error}</p>;

  if (artistDetails) {
    return (
      <div className="artist-details">
        <h2>{artistDetails.name}</h2>
        <img src={artistDetails.images[0]?.url} alt={artistDetails.name} className="artist-image" />
        <p>{artistDetails.followers.total} Followers</p>
        <p>{artistDetails.genres.join(", ")}</p>
        <p>{artistDetails.popularity} Popularity</p>
        <a href={artistDetails.external_urls.spotify} target="_blank" rel="noopener noreferrer">Visit on Spotify</a>

        <button
          onClick={handleFavorite}
          disabled={isFavorite}
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        >
          {isFavorite ? "Favorited" : "Add to Favorites"}
        </button>  


      </div>
    );
  }

  return null;
}

export default ArtistDetails;