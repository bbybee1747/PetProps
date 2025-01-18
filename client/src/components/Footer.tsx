const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold">Pet Props</h2>
        <p className="text-gray-400 mb-4">Connecting pets with loving homes.</p>
        <div className="space-x-4 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Pet Props. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
