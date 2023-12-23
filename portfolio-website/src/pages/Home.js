import React from "react";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Home.css"

const Home = () => {
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
    return (
        <div className="center-content">
            <div className="name">
                <span className="bold-text">Hello, I'm Wylie Glover!</span>
            </div>
            <div className="bio">
                Aspiring Software Engineer | Recent graduate from Georgia Southern University
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
            </div>
        </div>
    );
};

export default Home;
