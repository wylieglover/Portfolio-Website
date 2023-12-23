import React from "react";
import "./Resume.css";

const Resume = () => {
    return (
        <div className="resume">
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
                        <li>Problem-solving</li>
                        <li>Team collaboration</li>
                    </ul>
                </div>
                <div className="technologies">
                    <h2>Platforms and Frameworks</h2>
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
    );
};

export default Resume;
