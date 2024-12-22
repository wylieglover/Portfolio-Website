import {
    SNOWFLAKE_STYLES,
    SNOWFLAKE_CONFIG,
    SnowflakeStyle,
    SnowflakeDrawingConfig
} from '../../constants/snowflakeConstants';

class SnowflakesManager {
    private snowflakes: SnowflakeStyle[] = [];
    private readonly numSnowflakes: number;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null = null;

    constructor(canvas: HTMLCanvasElement | null, numSnowflakes = SNOWFLAKE_CONFIG.DEFAULT_NUM_SNOWFLAKES) {
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

    private setCanvasSize(): void {
        const { devicePixelRatio } = window;
        const { innerWidth, innerHeight } = window;

        this.canvas.width = innerWidth * devicePixelRatio;
        this.canvas.height = innerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    private createSnowflake(): SnowflakeStyle {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * -this.canvas.height,
            size: SNOWFLAKE_STYLES.BASE_SIZE + Math.random() * SNOWFLAKE_STYLES.SIZE_VARIANCE,
            rotation: Math.random() * Math.PI * 2,
            speed: SNOWFLAKE_STYLES.MIN_SPEED + Math.random() * (SNOWFLAKE_STYLES.MAX_SPEED - SNOWFLAKE_STYLES.MIN_SPEED),
            opacity: SNOWFLAKE_STYLES.MIN_OPACITY + Math.random() * (SNOWFLAKE_STYLES.MAX_OPACITY - SNOWFLAKE_STYLES.MIN_OPACITY),
        };
    }

    private initSnowflakes(): void {
        this.snowflakes = Array.from(
            { length: this.numSnowflakes },
            () => this.createSnowflake()
        );
    }

    private updateSnowflakePosition(snowflake: SnowflakeStyle): void {
        snowflake.x += snowflake.speed * SNOWFLAKE_STYLES.HORIZONTAL_DRIFT;
        snowflake.y += snowflake.speed;

        if (snowflake.y > this.canvas.height) {
            Object.assign(snowflake, this.createSnowflake());
        }
    }

    private drawSnowflakeBranches(ctx: CanvasRenderingContext2D, radius: number): void {
        const { BRANCHES, SIDE_BRANCHES, BRANCH_ANGLE, BRANCH_LENGTH_RATIO } = SNOWFLAKE_STYLES;

        ctx.beginPath();
        for (let i = 0; i < BRANCHES; i++) {
            const angle = ((Math.PI * 2) / BRANCHES) * i;

            // Main branch
            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, y1);

            // Side branches
            for (let j = 1; j <= SIDE_BRANCHES; j++) {
                const branchLength = radius * BRANCH_LENGTH_RATIO;
                const branchAngle = angle - BRANCH_ANGLE * j;
                const bx1 = x1 * (1 - j / 3);
                const by1 = y1 * (1 - j / 3);
                const bx2 = bx1 + Math.cos(branchAngle) * branchLength;
                const by2 = by1 + Math.sin(branchAngle) * branchLength;

                ctx.moveTo(bx1, by1);
                ctx.lineTo(bx2, by2);
            }
        }
        ctx.closePath();
    }

    private applySnowflakeStyles(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = SNOWFLAKE_STYLES.COLOR;
        ctx.lineWidth = SNOWFLAKE_STYLES.LINE_WIDTH;
        ctx.shadowBlur = SNOWFLAKE_STYLES.SHADOW_BLUR;
        ctx.shadowColor = SNOWFLAKE_STYLES.SHADOW_COLOR;
    }

    private drawSingleSnowflake({ ctx, size }: SnowflakeDrawingConfig): void {
        const radius = size / 2;
        this.drawSnowflakeBranches(ctx, radius);
        this.applySnowflakeStyles(ctx);
        ctx.stroke();
    }

    private drawSnowflakes(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snowflakes.forEach(snowflake => {
            this.updateSnowflakePosition(snowflake);

            this.ctx.save();
            this.ctx.globalAlpha = snowflake.opacity;
            this.ctx.translate(snowflake.x, snowflake.y);
            this.ctx.rotate(snowflake.rotation);

            this.drawSingleSnowflake({
                ctx: this.ctx,
                size: snowflake.size
            });

            this.ctx.restore();
        });
    }

    public startAnimation(): void {
        const animate = () => {
            this.drawSnowflakes();
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
        this.initSnowflakes();
    }

    public attachResizeListener(): () => void {
        const resizeHandler = this.resizeCanvas.bind(this);
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }
}

export default SnowflakesManager;