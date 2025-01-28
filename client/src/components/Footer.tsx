import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold">Pet Props</h2>
        <p className="text-gray-400 mb-4">Connecting pets with loving homes.</p>
        <div className="space-x-4 mb-4">
          <Link
            to="/About"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/Contact"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/FAQ"
            className="text-gray-400 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <Link
            to="/PrivacyPolicy"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/TermsOfService"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Pet Props. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
