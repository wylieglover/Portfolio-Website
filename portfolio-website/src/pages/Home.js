import React, { useState } from 'react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Home.css"
import wylie_image from "../images/wylie.jpg";
import nvidia_badge from "../images/nvidia_badge.jpg"

const Home = () => {
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
    const [isImageVisible, setIsImageVisible] = useState(false);

    const handleMouseMove = (e) => {
        setImagePosition({ top: e.clientY, left: e.clientX });
        setIsImageVisible(true);
    };

    const handleMouseLeave = () => {
        setIsImageVisible(false);
    };

    const handleTouch = (e) => {
        setImagePosition({ top: e.touches[0].clientY, left: e.touches[0].clientX });
        setIsImageVisible(!isImageVisible);
    };

    return (
        <div className="center-content">
            <div className="name">
                <span className="bold-text">Hello, I'm </span>
                <span className="hoverable-text" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}  onTouchStart={handleTouch}>Wylie Glover!</span>
                <img src={wylie_image} alt="Profile" id="cursor-image" className="circular-image" style={{ top: imagePosition.top, left: imagePosition.left, visibility: isImageVisible ? 'visible' : 'hidden', opacity: isImageVisible ? 1 : 0  }} />
            </div>
            <div className="bio">
                Software Engineer | Recent graduate from Georgia Southern University
                <br />
                Nvidia certified associate with AI/LLMs
            </div>
            <div className="nvidia-certified">
                <img src={nvidia_badge} alt="Badge" className="nvidia-badge"></img>
            </div>
            <div className="honeycomb-container">
                <div className="honeycomb">REACT</div>
                <div className="honeycomb">DJANGO</div>
                <div className="honeycomb">RAPIDS</div>
                <div className="honeycomb">IDA PRO</div>
                <div className="honeycomb">SELENIUM</div>
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
