import React, { useEffect, useState } from 'react';

const Favorites = ({ setFavoritesLoading }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFavoritesLoading(true);
        const fetchFavorites = async () => {
            try {

                // const response = await fetch('http://localhost:5000/favorites');
                const response = await fetch('https://nordloh-john-noname-capstone-backend.onrender.com/favorites');
                const favoriteData = await response.json();


                const updatedFavorites = await Promise.all(
                    favoriteData.map(async (artist) => {
                        const spotifyData = await fetchSpotifyArtistData(artist.artistId);
                        return { ...artist, ...spotifyData };
                    })
                );

                setFavorites(updatedFavorites);
                setLoading(false);
                setFavoritesLoading(false);
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Error fetching favorites');
                setLoading(false);
                setFavoritesLoading(false)
            }
        };

        //     fetchFavorites();
        //   }, []);

        fetchFavorites();


        return () => {
            setFavoritesLoading(false);
        };
    }, [setFavoritesLoading]);


    const fetchSpotifyArtistData = async (artistId) => {
        try {

            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

            // const clientId = '';
            // const clientSecret = '';


            const authResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials',
            });

            const authData = await authResponse.json();
            const accessToken = authData.access_token;


            const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const artistData = await artistResponse.json();
            return {
                imageUrl: artistData.images[0]?.url,
                genres: artistData.genres,

            };
        } catch (err) {
            console.error('Error fetching artist data from Spotify:', err);
            return {};
        }
    };



    const handleRemoveFavorite = async (artistId) => {
        try {

            const response = await fetch(`https://nordloh-john-noname-capstone-backend.onrender.com/favorites/${artistId}`, {
                method: 'DELETE',
            });

            if (response.ok) {

                setFavorites(prevFavorites => prevFavorites.filter(artist => artist._id !== artistId));
                alert("Artist has been removed from favorites!");
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error removing favorite');
            }

        } catch (err) {
            console.error('Error removing favorite from backend:', err);
            setError('Error removing favorite from backend');
        }
    };


    if (loading) {
        return <p style={{ fontSize: "30px"}} className='favorites-loading'>Loading your favorites...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="favorites">
            <h2>Your Favorite Artists</h2>
            <br></br>
            <br></br>
            
            {favorites.length > 0 ? (
                <div className="favorite-list">
                    {favorites.map((artist) => (
                        <div key={artist._id} className="favorite-item">
                            <h3>{artist.name}</h3>
                            {artist.imageUrl && <img src={artist.imageUrl} alt={artist.name} className="artist-image" />}
                            <p><strong>Genre:</strong> {artist.genres.join(', ')}</p>

                            {/* Remove from Favorites Button */}
                            <button
                                onClick={() => handleRemoveFavorite(artist._id)}
                                className="remove-favorite-button"
                            >
                                Remove from Favorites
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorites found.</p>
            )}
        </div>
    );
};

export default Favorites;
