
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
                const time = Date.now() / 1000;

                // Create a simple hash of the trackId to seed the "vibe"
                const trackHash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

                targetBars = targetBars.map((_, i) => {
                    // Use specific offsets per bar to create a "spectrum" look
                    // Combine varying frequencies to create "beat" like patterns
                    // randomness derived from trackHash
                    const offset = i * 0.5;
                    const speed1 = 2 + (trackHash % 3);
                    const speed2 = 5 + (trackHash % 7);

                    // Combined wave function
                    const wave1 = Math.sin(time * speed1 + offset + trackHash);
                    const wave2 = Math.cos(time * speed2 * 0.5 + offset);
                    const wave3 = Math.sin(time * (speed1 + speed2) + (i * 13.0)); // fast jitter

                    // Norm between 0 and 1
                    return Math.abs((wave1 + wave2 + (wave3 * 0.3)) / 2.3);
                });
            } else {
                // Idle animation (sine wave) - plays if !isPlaying
                const time = Date.now() / 1000;
                targetBars = targetBars.map((_, i) =>
                    0.15 + 0.1 * Math.sin(time * 2 + i * 0.5)
                );
            }
        }

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

    // Render
    return (
        <div className="flex items-end space-x-1 h-8 w-full justify-between" ref={canvasRef}>
            {bars.map((height, i) => (
                <div
                    key={i}
                    className={cn("w-1.5 rounded-t-sm",
                        features ? (
                            features.valence < 0.4 ? "bg-gradient-to-t from-chrome-blue to-indigo-500" :
                                features.energy > 0.7 ? "bg-gradient-to-t from-signal-orange to-phosphor-amber" :
                                    "bg-gradient-to-t from-signal-orange to-orange-400"
                        ) : (
                            // Fallback (Procedural or Idle)
                            isPlaying ? "bg-gradient-to-t from-signal-orange to-phosphor-amber" : "bg-static-grey"
                        )
                    )}
                    style={{
                        height: `${Math.max(10, height * 100)}%`, // min height 10%
                    }}
                />
            ))}
        </div>
    );
};

export default Visualizer;
