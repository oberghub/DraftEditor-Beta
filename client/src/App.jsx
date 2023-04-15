import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coding from './Coding';
import Home from './Home';
import NoPage from './NoPage';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App