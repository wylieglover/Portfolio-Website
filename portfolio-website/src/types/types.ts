export interface FloatingShapesProps {
    scrollY: number;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string | undefined;
}

export interface AnimatedWebsiteProps {
    name: string;
    title: string;
    projects: Project[];
}

export interface HeroSectionProps {
    name: string;
    title: string;
}