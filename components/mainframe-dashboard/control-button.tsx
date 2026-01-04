import React from 'react';
import cn from 'classnames';

interface ControlButtonProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
    color?: 'red' | 'green' | 'orange' | 'grey';
}

const ControlButton = ({ label, active, onClick, color = 'grey' }: ControlButtonProps) => {

    const colors = {
        red: active ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-red-900 border-red-800',
        green: active ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'bg-green-900 border-green-800',
        orange: active ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]' : 'bg-orange-900 border-orange-800',
        grey: active ? 'bg-stone-300 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-stone-600 border-stone-700'
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-20 h-20 rounded-sm border-4 transition-all duration-100 flex items-center justify-center p-2",
                "active:scale-95 active:shadow-inner",
                colors[color],
                active ? "border-white/50" : "border-black/40 shadow-lg"
            )}
        >
            <span className={cn(
                "font-mono font-bold text-[10px] text-center leading-none select-none",
                active ? "text-white drop-shadow-md" : "text-black/50"
            )}>
                {label}
            </span>
        </button>
    );
};

export default ControlButton;
