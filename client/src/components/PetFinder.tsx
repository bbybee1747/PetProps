import React, { useState, useEffect } from "react";

interface Pet {
  id: number;
  name: string;
  age: string;
  species: string;
  breeds: { primary: string };
  photos: { medium: string }[];
}

interface PetFinderProps {
  onDataFetched: (pets: Pet[]) => void;
}

const PetFinder: React.FC<PetFinderProps> = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://api.petfinder.com/v2/animals", {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        onDataFetched(data.animals);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [onDataFetched]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading pets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return null;
};

export default PetFinder;
