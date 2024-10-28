import { useState } from "react";

import Posts from "../../components/Posts";
import CreatePost from "../CreatePost";

const HomeView = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <>
      <CreatePost />
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1 bg-accent">
          {feedType ? "forYou" : "following"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a
              className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
              onClick={() => setFeedType("forYou")}
            >
              For you
            </a>
          </li>
          <li>
            <a
              className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
              onClick={() => setFeedType("following")}
            >
              Following
            </a>
          </li>
        </ul>
      </div>

      <Posts feedType={feedType} />
    </>
  );
};

export default HomeView;
