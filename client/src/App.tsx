import { Navigate, Route, Routes } from "react-router-dom";

import HomeView from "./views/home/HomeView";
import LoginView from "./views/auth/signup/LoginView";
import SignUpView from "./views/auth/signup/SignUpView";
import ProfileView from "./views/Profile/ProfileView";
import CreatePost from "./views/CreatePost";
import NotificationsView from "./views/NotificationsView";
import LandingPage from "./views/home/LandingPage";

import Navbar from "./components/Navbar";
import Suggested from "./components/Suggested";
import LikedPosts from "./components/LikedPosts";
import Searchbar from "./components/Searchbar";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const { data: authCheck, isLoading } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://banterly.onrender.com/api/auth/authCheck`
        );
        const data = await res.json();
        if (data.error) return null; //reset authCheck-objektet, som annars bara blir tomt
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("This user is logged in:", data);
        return data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating account:", error.message);
          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");
          toast.error("Unknown error occurred");
        }
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {authCheck && <Header />}
      <Toaster />
      <main className="flex flex-col justify-center max-w-screen-lg mx-auto">
        <Routes>
          <Route
            path="/"
            element={!authCheck ? <LandingPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!authCheck ? <LoginView /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authCheck ? <SignUpView /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={authCheck ? <HomeView /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userName"
            element={authCheck ? <ProfileView /> : <Navigate to="/" />}
          />
          <Route
            path="/suggested"
            element={authCheck ? <Suggested /> : <Navigate to="/" />}
          />
          <Route
            path="/liked"
            element={authCheck ? <LikedPosts /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={authCheck ? <Searchbar /> : <Navigate to="/" />}
          />
          <Route
            path="/create"
            element={authCheck ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route
            path="/notifications"
            element={authCheck ? <NotificationsView /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
      {authCheck && <Navbar />}
    </>
  );
}

export default App;
