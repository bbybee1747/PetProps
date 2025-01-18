import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white font-semibold">
        <li>
          <Link className="hover:underline" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/About">
            About
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/AdoptionForm">
            Adoption Form
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/Contact">
            Contact
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/PetList">
            Pet List
          </Link>
        </li>
        <li>
          <Link className="hover:underline" to="/UserProfile">
            User Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
