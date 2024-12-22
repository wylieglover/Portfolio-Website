import React, { useCallback } from 'react';
import { HeroSectionProps } from '../../types/props';
import styles from './HeroSection.module.css';

const HeroSection: React.FC<HeroSectionProps> = ({ name, title, scrollY, canvasRef }) => {
    const handleViewWork = useCallback(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, []);

    const renderFloatingShapes = () => {
        return [...Array(5)].map((_, i) => (
            <div
                key={i}
                className={`${styles.floatingShape} ${i % 2 === 0 ? styles.pinkShape : styles.purpleShape}`}
                style={{
                    '--shape-size': `${100 + i * 50}px`,
                    '--shape-left': `${(i * 20) + 10}%`,
                    '--shape-top': `${10 + i * 10}%`,
                    '--shape-rotate': `${scrollY * (0.05 + i * 0.02)}deg`,
                    '--shape-scale': `${Math.max(0.5, 1 - scrollY / 3000)}`,
                } as React.CSSProperties}
            />
        ));
    };

    return (
        <div className={styles.container}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            />

            <div className={styles.shapesContainer}>
                {renderFloatingShapes()}
            </div>

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