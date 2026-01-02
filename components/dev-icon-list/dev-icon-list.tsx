import DevIcon from "./dev-icon";
import { IDevIconOptions } from "./model/dev-icon-options";

interface DevIconListProps {
    icons: readonly IDevIconOptions[];
}

const DevIconList = ({ icons }: DevIconListProps): JSX.Element => {
    return (
        <div className="px-4 py-12 sm:p-24">
            <div className="container mx-auto grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 items-center justify-items-center text-transparent bg-clip-text bg-gradient-to-b from-signal-orange via-tracking-red to-chrome-blue">
                {icons.map((iconOption) => (
                    <div key={iconOption.icon} className="flex items-center justify-center p-4">
                        <DevIcon
                            icon={iconOption.icon}
                            isColor={iconOption.isColor}
                            isWordmark={iconOption.isWordmark}
                            style={iconOption.style}></DevIcon>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DevIconList;