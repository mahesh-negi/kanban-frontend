import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Board from "./components/Board";
import Login from "../src/components/Auth/login";
import Register from "../src/components/Auth/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Board />} />
      </Routes>
    </Router>
    <ToastContainer />
  </AuthProvider>
);

export default App;
