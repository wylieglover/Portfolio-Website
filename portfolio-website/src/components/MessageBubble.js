import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ message, visible, onClick }) => {
  const displayMessage = message.length > 75 ? message.substring(0, 75) + '...' : message;
  return (
    <div className={`message-bubble ${visible ? 'visible' : ''}`} onClick={onClick}>
      {displayMessage}
      <div className="tail"></div>
    </div>
  );
};

export default MessageBubble;
