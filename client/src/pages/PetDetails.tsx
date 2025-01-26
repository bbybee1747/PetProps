import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPets } from "../utils/api";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cat from "../assets/emre-153_VPk1NZQ-unsplash.jpg";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PetDetails: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    const loadPetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPets({});
        const selectedPet = data.find(
          (p: any) => p.id === parseInt(petId || "0")
        );
        setPet(selectedPet);

        if (
          selectedPet?.contact?.address?.city &&
          selectedPet?.contact?.address?.state
        ) {
          const city = selectedPet.contact.address.city;
          const state = selectedPet.contact.address.state;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`
          );
          const result = await response.json();
          if (result && result.length > 0) {
            const { lat, lon } = result[0];
            setCoordinates([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error("Geocoding failed: No results found.");
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPetDetails();
  }, [petId]);

  if (loading)
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-xl">Loading pet details...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-xl">
          Error loading pet details: {error}
        </p>
      </div>
    );

  return pet ? (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${cat})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            {pet.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            {pet.description || "No description available."}
          </p>
          <img
            src={pet.photos[0]?.large || "/placeholder.jpg"}
            alt={pet.name}
            className="w-full max-w-lg mx-auto rounded-lg mb-6"
          />
          <p className="text-gray-700 mb-2">
            <strong>Age:</strong> {pet.age}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location Number:</strong> {pet.id}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Gender:</strong> {pet.gender}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Species:</strong> {pet.species}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Breed:</strong> {pet.breeds?.primary || "Unknown"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {pet.status}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Contact:</strong> {pet.contact.email || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {pet.contact.phone || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> {pet.contact.address.address1 || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>City:</strong> {pet.contact.address.city || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>State:</strong> {pet.contact.address.state || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Postcode:</strong> {pet.contact.address.postcode || "N/A"}
          </p>

          <div className="w-full h-64 mt-6">
            {coordinates ? (
              <MapContainer
                center={coordinates}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </MapContainer>
            ) : (
              <p className="text-gray-700 text-center">
                Unable to load map for the specified location.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <p className="text-gray-700 text-xl">Pet not found.</p>
    </div>
  );
};

export default PetDetails;
