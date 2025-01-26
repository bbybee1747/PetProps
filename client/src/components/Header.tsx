import NavBar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Pet Props</h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
