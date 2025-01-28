import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdoptionForm from "./pages/AdoptionForm";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import PetDetails from "./pages/PetDetails";
import PetList from "./pages/PetList";
import ErrorPage from "./pages/Errorpage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/PetList" element={<PetList />} />
        <Route path="/pets/:petId" element={<PetDetails />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/AdoptionForm" element={<AdoptionForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/UserProfile/:userId" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
