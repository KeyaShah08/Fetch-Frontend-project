import React from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

const DogCard: React.FC<DogCardProps> = ({ dog, favorites, setFavorites }) => {
  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <div>
      <img src={dog.img} alt={dog.name} width="100" />
      <p>{dog.name} ({dog.breed})</p>
      <button onClick={() => toggleFavorite(dog.id)}>
        {favorites.includes(dog.id) ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default DogCard;
