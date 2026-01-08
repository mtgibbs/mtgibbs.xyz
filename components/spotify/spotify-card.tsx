import React from 'react';
import useSWR from 'swr';
import cn from 'classnames';
import { SpotifyData } from './model/spotify-data';
import Visualizer from './visualizer';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SpotifyCard = () => {
    const { data } = useSWR<SpotifyData>('/api/spotify', fetcher);

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={data?.isPlaying ? data.songUrl : 'https://open.spotify.com/user/neqy50tgt2erx1cp1p78qhqke?si=d68ae12657624d4a'}
            className={cn(
                "relative flex items-center p-4 space-x-4 transition-shadow hover:shadow-lg border rounded-xl w-72 backdrop-blur-md",
                data?.isPlaying
                    ? "border-white/10 bg-magnetic-black/90 hover:border-signal-orange/40"
                    : "border-static-grey/50 bg-magnetic-black/90 opacity-80"
            )}
        >
            <div className="flex-shrink-0 w-16 h-16 relative">
                {data?.isPlaying ? (
                    <img
                        className="w-16 h-16 rounded-md shadow-sm animate-pulse-fast"
                        src={data.albumImageUrl}
                        alt={`Album art for ${data.title} by ${data.artist}`}
                    />
                ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-md border border-white/5" aria-hidden="true">
                        <svg className="w-8 h-8 text-white/20" viewBox="0 0 168 168">
                            <path fill="currentColor" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.253-37.49-83.742-83.744-83.742zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.53-97.265-9.613-4.142 1.268-8.568-1.076-9.835-5.217-1.262-4.142 1.08-8.568 5.222-9.835 29.34-9.029 78.417-7.291 109.852 11.373 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.714 2.76z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                {data?.isPlaying ? (
                    <>
                        <p className="font-bold text-sm text-faded-cardboard truncate font-sans">
                            {data.title}
                        </p>
                        <p className="text-xs text-chrome-blue truncate font-sans mb-1">
                            {data.artist}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-faded-cardboard/60 font-mono tracking-wider">OFFLINE</span>
                        <span className="text-xs text-static-grey/50 font-mono">WAITING FOR SIGNAL...</span>
                    </div>
                )}

                {/* Always render Visualizer - it handles idle/offline state internally */}
                <Visualizer
                    trackId={data?.id || ''}
                    isPlaying={data?.isPlaying || false}
                    progressMs={data?.progress_ms || 0}
                    timestamp={data?.timestamp || 0}
                />
            </div>

            {data?.isPlaying && (
                <div className="absolute top-2 right-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-orange opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-signal-orange"></span>
                    </span>
                </div>
            )}
        </a>
    );
};

export default SpotifyCard;
