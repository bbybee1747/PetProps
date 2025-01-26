import { useNavigate } from "react-router-dom";

// Assuming you have some way to determine if a user is authenticated
const isAuthenticated = false; // Replace with actual authentication logic

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path === "/AdoptionForm" || path === "/UserProfile") {
      if (!isAuthenticated) {
        navigate(`/SignIn?redirect=${path}`);
        return;
      }
    }
    navigate(path);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white font-semibold">
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/About")}
          >
            About
          </button>
        </li>
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/AdoptionForm")}
          >
            Adoption Form
          </button>
        </li>
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/Contact")}
          >
            Contact
          </button>
        </li>
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/PetList")}
          >
            Pet List
          </button>
        </li>
        <li>
          <button
            className="hover:underline"
            onClick={() => handleNavigation("/UserProfile")}
          >
            User Profile
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
