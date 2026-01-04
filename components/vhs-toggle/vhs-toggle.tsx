import React from 'react';
import { useVhs } from '../../context/VhsContext';
import cn from 'classnames';

const VhsToggle = () => {
    const { isVhsActive, toggleVhs } = useVhs();

    return (
        <div className="fixed bottom-8 right-8 z-[10001] flex flex-col items-center">
            <div className="bg-stone-400 p-2 rounded-sm border-2 border-stone-500 shadow-lg mb-2">
                <div className="bg-stone-800 p-1 rounded-sm border border-black mb-1">
                    <div className="text-[10px] text-[#ffb000] font-mono text-center leading-none mb-1">TRACKING</div>
                    <button
                        onClick={toggleVhs}
                        className={cn(
                            "w-12 h-6 relative rounded-full transition-colors duration-200 outline-none",
                            isVhsActive ? "bg-signal-orange" : "bg-stone-600"
                        )}
                    >
                        <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-md",
                            isVhsActive ? "left-7" : "left-1"
                        )} />
                    </button>
                </div>
            </div>
            <div className="bg-[#f5f0e1] text-[#1a1a1a] px-2 py-0.5 font-mono font-bold text-[8px] border border-[#d1cfc5] shadow-sm transform -rotate-1 uppercase">
                VHS Distortion {isVhsActive ? 'ON' : 'OFF'}
            </div>
        </div>
    );
};

export default VhsToggle;
