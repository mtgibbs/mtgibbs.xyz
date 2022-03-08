import DevIcon from "./dev-icon";
import { IDevIconOptions } from "./model/dev-icon-options";

interface DevIconListProps {
    icons: readonly IDevIconOptions[];
}

const DevIconList = ({ icons }: DevIconListProps): JSX.Element => {
    return (
        <div className="p-24">
            <div className="container mx-auto whitespace-normal leading-[5em] break-words h-full inline-block text-center text-transparent bg-clip-text bg-gradient-to-b from-blue via-magenta to-purple">
                {icons.map((iconOption) => (
                    <DevIcon
                        key={iconOption.icon}
                        icon={iconOption.icon}
                        isColor={iconOption.isColor}
                        isWordmark={iconOption.isWordmark}
                        style={iconOption.style}></DevIcon>
                ))}
            </div>
        </div>
    );
};

export default DevIconList;