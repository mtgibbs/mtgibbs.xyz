import cn from 'classnames';
import React, { useEffect } from 'react';
import useSWR from 'swr';

interface CodeHeroTextProps {
    codeText: string;
}

interface IRepoCommit {
    sha: string;
    commit: { message: string };
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// How much of Matt's code gets typed before the agent takes the keyboard
const _HUMAN_CHAR_LIMIT = 240;

const _INTERRUPT_TEXT = `

^C
[SIG_OVERRIDE] :: REMOTE_SESSION_ATTACHED
>> origin: pi-k3s.lab.mtgibbs.dev // agent harness
>> agent: hot-coder (qwen) // via opencode // auth: mtgibbs
>> AGENT HAS THE CONN // operator monitoring
`;

// Shown until the live git log lands (or if the API is rate-limited)
const _FALLBACK_GIT_LOG = [
    '31aca0b chore: allow playwright mcp for the design loop',
    'c22cb57 docs: distill DESIGN_PHILOSOPHY.md for v6',
    'ad05a15 ci: wire lab preview channel (prod stays frozen)',
];

const buildAiText = (gitLines: string[]) => {
    const headSha = gitLines[0]?.split(' ')[0] || 'HEAD';
    return `
$ git log --oneline origin/mater
${gitLines.map((l) => `  ${l}`).join('\n')}

$ flux get ks mtgibbs-site --context pi-k3s
  ✔ applied :: mater@${headSha} >> site.lab.mtgibbs.dev

$ systemctl status mtgibbs.service
  ● active (running) :: building teams & software
  └─ operator: matt // fleet: engaged
`;
};

const getTimeoutDelay = (delay: number, drift: number) => {
    let driftTime = Math.floor(Math.random() * drift) + 1;
    driftTime *= Math.round(Math.random()) ? 1 : -1;
    return delay + driftTime;
}

const CodeHeroText = ({ codeText }: CodeHeroTextProps): React.ReactNode => {
    // Same key as SystemLogs, so SWR dedupes to one request per page
    const { data: commits } = useSWR<IRepoCommit[]>(
        'https://api.github.com/repos/mtgibbs/mtgibbs.xyz/commits?per_page=4',
        fetcher,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    const gitLines = Array.isArray(commits)
        ? commits.slice(0, 3).map((c) => {
            const subject = c.commit.message.split('\n')[0];
            return `${c.sha.substring(0, 7)} ${subject.substring(0, 48)}${subject.length > 48 ? '...' : ''}`;
        })
        : _FALLBACK_GIT_LOG;

    const humanText = codeText.substring(0, _HUMAN_CHAR_LIMIT);
    const aiText = buildAiText(gitLines);
    const fullText = humanText + _INTERRUPT_TEXT + aiText;
    const interruptStart = humanText.length;
    const aiStart = interruptStart + _INTERRUPT_TEXT.length;

    const [index, setIndex] = React.useState(0);
    const cursorRef = React.useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setIndex(0);
    }, [codeText]);

    // Deliberately no cursor-follow: auto-scrolling during typing caused the
    // page to jump on mobile. The sequence is short enough to land in view.

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIndex(fullText.length);
            return;
        }
        if (index > fullText.length) { return; }

        // Matt types at human speed; a held breath before the takeover;
        // the banner hammers in; the agent types inhumanly fast
        const delay = index < interruptStart
            ? getTimeoutDelay(70, 15)
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
