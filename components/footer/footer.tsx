import React from 'react';
import cn from 'classnames';

import SpotifyCard from '../spotify/spotify-card';
import VhsToggle from '../vhs-toggle/vhs-toggle';

import { useGPU } from '../../hooks/use-gpu';

const Footer = (): React.ReactNode => {
    const version = process.env.NEXT_PUBLIC_VERSION || 'local-dev';
    const ghcrUrl = `https://github.com/mtgibbs/mtgibbs.xyz/pkgs/container/mtgibbs.xyz`;
    const { tier, cycleTier } = useGPU();
    const [clickCount, setClickCount] = React.useState(0);

    const handleSecretClick = () => {
        setClickCount(prev => {
            const next = prev + 1;
            if (next >= 5) {
                cycleTier();
                return 0;
            }
            return next;
        });
    };

    return (
        <footer className="relative z-10 w-full bg-magnetic-black border-t border-signal-orange/30 py-8 px-4">
            <div className="container mx-auto flex flex-col items-center gap-8 mb-8 lg:hidden">
                <SpotifyCard />
            </div>

            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
                <div
                    onClick={handleSecretClick}
                    className="text-faded-cardboard/40 font-mono text-[10px] tracking-[0.3em] uppercase order-2 lg:order-1 select-none cursor-default active:text-signal-orange transition-colors"
                >
                    © {new Date().getFullYear()} MTGIBBS.XYZ // ALL RIGHTS RESERVED
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 order-1 lg:order-2">
                    {/* Mission Control Strip */}
                    <div className="flex items-center gap-4 px-4 py-1.5 bg-black/30 border border-white/5 rounded-full backdrop-blur-sm">
                        <span className="text-phosphor-amber/40 font-mono text-[9px] uppercase tracking-[0.2em] hidden sm:block">
                            Sys_Status: {tier === 'low' ? 'LOW_PWR' : tier === 'medium' ? 'NOMINAL' : 'MAX_PWR'}
                        </span>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <VhsToggle />
                    </div>

                    <a
                        href={ghcrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-3 py-1 border border-white/5 hover:border-phosphor-amber/40 bg-black/20 transition-all duration-300 rounded-full"
                    >
                        <span className="text-faded-cardboard/30 group-hover:text-faded-cardboard/60 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap">
                            Build:
                        </span>
                        <code className="text-phosphor-amber/40 group-hover:text-phosphor-amber font-mono text-[10px] font-bold">
                            {version}
                        </code>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                    </a>
                </div>
            </div>

            {/* Subtle CRT scanning line effect for footer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
                <div className="w-full h-[2px] bg-white animate-scanline" />
            </div>
        </footer>
    );
};

export default Footer;
