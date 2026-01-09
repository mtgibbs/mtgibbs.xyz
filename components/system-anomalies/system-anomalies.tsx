import React from 'react';
import SectionTitle from '../section-title/section-title';
import AnomalyTerminalCard from './anomaly-terminal-card';
import { ANOMALY_LOGS } from '../../data/system-anomalies';

const SystemAnomalies = () => {
    return (
        <section className="container mx-auto px-4 py-20 relative z-10 w-full max-w-6xl">
            <div className="flex flex-col items-start mb-12">
                <SectionTitle title="ANOMALY_LOGS" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {ANOMALY_LOGS.map((log) => (
                    <AnomalyTerminalCard key={log.id} log={log} />
                ))}
            </div>
        </section>
    );
};

export default SystemAnomalies;
