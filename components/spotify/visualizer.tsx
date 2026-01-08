import React, { useEffect, useRef, useMemo } from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import { useGPU } from '../../hooks/use-gpu';

interface VisualizerProps {
    trackId: string;
    isPlaying: boolean;
    progressMs: number;
    timestamp: number;
}

interface AudioAnalysis {
    segments: {
        start: number;
        duration: number;
        pitches: number[];
        loudness_max: number;
    }[];
    features: {
        energy: number;
        valence: number;
    };
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Visualizer: React.FC<VisualizerProps> = ({ trackId, isPlaying, progressMs, timestamp }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLowPower } = useGPU();
    const { data: analysisData } = useSWR<AudioAnalysis>(
        trackId ? `/api/spotify-analysis?id=${trackId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Store current heights in a ref to avoid reading from DOM or State
    const currentHeights = useRef<number[]>(new Array(12).fill(0.1));

    // Refs for animation state to avoid closure staleness
    const stateRef = useRef({
        isPlaying,
        progressMs,
        timestamp,
        analysisData,
        isLowPower
    });

    useEffect(() => {
        stateRef.current = { isPlaying, progressMs, timestamp, analysisData, isLowPower };
    }, [isPlaying, progressMs, timestamp, analysisData, isLowPower]);

    const frameCountRef = useRef(0);

    const animate = () => {
        const { isPlaying, progressMs, timestamp, analysisData, isLowPower } = stateRef.current; // Updated destructuring

        frameCountRef.current += 1;
        // Throttle to 30fps on low power mode
        if (isLowPower && frameCountRef.current % 2 !== 0) {
            requestRef.current = requestAnimationFrame(animate);
            return;
        }

        let targetBars = new Array(12).fill(0.1); // Default low level
        let valence = 0.5;
        let hasData = false;

        if (isPlaying && analysisData && analysisData.segments) {
            const now = Date.now();
            const elapsed = now - timestamp;
            const currentPos = progressMs + elapsed;
            const currentPosSec = currentPos / 1000;

            const segment = analysisData.segments.find(s =>
                currentPosSec >= s.start && currentPosSec < (s.start + s.duration)
            );

            if (segment) {
                targetBars = segment.pitches;
                valence = analysisData.features.valence;
                hasData = true;
            }
        }

        if (!hasData) {
            if (isPlaying) {
                // PROCEDURAL SYNC MODE
                const trackHash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const mode = trackHash % 3;
                const time = Date.now() / 1000;

                targetBars = targetBars.map((_, i) => {
                    let val = 0.1;
                    if (mode === 0) {
                        const offset = i * 0.2;
                        val = Math.abs(Math.sin(time * 3 + offset + trackHash));
                    } else if (mode === 1) {
                        const center = 6;
                        const dist = Math.abs(i - center);
                        const beat = Math.pow(Math.sin(time * 4), 10);
                        val = (beat * (1 - dist / 8)) + (Math.sin(time + i) * 0.2);
                    } else {
                        const noise = Math.sin(time * 10 + i * 132 + trackHash);
                        val = noise > 0.5 ? 0.8 : 0.2;
                    }
                    return Math.max(0.1, Math.min(1, val));
                });
            } else {
                // Idle animation
                const time = Date.now() / 1000;
                targetBars = targetBars.map((_, i) =>
                    0.15 + 0.1 * Math.sin(time * 2 + i * 0.5)
                );
            }
        }

        // Apply to DOM
        currentHeights.current = currentHeights.current.map((prev, i) => {
            const target = targetBars[i] || 0.1;
            // Adjust lerp factor based on power mode
            const baseLerp = (hasData && valence < 0.4) ? 0.05 : (isPlaying ? 0.2 : 0.15);
            // On low power (30fps), we increase the lerp speed slightly to compensate for frame skipping, keeping responsiveness
            const lerpFactor = isLowPower ? Math.min(1, baseLerp * 1.5) : baseLerp;
            const nextHeight = prev + (target - prev) * lerpFactor;

            // Direct DOM update
            const el = barRefs.current[i];
            if (el) {
                el.style.height = `${Math.max(10, nextHeight * 100)}%`;
            }
            return nextHeight;
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Start animation loop
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Derived styles for colors (these update rarely, so React state is fine)
    const features = analysisData?.features;

    // Helper to get bar color class
    const getBarColorClass = (i: number) => {
        if (features) {
            if (features.valence < 0.45 || features.energy < 0.45) return "bg-gradient-to-t from-chrome-blue to-indigo-500";
            if (features.energy > 0.75) return "bg-gradient-to-t from-signal-orange to-phosphor-amber";
            return "bg-gradient-to-t from-fuchsia-500 to-purple-600";
        }

        if (isPlaying) {
            const hash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const mode = hash % 3;
            if (mode === 0) return "bg-gradient-to-t from-chrome-blue to-indigo-500";
            if (mode === 1) return "bg-gradient-to-t from-fuchsia-500 to-purple-600";
            return "bg-gradient-to-t from-signal-orange to-phosphor-amber";
        }

        return "bg-static-grey";
    };

    return (
        <div className="relative flex items-end h-16 w-full justify-between pt-4" ref={containerRef}>
            {/* Retro Grid Background */}
            <div className="absolute inset-x-0 bottom-0 h-full opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:10px_10px] mask-image-b-fade"></div>

            {/* Bars Container */}
            <div className="relative z-10 flex items-end justify-between w-full h-8 space-x-1">
                {new Array(12).fill(0).map((_, i) => (
                    <div
                        key={i}
                        ref={el => { barRefs.current[i] = el; }}
                        className={cn("w-1.5 rounded-t-sm transition-colors duration-500", getBarColorClass(i))}
                        style={{
                            height: '10%' // Initial height
                        }}
                    />
                ))}
            </div>

            {/* Status Text Left */}
            <div className="absolute -top-1 left-0 flex flex-col pointer-events-none">
                <span className="text-[0.5rem] font-mono text-faded-cardboard/30 tracking-widest">
                    {isPlaying ? "FREQ.MOD" : "NO_CARRIER"}
                </span>
                <span className={cn(
                    "text-[0.4rem] font-mono animate-pulse",
                    isPlaying ? "text-signal-orange/60" : "text-red-500/40"
                )}>
                    {isPlaying
                        ? (analysisData ? "SYNC:LINKED" : "SYNC:PROCEDURAL")
                        : "SYNC:OFFLINE"}
                </span>
            </div>
        </div>
    );
};

export default Visualizer;
