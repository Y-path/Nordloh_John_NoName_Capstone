// import { useState } from "react";

// export default function Form({ artistsearch }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm) {
//       artistsearch(searchTerm); 
//       setSearchTerm(""); 
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search for an artist"
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }



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
      <select
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


