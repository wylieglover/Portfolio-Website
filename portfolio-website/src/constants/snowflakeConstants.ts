// src/constants/snowflakeStyles.ts

export const SNOWFLAKE_STYLES = {
    BASE_SIZE: 10,
    SIZE_VARIANCE: 15,
    MIN_OPACITY: 0.5,
    MAX_OPACITY: 1.0,
    MIN_SPEED: 0.5,
    MAX_SPEED: 2.0,
    HORIZONTAL_DRIFT: 0.3,
    COLOR: 'white',
    LINE_WIDTH: 2,
    SHADOW_BLUR: 10,
    SHADOW_COLOR: 'rgba(255, 255, 255, 0.9)',
    BRANCHES: 6,
    SIDE_BRANCHES: 2,
    BRANCH_ANGLE: Math.PI / 12,
    BRANCH_LENGTH_RATIO: 1 / 3,
} as const;

export const SNOWFLAKE_CONFIG = {
    DEFAULT_NUM_SNOWFLAKES: 50,
} as const;

export interface SnowflakeStyle {
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    opacity: number;
}

export interface SnowflakeDrawingConfig {
    ctx: CanvasRenderingContext2D;
    size: number;
}