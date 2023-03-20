import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<App />}/>
     <Route path="signup" element={<SignUp />} />
     <Route path="login" element={<Login />} />
     <Route path="*" element={<App />} />
   </Routes>
 </BrowserRouter>
);