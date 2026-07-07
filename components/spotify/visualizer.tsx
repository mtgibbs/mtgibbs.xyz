import React, { useEffect, useRef } from 'react';
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

const BANDS = 12;
const SAMPLES = 56;

// Magnetic Spectrum mood mapping (chrome-blue calm / amber mid / orange hot)
const MOOD_BLUE = { r: 108, g: 150, b: 190 };
const MOOD_AMBER = { r: 255, g: 176, b: 0 };
const MOOD_ORANGE = { r: 255, g: 68, b: 0 };
const MOOD_IDLE = { r: 245, g: 240, b: 225 };

const Visualizer: React.FC<VisualizerProps> = ({ trackId, isPlaying, progressMs, timestamp }) => {
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);

    // Band levels lerped per-frame; the trace samples through them
    const bandsRef = useRef<number[]>(new Array(BANDS).fill(0.12));
    const colorRef = useRef({ ...MOOD_IDLE });
    const visibleRef = useRef(true);
    const sizeRef = useRef({ w: 0, h: 0 });
    const frameCountRef = useRef(0);

    // Refs for animation state to avoid closure staleness
    const stateRef = useRef({
        isPlaying,
        progressMs,
        timestamp,
        analysisData,
        isLowPower,
        trackId,
    });

    useEffect(() => {
        stateRef.current = { isPlaying, progressMs, timestamp, analysisData, isLowPower, trackId };
    }, [isPlaying, progressMs, timestamp, analysisData, isLowPower, trackId]);

    const sizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (!rect.width) return;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        sizeRef.current = { w: rect.width, h: rect.height };
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const computeTargets = (): { bars: number[]; mood: { r: number; g: number; b: number }; hasData: boolean } => {
        const { isPlaying, progressMs, timestamp, analysisData, trackId } = stateRef.current;

        let targetBars = new Array(BANDS).fill(0.1);
        let mood = MOOD_IDLE;
        let hasData = false;

        if (isPlaying && analysisData && analysisData.segments) {
            const currentPosSec = (progressMs + (Date.now() - timestamp)) / 1000;
            const segment = analysisData.segments.find(s =>
                currentPosSec >= s.start && currentPosSec < (s.start + s.duration)
            );
            if (segment) {
                targetBars = segment.pitches;
                hasData = true;
                const { valence, energy } = analysisData.features;
                if (valence < 0.45 || energy < 0.45) mood = MOOD_BLUE;
                else if (energy > 0.75) mood = MOOD_ORANGE;
                else mood = MOOD_AMBER;
            }
        }

        if (!hasData) {
            if (isPlaying) {
                // PROCEDURAL SYNC MODE
                const trackHash = (trackId || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const modeN = trackHash % 3;
                const time = Date.now() / 1000;

                targetBars = targetBars.map((_, i) => {
                    let val = 0.1;
                    if (modeN === 0) {
                        const offset = i * 0.2;
                        val = Math.abs(Math.sin(time * 3 + offset + trackHash));
                    } else if (modeN === 1) {
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
                mood = modeN === 0 ? MOOD_BLUE : modeN === 1 ? MOOD_AMBER : MOOD_ORANGE;
            } else {
                // Idle ripple — NO_CARRIER
                const time = Date.now() / 1000;
                targetBars = targetBars.map((_, i) =>
                    0.15 + 0.1 * Math.sin(time * 2 + i * 0.5)
                );
            }
        }

        return { bars: targetBars, mood, hasData };
    };

    // Phosphor scope trace (proto H5). `still` renders one frame with no decay
    // trail for the reduced-motion path.
    const draw = (t: number, still: boolean) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const { w, h } = sizeRef.current;
        if (!canvas || !ctx || !w) return;

        const { isPlaying, isLowPower } = stateRef.current;

        if (still) {
            ctx.clearRect(0, 0, w, h);
        } else {
            // persistence veil — fade prior sweeps toward transparent
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = `rgba(0,0,0,${isLowPower ? 0.26 : 0.15})`;
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'source-over';
        }

        const bands = bandsRef.current;
        const { r, g, b } = colorRef.current;
        const cy = h * 0.55;
        const amp = h * (isPlaying ? 0.38 : 0.18);

        ctx.beginPath();
        for (let i = 0; i < SAMPLES; i++) {
            const x = i / (SAMPLES - 1);
            const f = x * (BANDS - 1);
            const i0 = Math.floor(f);
            const i1 = Math.min(BANDS - 1, i0 + 1);
            const v = bands[i0] + (bands[i1] - bands[i0]) * (f - i0);
            const y = cy
                + Math.sin(x * 24 + t * 5.5) * v * amp
                + Math.sin(x * 5 - t * 1.2) * h * 0.05;
            if (i === 0) ctx.moveTo(0, y);
            else ctx.lineTo(x * w, y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
        ctx.strokeStyle = `rgba(${r},${g},${b},${isPlaying ? 0.95 : 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
    };

    const step = () => {
        const { bars: targetBars, mood, hasData } = computeTargets();
        const { isPlaying, isLowPower, analysisData } = stateRef.current;
        const valence = analysisData?.features?.valence ?? 0.5;

        const baseLerp = (hasData && valence < 0.4) ? 0.05 : (isPlaying ? 0.2 : 0.15);
        const lerpFactor = isLowPower ? Math.min(1, baseLerp * 1.5) : baseLerp;
        bandsRef.current = bandsRef.current.map((prev, i) =>
            prev + ((targetBars[i] || 0.1) - prev) * lerpFactor
        );

        const c = colorRef.current;
        c.r += (mood.r - c.r) * 0.06;
        c.g += (mood.g - c.g) * 0.06;
        c.b += (mood.b - c.b) * 0.06;
    };

    useEffect(() => {
        sizeCanvas();

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

        const animate = () => {
            requestRef.current = requestAnimationFrame(animate);

            frameCountRef.current += 1;
            // Throttle to 30fps on low power mode
            if (stateRef.current.isLowPower && frameCountRef.current % 2 !== 0) return;
            // Sleep while the footer is offscreen
            if (!visibleRef.current) return;

            step();
            draw(Date.now() / 1000, false);
        };

        const stillFrame = () => {
            step();
            draw(4.2, true);
        };

        const start = () => {
            cancelAnimationFrame(requestRef.current);
            if (reduced.matches) stillFrame();
            else requestRef.current = requestAnimationFrame(animate);
        };
        start();
        reduced.addEventListener('change', start);

        const io = new IntersectionObserver(([entry]) => {
            visibleRef.current = entry.isIntersecting;
        }, { rootMargin: '48px' });
        if (containerRef.current) io.observe(containerRef.current);

        const ro = new ResizeObserver(() => sizeCanvas());
        if (canvasRef.current) ro.observe(canvasRef.current);

        return () => {
            cancelAnimationFrame(requestRef.current);
            reduced.removeEventListener('change', start);
            io.disconnect();
            ro.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative h-16 w-full pt-4" ref={containerRef}>
            {/* Retro Grid Background */}
            <div className="absolute inset-x-0 bottom-0 h-full opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:10px_10px] mask-image-b-fade"></div>

            {/* Scope trace */}
            <canvas
                ref={canvasRef}
                className="absolute inset-x-0 bottom-0 z-10 h-12 w-full"
                aria-hidden="true"
            />

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
                        ? (analysisData ? "STREAM:MONITORED" : "STREAM:PROCEDURAL")
                        : "STREAM:OFFLINE"}
                </span>
            </div>
        </div>
    );
};

export default Visualizer;
