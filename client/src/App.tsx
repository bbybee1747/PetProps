import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AdoptionForm from "./pages/AdoptionForm.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/Contact.tsx";
// import UserProfile from "./pages/UserProfile.tsx";
import PetList from "./pages/PetList.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/AdoptionForm" element={<AdoptionForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/PetList" element={<PetList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
