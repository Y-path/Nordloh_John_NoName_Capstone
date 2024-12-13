import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
// import { useParams, useNavigate } from "react-router-dom"

// import ArtistDisplay from "./components/ArtistDisplay";
import Form from "./components/Form";
// import ArtistDetails from "./components/ArtistDetails";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [artists, setArtists] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [artist, setArtist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const getArtistsByGenre = async (genre) => {
    setLoading(true);
    setError(null);
    setSelectedArtist(null);

// the below does not work if stored in .env file
    // try {
    //   // Get Spotify client credentials from .env file
    //   const clientId = process.env.SPOTIFY_CLIENT_ID;
    //   const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    try {
      const clientId = "a4fc6e0dd9ee4b2aa3277f8a275cba15";
      const clientSecret = "92e7200e0b66404e82143d38cb5fc8a9";

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

  const genres = ["Pop", "Rock", "Hip-hop", "Jazz", "Classical", "Electronic", "Punk", "Emo", "New-wave", "Soul",
     "Funk", "Grunge", "Post-punk", "Folk", "Country", "Classic-rock", "Alternative", "Metal", "Rap", "Shoegaze", "Reggae", ];

  
  useEffect(() => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    setSelectedGenre(randomGenre);
    getArtistsByGenre(randomGenre);
  }, []);

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist); 
    setShowSidebar(true); 
  };

  const closeSidebar = () => {
    setShowSidebar(false); 
    setSelectedArtist(null); 
  };

  return (
//     <div className={`App ${selectedGenre}`}>
//       <h1 className="title">Genreator</h1>
//       <Form onSearch={(genre) => {
//         setSelectedGenre(genre);
//         getArtistsByGenre(genre);}} genres={genres} />

//       {selectedGenre && <h2>{selectedGenre}</h2>}

//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {artists.length > 0 && (
//         <div className="artists">
//           <h3>Artists:</h3>
          
          
//           <div className="artist-list">
//             {artists.map((artist) => (
//               <div key={artist.id} className="artist-item">
//                 {/* <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer"> */}
//                 <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
//                 <p>{artist.name}</p>
//                 {/* </a> */}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
<Router> 
      <div className={`App ${selectedGenre}`}>
      {showSidebar && <Sidebar artist={selectedArtist}  
      // isFavorite={isFavorite}handleFavorite={handleFavorite} 
          closeSidebar={closeSidebar} />}
        <h1 className="title">Genreator</h1>
        <Form onSearch={(genre) => {
          setSelectedGenre(genre);
          setSelectedArtist(null);
          getArtistsByGenre(genre);
          setShowSidebar(false);
          }} genres={genres} />

        {selectedGenre && <h2>{selectedGenre}</h2>}

        {/* <Routes>
          <Route path="/artist/:id" element={<ArtistDetails setArtist={setArtist} />} />
        </Routes> */}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {artists.length > 0 && (
          <div className="artists">
            <h3>Artists:</h3>
            <div className="artist-list">
              {artists.map((artist) => (
                <div key={artist.id} className="artist-item" onClick={() => handleArtistClick(artist)}>
                  <Link to={`/artist/${artist.id}`} className="artist-link">
                    <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
                    <p>{artist.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
{showSidebar && <Sidebar artist={selectedArtist} closeSidebar={closeSidebar} />}
        
        {/* <Routes>
          <Route path="/artist/:id" element={<ArtistDetails />} />
        </Routes> */}
      </div>
    </Router>
  );
}


// function ArtistDetails({ setArtist }) {
//   // const [artist, setArtist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams(); // Get artist ID from URL
//   const [artistDetails, setArtistDetails] = useState(null);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const fetchArtistDetails = async () => {
//       try {
//         const clientId = ""; 
//         const clientSecret = ""; 

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

//       
//         const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
//           headers: {
//             "Authorization": `Bearer ${accessToken}`,
//           },
//         });

//         const artistData = await response.json();
//         setArtist(artistData);
//         setArtistDetails(artistData);
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
//   if (artistDetails) {
//   return (
//     <div className="artist-details">
//       <h2>{artistDetails.name}</h2>
//       <img src={artistDetails.images[0]?.url} alt={artistDetails.name} className="artist-image" />
//       <p>{artistDetails.followers.total} Followers</p>
//       <p>{artistDetails.genres.join(", ")}</p>
//       <p>{artistDetails.popularity} Popularity</p>
//       <a href={artistDetails.external_urls.spotify} target="_blank" rel="noopener noreferrer">Visit on Spotify</a>
//     </div>
//   );
// }

// return null;
// }


