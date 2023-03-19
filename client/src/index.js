import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<App />}/>
     <Route path="signup" element={<SignUp />} />
     <Route path="*" element={<App />} />
   </Routes>
 </BrowserRouter>
);