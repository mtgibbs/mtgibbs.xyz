import cn from 'classnames';
import React, { useEffect } from 'react';
import styles from '../../styles/CodeHero.module.css';

interface CodeHeroTextProps {
    codeText: string;
}

const getTimeoutDelay = (delay: number, drift: number) => {
    let driftTime = Math.floor(Math.random() * drift) + 1;
    driftTime *= Math.round(Math.random()) ? 1 : -1;
    return delay + driftTime;
}

const CodeHeroText = ({ codeText }: CodeHeroTextProps): React.ReactNode => {

    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        setIndex(0);
    }, [codeText]);

    useEffect(() => {
        index <= codeText.length && setTimeout(() => setIndex(index + 1), getTimeoutDelay(85, 15));
    }, [index, codeText]);

    return (
        <>
            <code className="whitespace-pre-line">
                <pre className="nineteen font-light text-sm whitespace-pre-wrap break-all">
                    {codeText.substring(0, index)}
                    <span className="animate-cursor text-signal-orange inline-block ml-1">█</span>
                </pre>
            </code>
        </>
    );
}

export default CodeHeroText;
