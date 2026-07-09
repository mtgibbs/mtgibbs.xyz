import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface IPhosphorKnob {
    cssVar: string;
    label: string;
    min: number;
    max: number;
    step: number;
    unit: '' | 'px' | 's';
}

// Every knob in the DESIGN.md §1 phosphor stack (defaults live in globals.css :root)
const KNOBS: readonly IPhosphorKnob[] = [
    { cssVar: '--pt-core-blur', label: 'GLYPH FUZZ', min: 0, max: 3, step: 0.25, unit: 'px' },
    { cssVar: '--pt-fringe-x', label: 'FRINGE OFFSET', min: 0, max: 2, step: 0.1, unit: 'px' },
    { cssVar: '--pt-fringe-warm-a', label: 'FRINGE RED', min: 0, max: 1, step: 0.02, unit: '' },
    { cssVar: '--pt-fringe-cool-a', label: 'FRINGE BLUE', min: 0, max: 1, step: 0.02, unit: '' },
    { cssVar: '--pt-bloom-r', label: 'BLOOM RADIUS', min: 0, max: 16, step: 1, unit: 'px' },
    { cssVar: '--pt-bloom-a', label: 'BLOOM ALPHA', min: 0, max: 1, step: 0.02, unit: '' },
    { cssVar: '--pt-grain-a', label: 'GRAIN', min: 0, max: 0.4, step: 0.01, unit: '' },
    { cssVar: '--pt-grain-vhs-a', label: 'GRAIN · VHS', min: 0, max: 0.5, step: 0.01, unit: '' },
    { cssVar: '--pt-scan-a', label: 'SCANLINES · VHS', min: 0, max: 0.4, step: 0.01, unit: '' },
    { cssVar: '--pt-mask-a', label: 'SLOT MASK · VHS', min: 0, max: 3, step: 0.1, unit: '' },
    { cssVar: '--pt-veil-lo', label: 'VEIL FLOOR · VHS', min: 0, max: 1, step: 0.05, unit: '' },
    { cssVar: '--pt-veil-hi', label: 'VEIL PEAK · VHS', min: 0, max: 1, step: 0.05, unit: '' },
    { cssVar: '--pt-veil-s', label: 'VEIL PERIOD', min: 0.1, max: 2, step: 0.02, unit: 's' },
    { cssVar: '--pt-roll-a', label: 'ROLL BRIGHTNESS · VHS', min: 0, max: 0.3, step: 0.01, unit: '' },
    { cssVar: '--pt-roll-s', label: 'ROLL PERIOD', min: 2, max: 30, step: 0.5, unit: 's' },
];

const readCurrent = (): Record<string, number> => {
    const cs = getComputedStyle(document.documentElement);
    const out: Record<string, number> = {};
    KNOBS.forEach((k) => { out[k.cssVar] = parseFloat(cs.getPropertyValue(k.cssVar)) || 0; });
    return out;
};

const PhosphorTuner = (): React.ReactNode => {
    const router = useRouter();
    const [values, setValues] = useState<Record<string, number> | null>(null);
    const [copied, setCopied] = useState(false);

    const active = router.isReady && 'tune' in router.query;

    useEffect(() => {
        if (active) setValues(readCurrent());
    }, [active]);

    if (process.env.NODE_ENV !== 'development' || !active || !values) return null;

    const apply = (knob: IPhosphorKnob, raw: number) => {
        document.documentElement.style.setProperty(knob.cssVar, `${raw}${knob.unit}`);
        setValues((prev) => ({ ...prev!, [knob.cssVar]: raw }));
    };

    const reset = () => {
        KNOBS.forEach((k) => document.documentElement.style.removeProperty(k.cssVar));
        setValues(readCurrent());
    };

    const copyCss = () => {
        const block = ':root {\n' + KNOBS.map((k) =>
            `  ${k.cssVar}: ${values[k.cssVar]}${k.unit};`
        ).join('\n') + '\n}';
        navigator.clipboard.writeText(block).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        });
    };

    return (
        <div className="fixed top-3 right-3 z-[10001] w-64 border border-phosphor-amber/50 bg-magnetic-black/95 font-mono text-[10px] text-faded-cardboard select-none">
            <div className="flex items-center justify-between border-b border-phosphor-amber/40 px-3 py-1.5">
                <span className="tracking-[0.24em] text-phosphor-amber">PHOSPHOR TUNER</span>
                <span className="text-faded-cardboard/50">DEV</span>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-3 py-2">
                {KNOBS.map((k) => (
                    <label key={k.cssVar} className="block py-1">
                        <span className="flex justify-between tracking-[0.14em] text-faded-cardboard/70">
                            {k.label}
                            <span className="text-phosphor-amber tabular-nums">{values[k.cssVar]}{k.unit}</span>
                        </span>
                        <input
                            type="range"
                            className="w-full accent-[#FFB000]"
                            min={k.min}
                            max={k.max}
                            step={k.step}
                            value={values[k.cssVar]}
                            onChange={(e) => apply(k, parseFloat(e.target.value))}
                            aria-label={k.label}
                        />
                    </label>
                ))}
            </div>
            <div className="flex gap-2 border-t border-phosphor-amber/40 px-3 py-2">
                <button
                    onClick={copyCss}
                    className="flex-1 border border-phosphor-amber/60 px-2 py-1 tracking-[0.2em] text-phosphor-amber hover:bg-phosphor-amber hover:text-magnetic-black"
                >
                    {copied ? 'COPIED' : 'COPY CSS'}
                </button>
                <button
                    onClick={reset}
                    className="border border-faded-cardboard/40 px-2 py-1 tracking-[0.2em] text-faded-cardboard/70 hover:border-faded-cardboard"
                >
                    RESET
                </button>
            </div>
            <div className="border-t border-faded-cardboard/15 px-3 py-1.5 text-faded-cardboard/45">
                · VHS knobs need the VHS toggle ON
            </div>
        </div>
    );
};

export default PhosphorTuner;
