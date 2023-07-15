import useInfoModalStore from "@/hooks/useInfoModalStore";
import { useState, ChangeEvent } from "react";
import useSearchVideos from "../hooks/useSearchVideos";

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { openModal } = useInfoModalStore();
  const { searchResults, loading, error } = useSearchVideos(searchTerm);

  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  if (error) {
    console.error(
      "An error occurred while fetching search suggestions:",
      error
    );
  }


  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />

      {loading ? (
        <div>Loading search suggestions...</div>
      ) : (
        <ul>
          {searchResults.length === 0 ? (
            <>
              <li>No results found</li>
            </>
          ) : (
            searchResults.map((movie) => {
              return (
                <li key={movie?.id} onClick={() => openModal(movie?.id)}>
                  {movie?.title}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;