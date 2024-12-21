export interface Project {
    title: string;
    description: string;
    tags: string[];
}

export interface Leaf {
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    opacity: number;
}

export interface AnimatedWebsiteProps {
    name: string;
    title: string;
    projects: Project[];
}