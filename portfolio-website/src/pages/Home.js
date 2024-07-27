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
            <h1 className="name">
                <strong className="text">Hello, I'm </strong>
                <strong className="hoverable-text" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}  onTouchStart={handleTouch}>Wylie Glover!</strong>
                <img src={wylie_image} alt="Wylie Glover Profile Picture" id="cursor-image" className="circular-image" style={{ top: imagePosition.top, left: imagePosition.left, visibility: isImageVisible ? 'visible' : 'hidden', opacity: isImageVisible ? 1 : 0  }} width="100px" height="100px"/>
            </h1>
            <div className="bio">
                Software Engineer | Recent graduate from Georgia Southern University
                <br />
                Nvidia certified associate with AI/LLMs
            </div>
            <div className="nvidia-certified">
                <img src={nvidia_badge} alt="NVIDIA Certified Associate Badge" className="nvidia-badge" width="100px" height="100px"></img>
            </div>
            <div className="honeycomb-container">
                <a href="/projects"><div className="honeycomb">REACT</div></a>
                <a href="/projects"><div className="honeycomb">DJANGO</div></a>
                <a href="/projects"><div className="honeycomb">RAPIDS</div></a>
                <a href="/projects"><div className="honeycomb">IDA PRO</div></a>
                <a href="/projects"><div className="honeycomb">SELENIUM</div></a>
            </div>
            <div className="social-icons">
                <a href="https://github.com/wylieglover" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/wylieglover" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:rwylieg@gmai.com" aria-label="Email" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '43px' }} />
                </a>
            </div>
        </div>
    );
};

export default Home;
