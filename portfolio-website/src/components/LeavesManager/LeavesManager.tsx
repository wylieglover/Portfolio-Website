import { Leaf } from '../../types/types';

class LeavesManager {
    private leaves: Leaf[] = [];
    private numLeaves: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null = null;

    constructor(canvas: HTMLCanvasElement | null, numLeaves = 25) {
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

    private setCanvasSize() {
        const { devicePixelRatio } = window;

        // Adjust canvas size for the viewport
        this.canvas.width = window.innerWidth * devicePixelRatio;
        this.canvas.height = window.innerHeight * devicePixelRatio;

        // Scale the drawing context for high-DPI screens
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    private initLeaves() {
        const baseSize = 10;
        const sizeVariance = 15;

        this.leaves = Array.from({ length: this.numLeaves }).map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * -this.canvas.height, // Start off-screen above
            size: baseSize + Math.random() * sizeVariance, // Consistent size range
            rotation: Math.random() * Math.PI * 2,
            speed: 1 + Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.3, // Vary opacity
        }));
    }

    private drawLeaves() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.leaves.forEach(leaf => {
            leaf.x += leaf.speed * 0.7; // Move diagonally
            leaf.y += leaf.speed; // Move downward
            leaf.rotation += 0.01; // Slight rotation

            if (leaf.y > this.canvas.height) {
                leaf.y = -leaf.size; // Reset position above the canvas
                leaf.x = Math.random() * this.canvas.width;
            }

            this.ctx.save();
            this.ctx.globalAlpha = leaf.opacity;
            this.ctx.translate(leaf.x, leaf.y);
            this.ctx.rotate(leaf.rotation);
            this.ctx.scale(0.8, 1);

            this.ctx.beginPath();
            this.ctx.moveTo(0, -leaf.size / 2);
            this.ctx.bezierCurveTo(
                leaf.size / 3, -leaf.size / 4,
                leaf.size / 2, leaf.size / 4,
                0, leaf.size / 2
            );
            this.ctx.bezierCurveTo(
                -leaf.size / 2, leaf.size / 4,
                -leaf.size / 3, -leaf.size / 4,
                0, -leaf.size / 2
            );
            this.ctx.fillStyle = 'white';
            this.ctx.filter = 'blur(2px)';
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    public startAnimation() {
        const animate = () => {
            this.drawLeaves();
            this.animationFrameId = requestAnimationFrame(animate);
        };

        animate();
    }

    public stopAnimation() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    public resizeCanvas() {
        // Centralize size adjustment and reinitialize leaves
        this.setCanvasSize();
        this.initLeaves();
    }

    public attachResizeListener() {
        const resizeHandler = () => {
            this.resizeCanvas();
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }
}

export default LeavesManager;