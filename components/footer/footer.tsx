import React from 'react';
import cn from 'classnames';

const Footer = (): React.ReactNode => {
    const version = process.env.NEXT_PUBLIC_VERSION || 'local-dev';
    const ghcrUrl = `https://github.com/mtgibbs/mtgibbs.xyz/pkgs/container/mtgibbs.xyz`;

    return (
        <footer className="relative z-10 w-full bg-magnetic-black border-t border-signal-orange/30 py-8 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-faded-cardboard/60 font-mono text-xs tracking-widest uppercase">
                    © {new Date().getFullYear()} MTGIBBS.XYZ // ALL RIGHTS RESERVED
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-phosphor-amber/40 font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">
                        System Status: Operational
                    </span>
                    <div className="h-4 w-px bg-signal-orange/20 hidden md:block" />
                    <a
                        href={ghcrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-3 py-1 border border-phosphor-amber/20 hover:border-phosphor-amber/60 bg-transparent transition-all duration-300 rounded-sm"
                    >
                        <span className="text-faded-cardboard/40 group-hover:text-faded-cardboard/80 font-mono text-[10px] uppercase tracking-tighter transition-colors">
                            Build Tag:
                        </span>
                        <code className="text-phosphor-amber/60 group-hover:text-phosphor-amber font-mono text-xs font-bold transition-colors">
                            {version}
                        </code>
                        <div className="w-1.5 h-1.5 rounded-full bg-signal-orange animate-pulse shadow-[0_0_8px_rgba(255,176,0,0.6)]" />
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
