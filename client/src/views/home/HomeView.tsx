import Posts from "../../components/Posts";
import CreatePost from "../CreatePost";

const HomeView = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <CreatePost />
        <Posts />
      </div>
    </>
  );
};

export default HomeView;
