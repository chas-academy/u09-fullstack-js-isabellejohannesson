import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

// Fixa conditionals på den här: oinloggat = signup, login och search, inloggat = profile, search, home, liked posts, suggested.
const Navbar = () => {
  return (
    <>
      <nav className="bg-secondary text-base-content p-6 fixed bottom-0 w-full flex flex-row justify-evenly lg:flex-col lg:top-0 lg:left-0 lg:bottom-0 lg:w-20 lg:justify-start lg:items-center lg:py-10 lg:space-y-6">
        <Link to={"/"} className="link link:hover">
          <FaHome />
        </Link>
        <Link to={"/search"} className="link link:hover">
          <FaSearch />
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
        <Link to={"/Suggested"} className="link link:hover">
          Suggested
        </Link>
        <Link to={"/Liked"} className="link link:hover">
          Liked
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
