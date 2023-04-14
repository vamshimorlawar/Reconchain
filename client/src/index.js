import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import CandidateHome from "./components/CandidateHome/CandidateHome";
import CandidateCard from "./components/CandidateCard/CandidateCard";
import CandidateProfile from "./components/CandidateProfile/CandidateProfile";
import CandidateJobApplication from "./components/CandidateJobApplication/CandidateJobApplication";
import CompanyHome from "./components/CompanyHome/CompanyHome";
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import CompanyJobPost from "./components/CompanyJobPost/CompanyJobPost";
import CandidateJobsApplied from "./components/CandidateJobsApplied/CandidateJobsApplied";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CompanyUpdateJobPost from "./components/CompanyUpdateJobPost/CompanyUpdateJobPost";

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
      <Route path="/candidate-job-apply/:id/:company_email" element={<CandidateJobApplication />} />
      <Route path="/candidate-jobs-applied" element={<CandidateJobsApplied/>} />
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
      <Route path="/company-job-post" element={<CompanyJobPost />} />
      <Route path="/company-update-job-post/:id" element={<CompanyUpdateJobPost/>} />
      <Route path="/view-all-candidates" element={<CandidateCard/>} />



      {/* <Route path="*" element={<App />} /> */}
    </Routes>
  </BrowserRouter>
);
