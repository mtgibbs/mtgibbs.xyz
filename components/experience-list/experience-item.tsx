import React, { useEffect } from 'react';
import { IExperienceItem } from './model/experience-list-item';
import cn from 'classnames'

interface ExperienceItemProps extends IExperienceItem {
    index: number;
}

const ExperienceItem = ({ title, subTitle, description, startDate, endDate, index }: ExperienceItemProps): JSX.Element => {

    const isEven = index % 2 === 0;
    const isOdd = !isEven;

    return (
        <>
            <div className="container mx-auto">
                <div className={
                    cn({
                        even: isEven,
                        odd: isOdd,
                        "ml-0 pl-4 sm:ml-8 sm:pl-0 md:ml-16 rounded-l-md": isEven,
                        "mr-0 pr-4 sm:mr-8 sm:pr-0 md:mr-16 rounded-r-md": isOdd,
                    }, "relative")
                }>
                    <div className={cn({
                        "bg-gradient-to-l -skew-y-3 sm:skew-y-0 sm:-rotate-3 from-yellow to-red-light": isEven,
                        "transform skew-y-3 sm:skew-y-0 sm:rotate-3 from-orange-light to-magenta-light": isOdd,
                    }, "absolute z-0 inset-0 bg-gradient-to-r shadow-lg transform sm:rounded-md")}></div>
                    <div className={cn({
                        "rounded-l-md": isEven,
                        "rounded-r-md": isOdd,
                    }, "shadow-md p-8 rounded-none sm:rounded-md z-10  relative bg-white")}>
                        <h3 className="font-bold tracking-wide">{title}</h3>
                        <div className="font-light">{subTitle}</div>
                        <p className="text-lg p-4">{description}</p>
                        {startDate && endDate &&
                            <div className="float-right relative">
                                <span className="text-primary">{startDate} - {endDate}</span>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default ExperienceItem;
