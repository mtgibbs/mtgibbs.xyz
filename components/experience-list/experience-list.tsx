import React from 'react';
import { IExperienceItem } from './model/experience-list-item';
import ExperienceItem from './experience-item';

interface ExperienceListProps {
    experienceItems: readonly IExperienceItem[];
}

const ExperienceList = ({ experienceItems }: ExperienceListProps): JSX.Element => {

    return (
        <>
            <div className="my-12 flex flex-col space-y-24">
                {experienceItems.map((item, index) => (
                    <ExperienceItem key={item.title} title={item.title} description={item.description} index={index} startDate={item.startDate} endDate={item.endDate}></ExperienceItem>
                ))}
            </div>
        </>
    );
}

export default ExperienceList;
