import { Route, Routes } from "react-router-dom";

import HomeView from "./views/home/HomeView";
import LoginView from "./views/auth/signup/LoginView";
import SignUpView from "./views/auth/signup/SignUpView";
import Navbar from "./components/Navbar";
import Suggested from "./components/Suggested";

function App() {
  return (
    <>
      <h1>Banterly</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
      <Suggested />
    </>
  );
}

export default App;
