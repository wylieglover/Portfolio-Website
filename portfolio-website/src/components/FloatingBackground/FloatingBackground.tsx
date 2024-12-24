import React, { memo } from 'react';
import styles from './FloatingBackground.module.css';
import { FloatingShapesProps } from '../../types/types';

const FloatingBackground: React.FC<FloatingShapesProps> = ({ scrollY }) => {
    const renderFloatingShapes = () => {
        return [...Array(5)].map((_, i) => (
            <div
                key={i}
                className={`${styles.floatingShapes} ${i % 2 === 0 ? styles.pinkShape : styles.purpleShape}`}
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
    return <div className={styles.shapesContainer}>{renderFloatingShapes()}</div>;
};

export default memo(FloatingBackground);