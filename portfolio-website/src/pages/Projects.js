import React from "react";
import "./Projects.css";

const Projects = () => {
    const projects = [
        {
            title: "Viz Data Academy",
            description: "Viz Data Academy is a data visualization learning platform that provides hands-on learning experience for data visualization and data storytelling.",
            link: "https://github.com/wylieglover/VizDataAcademy"
        },
        {
            title: "PE Parser",
            description: "Parses the PE header of a Windows executable file and displays the information in a readable format.",
            link: "https://github.com/wylieglover/PEParser"
        },
        {
            title: "Youtube Clip Scraper",
            description: "A Python script that scrapes a Youtube video's most replayed segments and clips them.",
            link: "https://github.com/wylieglover/YouTube-Clip-Scraper"
        },
        {
            title: "FrannyBot",
            description: "A Twitch chatbot that tracks deaths, wins, and losses in video games using chat commands!",
            link: "https://github.com/wylieglover/FrannyBot"
        },
        {
            title: "This Website!",
            description: "This website was built using React and is dockerized and deployed using GitHub Actions.",
            link: "https://github.com/wylieglover/Portfolio-Website"
        },
    ];

    const openProjectLink = (link) => {
        window.open(link, "_blank");
    };

    return (
        <div className="projects-container">
            <div className="project-boxes">
                {projects.map((project, index) => (
                    <div
                        className="project-box"
                        key={index}
                        onClick={() => openProjectLink(project.link)}
                    >
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
