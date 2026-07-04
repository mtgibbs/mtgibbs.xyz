import cn from 'classnames';
import React, { useEffect } from 'react';

interface CodeHeroTextProps {
    codeText: string;
}

// How much of Matt's code gets typed before the agent takes the keyboard
const _HUMAN_CHAR_LIMIT = 100;

const _INTERRUPT_TEXT = `

^C
[SIG_OVERRIDE] :: REMOTE_SESSION_ATTACHED
>> agent: claude-fable-5 // auth: mtgibbs
>> "i've got it from here."
`;

const _AI_TEXT = `
$ git log --oneline origin/redesign
  31aca0b chore: allow playwright mcp for the design loop
  c22cb57 docs: distill DESIGN_PHILOSOPHY.md for v6
  ad05a15 ci: wire lab preview channel (prod stays frozen)

$ systemctl status mtgibbs.service
  ● active (running) :: building teams & software
  └─ operator: matt // fleet: engaged
`;

const getTimeoutDelay = (delay: number, drift: number) => {
    let driftTime = Math.floor(Math.random() * drift) + 1;
    driftTime *= Math.round(Math.random()) ? 1 : -1;
    return delay + driftTime;
}

const CodeHeroText = ({ codeText }: CodeHeroTextProps): React.ReactNode => {
    const humanText = codeText.substring(0, _HUMAN_CHAR_LIMIT);
    const fullText = humanText + _INTERRUPT_TEXT + _AI_TEXT;
    const interruptStart = humanText.length;
    const aiStart = interruptStart + _INTERRUPT_TEXT.length;

    const [index, setIndex] = React.useState(0);
    const cursorRef = React.useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setIndex(0);
    }, [codeText]);

    // Follow the cursor like a real terminal so the takeover stays on screen
    useEffect(() => {
        cursorRef.current?.scrollIntoView({ block: 'nearest' });
    }, [index]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIndex(fullText.length);
            return;
        }
        if (index > fullText.length) { return; }

        // Matt types at human speed; a held breath before the takeover;
        // the banner hammers in; the agent types inhumanly fast
        const delay = index < interruptStart
            ? getTimeoutDelay(85, 15)
            : index === interruptStart
                ? 900
                : index < aiStart
                    ? getTimeoutDelay(40, 10)
                    : getTimeoutDelay(16, 6);

        const timeout = setTimeout(() => setIndex(index + 1), delay);
        return () => clearTimeout(timeout);
    }, [index, fullText, interruptStart, aiStart]);

    const isInterrupting = index > interruptStart && index <= aiStart;
    const isAgentTyping = index > aiStart;

    return (
        <>
            <code className="whitespace-pre-line">
                <pre className={cn(
                    "nineteen font-light text-sm whitespace-pre-wrap break-words",
                    isInterrupting && "animate-glitch"
                )}>
                    <span>{fullText.substring(0, Math.min(index, interruptStart))}</span>
                    {index > interruptStart &&
                        <span className="text-tracking-red font-bold">{fullText.substring(interruptStart, Math.min(index, aiStart))}</span>
                    }
                    {index > aiStart &&
                        <span className="text-faded-cardboard">{fullText.substring(aiStart, index)}</span>
                    }
                    <span ref={cursorRef} className={cn(
                        "animate-cursor inline-block ml-1",
                        isAgentTyping ? "text-faded-cardboard" : isInterrupting ? "text-tracking-red" : "text-signal-orange"
                    )}>█</span>
                </pre>
            </code>
        </>
    );
}

export default CodeHeroText;
