
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

        if (isPlaying && analysisData) {
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
            // Idle animation (sine wave) - plays if !isPlaying OR (isPlaying but no segment/data)
            const time = Date.now() / 1000;
            targetBars = targetBars.map((_, i) =>
                0.15 + 0.1 * Math.sin(time * 2 + i * 0.5)
            );
        }

        // Smoothing (Lerp)
        setBars(prevBars => {
            return prevBars.map((prev, i) => {
                const target = targetBars[i];
                // Slow down if chill
                const lerpFactor = (hasData && valence < 0.4) ? 0.05 : 0.15;
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
                    className={cn("w-1.5 rounded-t-sm transition-colors duration-500",
                        features ? (
                            features.valence < 0.4 ? "bg-chrome-blue" :
                                features.energy > 0.7 ? "bg-green-400" :
                                    "bg-signal-orange"
                        ) : "bg-static-grey"
                    )}
                    style={{
                        height: `${Math.max(5, height * 100)}%`, // min height 5%
                    }}
                />
            ))}
        </div>
    );
};

export default Visualizer;
