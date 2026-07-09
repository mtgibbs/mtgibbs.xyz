import React from 'react';
import cn from 'classnames';

interface SectionTitleProps {
    title: string;
    color?: 'orange' | 'blue' | 'green' | 'amber' | 'red';
    classKey?: string;
}

const COLORS = {
    orange: {
        border: 'border-signal-orange',
        text: 'text-signal-orange',
        shadow: 'shadow-signal-orange/20',
        bg: 'bg-signal-orange/10'
    },
    blue: {
        border: 'border-chrome-blue',
        text: 'text-chrome-blue',
        shadow: 'shadow-chrome-blue/20',
        bg: 'bg-chrome-blue/10'
    },
    green: {
        border: 'border-emerald-500',
        text: 'text-emerald-500',
        shadow: 'shadow-emerald-500/20',
        bg: 'bg-emerald-500/10'
    },
    amber: {
        border: 'border-phosphor-amber',
        text: 'text-phosphor-amber',
        shadow: 'shadow-phosphor-amber/20',
        bg: 'bg-phosphor-amber/10'
    },
    red: {
        border: 'border-tracking-red',
        text: 'text-tracking-red',
        shadow: 'shadow-tracking-red/20',
        bg: 'bg-tracking-red/10'
    }
};

const SectionTitle = ({ title, color = 'orange', classKey = 'MK_II' }: SectionTitleProps): React.ReactNode => {
    const theme = COLORS[color];
    const techId = `0x${title.substring(0, 2).toUpperCase()}_${title.length}`;

    return (
        <div className={cn(
            "relative w-full sm:w-auto -mt-28 sm:-mt-32 sm:-ml-4 transform -skew-y-2 sm:-rotate-3 z-20 group inline-block top-[-85px] sm:top-[-50px]"
        )}>
            {/* Decorative 'Connection' Line (Top Left) */}
            <div className={cn("absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 opacity-50 transition-all group-hover:w-full group-hover:h-full group-hover:opacity-100 duration-500", theme.border)} />

            <h2 className={cn(
                "relative text-xl md:text-2xl font-bold bg-magnetic-black bg-opacity-95",
                "px-8 py-4 sm:px-12 sm:py-6",
                "min-w-[280px] sm:min-w-[400px]", // Enforce consistent width
                "border-y-2 sm:border-2",
                theme.border,
                theme.text,
                "text-center tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all duration-300",
                "heavitas overflow-hidden sm:rounded-sm"
            )}>
                {/* Internal Scanline Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/vhs_static.gif')] mix-blend-overlay"></div>
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300", theme.bg)}></div>

                {/* Glitch Title */}
                <span className="glitch inline-block relative z-10 drop-shadow-md" data-text={title}>
                    {title}
                </span>

                {/* Tech Deco: Index Number */}
                <span className="absolute top-1 left-2 text-[9px] font-mono opacity-50 font-normal tracking-tight">
                    CLASS: {classKey} //
                </span>

                {/* Tech Deco: Hex Code */}
                <span className="absolute bottom-1 right-2 text-[9px] font-mono opacity-40 font-normal tracking-tight">
                    ADDR: {techId}
                </span>
            </h2>

            {/* Decorative 'Bracket' (Bottom Right) */}
            <div className={cn("absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 opacity-50 transition-all group-hover:opacity-100", theme.border)} />
        </div>
    );
}

export default SectionTitle;
