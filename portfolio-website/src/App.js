import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import ResumePDF from "./components/ResumePDF";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const isResumePDF = location.pathname === '/resume.pdf';

  return (
    <>
      {!isResumePDF && <Navbar />} {/* Render Navbar unless it's /resume.pdf */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resume.pdf" element={<ResumePDF />} />
      </Routes>
    </>
  );
};

export default App;
