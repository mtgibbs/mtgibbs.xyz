
import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './NavVisualizer.module.css';

interface NavVisualizerProps {
    total: number;
    current: number;
    className?: string;
    isOffline?: boolean;
}

// Generate deterministic random positions based on index
const getPosition = (index: number, total: number) => {
    // pseudo-random but deterministic based on index
    const angle = ((index * 137.5) % 360) * (Math.PI / 180); // varying angles
    const radius = 25 + ((index * 47) % 45); // varying radius between 25% and 70%

    // Convert to x/y percentages (50% is center)
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);

    return { x, y };
};

const NavVisualizer: React.FC<NavVisualizerProps> = ({ total, current, className, isOffline = false }) => {
    // Memoize positions so they don't jump around on re-renders unless total changes
    const dotPositions = useMemo(() => {
        return Array.from({ length: total }, (_, i) => {
            const { x, y } = getPosition(i, total);
            // Calculate angle from Center (50, 50)
            // atan2(dy, dx) gives angle from Right (0 rads). 
            // In CSS rotate(0) is usually Top. 
            // We need 0deg = Top.
            // Right = 90deg, Bottom = 180deg, Left = 270deg.
            // atan2(y,x): 0=Right, PI/2=Bottom (screen coords y pos), etc.
            // dx = x - 50, dy = y - 50.
            const dx = x - 50;
            const dy = y - 50;
            // angle from Right in radians
            let rad = Math.atan2(dy, dx);
            // Convert to degrees (0 to 360)
            // +90 to shift 0 to Top
            let deg = (rad * 180 / Math.PI) + 90;
            if (deg < 0) deg += 360;

            // Sweep animation: 8s total cycle.
            // 0 - 37.5% (0 - 3s) is sweep 0-360.
            // 37.5% - 100% is wait.
            // Hit time for 'deg' is (deg / 360) * 3s
            const delay = (deg / 360) * 3;

            return {
                index: i,
                x, y,
                delay
            };
        });
    }, [total]);

    const activeDot = dotPositions[current];

    return (
        <div className={cn(
            "w-full aspect-square relative overflow-hidden",
            styles.scannerContainer,
            isOffline && styles.jammedContainer,
            className
        )}>
            {/* CRT Effects */}
            <div className={styles.scanlines}></div>
            <div className={cn(styles.staticOverlay, isOffline && styles.jammedOverlay)}></div>
            <div className={cn(styles.refreshLine, isOffline && styles.scanlineJammed)}></div>

            {/* Content Layer */}
            <div className={cn("w-full h-full relative")}>

                {/* Grid Overlay - Blue/Purple Theme (Red if offline) */}
                <div className={cn(
                    "absolute inset-0 z-10 grid grid-cols-4 grid-rows-4 pointer-events-none transition-colors duration-500",
                    isOffline ? "opacity-40" : "opacity-20"
                )}>
                    {/* Horizontal lines */}
                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>

                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>

                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-r border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-b transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>

                    <div className={cn("border-r transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-l transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div className={cn("border-r transition-colors duration-500", isOffline ? "border-red-500/30" : "border-cyan-500/30")}></div>
                    <div></div>
                </div>

                {/* Circular Radar Background Rings */}
                <div className={cn("absolute inset-[15%] border rounded-full z-0 transition-colors duration-500", isOffline ? "border-red-500/20" : "border-cyan-500/10")}></div>
                <div className={cn("absolute inset-[35%] border rounded-full z-0 transition-colors duration-500", isOffline ? "border-red-500/20" : "border-violet-500/10")}></div>
                <div className={cn("absolute inset-[65%] border rounded-full z-0 transition-colors duration-500", isOffline ? "border-red-500/20" : "border-cyan-500/10")}></div>

                {/* Radar Sweep Animation (Blue/Purple or Hidden) */}
                <div className={cn("absolute inset-0 z-20", styles.radarSweep, isOffline && styles.sweeperJammed)}></div>

                {/* Jammed Warning Text Overlay */}
                {isOffline && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center flex-col pointer-events-none">
                        <div className={cn("text-lg", styles.jammedText)}>SIGNAL LOST</div>
                        <div className="text-[10px] text-red-500/80 font-mono mt-1 tracking-widest animate-pulse">RETRYING CONNECTION...</div>
                    </div>
                )}

                {/* Project Dots (Only visible if not offline) */}
                {!isOffline && (
                    <div className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-300">
                        {dotPositions.map((pos) => {
                            const isActive = pos.index === current;
                            return (
                                <div
                                    key={pos.index}
                                    className={cn(
                                        "absolute w-1.5 h-1.5 rounded-full transition-all duration-500",
                                        isActive
                                            ? cn("bg-white shadow-[0_0_8px_#fff]", styles.pingEffectActive)
                                            : cn("bg-cyan-600/60 shadow-[0_0_4px_rgba(8,145,178,0.4)]", styles.pingEffect)
                                    )}
                                    style={{
                                        left: `${pos.x}%`,
                                        top: `${pos.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        animationDelay: `${pos.delay}s`
                                    }}
                                />
                            );
                        })}

                        {/* Active Target Reticle - Red/Orange Dotted Line */}
                        {activeDot && (
                            <div
                                className={cn("absolute transition-all duration-500 z-40", styles.reticleSpin)}
                                style={{
                                    left: `${activeDot.x}%`,
                                    top: `${activeDot.y}%`,
                                    width: '24px',
                                    height: '24px'
                                }}
                            >
                                {/* Outer Ring */}
                                <div className="absolute inset-0 border-2 border-dotted border-red-500/80 rounded-full"></div>

                                {/* Crosshairs */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-2 bg-red-500/80"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-2 bg-red-500/80"></div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-0.5 bg-red-500/80"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-0.5 bg-red-500/80"></div>
                            </div>
                        )}
                    </div>
                )}

                {/* CRT Glowing GitHub Icon - Lower Left (approx 225 degrees) */}
                {/* 225deg / 360 * 3s = 1.875s delay */}
                <div
                    className={cn("absolute bottom-3 left-3 z-20 pointer-events-auto opacity-80 mix-blend-screen hover:scale-110 transition-transform cursor-pointer", styles.iconPing)}
                    style={{ animationDelay: '1.875s' }}
                    onClick={() => window.open('https://github.com/mtgibbs/mtgibbs.xyz', '_blank')}
                >
                    <svg className={cn("w-6 h-6 drop-shadow-[0_0_6px_rgba(0,186,255,0.8)] transition-colors duration-500", isOffline ? "text-red-500/50" : "text-chrome-blue")} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
                    </svg>
                </div>
            </div>

            {/* Text Overlay */}
            <div className={cn("absolute bottom-1 right-2 text-[8px] font-mono z-30 transition-colors duration-500", isOffline ? "text-red-500/70" : "text-cyan-400/70")}>
                {isOffline ? 'ERR_404_HOST_UNREACHABLE' : `TGT_${String(current + 1).padStart(2, '0')}`}
            </div>
            <div className={cn("absolute top-1 left-2 text-[8px] font-mono z-30 flex flex-col gap-0.5 leading-none transition-colors duration-500", isOffline ? "text-red-500/70" : "text-violet-400/70")}>
                <span>{isOffline ? 'SYS_FAIL' : 'SYS_SCAN'}</span>
                <span className="text-[6px] opacity-50">MODE: {isOffline ? 'OFFLINE' : 'AUTO'}</span>
            </div>
        </div>
    );
};

export default NavVisualizer;
