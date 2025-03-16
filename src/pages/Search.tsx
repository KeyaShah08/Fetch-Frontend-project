import { useEffect, useState } from "react";
import { fetchBreeds, fetchDogsByIds, searchDogs } from "../api/dogService";
import DogCard from "../components/DogCard"; // ✅ Fix import path

const Search = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    loadBreeds();
  }, []);

  const handleSearch = async () => {
    try {
      const query = selectedBreed ? `breeds=${selectedBreed}&sort=breed:asc` : "sort=breed:asc";
      const data = await searchDogs(query);
      if (data.resultIds.length > 0) {
        const dogDetails = await fetchDogsByIds(data.resultIds);
        setDogs(dogDetails);
      } else {
        setDogs([]); // Ensure empty results are handled
      }
    } catch (error) {
      console.error("Error searching dogs:", error);
    }
  };

  return (
    <div>
      <h2>Search Dogs</h2>

      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Search</button>

      <div>
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} favorites={favorites} setFavorites={setFavorites} />
        ))}
      </div>
    </div>
  );
};

export default Search;
