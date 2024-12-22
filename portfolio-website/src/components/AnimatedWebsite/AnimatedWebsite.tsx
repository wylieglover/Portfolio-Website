// AnimatedWebsite.tsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatedWebsiteProps } from '../../types/types';
import './AnimatedWebsite.module.css';

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

    useEffect(() => {
        if (canvasRef.current) {
            // Initialize LeavesManager with the canvas
            snowflakesManagerRef.current = new SnowflakesManager(canvasRef.current);

            // Start the animation
            snowflakesManagerRef.current.startAnimation();

            // Attach resize listener
            const cleanupResize = snowflakesManagerRef.current.attachResizeListener();

            // Cleanup on unmount
            return () => {
                snowflakesManagerRef.current?.stopAnimation();
                cleanupResize();
            };
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Content container */}
            <div className="relative inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                {/* Hero Section */}
                <HeroSection name={name} title={title} scrollY={scrollY} canvasRef={canvasRef} />

                <div className="relative min-h-screen py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-12 text-center">
                            My Projects
                        </h2>
                        <AnimatedProjects projects={projects} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedWebsite;