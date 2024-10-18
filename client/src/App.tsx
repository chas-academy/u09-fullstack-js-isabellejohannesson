import { Route, Routes } from "react-router-dom";

import HomeView from "./views/home/HomeView";
import LoginView from "./views/auth/signup/LoginView";
import SignUpView from "./views/auth/signup/SignUpView";
import Navbar from "./components/Navbar";
import Suggested from "./components/Suggested";
import LikedPosts from "./components/LikedPosts";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/profile" element={<SignUpView />} />
        <Route path="/suggested" element={<Suggested />} />
        <Route path="/liked" element={<LikedPosts />} />
        <Route path="/search" element={<Searchbar />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
