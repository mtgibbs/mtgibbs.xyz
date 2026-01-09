import React from 'react';
import { IExperienceItem } from './model/experience-list-item';
import ExperienceItem from './experience-item';

interface ExperienceListProps {
    experienceItems: readonly IExperienceItem[];
}

const ExperienceList = ({ experienceItems }: ExperienceListProps): React.ReactNode => {

    return (
        <div className="relative container mx-auto px-4 sm:px-0">
            {/* Timeline Line */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-signal-orange via-chrome-blue to-phosphor-amber opacity-20 transform -translate-x-1/2"></div>

            <ol className="flex flex-col space-y-12 sm:space-y-24 relative list-none m-0 p-0">
                {experienceItems.map((item, index) => (
                    <ExperienceItem
                        key={`${item.title}-${item.startDate}`}
                        title={item.title}
                        description={item.description}
                        index={index}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        subTitle={item.subTitle}
                        relatedReports={item.relatedReports}
                    />
                ))}
            </ol>
        </div>
    );
}

export default ExperienceList;
