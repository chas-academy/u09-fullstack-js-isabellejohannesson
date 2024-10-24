import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const routeNames: { [key: string]: string } = {
    "/": "/welcome",
    "/home": "Home",
    "/login": "Log in",
    "/signup": "Sign up",
    "/profile": "Profile",
    "/suggested": "For you",
    "/liked": "Liked Posts by you",
    "/search": "Search",
    "/create": "Create a post",
  };

  const activeView = routeNames[location.pathname] || "Unknown page";

  return (
    <>
      <header className="flex justify-end items-center my-6 px-4 top-0">
        <h1 className="text-md font-bold ">{activeView}</h1>
        <Link to="/">
          <img
            src="../Logo/Banterly_Logo_3.svg"
            alt="Logo"
            className="link link:hover justify-ml-auto px-2"
          />
        </Link>
        <Link to={"/search"} className="link link:hover justify-ml-auto px-2">
          <FaSearch />
        </Link>
      </header>
    </>
  );
};

export default Header;
