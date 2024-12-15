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