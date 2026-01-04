import React from 'react';
import { useVhs } from '../../context/VhsContext';
import cn from 'classnames';

interface VhsToggleProps {
    className?: string;
}

const VhsToggle = ({ className }: VhsToggleProps) => {
    const { isVhsActive, toggleVhs } = useVhs();

    return (
        <div className={cn("flex items-center gap-3 transition-all duration-500", className)}>
            {/* Minimalist 2001 Style Control */}
            <div className="flex items-center bg-[#1a1c1e] px-2 py-1 border border-white/10 rounded shadow-lg ring-1 ring-black relative">
                {/* Status Indicator */}
                <div className="flex flex-col mr-3">
                    <span className="text-[6px] text-faded-cardboard/30 font-mono tracking-tighter leading-none mb-0.5">SIG_PROC</span>
                    <div className="flex gap-0.5">
                        <div className={cn("w-1 h-1 rounded-full", isVhsActive ? "bg-signal-orange shadow-[0_0_3px_#ff4400]" : "bg-white/5")} />
                        <div className="w-1 h-1 rounded-full bg-white/5" />
                    </div>
                </div>

                {/* Micro Push Button */}
                <button
                    onClick={toggleVhs}
                    className={cn(
                        "relative w-7 h-7 rounded border transition-all duration-200 flex items-center justify-center overflow-hidden active:scale-90",
                        isVhsActive
                            ? "bg-[#D93636] border-[#ff4d4d] shadow-[0_0_10px_rgba(217,54,54,0.4)]"
                            : "bg-[#2a2d30] border-[#3a3f44] shadow-inner"
                    )}
                >
                    <div className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-500",
                        isVhsActive ? "bg-white shadow-[0_0_5px_white] animate-pulse" : "bg-white/5"
                    )} />
                </button>

                {/* Digital Readout */}
                <div className="ml-3 border-l border-white/10 pl-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[7px] text-phosphor-amber/60 font-mono uppercase tracking-widest leading-none">TRK</span>
                        <span className={cn(
                            "text-[9px] font-mono font-bold leading-none w-6",
                            isVhsActive ? "text-signal-orange text-shadow-glow" : "text-white/10"
                        )}>
                            {isVhsActive ? 'ON' : 'OFF'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VhsToggle;
