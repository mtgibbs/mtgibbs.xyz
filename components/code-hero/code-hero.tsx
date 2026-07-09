import React from 'react';
import useSWR from 'swr';
import CodeHeroText from './code-hero-text';
import cn from 'classnames';
import { useVhs } from '../../context/VhsContext';
import styles from '../../styles/CodeHero.module.css';

interface CodeHeroProps {
    titleText: string;
    secondText?: string;
    secondTextDesktop?: string;
}

const sourceCodeFetcher = (...args: any) => fetch(args).then(res => {
    return res.text();
});

const _DEFAULT_CODE_TEXT = `
// It seem's that you've loaded my site with javascript disabled,
// that or I've managed to mess up my site's caching.
// Please consider supporting starving javascript developers maintaining obscure npm packages
// and surviving off the the scraps of npm installs by enabling javascript in your browser.




// Some people would say to you, "Browse without javascript for a safer experience." and I tell you those
// people are heretics!  These people don't understand the beauty of a sleek user experience, but since
// I do, I've prepared this text for your enjoyment so you don't lose the entire effect of my backdrop.
// I'll just assume you're a fellow gentleman who care's about the precious megabytes we waste shipping
// sleek frameworks.




// Oh! You scrolled down?  ¯\\_(ツ)_/¯
`;

const _FILES = [
    'https://raw.githubusercontent.com/mtgibbs/pi-cluster/refs/heads/main/clusters/pi-k3s/backup-jobs/backup-cronjob.yaml',
    'https://raw.githubusercontent.com/mtgibbs/pi-cluster/main/clusters/pi-k3s/external-secrets-config/cluster-secret-store.yaml',
    'https://raw.githubusercontent.com/mtgibbs/pi-cluster/main/scripts/deploy-all.sh',
    'https://raw.githubusercontent.com/mtgibbs/mtgibbs.xyz/mater/components/system-logs/system-logs.tsx',
    'https://raw.githubusercontent.com/mtgibbs/recipecate-ui/master/src/app/components/meal-plan-create-wizard/meal-plan-create-wizard.component.ts',
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-labelclasses/master/src/scripts/chartist-plugin-labelclasses.js',
    'https://raw.githubusercontent.com/mtgibbs/hubot-fod/master/src/hubot-fod.ts',
    'https://raw.githubusercontent.com/mtgibbs/hubot-fod/master/index.ts',
    'https://raw.githubusercontent.com/mtgibbs/d3-source-sink/master/src/d3-source-sink.ts',
    'https://raw.githubusercontent.com/mtgibbs/inkscape-stroke-to-path/master/stroke-to-path.ps1',
    'https://raw.githubusercontent.com/mtgibbs/iot-gd/master/gd-service.py',
    'https://raw.githubusercontent.com/mtgibbs/recipecate-api/master/routes/ingredient.routes.js',
    'https://raw.githubusercontent.com/mtgibbs/recipecate-api/master/routes/mealplan.routes.js',
    'https://raw.githubusercontent.com/mtgibbs/recipecate-ui/master/src/app/components/meal-plan-create-wizard/meal-plan-create-wizard.component.html',
    'https://raw.githubusercontent.com/mtgibbs/mtgibbs.xyz/4.0.0/src/app/code-hero/code-hero.component.ts',
    'https://raw.githubusercontent.com/mtgibbs/mtgibbs.xyz/4.0.0/src/app/experience-list/experience-item.component.scss',
];

const CodeHero = ({ titleText, secondText, secondTextDesktop }: CodeHeroProps): React.ReactNode => {
    const { isVhsActive: globalVhsActive } = useVhs();
    const [file, setFile] = React.useState(_FILES[Math.floor(Math.random() * _FILES.length)]);
    const { data, error } = useSWR(file, sourceCodeFetcher);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    let codeText = ``;

    if (data && !error) { codeText = data; }
    else { codeText = _DEFAULT_CODE_TEXT; }

    React.useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [codeText]);

    return (
        <>
            <div aria-hidden role='presentation' className="relative mx-auto w-full px-2 sm:px-0">
                <div className="absolute z-0 top-0 bottom-0 -left-[100vw] -right-[100vw] shadow-lg transform skew-y-0 sm:-skew-y-6">
                    {/* VHS Stripes - purely decorative vector lines */}
                    <div className="absolute z-0 inset-x-0 bottom-80 h-4 bg-phosphor-amber opacity-80"></div>
                    <div className="absolute z-0 inset-x-0 bottom-60 h-8 bg-tracking-red opacity-60"></div>
                    <div className="absolute z-0 inset-x-0 bottom-40 h-2 bg-signal-orange opacity-90"></div>
                    <div className="absolute z-0 inset-x-0 bottom-20 h-12 bg-chrome-blue opacity-40"></div>
                    <div className="absolute z-0 inset-x-0 bottom-0 h-6 bg-phosphor-amber opacity-30"></div>
                </div>
                <div
                    onClick={() => setFile(_FILES[Math.floor(Math.random() * _FILES.length)])}
                    title="Click to load random source file"
                    className={cn(
                        "relative z-10 h-96 p-4 sm:mx-2 md:mx-4 lg:mx-6 sm:rounded-none overflow-hidden cursor-pointer group transition-colors duration-300",
                        "bg-magnetic-black/90 border-4 border-phosphor-amber shadow-[6px_6px_0px_0px_#3B5C7D] hover:border-signal-orange hover:shadow-[6px_6px_0px_0px_#D93636]",
                        styles.crt,
                        globalVhsActive && styles.vhsSync
                    )}>
                    <div ref={scrollContainerRef} className={cn(
                        "object-cover font-mono text-phosphor-amber h-full py-4 overflow-scroll scrollbar-thin scrollbar-thumb-signal-orange scrollbar-track-transparent scrollbar-thumb-rounded select-none bg-black/20 phosphor-text"
                    )}>
                        <CodeHeroText codeText={codeText}></CodeHeroText>
                    </div>
                </div>
                <div className="absolute w-full h-72 sm:h-64 inset-y-12 flex flex-col items-center justify-center pointer-events-none">
                    {titleText &&
                        <h2 className="relative w-full text-center z-20 transform translate-y-0 sm:-translate-x-24 sm:-translate-y-6 pointer-events-auto">
                            <span className="bg-magnetic-black text-base sm:text-2xl text-signal-orange font-bold p-3 sm:p-8 border-4 border-signal-orange rounded-none tracking-wide heavitas shadow-[4px_4px_0px_#3B5C7D] sm:shadow-[8px_8px_0px_#3B5C7D] transition-all duration-100 ease-in-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#3B5C7D] sm:hover:translate-x-[4px] sm:hover:translate-y-[4px] sm:hover:shadow-[4px_4px_0px_#3B5C7D] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none sm:active:translate-x-[8px] sm:active:translate-y-[8px]">
                                {titleText}
                            </span>
                        </h2>
                    }
                    {/* Mobile Version */}
                    {secondText &&
                        <div className="relative w-full text-center z-20 transform mt-4 sm:hidden pointer-events-auto">
                            <span className="text-sm text-faded-cardboard font-bold tracking-wide lazer84 hover:text-signal-orange transition-colors duration-300 bg-magnetic-black/80 px-2 py-1">
                                <span className="glitch relative inline-block text-left" data-text={secondText}>{secondText}</span>
                            </span>
                        </div>
                    }

                    {/* Desktop Version */}
                    {(secondTextDesktop || secondText) &&
                        <div className="hidden sm:block relative w-full text-center z-20 transform sm:translate-x-24 sm:translate-y-6 sm:-rotate-12 pointer-events-auto">
                            <span className="text-3xl text-faded-cardboard/85 font-bold tracking-wide lazer84 hover:text-signal-orange transition-colors duration-300">
                                <span className="glitch relative inline-block text-left whitespace-pre-line" data-text={secondTextDesktop || secondText}>
                                    {secondTextDesktop || secondText}
                                </span>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CodeHero;
