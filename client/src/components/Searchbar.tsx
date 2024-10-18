import { FaSearch } from "react-icons/fa";
import Suggested from "./Suggested";

const Searchbar = () => {
  return (
    <>
      <div className="flex justify-center items-center mx-auto max-w-xl w-full my-4">
        <div className="w-full p-4">
          <label className="input input-ghost bg-secondary rounded-3xl flex gap-2 w-full">
            <input type="text" className="grow" placeholder="Search" />
            <button className="btn btn-ghost" type="submit">
              <FaSearch />
            </button>
          </label>
        </div>
      </div>
      <Suggested />
    </>
  );
};

export default Searchbar;
