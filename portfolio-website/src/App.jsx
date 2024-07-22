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
  const projectId = import.meta.env.VITE_APP_DIALOGFLOW_PROJECT_ID;
  const agentId = import.meta.env.VITE_APP_DIALOGFLOW_AGENT_ID;
  
  useEffect(() => {
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

      <div className="df-messenger-container">
        <df-messenger
          intent="WELCOME"
          location="us"
          project-id={projectId}
          agent-id={agentId}
          language-code="en"
          max-query-length="-1"
          allow-feedback="all">
          <df-messenger-chat-bubble
            chat-title="Wylie-Bot"
            chat-subtitle="A chatbot to answer questions about Wylie">
          </df-messenger-chat-bubble>
        </df-messenger>
        <style>
          {`
            df-messenger {
              z-index: 999;
              position: fixed;
              --df-messenger-font-color: white;
              --df-messenger-font-family: Google Sans;
              --df-messenger-chat-background: #303030;
              --df-messenger-message-user-background: #464646;
              --df-messenger-message-bot-background: #0b9b4c;
              --df-messenger-chat-bubble-background: #292929;
              --df-messenger-chat-bubble-icon-color: white;
              --df-messenger-titlebar-background: #292929;
              --df-messenger-titlebar-font-color: white;
              --df-messenger-chat-scroll-button-background: white;
              --df-messenger-input-box-color: white;
              --df-messenger-input-font-color: black;
              --df-messenger-input-background: #292929;
              --df-messenger-input-icon-color: white;
              --df-messenger-titlebar-border: black;
              --df-messenger-input-gutter: black;
              --df-messenger-send-icon-color: white;
              --df-messenger-send-icon-color-hover: white;
              --df-messenger-send-icon-color-active: white;
              --df-messenger-chat-bubble-icon-color: white;
              --df-messenger-message-feedback-icon-background-hover:rgba(63, 110, 165, 0.979);
              scrollbar-color: black #292929;
              scrollbar-width: thin;
              scrollbar-gutter: stable both-edges;
              bottom: 30px;
              right: 30px;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default App;
