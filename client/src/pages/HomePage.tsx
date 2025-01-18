import twoDogs from "../assets/alvan-nee-T-0EW-SEbsE-unsplash.jpg";
import ladyWithDog from "../assets/bruno-cervera-azsk_6IMT3I-unsplash.jpg";
import whiteDog from "../assets/joe-caione-qO-PIF84Vxg-unsplash.jpg";
import cat from "../assets/chris-abney-mAsKA0jFfeQ-unsplash.jpg";

const HomePage = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[50vh]"
        style={{
          backgroundImage: `url(${twoDogs})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
            Welcome to Pet Props
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We are a pet adoption app that connects you with loving pets looking
            for a home. Browse pets, fill out adoption forms, and manage your
            profile with ease!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src={whiteDog}
              alt="Adoptable pet"
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">Browse Pets</h2>
            <p className="text-gray-600 mt-2">
              Discover pets available for adoption and find your new furry
              friend.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src={cat}
              alt="Adoption form"
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              Adoption Form
            </h2>
            <p className="text-gray-600 mt-2">
              Fill out a simple form to express interest in adopting your chosen
              pet.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src={ladyWithDog}
              alt="User profile"
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              User Profile
            </h2>
            <p className="text-gray-600 mt-2">
              Manage your profile, track your adoptions, and update your
              preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
