import React, { useState } from 'react';
import SectionTitle from '../section-title/section-title';
import AnomalyTerminalCard from './anomaly-terminal-card';
import { ANOMALY_LOGS } from '../../data/system-anomalies';
import cn from 'classnames';

const SystemAnomalies = () => {
    const [areAllExpanded, setAreAllExpanded] = useState(false);

    return (
        <div className="w-full">
            {/* Header Area with Title and Action Button */}
            <div className="relative mb-12 z-20">
                <SectionTitle title="FIELD_REPORTS" color="red" classKey="FLD_REP" />

                {/* Toggle Button - Absolutely positioned relative to the section width */}
                <div className="absolute top-0 right-4 sm:right-0 sm:top-4 z-30">
                    <button
                        onClick={() => setAreAllExpanded(!areAllExpanded)}
                        className="text-xs font-bold font-mono text-tracking-red hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors focus:outline-none border border-tracking-red hover:border-white px-4 py-2 bg-black bg-opacity-80 backdrop-blur-sm shadow-lg hover:shadow-tracking-red/20"
                    >
                        {areAllExpanded ? '[-] ENCRYPT_ARCHIVES' : '[+] DECRYPT_FULL_LOGS'}
                        <span className={cn("inline-block w-2 h-2", areAllExpanded ? "bg-white animate-pulse" : "bg-tracking-red")}></span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {ANOMALY_LOGS.map((log) => (
                        <AnomalyTerminalCard key={log.id} log={log} isExpanded={areAllExpanded} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SystemAnomalies;
