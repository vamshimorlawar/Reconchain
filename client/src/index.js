import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import CandidateHome from "./components/CandidateHome/CandidateHome";
import CandidateProfile from "./components/CandidateProfile/CandidateProfile";
import CompanyHome from "./components/CompanyHome/CompanyHome";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/candidate-home"
        element={
          sessionStorage.getItem("loggedIn") === "true" ? (
            <CandidateHome />
          ) : (
            <Navigate replace to={"/"} />
          )
        }
      />
      <Route path="/candidate-profile" element={<CandidateProfile />} />
      <Route
        path="/company-home"
        element={
          sessionStorage.getItem("loggedIn") === "true" ? (
            <CompanyHome />
          ) : (
            <Navigate replace to={"/"} />
          )
        }
      />
      <Route path="/company-profile" element={<CompanyProfile />} />

      {/* <Route path="*" element={<App />} /> */}
    </Routes>
  </BrowserRouter>
);
