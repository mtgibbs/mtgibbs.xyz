import { IDevIconOptions } from './model/dev-icon-options';
import { CUSTOM_ICON_PATHS } from './custom-icons';
import cn from 'classnames';

const getClass = (options: IDevIconOptions): string => {
    // how's this for bad patterns?
    // likelihood half of the icons don't work now is quite high
    let result = `devicon-${options.icon}-${options.style}`;
    if (options.isWordmark)
        result += '-wordmark';

    return result;
};

const getMaskUrl = (path: string): string =>
    `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='${path}'/></svg>`)}")`;

type DevIconProps = IDevIconOptions & { className?: string; glow?: boolean };

const DevIcon = (options: DevIconProps): React.ReactNode => {
    const customPath = CUSTOM_ICON_PATHS[options.icon];

    if (customPath) {
        // devicon has no glyph for this one — mask an SVG so it can carry
        // the same gradient/glow treatment as the font icons
        const mask = getMaskUrl(customPath);
        return (
            <span
                title={options.icon}
                role="img"
                aria-label={options.icon}
                className={cn(
                    "inline-block w-[1em] h-[1em] text-7xl m-5",
                    options.glow
                        ? "bg-phosphor-amber"
                        : "bg-gradient-to-b from-signal-orange via-tracking-red to-chrome-blue",
                    options.className
                )}
                style={{
                    WebkitMaskImage: mask,
                    maskImage: mask,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                }}
            ></span>
        );
    }

    return (
        <i title={options.icon} role="img" aria-label={options.icon} className={cn(
            "text-7xl m-5",
            getClass(options),
            { 'colored': options.isColor },
            options.className
        )}></i>
    );
}

export default DevIcon;
