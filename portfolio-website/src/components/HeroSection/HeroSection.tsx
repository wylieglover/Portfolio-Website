// HeroSection.tsx
import React from 'react';
import { HeroSectionProps } from '../../types/types';

const HeroSection: React.FC<HeroSectionProps> = ({ name, title, scrollY, canvasRef }) => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none"
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
                            transform: `rotate(${scrollY * (0.05 + i * 0.02)}deg) scale(${Math.max(0.5, 1 - scrollY / 3000)})`,
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
    );
};

export default HeroSection;
