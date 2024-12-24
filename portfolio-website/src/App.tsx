import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/App.module.css';
import { SITE_CONFIG } from './constants/appConstants';

import SnowflakesManager from './components/SnowflakesManager';
import AnimatedProjects from './components/AnimatedProjects';
import HeroSection from './components/HeroSection';
import FloatingBackground from './components/FloatingBackground';
// import ResumeSection from './components/ResumeSection/ResumeSection'; 

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesManagerRef = useRef<SnowflakesManager | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      snowflakesManagerRef.current = new SnowflakesManager(canvasRef.current);
      snowflakesManagerRef.current.startAnimation();

      const cleanupResize = snowflakesManagerRef.current.attachResizeListener();

      return () => {
        snowflakesManagerRef.current?.stopAnimation();
        cleanupResize();
        snowflakesManagerRef.current = null;
      };
    }

    return () => { };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.backgroundLayer}>
        <FloatingBackground scrollY={scrollY} />
        <canvas
          ref={canvasRef}
          className={styles.canvas}
        />
      </div>

      <div className={styles.contentLayer}>
        <HeroSection
          name={SITE_CONFIG.name}
          title={SITE_CONFIG.title}
        />

        <section className={styles.projectsSection}>
          <div className={styles.projectsContainer}>
            <h2 className={styles.projectsTitle}>
              My Projects
            </h2>
            <AnimatedProjects projects={SITE_CONFIG.projects} />
          </div>
        </section>
      </div>

    </div>
  );
};

export default App;