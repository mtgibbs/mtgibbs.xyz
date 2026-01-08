export interface IProject {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    link?: string | null;
    repo?: string;
    year: string; // "Stardate" or actual year
}
