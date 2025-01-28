// All of the user information and all of their current pet information will be displayed on this page.
import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
//import fetchUser, { fetchUsers } from "../utils/api";
import cat from "../assets/emre-153_VPk1NZQ-unsplash.jpg";
import fetchUserPets from "../utils/api";
import { fetchUserProfile } from "../utils/api";

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  description: string;
  photoUrl: string;
  pets: Pet[];
}

interface Pet {
  id: number;
  name: string;
  age: string;
  species: string;
  photos: { medium: string }[];
  breeds?: { primary?: string; secondary?: string; mixed?: boolean };
}

const UserProfile: React.FC = () => {
  const [ userId ]= useState<string | null> (localStorage.getItem ('userId'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
       if (!userId) {
       throw new Error("User ID is required.");
        }
          console.log ('UserId', userId)
        //const fetchedUser = await fetchUser(userId);
        const userPets = await fetchUserPets(userId);
        const userProfile = await fetchUserProfile(Number(userId));

        if ( !Array.isArray(userPets)) {
          throw new Error("Invalid data received from the API.");
        }

        setUser({ pets: userPets, ...userProfile });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

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
            {user?.name || "Loading..."}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading && (
          <p className="text-center text-gray-600">Loading user details...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && user ? (
          <>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                {user.description || "No description available."}
              </p>
              <img
                src={user.photoUrl || "/placeholder.jpg"}
                alt={user.name}
                className="w-full max-w-lg mx-auto rounded-lg mb-6"
              />
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {user.pets.length > 0 ? (
                user.pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="bg-white rounded-lg shadow-lg p-4 text-center"
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
                ))
              ) : (
                <p className="text-center text-gray-600">No pets found.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
