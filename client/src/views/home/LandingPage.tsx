import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-heading text-4xl font-bold text-primary">
        Welcome to Banterly
      </h1>
      <p className="mt-4 text-lg text-center font-sans">
        Please log in or sign up to enjoy some friendly banter:
      </p>
      <div className="mt-8 flex space-x-4">
        <Link to={"/login"} className="link link:hover">
          <button className="btn btn-primary">Log in</button>
        </Link>
        <Link to={"/signup"} className="link link:hover">
          <button className="btn btn-primary">Sign up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
