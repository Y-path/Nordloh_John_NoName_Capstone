// import { useEffect, useState } from 'react';

// export default function ArtistDisplay({ artistName }) {
//   const [artist, setArtist] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArtistData = async () => {
//       
//       const clientId = '';
//       const clientSecret = '';
      
//       const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//           'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: 'grant_type=client_credentials'
//       });
      
//       const tokenData = await tokenResponse.json();
//       const accessToken = tokenData.access_token;

//       
//       const response = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         }
//       });

//       const data = await response.json();
      
//       if (data.artists.items.length > 0) {
//         setArtist(data.artists.items[0]);
//       } else {
//         setArtist(null); // No artist found
//       }
//       setLoading(false);
//     };

//     fetchArtistData();
//   }, [artistName]);

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }

//   if (!artist) {
//     return <h1>No Artist Found</h1>;
//   }

//   return (
//     <>
//       <h1>{artist.name}</h1>
//       <h2>Genres: {artist.genres.join(', ')}</h2>
//       <img src={artist.images[0]?.url} alt={artist.name} style={{ width: 200, height: 200 }} />
//       <p><strong>Popularity:</strong> {artist.popularity}</p>
//       <p><strong>Followers:</strong> {artist.followers.total}</p>
//       <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">Visit Artist on Spotify</a>
//     </>
//   );
// }

export default function ArtistDisplay({ artist }) {
    if (!artist) {
      return <div>No artist data available</div>;
    }
  
    return (
      <div>
        <h2>{artist.name}</h2>
          <img src={artist.images[0]?.url}
          alt={artist.name}
          style={{ width: "300px", height: "300px" }}
        />
        <h3>Genres: {artist.genres.join(", ")}</h3>
        <p><strong>Followers:</strong> {artist.followers.total}</p>
        <p><strong>Popularity:</strong> {artist.popularity}</p>
        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          Visit Artist on Spotify
        </a>
      </div>
    );
  }