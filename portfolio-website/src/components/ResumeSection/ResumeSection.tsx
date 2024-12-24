import React, { useEffect, useRef } from 'react';
import styles from './ResumeSection.module.css'; // Importing from App.module.css
import { FaGraduationCap, FaCode, FaCertificate } from 'react-icons/fa'; // Updated icons

interface Education {
    degree: string;
    institution: string;
    duration: string;
    details: string;
}

interface Certification {
    name: string;
    issuer: string;
    date: string;
}

interface Skill {
    name: string;
    level: string; // e.g., Beginner, Intermediate, Advanced
}

const ResumeSection: React.FC = () => {
    const elementRefs = useRef<HTMLElement[]>([]); // Track all elements to animate

    const educationData: Education[] = [
        {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            duration: '2015 - 2019',
            details: '',
        },
    ];

    const certificationsData: Certification[] = [
        {
            name: 'Associate Level with Gen AI/LLMs',
            issuer: 'NVIDIA Deep Learning Institute',
            date: 'July 2024',
        },
    ];

    const skillsData: Skill[] = [
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'React', level: 'Advanced' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'CSS/SCSS', level: 'Advanced' },
        { name: 'Git', level: 'Advanced' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible); // Use the CSS module class
                    } else {
                        entry.target.classList.remove(styles.visible); // Use the CSS module class
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        // Observe all non-null refs
        elementRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => observer.disconnect();
    }, [educationData.length, certificationsData.length, skillsData.length]);

    const addToRefs = (el: HTMLElement | null, index: number) => {
        if (el && !elementRefs.current.includes(el)) {
            elementRefs.current[index] = el;
        }
    };

    return (
        <section className={styles.resumeSection} aria-labelledby="resume-title">
            <h2 className={styles.resumeTitle}>My Resume</h2>
            {/* Education */}
            <div className={styles.sectionsContainer}>
                <div className={styles.education}>
                    <h3><FaGraduationCap className={styles.icon} /> Education</h3>
                    {educationData.map((edu, index) => (
                        <div
                            key={index}
                            ref={(el) => addToRefs(el, index)}
                            className={`${styles.educationItem} ${styles.animatedItem} ${styles[`resume-delay-${index}`]}`}
                        >
                            <h4>{edu.degree}</h4>
                            <h5>{edu.institution}</h5>
                            <span className={styles.duration}>{edu.duration}</span>
                            <p>{edu.details}</p>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                {certificationsData.length > 0 && (
                    <div className={styles.certifications}>
                        <h3><FaCertificate className={styles.icon} /> Certifications</h3>
                        {certificationsData.map((cert, index) => (
                            <div
                                key={index}
                                ref={(el) => addToRefs(el, index + educationData.length)}
                                className={`${styles.certificationItem} ${styles.animatedItem} ${styles[`resume-delay-${index + educationData.length}`]}`}
                            >
                                <h4>{cert.name}</h4>
                                <h5>{cert.issuer}</h5>
                                <span className={styles.duration}>{cert.date}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Skills */}
                <div className={styles.skills}>
                    <h3><FaCode className={styles.icon} /> Skills</h3>
                    <ul className={styles.skillsList}>
                        {skillsData.map((skill, index) => (
                            <li
                                key={`${skill.name}-${index}`} // Ensure unique key
                                ref={(el) => addToRefs(el, index + educationData.length + certificationsData.length)}
                                className={`${styles.skillItem} ${styles.animatedItem} ${styles[`resume-delay-${index}`]}`}
                            >
                                <span className={styles.skillName}>{skill.name}</span>
                                <div
                                    className={styles.skillLevel}
                                    style={{ '--skill-percentage': `${getSkillLevelPercentage(skill.level)}` } as React.CSSProperties}
                                ></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Download Resume Button */}
            <div
                ref={(el) => addToRefs(el, elementRefs.current.length)}
                className={`${styles.downloadResume} ${styles.animatedItem} ${styles[`resume-delay-${elementRefs.current.length}`]}`}
            >
                <a href="/resume.pdf" download className={styles.downloadButton} aria-label="Download Resume">
                    Download Resume
                </a>
            </div>
        </section>
    );
    // Function to determine skill level percentage
    function getSkillLevelPercentage(level: string): string {
        switch (level) {
            case 'Beginner': return '25%';
            case 'Intermediate': return '50%';
            case 'Advanced': return '75%';
            case 'Expert': return '100%';
            default: return '50%';
        }
    }
};

export default ResumeSection;
