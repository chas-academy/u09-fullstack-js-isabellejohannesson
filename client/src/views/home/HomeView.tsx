import { useState } from "react";

import Posts from "../../components/Posts";
import CreatePost from "../CreatePost";

const HomeView = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <>
      <div className="flex flex-col items-center">
        <CreatePost />
        <div
          className={
            "flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          }
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>

      <Posts feedType={feedType} />
    </>
  );
};

export default HomeView;
