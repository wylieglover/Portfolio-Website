// AnimatedWebsite.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatedWebsiteProps } from '../../types/props';
import styles from './AnimatedWebsite.module.css';

// import LeavesManager from '../LeavesManager/LeavesManager';
import SnowflakesManager from '../SnowflakesManager';
import AnimatedProjects from '../AnimatedProjects';
import HeroSection from '../HeroSection';

const AnimatedWebsite: React.FC<AnimatedWebsiteProps> = ({
    name,
    title,
    projects
}) => {
    const [scrollY, setScrollY] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const leavesManagerRef = useRef<LeavesManager | null>(null);
    const snowflakesManagerRef = useRef<SnowflakesManager | null>(null);

    // Memoize scroll handler to prevent unnecessary re-renders
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        // Only update state if the scroll position has changed significantly
        if (Math.abs(currentScrollY - scrollY) > 5) {
            setScrollY(currentScrollY);
        }
    }, [scrollY]);

    // Initialize SnowflakesManager
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        snowflakesManagerRef.current = new SnowflakesManager(canvas);
        snowflakesManagerRef.current.startAnimation();

        const cleanupResize = snowflakesManagerRef.current.attachResizeListener();

        return () => {
            snowflakesManagerRef.current?.stopAnimation();
            cleanupResize();
            snowflakesManagerRef.current = null;
        };
    }, []);

    // Handle scroll events
    useEffect(() => {
        // Use passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <HeroSection
                    name={name}
                    title={title}
                    scrollY={scrollY}
                    canvasRef={canvasRef}
                />

                <section className={styles.projectsSection}>
                    <div className={styles.projectsContainer}>
                        <h2 className={styles.projectsTitle}>
                            My Projects
                        </h2>
                        <AnimatedProjects projects={projects} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnimatedWebsite;