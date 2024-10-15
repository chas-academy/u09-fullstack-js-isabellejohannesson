import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Log in</Link>
      <Link to={"/signup"}>Sign up!</Link>
    </>
  );
};

export default Navbar;
