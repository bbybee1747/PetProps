import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdoptionForm from "./pages/AdoptionForm.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/Contact.tsx";
import PetDetails from "./pages/PetDetails.tsx";
import PetList from "./pages/PetList.tsx";
import ErrorPage from "./pages/Errorpage.tsx"; // Corrected import path
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import FAQ from "./components/FAQ.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
import TermsOfService from "./components/TermsOfService.tsx";
import SignIn from "./pages/SignIn.tsx";
import { useEffect, useState } from "react";
import { fetchUsers } from "./utils/api";

// Ensure User type is defined or imported
type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
  // Add other user properties as needed
};

function App() {
  const [users, setUsers] = useState<User[]>([]); // State for storing users

  useEffect(() => {
    console.log(users); // Log users to the console
  }, [users]);

  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch users when the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers(); // Fetch user data from API
        setUsers(usersData); // Store fetched users in state
      } catch (err) {
        setError("Failed to load users"); // Set error message in case of failure
      }
    };

    getUsers();
  }, []);

  return (
    <Router>
      <Header />
      {error && <div className="error">{error}</div>} {/* Display error message if it exists */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/AdoptionForm" element={<AdoptionForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/PetList" element={<PetList />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/pets/:petId" element={<PetDetails />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;