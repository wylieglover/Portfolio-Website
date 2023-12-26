import React, { useState } from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Home.css"
import wylie_image from "../images/wylie.jpg";

const Home = () => {
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

    const handleMouseMove = (e) => {
        setImagePosition({ top: e.clientY, left: e.clientX });
    };

    return (
        <div className="center-content">
            <div className="name">
                <span className="bold-text">Hello, I'm </span>
                <span className="hoverable-text" onMouseMove={handleMouseMove}>Wylie Glover!</span>
                <img src={wylie_image} alt="Profile" id="cursor-image" className="circular-image" style={{ top: imagePosition.top, left: imagePosition.left }} />
            </div>
            <div className="bio">
                Software Engineer | Recent graduate from Georgia Southern University
                <br />
                Passionate about crafting innovative solutions through code
            </div>
            <div className="social-icons">
                <a href="https://github.com/wylieglover" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/wylieglover" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:rwylieg@gmai.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '43px' }} />
                </a>
            </div>
        </div>
    );
};

export default Home;
