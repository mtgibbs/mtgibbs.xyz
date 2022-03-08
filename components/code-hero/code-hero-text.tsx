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

const CodeHeroText = ({ codeText }: CodeHeroTextProps): JSX.Element => {

    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        index <= codeText.length && setTimeout(() => setIndex(index + 1), getTimeoutDelay(85, 15));
    }, [index, codeText]);

    return (
        <>
            <code className={cn(
                styles.crt,
                'whitespace-pre-line'
            )}>
                <pre className="nineteen font-light text-sm">{codeText.substring(0, index)}</pre>
            </code>
        </>
    );
}

export default CodeHeroText;
