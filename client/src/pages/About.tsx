import Dog from "../assets/chris-abney-mAsKA0jFfeQ-unsplash.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${Dog})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            About Us
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Welcome to Pet Props!
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            We are a pet adoption app dedicated to helping pets find loving
            homes. Our platform allows you to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 text-lg space-y-2">
            <li>Browse pets available for adoption</li>
            <li>Fill out adoption forms to express your interest</li>
            <li>Manage your user profile and track adoptions</li>
          </ul>
          <p className="text-gray-700 mt-6 text-lg text-center">
            At Pet Props, we believe every pet deserves a loving home. Join us
            in making a difference, one adoption at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
