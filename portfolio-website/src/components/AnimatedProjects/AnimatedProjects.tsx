import React, { useEffect, useRef } from 'react';
import { Project } from '../../types/types';
import './AnimatedProjects.css';

const AnimatedProjects: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const projectRefs = useRef<HTMLAnchorElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the box is visible
                rootMargin: '0px 0px -50px 0px', // Slightly pre-load animations
            }
        );

        projectRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="projectsSection">
            <div className="projectsContainer">
                <h2 className="projectsTitle">
                    My Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`project-box project-delay-${index} bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 transform opacity-0 transition-transform duration-700 hover:shadow-lg hover:scale-105`}
                            ref={el => {
                                projectRefs.current[index] = el!;
                            }}
                        >
                            <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-400 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag: string, tagIndex: number) => (
                                    <span
                                        key={tagIndex}
                                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))
                    }
                </div >
            </div>
        </section >
    );
};

export default AnimatedProjects;