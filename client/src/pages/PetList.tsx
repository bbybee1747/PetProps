import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPets } from "../utils/api";
import cat from "../assets/emre-153_VPk1NZQ-unsplash.jpg";

interface Pet {
  id: number;
  name: string;
  age: string;
  species: string;
  photos: { medium: string }[];
  breeds?: { primary?: string; secondary?: string; mixed?: boolean };
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    age: "",
    species: "",
    gender: "",
    location: "",
    distance: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPets(filters, page);
        setPets(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [filters, page]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handlePetClick = (petId: number) => {
    navigate(`/pets/${petId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${cat})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Available Pets
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-1"
            >
              Age
            </label>
            <select
              id="age"
              value={filters.age}
              onChange={(e) => handleFilterChange("age", e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="Baby">Baby</option>
              <option value="Young">Young</option>
              <option value="Adult">Adult</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="species"
              className="block text-gray-700 font-medium mb-1"
            >
              Species
            </label>
            <select
              id="species"
              value={filters.species}
              onChange={(e) => handleFilterChange("species", e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="px-4 py-2 border rounded-lg"
              placeholder="Zip or city"
            />
          </div>
          <div>
            <label
              htmlFor="distance"
              className="block text-gray-700 font-medium mb-1"
            >
              Distance
            </label>
            <select
              id="distance"
              value={filters.distance}
              onChange={(e) => handleFilterChange("distance", e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-600">Loading pets...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-lg shadow-lg p-4 text-center cursor-pointer"
                onClick={() => handlePetClick(pet.id)}
              >
                <img
                  src={pet.photos[0]?.medium || "/placeholder.jpg"}
                  alt={pet.name}
                  className="h-48 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {pet.name}
                </h3>
                <p className="text-gray-600">
                  {pet.age} | {pet.species}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-600">No pets found.</p>
          )
        )}

        <div className="flex justify-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 mx-2 bg-gray-200 rounded-lg ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 mx-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetList;
