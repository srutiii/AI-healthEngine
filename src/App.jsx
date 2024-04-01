import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chatbot from "./components/Chatbox";
import PredictDisease from "./pages/PredictDisease";
import Appointments from "./pages/Appointments";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Chatbot />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/predict" element={<PredictDisease />} />
        <Route path="/book" element={<Appointments />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
