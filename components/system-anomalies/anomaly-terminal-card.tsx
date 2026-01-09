import React, { useState } from 'react';
import { AnomalyLog } from '../../data/system-anomalies';
import cn from 'classnames';

interface AnomalyTerminalCardProps {
    log: AnomalyLog;
}

const AnomalyTerminalCard = ({ log }: AnomalyTerminalCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full h-full flex flex-col justify-between bg-black bg-opacity-90 border-2 border-static-grey p-4 rounded-sm font-mono text-sm sm:text-base relative overflow-hidden group hover:border-phosphor-amber transition-colors duration-300">
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/vhs_static.gif')] opacity-[0.02] mix-blend-overlay"></div>

            {/* Header */}
            <div className="flex flex-col gap-2 text-xs text-static-grey mb-4 border-b border-static-grey pb-2">
                <div className="flex justify-between items-start w-full gap-2">
                    <span className="text-chrome-blue uppercase break-all flex-1 mr-2">{`// ${log.id} ${log.init_system}`}</span>
                    <span className={cn(
                        "uppercase font-bold whitespace-nowrap shrink-0",
                        log.severity === 'CRITICAL' || log.severity === 'FATAL' ? 'text-tracking-red' : 'text-phosphor-amber'
                    )}>
                        {`[ ${log.severity} ]`}
                    </span>
                </div>
                <div className="text-xs text-phosphor-amber uppercase tracking-tight opacity-80 break-words">
                    {`[TAG]: ${log.tag}`}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-grow flex flex-col">
                <div className="space-y-4">
                    <div>
                        <span className="text-signal-orange text-xs block mb-1 opacity-70">{`> DETECTED_ISSUE:`}</span>
                        <p className="text-faded-cardboard pl-4 border-l border-signal-orange border-opacity-30 leading-relaxed">
                            {log.detected_issue}
                        </p>
                    </div>

                    {/* Collapsible Section */}
                    {isExpanded && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div>
                                <span className="text-chrome-blue text-xs block mb-1 opacity-70">{`> INTERVENTION_PROTOCOL:`}</span>
                                <p className="text-faded-cardboard pl-4 border-l border-chrome-blue border-opacity-30 leading-relaxed">
                                    {log.action_taken}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 text-xs font-bold text-chrome-blue hover:text-signal-orange uppercase tracking-wide flex items-center gap-2 transition-colors focus:outline-none"
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? '[-] MINIMIZE_LOG' : '[+] EXPAND_FULL_LOG'}
                        <span className={cn("inline-block w-2 h-0.5 bg-current", isExpanded ? "animate-pulse" : "")}></span>
                    </button>
                </div>

                {/* System Status Log - Always Visible, Pushed to Bottom */}
                <div className="mt-auto pt-4 border-t border-static-grey border-opacity-20 pb-1">
                    <span className="text-phosphor-amber text-xs block mb-1 opacity-70">{`> SYSTEM_STATUS_LOG:`}</span>
                    <p className="text-faded-cardboard pl-4 border-l border-phosphor-amber border-opacity-30 font-mono text-xs opacity-80 break-words">
                        {log.system_status}
                    </p>
                </div>
            </div>

            {/* Footer / Status Stamp */}
            <div className="mt-2 flex justify-end">
                <div className={cn(
                    "border-2 px-2 py-1 transform -rotate-2 inline-block text-xs font-bold tracking-widest",
                    log.resolved ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                )}>
                    {log.resolved ? 'STATUS: RESOLVED' : 'STATUS: OPEN'}
                </div>
            </div>

            {/* Blinking block cursor at the end to simulate active terminal */}
            <div className="absolute bottom-2 right-2 w-2 h-4 bg-phosphor-amber animate-pulse opacity-50"></div>
        </div>
    );
};

export default AnomalyTerminalCard;
