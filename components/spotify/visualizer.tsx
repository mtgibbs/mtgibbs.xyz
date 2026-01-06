
import React, { useEffect, useRef, useState, useMemo } from 'react';
import useSWR from 'swr';
import cn from 'classnames';

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
    const { data: analysisData } = useSWR<AudioAnalysis>(
        trackId ? `/api/spotify-analysis?id=${trackId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000,
        }
    );

    const canvasRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const [bars, setBars] = useState<number[]>(new Array(12).fill(0));

    // Reticle state
    const [reticleScale, setReticleScale] = useState(1);
    const [reticleRotation, setReticleRotation] = useState(0);

    // Refs for animation state to avoid closure staleness
    const stateRef = useRef({
        isPlaying,
        progressMs,
        timestamp,
        analysisData
    });

    useEffect(() => {
        stateRef.current = { isPlaying, progressMs, timestamp, analysisData };
    }, [isPlaying, progressMs, timestamp, analysisData]);

    const animate = () => {
        const { isPlaying, progressMs, timestamp, analysisData } = stateRef.current;

        let targetBars = new Array(12).fill(0.1); // Default low level
        let energy = 0.5;
        let valence = 0.5;
        let hasData = false;

        if (isPlaying && analysisData && analysisData.segments) {
            const now = Date.now();
            // Calculate current track position:
            // The timestamp from API is when the progress_ms was captured.
            // So current position = progress_ms + (now - timestamp)
            const elapsed = now - timestamp;
            const currentPos = progressMs + elapsed;

            // Convert to seconds for comparison with start/duration
            const currentPosSec = currentPos / 1000;

            // Find segment
            // Improve: Binary search or keep track of last index for performance?
            // Linear search is probably play for typical segment counts (~1000) but optimal is better.
            // Let's stick to find for MVP, optimization later if needed.
            const segment = analysisData.segments.find(s =>
                currentPosSec >= s.start && currentPosSec < (s.start + s.duration)
            );

            if (segment) {
                targetBars = segment.pitches;
                energy = analysisData.features.energy;
                valence = analysisData.features.valence;
                hasData = true;
            }
        }

        if (!hasData) {
            if (isPlaying) {
                // PROCEDURAL SYNC MODE (Fallback for 403 API)
                // verified unique pattern per track ID
                const trackHash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

                // Pattern Selection based on hash (3 modes)
                const mode = trackHash % 3;

                targetBars = targetBars.map((_, i) => {
                    let val = 0.1;
                    const time = Date.now() / 1000;
                    if (mode === 0) {
                        // Digital Rain / Matrix Sync
                        const offset = i * 0.2;
                        val = Math.abs(Math.sin(time * 3 + offset + trackHash));
                    } else if (mode === 1) {
                        // Heartbeat / Bass Focus
                        const center = 6;
                        const dist = Math.abs(i - center);
                        const beat = Math.pow(Math.sin(time * 4), 10); // sharp impulse
                        val = (beat * (1 - dist / 8)) + (Math.sin(time + i) * 0.2);
                    } else {
                        // Binary Noise / Glitch
                        const noise = Math.sin(time * 10 + i * 132 + trackHash);
                        val = noise > 0.5 ? 0.8 : 0.2;
                    }
                    return Math.max(0.1, Math.min(1, val));
                });

                // Procedural Energy estimate for reticle
                const time = Date.now() / 1000;
                energy = 0.6 + (Math.sin(time * 2) * 0.2);
            } else {
                // Idle animation (sine wave) - plays if !isPlaying
                const time = Date.now() / 1000;
                targetBars = targetBars.map((_, i) =>
                    0.15 + 0.1 * Math.sin(time * 2 + i * 0.5)
                );
                energy = 0.2;
            }
        }

        // Animate Reticle
        const targetScale = 0.8 + (energy * 0.4);
        setReticleScale(prev => prev + (targetScale - prev) * 0.1);
        setReticleRotation(prev => prev + (energy * 2));

        // Smoothing (Lerp)
        setBars(prevBars => {
            return prevBars.map((prev, i) => {
                const target = targetBars[i];
                // Faster lerp for procedural to make it feel responsive
                const lerpFactor = (hasData && valence < 0.4) ? 0.05 : (isPlaying ? 0.2 : 0.15);
                return prev + (target - prev) * lerpFactor;
            });
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Derived styles
    const features = analysisData?.features;

    // Reticle Style
    const reticleColor = features
        ? (features.valence < 0.4 ? "border-chrome-blue" : "border-signal-orange")
        : (isPlaying ? "border-signal-orange" : "border-static-grey");

    const reticleBg = features
        ? (features.valence < 0.4 ? "bg-chrome-blue" : "bg-signal-orange")
        : (isPlaying ? "bg-signal-orange" : "bg-static-grey");

    // Render
    return (
        <div className="relative flex items-end h-16 w-full justify-between pt-4" ref={canvasRef}>
            {/* Retro Grid Background */}
            <div className="absolute inset-x-0 bottom-0 h-full opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:10px_10px] mask-image-b-fade"></div>

            {/* Bars Container */}
            <div className="relative z-10 flex items-end justify-between w-full h-8 space-x-1">
                {bars.map((height, i) => (
                    <div
                        key={i}
                        className={cn("w-1.5 rounded-t-sm",
                            features ? (
                                // Real Data Logic
                                (features.valence < 0.45 || features.energy < 0.45) ? "bg-gradient-to-t from-chrome-blue to-indigo-500" : // Chill
                                    features.energy > 0.75 ? "bg-gradient-to-t from-signal-orange to-phosphor-amber" : // High Energy
                                        "bg-gradient-to-t from-fuchsia-500 to-purple-600" // Medium / Groovy (New State)
                            ) : (
                                // Fallback (Procedural or Idle)
                                isPlaying
                                    ? (() => {
                                        const hash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                        const mode = hash % 3;
                                        if (mode === 0) return "bg-gradient-to-t from-chrome-blue to-indigo-500"; // Chill
                                        if (mode === 1) return "bg-gradient-to-t from-fuchsia-500 to-purple-600"; // Groovy
                                        return "bg-gradient-to-t from-signal-orange to-phosphor-amber"; // Intense
                                    })()
                                    : "bg-static-grey"
                            )
                        )}
                        style={{
                            height: `${Math.max(10, height * 100)}%`, // min height 10%
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
