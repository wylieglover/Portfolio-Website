import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import ResumePDF from "./components/ResumePDF";
import MessageBubble from "./components/MessageBubble";

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
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Expose the updateMessage function globally
    window.updateMessageBubble = (newMessage) => {
      if(newMessage && newMessage.trim() !== ''){
        setVisible(true)
        setMessage(newMessage);
        setTimeout(() => {
        setVisible(false);
      }, 5000);
      }
    };

    window.updateChatStatus = (isChatOpen) => {
      if (isChatOpen) {
        setVisible(false);
      } else {
        // Handle case when the chat is closed if needed
      }
    };
    
  }, []);


  return (
    <>
      {!isResumePDF && <Navbar />} {/* Render Navbar unless it's /resume.pdf */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/resume.pdf" element={<ResumePDF />} />
      </Routes>
      <div>
        <MessageBubble
            message={message}
            visible={visible}
          />
      </div>
    
      
    </>
  );
};

export default App;
