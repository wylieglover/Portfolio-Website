import React, { useCallback } from 'react';
import { HeroSectionProps } from '../../types/types';
import styles from './HeroSection.module.css';

const HeroSection: React.FC<HeroSectionProps> = ({ name, title }) => {
    const handleViewWork = useCallback(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Hello, I'm{" "}
                    <span className={styles.gradientText}>
                        {name}
                    </span>
                </h1>
                <p className={styles.subtitle}>
                    {title}
                </p>
                <button
                    onClick={handleViewWork}
                    className={styles.button}
                >
                    View My Work
                </button>
            </div>

            <div className={styles.scrollIndicator}>
                <svg
                    className={styles.arrow}
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;