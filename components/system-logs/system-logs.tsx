import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import { IGitHubEvent } from './model/github-event';
import styles from './SystemLogs.module.css';
import { useVhs } from '../../context/VhsContext';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface IRepoCommit {
    sha: string;
    commit: { message: string };
}

interface IParsedEvent {
    id: string;
    time: Date;
    verb: string;
    repo: string;
    detail: string;
}

// v6 LOG grammar (DESIGN.md §4): [time] VERB >> repo detail [OK]
const parseEvent = (event: IGitHubEvent): IParsedEvent => {
    const p = event.payload;
    let verb = event.type.replace('Event', '').toUpperCase();
    let detail = '';

    switch (event.type) {
        case 'PushEvent': {
            verb = 'PUSH';
            const branch = p.ref?.replace('refs/heads/', '') || 'unknown';
            const msg = p.commits?.[0]?.message;
            // the events API ships commits:null now — head SHA is the honest fallback
            detail = msg
                ? `(${branch}) "${msg.split('\n')[0].substring(0, 48)}"`
                : `(${branch}) @${p.head?.substring(0, 7) || 'unknown'}`;
            break;
        }
        case 'PullRequestEvent':
            verb = 'PR';
            detail = `${p.action}: "${p.pull_request?.title || `#${p.number}`}"`;
            break;
        case 'CreateEvent':
            verb = 'CREATE';
            detail = `${p.ref_type}: ${p.ref || 'root'}`;
            break;
        case 'DeleteEvent':
            verb = 'DELETE';
            detail = `${p.ref_type}: ${p.ref}`;
            break;
        case 'WatchEvent':
            verb = 'STAR';
            detail = 'starred repository';
            break;
        case 'IssueCommentEvent':
            verb = 'COMMENT';
            detail = `on #${p.issue?.number}`;
            break;
        case 'IssuesEvent':
            verb = 'ISSUE';
            detail = `${p.action}: "${p.issue?.title || ''}"`;
            break;
    }

    return {
        id: event.id,
        time: new Date(event.created_at),
        verb,
        repo: event.repo.name.replace('mtgibbs/', ''),
        detail,
    };
};

const fmtTime = (d: Date): string =>
    d.toLocaleTimeString([], { hour12: false });

// Activity strip chart — 12 × 2h buckets over the last 24h, drawn once (§5)
const ActivityChart = ({ events }: { events: IParsedEvent[] }): React.ReactNode => {
    const points = useMemo(() => {
        const buckets = new Array(12).fill(0);
        const now = Date.now();
        events.forEach((e) => {
            const age = now - e.time.getTime();
            if (age < 86400000) buckets[11 - Math.min(11, Math.floor(age / 7200000))]++;
        });
        const max = Math.max(1, ...buckets);
        return buckets
            .map((v, i) => `${(i * (300 / 11)).toFixed(1)},${(54 - (v / max) * 44).toFixed(1)}`)
            .join(' ');
    }, [events]);

    return (
        <div className={cn('relative', styles.chartGrid)}>
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="block w-full h-16" aria-label="GitHub activity, two-hour buckets over the last day">
                <polyline className={styles.trace} points={points} />
            </svg>
        </div>
    );
};

// Per-second readouts live in their own subtree so the tick doesn't
// re-render the log stream (perf rules: keep animated regions small)
const LiveReadouts = ({ lastEventAt, repoCount, isError, hasData }: {
    lastEventAt: Date | null;
    repoCount: number;
    isError: boolean;
    hasData: boolean;
}): React.ReactNode => {
    const [poll, setPoll] = useState(29);
    useEffect(() => {
        const interval = setInterval(() => {
            setPoll((prev) => (prev <= 0 ? 29 : prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    let lastSignal = 'T---:--:--';
    if (lastEventAt) {
        const age = Math.max(0, Math.floor((Date.now() - lastEventAt.getTime()) / 1000));
        const h = String(Math.floor(age / 3600)).padStart(2, '0');
        const m = String(Math.floor((age % 3600) / 60)).padStart(2, '0');
        const s = String(age % 60).padStart(2, '0');
        lastSignal = `T-${h}:${m}:${s}`;
    }

    const rows: Array<[string, string, string]> = [
        ['REPOS TOUCHED', String(repoCount), 'text-phosphor-amber'],
        ['LAST SIGNAL', lastSignal, 'text-phosphor-amber'],
        ['NEXT POLL', String(poll).padStart(2, '0'), 'text-phosphor-amber'],
        isError
            ? ['LINK', 'NO_CARRIER', 'text-tracking-red']
            : ['LINK', hasData ? 'LIVE' : 'SYNC…', 'text-phosphor-amber'],
    ];

    return (
        <div className="px-4 py-3 md:px-5">
            {rows.map(([label, value, valueClass]) => (
                <div key={label} className="flex items-baseline justify-between gap-2 py-1 font-mono">
                    <span className="text-[10px] tracking-[0.28em] text-faded-cardboard/60">{label}</span>
                    <span className={cn('text-sm tracking-[0.14em]', valueClass)}>{value}</span>
                </div>
            ))}
        </div>
    );
};

const SystemLogs = (): React.ReactNode => {
    const { isVhsActive: globalVhsActive } = useVhs();
    const { data, error } = useSWR<IGitHubEvent[]>('https://api.github.com/users/mtgibbs/events/public', fetcher, {
        refreshInterval: 30000 // Refresh every 30 seconds
    });
    const { data: commits } = useSWR<IRepoCommit[]>(
        'https://api.github.com/repos/mtgibbs/mtgibbs.xyz/commits?per_page=4',
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    const [bootLogs, setBootLogs] = useState<string[]>([]);
    const [isBooting, setIsBooting] = useState(true);
    const [bootStarted, setBootStarted] = useState(false);
    const [bootProgress, setBootProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const addBootLog = useCallback((msg: string) => {
        setBootLogs((prev) => [...prev, msg]);
    }, []);

    const events = useMemo<IParsedEvent[]>(
        () => (Array.isArray(data) ? data.slice(0, 20).map(parseEvent) : []),
        [data]
    );

    // Census for the header band: verb counts across the buffer
    const census = useMemo(() => {
        const counts: Record<string, number> = {};
        events.forEach((e) => { counts[e.verb] = (counts[e.verb] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
    }, [events]);

    const events24h = useMemo(
        () => events.filter((e) => Date.now() - e.time.getTime() < 86400000).length,
        [events]
    );

    const repoCount = useMemo(
        () => new Set(events.map((e) => e.repo)).size,
        [events]
    );

    // Ticker rides on the repo's real commit subjects (same fetch the boot uses)
    const tickerText = useMemo(() => {
        const subjects = Array.isArray(commits)
            ? commits.map((c) => c.commit.message.split('\n')[0].toUpperCase())
            : [];
        const items = subjects.length
            ? subjects
            : events.slice(0, 4).map((e) => `${e.verb} ${e.repo}`.toUpperCase());
        if (!items.length) return '>> ESTABLISHING DOWNLINK…';
        return `>> ${items.join(' // ')} // SIGNAL NOMINAL — BE KIND, REWIND `;
    }, [commits, events]);

    // Latest real commits, formatted as git log lines for the boot dump
    const commitsRef = useRef<string[] | null>(null);
    useEffect(() => {
        if (Array.isArray(commits)) {
            commitsRef.current = commits.map((c) => {
                const subject = c.commit.message.split('\n')[0];
                return `GIT >> ${c.sha.substring(0, 7)} "${subject.substring(0, 44)}${subject.length > 44 ? '...' : ''}"`;
            });
        }
    }, [commits]);

    // The boot waits for the terminal to scroll into view, so the hack-in
    // actually plays in front of the visitor instead of below the fold.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setBootStarted(true);
                io.disconnect();
            }
        }, { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Boot sequence — the "hack in". The repo's real git log gets dumped
    // mid-sequence, resolved from commitsRef once the fetch lands.
    useEffect(() => {
        if (!bootStarted) return;

        const PRE_BOOT = [
            "INITIALIZING KERNEL v4.2.0...",
            "CHECKING NEURAL LINK STATUS...",
            "NEURAL LINK: ESTABLISHED",
            "RESOLVING HOST github.com >> OK",
            "HANDSHAKE >> RSA-4096 ACCEPTED",
            "PROBING REPO >> mtgibbs/mtgibbs.xyz",
            "TAILING GIT_LOG >> HEAD~4...",
        ];
        const POST_BOOT = [
            "LOG_DUMP >> COMPLETE",
            "SCANNING GITHUB_QUANTUM_STREAM...",
            "DECRYPTING ACTIVITY LOGS...",
            "AUTH_GATE >> BYPASSED",
            "SYSTEM_READY >> ACCESS_GRANTED"
        ];

        // Snapshot the git lines once, the moment the dump step arrives
        let gitLines: string[] | null = null;
        let step = 0;
        const interval = setInterval(() => {
            if (step >= PRE_BOOT.length && gitLines === null) {
                gitLines = commitsRef.current
                    ?? ["GIT_LOG >> 0 ENTRIES (STREAM_ENCRYPTED)"];
            }
            const steps = [...PRE_BOOT, ...(gitLines ?? []), ...POST_BOOT];
            if (step < steps.length) {
                addBootLog(`[BOOT] ${steps[step]}`);
                setBootProgress(((step + 1) / steps.length) * 100);
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsBooting(false), 500);
            }
        }, 350);

        return () => clearInterval(interval);
    }, [bootStarted, addBootLog]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [bootLogs, events, isBooting]);

    // Oldest→newest so the stream reads like a tail; boot transcript sits above
    const streamEvents = useMemo(
        () => (isBooting ? [] : events.slice(0, 13).reverse()),
        [events, isBooting]
    );

    return (
        <div id="system-logs" ref={containerRef} className="relative w-full">
            {/* Background VHS Stripes - Counter-skewed - Full Width */}
            <div className="absolute z-0 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200vw] transform skew-y-0 sm:skew-y-6 overflow-hidden pointer-events-none">
                <div className="absolute z-0 inset-x-0 top-0 h-4 bg-phosphor-amber opacity-40"></div>
                <div className="absolute z-0 inset-x-0 top-12 h-8 bg-tracking-red opacity-30"></div>
                <div className="absolute z-0 inset-x-0 top-32 h-2 bg-signal-orange opacity-40"></div>
                <div className="absolute z-0 inset-x-0 top-48 h-12 bg-chrome-blue opacity-20"></div>
                <div className="absolute z-0 inset-x-0 top-72 h-6 bg-phosphor-amber opacity-30"></div>
            </div>

            <div className={cn(
                "relative z-10 w-full overflow-hidden border transition-colors duration-500",
                "border-faded-cardboard/25 hover:border-faded-cardboard/40",
                "bg-magnetic-black/90 backdrop-blur-sm", // Semi-transparent to let stripes through
                styles.crtContainer,
                globalVhsActive && styles.vhsSync // Add class to reduce interference
            )}>
                {/* Census header band */}
                <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-faded-cardboard/25 px-4 py-2.5 md:px-5">
                    <h3 className="heavitas text-base md:text-lg tracking-wide text-faded-cardboard">
                        LOG <span className="text-phosphor-amber">{'//'} EVENT STREAM</span>
                    </h3>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-faded-cardboard/60">
                        {isBooting
                            ? `SYNC ${Math.round(bootProgress)}%`
                            : census.map(([verb, count], i) => (
                                <span key={verb}>
                                    {i > 0 && <span className="px-1.5 text-faded-cardboard/40">·</span>}
                                    <span className="whitespace-nowrap">
                                        {verb} <span className="text-phosphor-amber">{String(count).padStart(2, '0')}</span>
                                    </span>
                                </span>
                            ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-[1.55fr_1fr]">
                    {/* Log stream */}
                    <div
                        ref={scrollRef}
                        className="relative min-w-0 h-64 md:h-[372px] overflow-y-auto scrollbar-none border-b border-faded-cardboard/15 md:border-b-0 md:border-r bg-black/40 px-4 py-3 md:px-5 font-mono text-[11px] md:text-xs leading-[2.05]"
                    >
                        {/* CRT Screen Glow */}
                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,176,0,0.05)_0%,transparent_100%)] z-30" />

                        <div className={cn("relative z-10 flex min-h-full flex-col justify-end phosphor-text", styles.crtText)}>
                            {bootLogs.map((log, i) => (
                                <div key={i} className={cn("truncate text-chrome-blue", styles.lineIn)}>
                                    {log}
                                </div>
                            ))}
                            {isBooting && bootStarted && (
                                <div className="mt-2 h-1 w-full bg-faded-cardboard/10 overflow-hidden">
                                    <div
                                        className="h-full bg-phosphor-amber transition-all duration-300"
                                        style={{ width: `${bootProgress}%` }}
                                    />
                                </div>
                            )}
                            {streamEvents.map((e, i) => (
                                <div key={e.id} className={cn("truncate", styles.lineIn)} style={{ animationDelay: `${i * 55}ms` }}>
                                    <span className="text-faded-cardboard/45">[{fmtTime(e.time)}]</span>{' '}
                                    <span className="text-faded-cardboard">{e.verb}</span>
                                    <span className="text-faded-cardboard/45">{' >> '}</span>
                                    <span className="text-phosphor-amber">{e.repo}</span>{' '}
                                    <span className="text-faded-cardboard/60">{e.detail}</span>{' '}
                                    <span className="text-phosphor-amber">[OK]</span>
                                </div>
                            ))}
                            {error && !isBooting && (
                                <div className="truncate text-tracking-red">
                                    [ERR] CONNECTION_FAILED {'>>'} DOWNLINK LOST
                                </div>
                            )}
                            {!isBooting && (
                                <div className="flex items-center gap-1">
                                    <span className="text-faded-cardboard/45">{'>'}</span>
                                    <div className="w-2 h-4 bg-phosphor-amber/60 animate-cursor" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Instrument column */}
                    <div className="min-w-0 flex flex-col">
                        <div className="border-b border-faded-cardboard/15 px-4 py-3 md:px-5">
                            <div className="font-mono text-[10px] tracking-[0.28em] text-faded-cardboard/60 mb-1.5">EVENTS {'//'} 24H WINDOW</div>
                            <div className="heavitas text-4xl text-phosphor-amber leading-none">
                                {String(events24h).padStart(2, '0')}
                                <span className="nineteen font-mono text-[11px] tracking-[0.22em] text-faded-cardboard/55 ml-2.5 align-middle">SIGNALS</span>
                            </div>
                        </div>
                        <div className="border-b border-faded-cardboard/15 px-4 py-3 md:px-5">
                            <div className="font-mono text-[10px] tracking-[0.28em] text-faded-cardboard/60 mb-1.5">ACTIVITY — 2H BUCKETS</div>
                            <ActivityChart events={events} />
                        </div>
                        <LiveReadouts
                            lastEventAt={events[0]?.time ?? null}
                            repoCount={repoCount}
                            isError={Boolean(error)}
                            hasData={events.length > 0}
                        />
                    </div>
                </div>

                {/* Ticker */}
                <div className={cn("border-t border-faded-cardboard/25 px-4 py-2 md:px-5 font-mono text-[11px] tracking-[0.1em] text-faded-cardboard/65", styles.tickerTrack)}>
                    <span>{tickerText}</span>
                </div>
            </div>
        </div>
    );
};

export default SystemLogs;
