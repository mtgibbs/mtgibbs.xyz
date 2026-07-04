import React from 'react';
import cn from 'classnames';

interface SectionTitleProps {
    title: string;
    mnemonic?: string;
    color?: 'orange' | 'blue' | 'green' | 'amber' | 'red';
    classKey?: string;
}

const COLORS = {
    orange: {
        tile: 'bg-signal-orange text-magnetic-black',
        rule: 'border-signal-orange/40',
        deco: 'text-signal-orange/70'
    },
    blue: {
        tile: 'bg-chrome-blue text-faded-cardboard',
        rule: 'border-chrome-blue/40',
        deco: 'text-chrome-blue'
    },
    green: {
        tile: 'bg-emerald-500 text-magnetic-black',
        rule: 'border-emerald-500/40',
        deco: 'text-emerald-500/70'
    },
    amber: {
        tile: 'bg-phosphor-amber text-magnetic-black',
        rule: 'border-phosphor-amber/40',
        deco: 'text-phosphor-amber/70'
    },
    red: {
        tile: 'bg-tracking-red text-faded-cardboard',
        rule: 'border-tracking-red/40',
        deco: 'text-tracking-red/80'
    }
};

// HAL panel header (DESIGN.md §3): flat mnemonic tile + tracked mono name
// on a hairline rule. Tight and aligned — no rotation, no collage angles.
const SectionTitle = ({ title, mnemonic, color = 'orange', classKey = 'MK_II' }: SectionTitleProps): React.ReactNode => {
    const theme = COLORS[color];
    const mn = (mnemonic || title.substring(0, 3)).toUpperCase();
    const techId = `0x${title.substring(0, 2).toUpperCase()}_${title.length}`;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className={cn(
                "flex items-stretch border-b-2 hover:animate-panel-sync motion-reduce:animate-none",
                theme.rule
            )}>
                <h2 className="flex items-stretch m-0">
                    <span className={cn(
                        "heavitas text-xl md:text-2xl px-4 py-2 tracking-wide select-none",
                        theme.tile
                    )} aria-hidden="true">
                        {mn}
                    </span>
                    <span className="self-center px-4 font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-faded-cardboard/90">
                        {title}
                    </span>
                </h2>
                <span className={cn(
                    "ml-auto self-center font-mono text-[9px] md:text-[10px] tracking-[0.2em] opacity-70 whitespace-nowrap",
                    theme.deco
                )} aria-hidden="true">
                    CLASS: {classKey} // ADDR: {techId}
                </span>
            </div>
        </div>
    );
}

export default SectionTitle;
