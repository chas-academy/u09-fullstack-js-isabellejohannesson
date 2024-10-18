import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

// Fixa conditionals på den här: oinloggat = signup, login och search, inloggat = profile, search, home, liked posts, suggested.
const Navbar = () => {
  return (
    <>
      <footer className="footer footer-center bg-secondary text-base-content p-6 mt-auto">
        <nav className="flex flex-row justify-evenly">
          <Link to={"/"} className="link link:hover">
            <FaHome />
          </Link>
          <Link to={"/profile"} className="link link:hover">
            <FaUser />
          </Link>
          <Link to={"/login"} className="link link:hover">
            <button className="btn btn-primary">Log in</button>
          </Link>
          <Link to={"/signup"} className="link link:hover">
            <button className="btn btn-primary">Sign up</button>
          </Link>
          <Link to={"/search"} className="link link:hover">
            <FaSearch />
          </Link>
          <Link to={"/Suggested"} className="link link:hover">
            Suggested
          </Link>
          <Link to={"/Liked"} className="link link:hover">
            Liked
          </Link>
        </nav>
      </footer>
    </>
  );
};

export default Navbar;
