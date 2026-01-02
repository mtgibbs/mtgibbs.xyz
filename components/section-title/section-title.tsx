import React, { useEffect } from 'react';
import cn from 'classnames'

interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps): JSX.Element => {

    return (

        <h1 className="text-lg 
            font-bold
            bg-magnetic-black
            text-phosphor-amber
            border-2
            border-signal-orange 
            text-center
            tracking-widest 
            uppercase
            shadow-lg
            overflow-hidden

            w-[90vw]
            sm:w-96
            px-4
            sm:px-8
            py-4 
            -mt-24
            sm:-ml-4

            transform 
            skew-y-0
            sm:-skew-y-2 
            rotate-0
            sm:-rotate-3 
            sm:rounded-md">
            <span className="glitch inline-block relative" data-text={title}>{title}</span>
        </h1>

    );
}

export default SectionTitle;
