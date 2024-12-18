import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const routeNames: { [key: string]: string } = {
    "/": "/welcome",
    "/home": "Home",
    "/login": "Log in",
    "/signup": "Sign up",
    "/profile/:userName": "Profile",
    "/suggested": "For you",
    "/liked": "Liked Posts by you",
    "/search": "Search",
    "/create": "Create a post",
    "/notifications": "Notifications",
  };

  const activeView = routeNames[location.pathname] || "Unknown page";

  return (
    <>
      <header className="flex justify-between items-center my-6 px-4 top-0">
        <h1 className="text-sm font-sans text-secondary lg:ml-20">
          {activeView}
        </h1>
        <Link to="/home" className="cursor-pointer">
          <h1 className="font-heading text-primary text-2xl shadow-sm border-b-primary">
            Banterly
          </h1>
        </Link>
        <Link
          to={"/search"}
          className="link link:hover justify-ml-auto px-2 justify-end"
        >
          <FaSearch />
        </Link>
      </header>
    </>
  );
};

export default Header;
