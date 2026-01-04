import React from 'react';
import cn from 'classnames';

interface LEDDisplayProps {
    value: string;
    label: string;
    color?: 'red' | 'amber';
}

const LEDDisplay = ({ value, label, color = 'amber' }: LEDDisplayProps) => {

    const colors = {
        red: 'text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]',
        amber: 'text-[#ffb000] drop-shadow-[0_0_8px_rgba(255,176,0,0.8)]'
    };

    return (
        <div className="flex flex-col mb-4">
            <div className="bg-black border-2 border-stone-800 rounded-sm p-4 relative overflow-hidden">
                <div className="flex justify-between items-center bg-[#111] p-2 rounded-sm border border-stone-900 inner-shadow">
                    <span className={cn(
                        "font-mono text-2xl tracking-[0.2em] font-normal uppercase",
                        "font-[digital-clock]", // Fallback to mono if not present
                        colors[color]
                    )}>
                        {value}
                    </span>
                </div>
                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
            </div>
            <div className="bg-[#f5f0e1] text-[#1a1a1a] px-2 py-0.5 font-mono font-bold text-[8px] border border-[#d1cfc5] shadow-sm self-start mt-1">
                {label}
            </div>
        </div>
    );
};

export default LEDDisplay;
