import React from 'react';
import useSWR from 'swr';
import CodeHeroText from './code-hero-text';
import cn from 'classnames';

interface CodeHeroProps {
    titleText: string;
    secondText?: string;
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

const CodeHero = ({ titleText, secondText }: CodeHeroProps): JSX.Element => {

    const [file, setFile] = React.useState(_FILES[Math.floor(Math.random() * _FILES.length)]);
    const { data, error } = useSWR(file, sourceCodeFetcher);

    let codeText = ``;

    if (error) { codeText = error; }
    else if (data) { codeText = data; }
    else { codeText = _DEFAULT_CODE_TEXT; }

    return (
        <>
            <div aria-hidden role='presentation' className=" relative mx-auto">
                <div className="absolute z-0 inset-0 shadow-lg transform -skew-y-6">
                    {/* VHS Stripes - purely decorative vector lines */}
                    <div className="absolute z-0 inset-x-0 bottom-80 h-4 bg-phosphor-amber opacity-80"></div>
                    <div className="absolute z-0 inset-x-0 bottom-60 h-8 bg-tracking-red opacity-60"></div>
                    <div className="absolute z-0 inset-x-0 bottom-40 h-2 bg-signal-orange opacity-90"></div>
                    <div className="absolute z-0 inset-x-0 bottom-20 h-12 bg-chrome-blue opacity-40"></div>
                    <div className="absolute z-0 inset-x-0 bottom-0 h-6 bg-phosphor-amber opacity-30"></div>
                </div>
                <div className={cn(
                    "relative z-10 h-96 p-4 sm:mx-2 md:mx-4 lg:mx-6 sm:rounded-none bg-magnetic-black border-4 border-faded-cardboard shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                )}>
                    <div className={cn(
                        "object-cover font-mono text-phosphor-amber h-full py-4 overflow-scroll scrollbar-thin scrollbar-thumb-signal-orange scrollbar-track-transparent scrollbar-thumb-rounded select-none"
                    )}>
                        <CodeHeroText codeText={codeText}></CodeHeroText>
                    </div>
                </div>
                <div className="absolute w-full h-72 sm:h-64 inset-y-12">
                    {titleText &&
                        <div className="absolute w-full inset-y-1/2 h-9 object-center text-center z-20 transform -translate-x-16 sm:-translate-x-24 -translate-y-12 sm:-translate-y-6">
                            <span className="bg-magnetic-black text-2xl text-signal-orange font-bold p-8 border-4 border-signal-orange rounded-none tracking-wide whitespace-nowrap heavitas shadow-[8px_8px_0px_#3B5C7D]">{titleText}</span>
                        </div>
                    }
                    {secondText &&
                        <div className="absolute w-full inset-y-1/2 h-8 object-center text-center z-20 transform translate-x-8 sm:translate-x-24 translate-y-7 sm:translate-y-6 -rotate-12" >
                            <span className="text-3xl text-phosphor-amber font-bold tracking-wide whitespace-nowrap lazer84">
                                <span className="glitch relative inline-block" data-text={secondText}>{secondText}</span>
                            </span>
                        </div >
                    }
                </div >
            </div >
        </>
    );
}

export default CodeHero;
