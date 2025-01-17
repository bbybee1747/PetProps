import React, { useEffect, useState } from "react";
import axios from "axios";

const PetList = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/pets", {
          params: {
            type: "dog", // Example filter
          },
        });
        setPets(response.data.animals);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Available Pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <h2>{pet.name}</h2>
            <p>{pet.description}</p>
            {pet.photos[0] && (
              <img
                src={pet.photos[0].medium}
                alt={pet.name}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
