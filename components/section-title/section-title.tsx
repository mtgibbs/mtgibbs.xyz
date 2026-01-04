import React, { useEffect } from 'react';
import cn from 'classnames'

interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps): React.ReactNode => {

    return (

        <h1 className="text-lg 
            font-bold
            bg-magnetic-black
            text-phosphor-amber
            border-y-2
            sm:border-2
            border-signal-orange 
            text-center
            tracking-widest 
            uppercase
            shadow-lg
            overflow-hidden

            w-full
            sm:w-96
            px-4
            sm:px-8
            py-4 
            -mt-24
            
            sm:-ml-4
            
            transform 
            -skew-y-2 
            sm:-rotate-3 
            sm:rounded-md">
            <span className="glitch inline-block relative" data-text={title}>{title}</span>
        </h1>

    );
}

export default SectionTitle;
