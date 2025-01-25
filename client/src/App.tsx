import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdoptionForm from "./pages/AdoptionForm.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/Contact.tsx";
import PetDetails from "./pages/PetDetails.tsx";
import PetList from "./pages/PetList.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
// import FAQ from "./components/FAQ.tsx";
// import PrivacyPolicy from "./components/PrivacyPolicy.tsx";
// import TermsOfService from "./components/TermsOfService.tsx";
import SignIn from "./pages/SignIn.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import { useEffect, useState } from "react";
import { fetchUsers } from "./utils/api";

type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    getUsers();
  }, []);

  return (
    <Router>
      <Header />
      {error && <div className="error">{error}</div>}{" "}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/AdoptionForm" element={<AdoptionForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/PetList" element={<PetList />} />
        <Route path="/pets/:petId" element={<PetDetails />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
