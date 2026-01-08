import { useState } from 'react';
import cn from 'classnames';
import { IProject } from './model/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faCode } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectDeck.module.css';
import NavVisualizer from './NavVisualizer';

interface ProjectDeckProps {
    projects: readonly IProject[];
}

const ProjectDeck = ({ projects }: ProjectDeckProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
    const activeProject = projects[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div className="w-full max-w-5xl mx-auto relative group">
            {/* The "Device Chassis" - Updated to match VhsToggle aesthetic */}
            {/* Removed border-4 border-static-grey. Using simple border and ring for cleaner look. */}
            <div className="w-full bg-[#1a1c1e] border border-white/10 rounded-lg p-1 relative overflow-hidden shadow-2xl ring-1 ring-black">

                {/* Background Texture & Screws - Subtle */}
                {/* Note: bg-vhs-stripes is defined in global CSS. If not effective here, the solid color is fine. */}
                <div className="absolute top-0 left-0 w-full h-full bg-vhs-stripes opacity-10 pointer-events-none"></div>

                {/* THE UNIFIED SCREEN - Glass slab containing all indicators */}
                <div className={cn(
                    "relative z-10 w-full flex flex-col min-h-[400px]",
                    "border border-chrome-blue/30 rounded-md shadow-[0_0_20px_rgba(0,186,255,0.05)]",
                    "bg-magnetic-black/90 backdrop-blur-md",
                    styles.crtContainer
                )}>
                    {/* Unified Header Bar */}
                    <div className="flex-none h-10 border-b border-chrome-blue/30 bg-gradient-to-r from-chrome-blue/10 to-transparent flex justify-between items-center px-4 relative z-20">
                        <div className="flex items-center gap-3">
                            {/* Bolder Status Light */}
                            <div className={cn(
                                "w-3 h-3 rounded-full shadow-[0_0_8px] animate-pulse transition-colors duration-500",
                                isSimulatingOffline ? "bg-red-500 shadow-red-500" : "bg-emerald-500 shadow-emerald-500"
                            )} />
                            <span className="text-xs font-mono text-chrome-blue uppercase tracking-[0.2em] font-bold">
                                PROJECT_DECK // v2.0
                            </span>
                        </div>

                        {/* Status Tickers */}
                        <div className="flex items-center gap-6 text-[10px] font-mono text-cyan-500/60 uppercase tracking-tight">
                            <span className="hidden md:inline">MEM: 64TB</span>
                            <span className={cn(
                                "hidden md:inline transition-colors duration-500",
                                isSimulatingOffline ? "text-red-500 blink" : ""
                            )}>NET: {isSimulatingOffline ? 'OFFLINE' : 'CONNECTED'}</span>
                            <span className="text-phosphor-amber/80">ID: {activeProject.title.substring(0, 8).toUpperCase()}_</span>
                        </div>
                    </div>

                    {/* Main Content Area: Split View */}
                    <div className="flex-1 flex flex-col md:flex-row relative">

                        {/* LEFT: Project Information */}
                        <div className={cn("flex-1 p-6 relative flex flex-col", styles.crtText)}>

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="flex flex-col gap-1 mb-6 border-l-2 border-phosphor-amber/50 pl-4">
                                    <h3 className="text-2xl md:text-4xl font-bold text-phosphor-amber uppercase tracking-wide leading-none">
                                        {activeProject.title}
                                    </h3>
                                    <span className="text-xs text-chrome-blue/50 font-mono tracking-widest">{activeProject.year} // PERSONAL</span>
                                </div>

                                <p className="text-sm md:text-base leading-relaxed text-faded-cardboard opacity-90 mb-8 font-mono max-w-2xl">
                                    {activeProject.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="text-[10px] text-chrome-blue/40 mb-2 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1 h-1 bg-chrome-blue/40 rounded-full"></div>
                                        TECH_STACK
                                        <div className="w-full h-px bg-chrome-blue/10"></div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.techStack.map(tech => (
                                            <span key={tech} className="px-2 py-1 bg-chrome-blue/5 border border-chrome-blue/20 text-chrome-blue text-xs rounded-sm hover:bg-chrome-blue/10 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VERTICAL DIVIDER (Desktop only) */}
                        <div className="hidden md:block w-px bg-chrome-blue/20 relative z-20">
                            <div className="absolute top-1/2 left-0 -translate-x-1/2 w-1 h-8 bg-chrome-blue/50"></div>
                        </div>

                        {/* RIGHT: Radar & Controls Sidebar */}
                        <div className="w-full md:w-64 bg-black/20 flex flex-col border-t border-chrome-blue/20 md:border-t-0 p-4 gap-4 relative z-10">

                            {/* Radar Module */}
                            <div className="relative w-full aspect-square border border-chrome-blue/20 bg-black/40 rounded-sm overflow-hidden group/radar">
                                <NavVisualizer
                                    total={projects.length}
                                    current={currentIndex}
                                    className="w-full h-full"
                                    isOffline={isSimulatingOffline}
                                />
                                {/* Overlay corner markers */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-chrome-blue/50 pointer-events-none"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-chrome-blue/50 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-chrome-blue/50 pointer-events-none"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-chrome-blue/50 pointer-events-none"></div>

                                {/* Hidden Simulator Toggle (Hover top right) */}
                                <button
                                    onClick={() => setIsSimulatingOffline(!isSimulatingOffline)}
                                    className="absolute top-1 right-1 w-4 h-4 bg-transparent z-50 opacity-0 group-hover/radar:opacity-50 hover:!opacity-100 cursor-crosshair"
                                    title="Toggle Signal Jammer"
                                >
                                    <div className={cn("w-full h-full border border-red-500/50 rounded-full flex items-center justify-center", isSimulatingOffline && "bg-red-500/20")}>
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                                    </div>
                                </button>
                            </div>

                            {/* Control Interface */}
                            <div className="flex-1 flex flex-col gap-3 relative">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={handlePrev}
                                        disabled={isSimulatingOffline}
                                        className={cn(
                                            "h-10 border border-chrome-blue/30 hover:bg-chrome-blue/10 text-chrome-blue transition-all group relative overflow-hidden",
                                            isSimulatingOffline && "opacity-50 grayscale cursor-not-allowed hover:bg-transparent"
                                        )}
                                        aria-label="Previous Project"
                                    >
                                        <span className="relative z-10"><FontAwesomeIcon icon={faBackward} /></span>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={isSimulatingOffline}
                                        className={cn(
                                            "h-10 border border-chrome-blue/30 hover:bg-chrome-blue/10 text-chrome-blue transition-all group relative overflow-hidden",
                                            isSimulatingOffline && "opacity-50 grayscale cursor-not-allowed hover:bg-transparent"
                                        )}
                                        aria-label="Next Project"
                                    >
                                        <span className="relative z-10"><FontAwesomeIcon icon={faForward} /></span>
                                    </button>
                                </div>

                                <div className="space-y-2 relative z-10">
                                    {activeProject.repo && (
                                        <a href={activeProject.repo} target="_blank" rel="noreferrer"
                                            className="block w-full py-2 px-3 border border-chrome-blue/20 text-[10px] uppercase tracking-wider text-chrome-blue/70 hover:text-phosphor-amber hover:border-phosphor-amber/50 hover:bg-phosphor-amber/5 transition-all flex items-center justify-between group"
                                        >
                                            <span className="flex items-center gap-2">
                                                <FontAwesomeIcon icon={faCode} /> SOURCE_CODE
                                            </span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{'>>'}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectDeck;
