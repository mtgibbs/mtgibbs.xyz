import React from 'react';
import styles from './MainframeDashboard.module.css';

interface AnalogGaugeProps {
    label: string;
    value: number;
    min: number;
    max: number;
    dangerAt?: number;
    warningAt?: number;
}

const AnalogGauge = ({ label, value, min, max, dangerAt, warningAt }: AnalogGaugeProps) => {
    const rotation = ((value - min) / (max - min)) * 180 - 90;

    let needleColor = '#333';
    if (dangerAt && value >= dangerAt) needleColor = '#d93636';
    else if (warningAt && value >= warningAt) needleColor = '#ff4400';

    return (
        <div className="flex flex-col items-center">
            <div className="bg-white border-4 border-black rounded-sm w-48 h-48 relative overflow-hidden shadow-inner flex flex-col items-center justify-end pb-8">
                {/* Scale background */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center p-4">
                    <div className="w-full h-full border-t-8 border-black rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }}></div>
                </div>

                {/* Ticks and Numbers */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 font-mono text-[8px] font-bold">
                    <div className="flex justify-between w-full mt-12 px-4">
                        <span>{min}</span>
                        <span>{max}</span>
                    </div>
                </div>

                {/* Needle */}
                <div
                    className="absolute w-1 h-32 bg-black origin-bottom transition-transform duration-500 ease-out"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        bottom: '20px',
                        backgroundColor: needleColor
                    }}
                >
                    <div className="absolute top-0 w-3 h-3 bg-black -left-1 rounded-full shadow-sm"></div>
                </div>

                {/* Pivot point */}
                <div className="w-6 h-6 bg-stone-800 rounded-full border-2 border-stone-600 z-10 shadow-lg relative bottom-[-10px]"></div>

                <div className="z-10 bg-white/80 px-2 py-1 border border-black/20 text-[10px] font-bold font-mono uppercase tracking-tighter">
                    {label}
                </div>
            </div>

            {/* Label Tape */}
            <div className="mt-4 bg-[#f5f0e1] text-[#1a1a1a] px-3 py-1 font-mono font-bold text-[10px] border border-[#d1cfc5] shadow-sm transform -rotate-1">
                {label}
            </div>
        </div>
    );
};

export default AnalogGauge;
