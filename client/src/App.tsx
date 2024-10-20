import { Route, Routes } from "react-router-dom";

import HomeView from "./views/home/HomeView";
import LoginView from "./views/auth/signup/LoginView";
import SignUpView from "./views/auth/signup/SignUpView";
import Navbar from "./components/Navbar";
import Suggested from "./components/Suggested";
import LikedPosts from "./components/LikedPosts";
import Searchbar from "./components/Searchbar";
import ProfileView from "./views/ProfileView";
import CreatePost from "./views/CreatePost";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <main className="flex flex-grow justify-center">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/profile:userName" element={<ProfileView />} />
          <Route path="/suggested" element={<Suggested />} />
          <Route path="/liked" element={<LikedPosts />} />
          <Route path="/search" element={<Searchbar />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
      <Navbar />
    </>
  );
}

export default App;
