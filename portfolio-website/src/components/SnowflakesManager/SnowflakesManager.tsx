import { Snowflake } from '../../types/types';

class SnowflakesManager {
    private snowflakes: Snowflake[] = [];
    private numSnowflakes: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null = null;

    constructor(canvas: HTMLCanvasElement | null, numSnowflakes = 50) {
        if (!canvas) {
            throw new Error('Canvas element is null');
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Canvas context is null');
        }

        this.canvas = canvas;
        this.ctx = ctx;
        this.numSnowflakes = numSnowflakes;
        this.setCanvasSize();
        this.initSnowflakes();
    }

    private setCanvasSize() {
        const { devicePixelRatio } = window;

        // Adjust canvas size for the viewport
        this.canvas.width = window.innerWidth * devicePixelRatio;
        this.canvas.height = window.innerHeight * devicePixelRatio;

        // Scale the drawing context for high-DPI screens
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    private initSnowflakes() {
        const baseSize = 10;
        const sizeVariance = 15;

        this.snowflakes = Array.from({ length: this.numSnowflakes }).map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * -this.canvas.height, // Start off-screen above
            size: baseSize + Math.random() * sizeVariance,
            rotation: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 1.5,
            opacity: 0.5 + Math.random() * 0.5,
        }));
    }

    private drawSnowflakes() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snowflakes.forEach(snowflake => {
            snowflake.x += snowflake.speed * 0.3; // Subtle horizontal drift
            snowflake.y += snowflake.speed; // Fall vertically

            // Reset position when it goes out of bounds
            if (snowflake.y > this.canvas.height) {
                snowflake.y = -snowflake.size; // Reset above the canvas
                snowflake.x = Math.random() * this.canvas.width;
            }

            this.ctx.save();
            this.ctx.globalAlpha = snowflake.opacity;
            this.ctx.translate(snowflake.x, snowflake.y);
            this.ctx.rotate(snowflake.rotation);

            this.drawSnowflake(this.ctx, snowflake.size);

            this.ctx.restore();
        });
    }

    private drawSnowflake(ctx: CanvasRenderingContext2D, size: number) {
        const branches = 6;
        const radius = size / 2;

        ctx.beginPath();
        for (let i = 0; i < branches; i++) {
            const angle = ((Math.PI * 2) / branches) * i;

            // Main branch
            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, y1);

            // Side branches
            for (let j = 1; j <= 2; j++) {
                const branchLength = radius / 3;
                const branchAngle = angle - (Math.PI / 12) * j;
                const bx1 = x1 * (1 - j / 3);
                const by1 = y1 * (1 - j / 3);
                const bx2 = bx1 + Math.cos(branchAngle) * branchLength;
                const by2 = by1 + Math.sin(branchAngle) * branchLength;

                ctx.moveTo(bx1, by1);
                ctx.lineTo(bx2, by2);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.stroke();
    }

    public startAnimation() {
        const animate = () => {
            this.drawSnowflakes();
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
        this.setCanvasSize();
        this.initSnowflakes();
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

export default SnowflakesManager;
