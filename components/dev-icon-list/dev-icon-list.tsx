import React from 'react';
import cn from 'classnames';
import DevIcon from "./dev-icon";
import { IDevIconOptions } from "./model/dev-icon-options";

interface DevIconListProps {
    icons: readonly IDevIconOptions[];
}

const DevIconList = ({ icons }: DevIconListProps): React.ReactNode => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = React.useState(false);
    const [hasInteracted, setHasInteracted] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const lastClientRef = React.useRef({ x: 0, y: 0 });

    React.useEffect(() => {
        setIsTouch(window.matchMedia('(hover: none)').matches);

        const updateMousePos = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Performance check: Only update if container is somewhat visible (or we want the effect to be ready)
                // And only if we have interacted or are tracking global mouse

                // Calculate relative position based on LATEST client coordinates
                const x = lastClientRef.current.x - rect.left;
                const y = lastClientRef.current.y - rect.top;

                setMousePos({ x, y });
            }
        };

        const handleGlobalMouseMove = (e: MouseEvent) => {
            lastClientRef.current = { x: e.clientX, y: e.clientY };

            // Check if mouse is over container to trigger "interaction"
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const isOver =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                if (isOver && !hasInteracted) {
                    setHasInteracted(true);
                }

                // If we've interacted (or just want accurate tracking whenever visible), update
                // Updating on every mouse move might be heavy, but it's required for the effect.
                // We can scope this: only update if isOver OR if we want to handle the "exit" gracefully.
                // For now, let's update if we've ever interacted, but maybe clamp or optimize?
                // Actually, the original code only updated when mouse was over the separate div.
                // Let's stick to updating if isOver to mimic "hover" flashlight.
                // BUT "all the light dims" when scrolling implies we lose it. 
                // So we should update whenever "isOver" (which changes on scroll).

                if (isOver) {
                    updateMousePos();
                }
            }
        };

        const handleScroll = () => {
            // On scroll, the element moves under the mouse. We must update relative pos.
            // But only if the mouse is actually over the element (otherwise the light is hidden/irrelevant).
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const isOver =
                    lastClientRef.current.x >= rect.left &&
                    lastClientRef.current.x <= rect.right &&
                    lastClientRef.current.y >= rect.top &&
                    lastClientRef.current.y <= rect.bottom;

                if (isOver) {
                    // Ensure interaction is flagged if we scrolled under the mouse
                    if (!hasInteracted) setHasInteracted(true);
                    updateMousePos();
                }
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasInteracted]); // Dependencies

    // We no longer need the onMouseMove on the div itself if we use global, 
    // but keeping it doesn't hurt. However, removing it avoids double-firing.

    return (
        <div className="px-4 container mx-auto">
            <div
                ref={containerRef}
                className="container mx-auto relative group"
            >
                {/* Base Layer - Normal Icons (Always Visible) */}
                <div className={cn(
                    "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center text-transparent bg-clip-text bg-gradient-to-b from-signal-orange via-tracking-red to-chrome-blue"
                )}>
                    {icons.map((iconOption) => (
                        <div key={iconOption.icon} className="flex items-center justify-center p-4">
                            <DevIcon
                                icon={iconOption.icon}
                                isColor={iconOption.isColor}
                                isWordmark={iconOption.isWordmark}
                                style={iconOption.style}
                            />
                        </div>
                    ))}
                </div>

                {/* Glow Layer - Animated Icons (Masked by Cursor on Desktop, Hidden on Touch) */}
                <div
                    className={cn(
                        "absolute inset-0 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center pointer-events-none transition-opacity duration-500",
                        isTouch ? "hidden" : (!hasInteracted ? "opacity-0" : "opacity-100")
                    )}
                    style={{
                        maskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                        WebkitMaskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    }}
                >
                    {icons.map((iconOption) => (
                        <div key={iconOption.icon + '-glow'} className="flex items-center justify-center p-4">
                            <DevIcon
                                icon={iconOption.icon}
                                isColor={iconOption.isColor}
                                isWordmark={iconOption.isWordmark}
                                style={iconOption.style}
                                glow
                                className="animate-terminal-glow text-phosphor-amber drop-shadow-[0_0_8px_rgba(255,176,0,0.8)]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DevIconList;