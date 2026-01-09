import React, { useState } from 'react';
import SectionTitle from '../section-title/section-title';
import AnomalyTerminalCard from './anomaly-terminal-card';
import { ANOMALY_LOGS } from '../../data/system-anomalies';
import cn from 'classnames';

const SystemAnomalies = () => {
    const [areAllExpanded, setAreAllExpanded] = useState(false);

    return (
        <section className="container mx-auto px-4 py-20 relative z-10 w-full max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <SectionTitle title="ANOMALY_LOGS" />

                <button
                    onClick={() => setAreAllExpanded(!areAllExpanded)}
                    className="text-xs font-bold font-mono text-chrome-blue hover:text-signal-orange uppercase tracking-widest flex items-center gap-2 transition-colors focus:outline-none border border-chrome-blue hover:border-signal-orange px-4 py-2 bg-black bg-opacity-50"
                >
                    {areAllExpanded ? '[-] ENCRYPT_ARCHIVES' : '[+] DECRYPT_FULL_LOGS'}
                    <span className={cn("inline-block w-2 h-2", areAllExpanded ? "bg-signal-orange animate-pulse" : "bg-chrome-blue")}></span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {ANOMALY_LOGS.map((log) => (
                    <AnomalyTerminalCard key={log.id} log={log} isExpanded={areAllExpanded} />
                ))}
            </div>
        </section>
    );
};

export default SystemAnomalies;
