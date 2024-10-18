import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const routeNames: { [key: string]: string } = {
    "/": "Home",
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
      <header className="flex justify-evenly my-6">
        <img src="../Logo/Banterly_Logo.svg" alt="Logo" />
        <h1 className="text-md font-bold">{activeView}</h1>
      </header>
    </>
  );
};

export default Header;
