import { Link } from "react-router";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/lolguides/champions" className="nav-link">
        Champions
      </Link>
      <Link to="/lolguides/new" className="nav-link">
        Create
      </Link>
    </nav>
  );
};

export default NavBar;
