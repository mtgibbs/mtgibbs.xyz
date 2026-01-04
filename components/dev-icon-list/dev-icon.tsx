import { IDevIconOptions } from './model/dev-icon-options';
import cn from 'classnames';

const getClass = (options: IDevIconOptions): string => {
    // how's this for bad patterns?
    // likelihood half of the icons don't work now is quite high
    let result = `devicon-${options.icon}-${options.style}`;
    if (options.isWordmark)
        result += '-wordmark';

    return result;
};

const DevIcon = (options: IDevIconOptions): React.ReactNode => {
    return (
        <i title={options.icon} className={cn(
            "text-7xl m-5 animate-terminal-glow",
            getClass(options),
            { 'colored': options.isColor },
        )}></i>
    );
}

export default DevIcon;
