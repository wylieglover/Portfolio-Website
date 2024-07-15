import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./Resume.css";
import resume from "../images/resume.jpg";
import resumePDF from "../images/resume.pdf";

const Resume = () => {
    const [isBloomed, setIsBloomed] = useState(false);

    const handleImageClick = () => {
        setIsBloomed(true);
    };

    const handleCloseModal = () => {
        setIsBloomed(false);
    };

    const handleDownload = () => {
        saveAs(resumePDF, "resume.pdf");
    };

    return (
        <div className="resume">
            <div className="left-column">
                <div className="resume-header">
                    <div className="resume-header-name">
                        <h1>Richard "Wylie" Glover</h1>
                    </div>
                    <div className="resume-header-email">
                        <h3>rwylieg@gmail.com</h3>
                        <h3>(770) 508-7634</h3>
                    </div>
                </div>
                <div className="resume-content">
                    <div className="skills">
                        <h2>Skills</h2>
                        <ul>
                            <li>C/C++</li>
                            <li>Java</li>
                            <li>Python</li>
                            <li>JavaScript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                        </ul>
                    </div>
                    <div className="technologies">
                        <h2>Platforms</h2>
                        <ul>
                            <li>Django</li>
                            <li>React.js</li>
                            <li>Selenium</li>
                            <li>Linux</li>
                            <li>Ruby on Rails</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="right-column">
                <div className="image-container">
                    <div className="download-button" onClick={handleDownload}>
                        DOWNLOAD PDF
                    </div>
                    <img
                        src={resume}
                        alt="Resume"
                        onClick={handleImageClick}
                        className="download-image"
                    />
                </div>
            </div>
            {isBloomed && (
                <div className="resume-modal" onClick={handleCloseModal}>
                    <img
                        src={resume}
                        alt="Bloomed Resume"
                        className="bloomed-image"
                    />
                </div>
            )}
        </div>
    );
};

export default Resume;
