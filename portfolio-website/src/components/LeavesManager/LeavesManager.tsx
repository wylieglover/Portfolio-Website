import { LEAF_STYLES, LEAF_CONFIG, LeafStyle, LeafDrawingConfig } from '../../constants/leafConstants';

class LeavesManager {
    private leaves: LeafStyle[] = [];
    private readonly numLeaves: number;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null = null;

    constructor(canvas: HTMLCanvasElement | null, numLeaves = LEAF_CONFIG.DEFAULT_NUM_LEAVES) {
        if (!canvas) {
            throw new Error('Canvas element is null');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas context is null');
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.numLeaves = numLeaves;
        this.setCanvasSize();
        this.initLeaves();
    }

    private setCanvasSize(): void {
        const { devicePixelRatio } = window;
        const { innerWidth, innerHeight } = window;

        this.canvas.width = innerWidth * devicePixelRatio;
        this.canvas.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    private createLeaf(): LeafStyle {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * -this.canvas.height,
            size: LEAF_STYLES.BASE_SIZE + Math.random() * LEAF_STYLES.SIZE_VARIANCE,
            rotation: Math.random() * Math.PI * 2,
            speed: LEAF_STYLES.MIN_SPEED + Math.random() * (LEAF_STYLES.MAX_SPEED - LEAF_STYLES.MIN_SPEED),
            opacity: LEAF_STYLES.MIN_OPACITY + Math.random() * (LEAF_STYLES.MAX_OPACITY - LEAF_STYLES.MIN_OPACITY),
        };
    }

    private initLeaves(): void {
        this.leaves = Array.from(
            { length: this.numLeaves },
            () => this.createLeaf()
        );
    }

    private updateLeafPosition(leaf: LeafStyle): void {
        leaf.x += leaf.speed * LEAF_STYLES.HORIZONTAL_DRIFT;
        leaf.y += leaf.speed;
        leaf.rotation += LEAF_STYLES.ROTATION_SPEED;

        if (leaf.y > this.canvas.height) {
            Object.assign(leaf, this.createLeaf());
        }
    }

    private drawLeaf({ ctx, leaf }: LeafDrawingConfig): void {
        ctx.save();
        ctx.globalAlpha = leaf.opacity;
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(LEAF_STYLES.SCALE_X, LEAF_STYLES.SCALE_Y);

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

        ctx.fillStyle = LEAF_STYLES.COLOR;
        ctx.filter = `blur(${LEAF_STYLES.BLUR})`;
        ctx.fill();
        ctx.restore();
    }

    private drawLeaves(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.leaves.forEach(leaf => {
            this.updateLeafPosition(leaf);
            this.drawLeaf({ ctx: this.ctx, leaf });
        });
    }

    public startAnimation(): void {
        const animate = () => {
            this.drawLeaves();
            this.animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }

    public stopAnimation(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    public resizeCanvas(): void {
        this.setCanvasSize();
        this.initLeaves();
    }

    public attachResizeListener(): () => void {
        const resizeHandler = this.resizeCanvas.bind(this);
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }
}

export default LeavesManager;