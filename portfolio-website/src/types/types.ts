export interface Project {
    title: string;
    description: string;
    tags: string[];
}

export interface AnimatedWebsiteProps {
    name: string;
    title: string;
    projects: Project[];
}

export interface HeroSectionProps {
    name: string;
    title: string;
    scrollY: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>; // Allow null
}