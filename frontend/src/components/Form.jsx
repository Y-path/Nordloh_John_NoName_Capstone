import { useState } from "react";
export default function Form({ onSearch, genres }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGenre) {
      onSearch(selectedGenre);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="genre">Choose a genre:</label>&nbsp;&nbsp;
      <select className="text-white"
        id="genre"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">Select genre</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>&nbsp;&nbsp;
      <button type="submit">Search</button>
    </form>
  );
}


