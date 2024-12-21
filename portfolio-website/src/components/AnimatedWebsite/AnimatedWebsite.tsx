// AnimatedWebsite.tsx
import React, { useState, useEffect, useRef } from 'react';
import { AnimatedWebsiteProps, Leaf } from './types';
import AnimatedProjects from '../AnimatedProjects/AnimatedProjects';
import './AnimatedWebsite.css';

const AnimatedWebsite: React.FC<AnimatedWebsiteProps> = ({
    name,
    title,
    projects
}) => {
    const [scrollY, setScrollY] = useState(0);
    const leavesRef = useRef<Leaf[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Initialize particles
    useEffect(() => {
        const createLeaves = () => {
            const numLeaves = 25;
            const newLeaves: Leaf[] = [];
            for (let i = 0; i < numLeaves; i++) {
                newLeaves.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * -window.innerHeight, // Start off-screen above
                    size: 10 + Math.random() * 15,
                    rotation: Math.random() * Math.PI * 2,
                    speed: 1 + Math.random() * 2,
                    opacity: 0.3 + Math.random() * 0.3, // Vary opacity
                });
            }
            leavesRef.current = newLeaves;
        };

        createLeaves();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            leavesRef.current = leavesRef.current.map(leaf => {
                leaf.x += leaf.speed * 0.7; // Move diagonally
                leaf.y += leaf.speed; // Move downward
                leaf.rotation += 0.01; // Slight rotation

                if (leaf.y > window.innerHeight) {
                    leaf.y = -leaf.size; // Reset position when off-screen
                    leaf.x = Math.random() * window.innerWidth;
                }

                ctx.save();
                ctx.globalAlpha = leaf.opacity; // Apply opacity
                ctx.translate(leaf.x, leaf.y);
                ctx.rotate(leaf.rotation);
                ctx.scale(0.8, 1); // Slightly scale the leaf for a more natural look

                ctx.beginPath();
                ctx.moveTo(0, -leaf.size / 2);
                ctx.bezierCurveTo(
                    leaf.size / 3, -leaf.size / 4,
                    leaf.size / 2, leaf.size / 4,
                    0, leaf.size / 2
                );
                ctx.bezierCurveTo(
                    -leaf.size / 2, leaf.size / 4,
                    -leaf.size / 3, -leaf.size / 4,
                    0, -leaf.size / 2
                );
                ctx.fillStyle = 'white';
                ctx.filter = 'blur(2px)'; // Apply blur for the "behind" effect
                ctx.fill();
                ctx.restore();

                return leaf;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
                canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.scale(window.devicePixelRatio, window.devicePixelRatio); // For high-DPI screens
                }
            }
        };

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Fixed background that spans the entire page */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
            {/* Content container */}
            <div className="relative">
                {/* Hero Section */}
                <div className="relative h-screen w-full overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="fixed inset-0 pointer-events-none leaves"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />

                    {/* Floating shapes */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 floating-shape"
                                style={{
                                    backgroundColor: i % 2 === 0 ? '#f9a8d4' : '#c4b5fd',
                                    width: `${100 + i * 50}px`,
                                    height: `${100 + i * 50}px`,
                                    left: `${(i * 20) + 10}%`,
                                    top: `${10 + i * 10}%`,
                                    transform: `rotate(${scrollY * (0.05 + i * 0.02)}deg) scale(${1 - scrollY / 3000})`,
                                    transition: 'transform 0.1s linear',
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <h1 className="text-6xl font-bold mb-4 tracking-tight">
                            Hello, I'm{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                                {name}
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-md text-center mb-8">
                            {title}
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-all"
                        >
                            View My Work
                        </button>
                    </div>

                    {/* Bouncing Arrow */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-white animate-bounce"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>

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