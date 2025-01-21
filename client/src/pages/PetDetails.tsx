import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPets } from "../utils/api";

const PetDetails: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPets();
        const selectedPet = data.find(
          (p: any) => p.id === parseInt(petId || "0")
        );
        setPet(selectedPet);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPetDetails();
  }, [petId]);

  if (loading) return <p>Loading pet details...</p>;
  if (error) return <p>Error loading pet details: {error}</p>;

  return pet ? (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{pet.name}</h2>
      <img
        src={pet.photos[0]?.large || "/placeholder.jpg"}
        alt={pet.name}
        className="w-full max-w-lg rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-4">
        {pet.description || "No description available."}
      </p>
      <p className="mb-2">
        <strong>Age:</strong> {pet.age}
      </p>
      <p className="mb-2">
        <strong>Gender:</strong> {pet.gender}
      </p>
      <p className="mb-2">
        <strong>Species:</strong> {pet.species}
      </p>
      <p className="mb-2">
        <strong>Breed:</strong> {pet.breeds?.primary || "Unknown"}
      </p>

      <h3 className="text-2xl font-bold mt-6 mb-4">Contact Information</h3>
      <p className="mb-2">
        <strong>Email:</strong> {pet.contact?.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {pet.contact?.phone}
      </p>
      <p className="mb-2">
        <strong>Address:</strong>
        <br />
        {pet.contact?.address?.address1 || ""}
        {pet.contact?.address?.address2
          ? `, ${pet.contact?.address?.address2}`
          : ""}
        <br />
        {`${pet.contact?.address?.city || ""}, ${
          pet.contact?.address?.state || ""
        } ${pet.contact?.address?.postcode || ""}`}
      </p>
    </div>
  ) : (
    <p>Pet not found.</p>
  );
};

export default PetDetails;
