import { Link } from "react-router-dom";
import "./homepage.css";
const HomePage = () => {
  const isLoggedIn = !!localStorage.getItem("token"); // replace with your auth logic

  return (
    <div className="main-homepage">
      <h1 className="homepage-title">Welcome to LOL Build Guides</h1>

      <p className="homepage-description">
        Explore detailed build guides for every League of Legends champion.
        Discover recommended items, runes, summoner spells, and strategies to
        master your favorite champions.
      </p>

      <div className="homepage-links">
        {isLoggedIn ? (
          <>
            <Link className="homepage-link" to="/lolguides/champions">
              Champions
            </Link>
            <Link className="homepage-link" to="/lolguides/new">
              Create Guide
            </Link>
            <Link className="homepage-link" to="/lolguides">
              Guides
            </Link>
          </>
        ) : (
          <Link className="homepage-link" to="/user/login">
            Log in to see Guides
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
