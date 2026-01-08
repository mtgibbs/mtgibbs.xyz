import React, { useEffect } from 'react';
import { IExperienceItem } from './model/experience-list-item';
import cn from 'classnames'

interface ExperienceItemProps extends IExperienceItem {
    index: number;
}

const ExperienceItem = ({ title, subTitle, description, startDate, endDate, index }: ExperienceItemProps): React.ReactNode => {

    const isEven = index % 2 === 0;
    const isOdd = !isEven;

    return (
        <li className="container mx-auto list-none">
            <div className={
                cn({
                    even: isEven,
                    odd: isOdd,
                    "ml-0 pl-4 sm:ml-8 sm:pl-0 md:ml-16 rounded-l-md": isEven,
                    "mr-0 pr-4 sm:mr-8 sm:pr-0 md:mr-16 rounded-r-md": isOdd,
                }, "relative")
            }>
                {/* Old Background Gradients */}
                <div className={cn({
                    "bg-gradient-to-l -skew-y-3 sm:skew-y-0 sm:-rotate-3 from-phosphor-amber to-tracking-red": isEven,
                    "transform skew-y-3 sm:skew-y-0 sm:rotate-3 from-signal-orange to-chrome-blue": isOdd,
                }, "absolute z-0 inset-0 bg-gradient-to-r shadow-lg transform sm:rounded-md")}></div>

                {/* Content Container */}
                <div className={cn({
                    "rounded-l-md": isEven,
                    "rounded-r-md": isOdd,
                }, "shadow-md p-8 rounded-none sm:rounded-md z-10 relative bg-magnetic-black bg-opacity-100")}>

                    {/* New Internal Layout */}
                    <div className="flex flex-col mb-4 gap-2">
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-gray-400 transition-colors">
                                {title}
                            </h3>
                            <span className={cn("hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono border whitespace-nowrap", {
                                "border-signal-orange/30 text-signal-orange": isEven,
                                "border-chrome-blue/30 text-chrome-blue": !isEven
                            })}>
                                {startDate} - {endDate}
                            </span>
                        </div>

                        <div className={cn("text-base font-medium", {
                            "text-signal-orange": isEven,
                            "text-chrome-blue": !isEven
                        })}>
                            {subTitle}
                        </div>

                        {/* Mobile Date */}
                        <div className="sm:hidden text-xs font-mono text-gray-500 mt-1">
                            {startDate} - {endDate}
                        </div>
                    </div>

                    <div className="text-gray-400 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                        {description}
                    </div>

                </div>
            </div>
        </li>
    );
}

export default ExperienceItem;
