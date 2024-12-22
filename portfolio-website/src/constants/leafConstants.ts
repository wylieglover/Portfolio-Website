export const LEAF_STYLES = {
    BASE_SIZE: 10,
    SIZE_VARIANCE: 15,
    MIN_OPACITY: 0.3,
    MAX_OPACITY: 0.6,
    COLOR: 'white',
    BLUR: '2px',
    MIN_SPEED: 1,
    MAX_SPEED: 3,
    HORIZONTAL_DRIFT: 0.7,
    ROTATION_SPEED: 0.01,
    SCALE_X: 0.8,
    SCALE_Y: 1,
} as const;

export const LEAF_CONFIG = {
    DEFAULT_NUM_LEAVES: 25,
} as const;

export interface LeafStyle {
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    opacity: number;
}

export interface LeafDrawingConfig {
    ctx: CanvasRenderingContext2D;
    leaf: LeafStyle;
}