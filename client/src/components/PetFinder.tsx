import React, { useEffect } from "react";

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
  onError: (err: any) => void;
  onLoading: () => void;
  filters: { age: string; species: string };
  page: number;
}

const PetFinder: React.FC<PetFinderProps> = ({
  onDataFetched,
  onError,
  onLoading,
  filters,
  page,
}) => {
  useEffect(() => {
    const fetchPets = async () => {
      onLoading();
      try {
        const params = new URLSearchParams({
          ...filters,
          page: page.toString(),
        });

        const response = await fetch(
          `https://api.petfinder.com/v2/animals?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        onDataFetched(data.animals);
      } catch (err) {
        onError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };

    fetchPets();
  }, [onDataFetched, onError, onLoading, filters, page]);

  return null;
};

export default PetFinder;
