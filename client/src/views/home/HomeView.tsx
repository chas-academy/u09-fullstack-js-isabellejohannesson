import { useState } from "react";

import Posts from "../../components/Posts";
import CreatePost from "../CreatePost";

const HomeView = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <>
      <CreatePost />
      <div className="flex flex-col items-center max-w-2xl mx-auto px-4">
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("forYou")}
        >
          For you
        </div>
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("following")}
        >
          Following
        </div>
      </div>

      <Posts feedType={feedType} />
    </>
  );
};

export default HomeView;
