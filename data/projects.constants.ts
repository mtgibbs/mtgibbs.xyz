import { IProject } from "../components/project-deck/model/project";

export const PROJECTS: readonly IProject[] = [
    {
        id: "TAPE-01",
        title: "mtgibbs.xyz",
        description: "Personal portfolio / comms relay. Built to survive high-orbit entry. Features a retro-futuristic interface, hidden system logs, and responsive cyber-grid systems.",
        techStack: ["Next.js 16", "TailwindCSS", "React 19"],
        repo: "https://github.com/mtgibbs/mtgibbs.xyz",
        year: "2026",
    },
    {
        id: "TAPE-02",
        title: "hubot-fod",
        description: "Hubot Script for interacting with Fortify on Demand. Automates security scan initiation and retrieval within chat ops workflows.",
        techStack: ["TypeScript", "Hubot", "REST API"],
        repo: "https://github.com/mtgibbs/hubot-fod",
        year: "2024",
    },
    {
        id: "TAPE-03",
        title: "claude-hiring-assistant",
        description: "CLI-based interview partner powered by Claude. Helps evaluate candidate responses and provides real-time feedback for technical interviews.",
        techStack: ["TypeScript", "Anthropic API", "CLI"],
        repo: "https://github.com/mtgibbs/claude-hiring-assistant",
        year: "2025",
    },
    {
        id: "TAPE-04",
        title: "chartist-plugin-labelclasses",
        description: "Chartist.js plugin that allows adding custom CSS classes to labels, enabling granuar styling control for chart axis labels.",
        techStack: ["JavaScript", "Chartist.js", "CSS"],
        repo: "https://github.com/mtgibbs/chartist-plugin-labelclasses",
        year: "2023",
    },
    {
        id: "TAPE-05",
        title: "iot-gd",
        description: "Raspberry Pi garage door opener prototype. Securely controls physical garage doors via web interface using GPIO pins.",
        techStack: ["Python", "Raspberry Pi", "IoT"],
        repo: "https://github.com/mtgibbs/iot-gd",
        year: "2022",
    },
    {
        id: "TAPE-06",
        title: "pi-cluster",
        description: "Shell scripts for provisioning and managing a home Raspberry Pi Kubernetes cluster. Lightweight infrastructure for personal cloud hosting.",
        techStack: ["Shell", "Kubernetes", "Linux"],
        repo: "https://github.com/mtgibbs/pi-cluster",
        year: "2024",
    },
];
