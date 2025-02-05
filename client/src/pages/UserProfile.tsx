import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("✅ Rendering UserProfile component...");

  useEffect(() => {
    console.log("🔄 useEffect triggered. Checking authentication...");

    if (!user) {
      console.error("🚨 User not authenticated. Redirecting to Sign In.");
      navigate("/signin");
      return;
    }

    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🔄 Fetching user profile...");

        const profile = await fetchUserProfile();
        setUserData(profile);

        console.log("✅ User profile loaded:", profile);
      } catch (err: any) {
        console.error("❌ Error loading user profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user, navigate]);

  if (!user) {
    console.warn("⚠️ No user found. Returning null.");
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1>User Profile Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {userData && <p>Welcome, {userData.name}!</p>}
    </div>
  );
};

export default UserProfile;
