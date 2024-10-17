import Posts from "../../components/Posts";
import CreatePost from "../CreatePost";

const HomeView = () => {
  return (
    <>
      <header className="flex justify-center my-6">
        <img src="../Logo/Banterly_Logo.svg" alt="Logo" />
      </header>
      <div className="flex flex-col items-center">
        <CreatePost />
        <Posts />
      </div>
    </>
  );
};

export default HomeView;
