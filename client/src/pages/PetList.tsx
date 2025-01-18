import PetFinder from "../components/PetFinder";
import { useState } from "react";
import searchDog from "../assets/remi-priotton--I_pLjWoK-E-unsplash.jpg";

const PetList = () => {
  interface Pet {
    id: number;
    name: string;
    age: string;
    species: string;
    photos: { medium: string }[];
    breeds: { primary: string };
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [sortOption, setSortOption] = useState("name");

  const sortedPets = [...pets].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "age") {
      return a.age.localeCompare(b.age);
    } else {
      return a.species.localeCompare(b.species);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${searchDog})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Browse Pets
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Pets</h2>
          <div>
            <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="species">Species</option>
            </select>
          </div>
        </div>

        <PetFinder onDataFetched={setPets} />

        {sortedPets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-lg shadow-lg p-4 text-center"
              >
                <img
                  src={
                    pet.photos[0]?.medium ||
                    "/path-to-your-placeholder-image.jpg"
                  }
                  alt={pet.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {pet.name}
                </h3>
                <p className="text-gray-600">
                  {pet.age} | {pet.species}
                </p>
                <p className="text-gray-600">{pet.breeds.primary}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => window.alert(`You selected ${pet.name}`)}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No pets found.</p>
        )}
      </div>
    </div>
  );
};

export default PetList;
