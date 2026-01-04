import React from 'react';
import DevIcon from "./dev-icon";
import { IDevIconOptions } from "./model/dev-icon-options";

interface DevIconListProps {
    icons: readonly IDevIconOptions[];
}

const DevIconList = ({ icons }: DevIconListProps): React.ReactNode => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div className="px-4 py-12 sm:p-24">
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="container mx-auto relative group"
            >
                {/* Base Layer - Normal Icons (Always Visible) */}
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center text-transparent bg-clip-text bg-gradient-to-b from-signal-orange via-tracking-red to-chrome-blue opacity-50 transition-opacity duration-300 group-hover:opacity-100">
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

                {/* Glow Layer - Animated Icons (Masked by Cursor) */}
                <div
                    className="absolute inset-0 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center pointer-events-none"
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