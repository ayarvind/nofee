import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import './App.css'
import { Toaster } from "react-hot-toast";
import CreateProject from "./components/dashbaord/CreateProject";
import Project from "./components/dashbaord/Project";
function App() {

  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-radial">
        <Navbar />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/project/new" element={<CreateProject />} />
          <Route path="/project/:projectId/:requestName" element={<Project />} />
          <Route path="/project/:projectId" element={<Project />} />

          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
