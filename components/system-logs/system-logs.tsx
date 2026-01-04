import React, { useEffect, useState, useRef, useCallback } from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import { IGitHubEvent } from './model/github-event';
import styles from './SystemLogs.module.css';
import { useVhs } from '../../context/VhsContext';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SystemLogs = (): React.ReactNode => {
    const { isVhsActive: globalVhsActive } = useVhs();
    const { data, error } = useSWR<IGitHubEvent[]>('https://api.github.com/users/mtgibbs/events/public', fetcher, {
        refreshInterval: 30000 // Refresh every 30 seconds
    });

    const [logs, setLogs] = useState<string[]>([]);
    const [isBooting, setIsBooting] = useState(true);
    const [bootProgress, setBootProgress] = useState(0);
    const [lastRead, setLastRead] = useState<string>('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const addLog = useCallback((msg: string) => {
        setLogs(prev => {
            const newLogs = [...prev, msg];
            return newLogs.slice(-20); // Keep last 20 logs
        });
    }, []);

    // Boot sequence
    useEffect(() => {
        const bootSteps = [
            "INITIALIZING KERNEL v4.2.0...",
            "CHECKING NEURAL LINK STATUS...",
            "NEURAL LINK: ESTABLISHED",
            "SCANNING GITHUB_QUANTUM_STREAM...",
            "DECRYPTING ACTIVITY LOGS...",
            "SYSTEM_READY >> ACCESS_GRANTED"
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < bootSteps.length) {
                addLog(`[BOOT] ${bootSteps[step]}`);
                setBootProgress(((step + 1) / bootSteps.length) * 100);
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsBooting(false), 500);
            }
        }, 400);

        return () => clearInterval(interval);
    }, [addLog]);

    // Handle GitHub Data
    useEffect(() => {
        if (data && !isBooting) {
            const newEvents = data.slice(0, 12).map(event => {
                const date = new Date(event.created_at).toLocaleTimeString([], { hour12: false });
                let action = '';

                switch (event.type) {
                    case 'PushEvent':
                        const branch = event.payload.ref?.replace('refs/heads/', '') || 'unknown';
                        const firstCommit = event.payload.commits?.[0];
                        const commitMsg = firstCommit?.message;

                        if (commitMsg) {
                            action = `PUSH >> [${event.repo.name}] (${branch}) "${commitMsg.substring(0, 40)}${commitMsg.length > 40 ? '...' : ''}"`;
                        } else {
                            action = `PUSH >> [${event.repo.name}] to ${branch} (SHA: ${event.payload.head?.substring(0, 7) || 'N/A'})`;
                        }
                        break;
                    case 'CreateEvent':
                        action = `CREATE >> [${event.repo.name}] ${event.payload.ref_type}: ${event.payload.ref || 'root'}`;
                        break;
                    case 'DeleteEvent':
                        action = `DELETE >> [${event.repo.name}] ${event.payload.ref_type}: ${event.payload.ref}`;
                        break;
                    case 'WatchEvent':
                        action = `WATCH >> [${event.repo.name}] ★ mtgibbs starred repository`;
                        break;
                    case 'PullRequestEvent':
                        const pr = event.payload.pull_request;
                        const prTitle = pr?.title || `PR #${event.payload.number}`;
                        action = `PR >> [${event.repo.name}] ${event.payload.action}: "${prTitle}"`;
                        break;
                    case 'IssueCommentEvent':
                        action = `COMMENT >> [${event.repo.name}] on #${event.payload.issue?.number}`;
                        break;
                    case 'IssuesEvent':
                        action = `ISSUE >> [${event.repo.name}] ${event.payload.action}: "${event.payload.issue?.title || 'No Title'}"`;
                        break;
                    default:
                        action = `${event.type.replace('Event', '').toUpperCase()} >> [${event.repo.name}]`;
                }

                return `[${date}] SYS_LOG: ${action}`;
            });

            // Only update if we have new events or keep them fresh
            setLogs(prev => {
                const filteredPrev = prev.filter(l => !l.includes('SYS_LOG'));
                const combined = [...newEvents.reverse(), ...filteredPrev.filter(l => l.includes('INF:'))];
                return combined.slice(-20).sort((a, b) => a.localeCompare(b));
            });
        }
    }, [data, isBooting]);

    // Heartbeat logs
    useEffect(() => {
        if (isBooting) return;

        const interval = setInterval(() => {
            const heartbeats = [
                "SYSTEM_HEARTBEAT >> STATUS_OK",
                "MEM_USAGE >> STABLE (842KB Free)",
                "CORE_TEMP >> 38°C",
                "NET_LINK >> CONNECTED",
                "SIGNAL_SYNC >> 100%",
                "BUFFER_XFER >> COMPLETED",
                "ENCRYPT_ENGINE >> ACTIVE",
                "PARITY_CHECK >> PASSED"
            ];
            const msg = `[${new Date().toLocaleTimeString([], { hour12: false })}] INF: ${heartbeats[Math.floor(Math.random() * heartbeats.length)]}`;
            addLog(msg);
        }, 12000);

        return () => clearInterval(interval);
    }, [isBooting, addLog]);

    // Error handling
    useEffect(() => {
        if (error) {
            addLog(`[ERR] CONNECTION_FAILED: ${error.status || 'TIMEOUT'}`);
        }
    }, [error, addLog]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        setLastRead(new Date().toLocaleTimeString());
    }, [logs]);

    return (
        <div id="system-logs" className="relative w-full">
            {/* Background VHS Stripes - Counter-skewed - Full Width */}
            <div className="absolute z-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200vw] transform skew-y-0 sm:skew-y-6 overflow-hidden pointer-events-none">
                <div className="absolute z-0 inset-x-0 top-0 h-4 bg-phosphor-amber opacity-40"></div>
                <div className="absolute z-0 inset-x-0 top-12 h-8 bg-tracking-red opacity-30"></div>
                <div className="absolute z-0 inset-x-0 top-32 h-2 bg-signal-orange opacity-40"></div>
                <div className="absolute z-0 inset-x-0 top-48 h-12 bg-chrome-blue opacity-20"></div>
                <div className="absolute z-0 inset-x-0 top-72 h-6 bg-phosphor-amber opacity-30"></div>
            </div>

            <div className={cn(
                "relative z-10 w-full overflow-hidden border-2 rounded-sm shadow-[0_0_20px_rgba(0,186,255,0.1)] group transition-all duration-500",
                "border-chrome-blue/30 hover:border-chrome-blue/60",
                "bg-magnetic-black/90 backdrop-blur-sm", // Semi-transparent to let stripes through
                styles.crtContainer,
                globalVhsActive && styles.vhsSync // Add class to reduce interference
            )}>
                {/* Header */}
                <div className="bg-chrome-blue/10 border-b border-chrome-blue/30 px-4 py-1.5 flex justify-between items-center bg-gradient-to-r from-chrome-blue/5 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            isBooting ? "bg-signal-orange animate-pulse" : "bg-emerald-500 shadow-[0_0_5px_#10b981]"
                        )} />
                        <span className="text-[10px] font-mono text-chrome-blue uppercase tracking-[0.2em] font-bold">
                            Central Processing Log v4.2.0-STABLE
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-faded-cardboard/40 tracking-tighter">
                        {isBooting ? `BOOTING... ${Math.round(bootProgress)}%` : 'BUFFER: 64KB // LINK: SECURE'}
                    </div>
                </div>

                {/* Terminal Area */}
                <div
                    ref={scrollRef}
                    className={cn(
                        "h-48 md:h-72 p-4 font-mono text-[11px] md:text-xs overflow-y-auto scrollbar-none relative bg-black/40"
                    )}
                >
                    {/* CRT Screen Glow */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,92,125,0.08)_0%,transparent_100%)] z-30" />

                    <div className={cn("flex flex-col gap-1 relative z-10", styles.crtText)}>
                        {logs.map((log, i) => {
                            const isSystem = log.includes('INF:');
                            const isBoot = log.includes('[BOOT]');
                            const isError = log.includes('[ERR]');

                            return (
                                <div key={i} className={cn(
                                    "whitespace-pre-wrap break-all transition-opacity duration-300 flex gap-2",
                                    isError ? "text-tracking-red" :
                                        isSystem ? "text-faded-cardboard/40" :
                                            isBoot ? "text-chrome-blue" : "text-phosphor-amber"
                                )}>
                                    <span className="opacity-40 shrink-0">{'>'}</span>
                                    <span className={cn(
                                        "inline-block",
                                        !isBooting && Math.random() > 0.99 && "animate-glitch"
                                    )}>
                                        {log}
                                    </span>
                                </div>
                            );
                        })}
                        {isBooting && (
                            <div className="mt-2 h-1 w-full bg-chrome-blue/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-chrome-blue transition-all duration-300"
                                    style={{ width: `${bootProgress}%` }}
                                />
                            </div>
                        )}
                        {!isBooting && (
                            <div className="flex items-center gap-1">
                                <span className="opacity-40">{'>'}</span>
                                <div className="w-2 h-4 bg-phosphor-amber/60 animate-cursor" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="px-4 py-1 border-t border-chrome-blue/10 flex justify-between items-center bg-black/20">
                    <div className="flex gap-4">
                        <div className="text-[9px] font-mono text-chrome-blue/60">
                            CPU0: <span className="text-emerald-500/60">12%</span>
                        </div>
                        <div className="text-[9px] font-mono text-chrome-blue/60">
                            SWAP: <span className="text-emerald-500/60">0%</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-mono text-chrome-blue/40 italic">
                        LAST_READ: {lastRead || 'CONNECTING...'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemLogs;


