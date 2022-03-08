import React, { useEffect } from 'react';
import cn from 'classnames'

interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps): JSX.Element => {

    return (

        <h1 className="text-lg 
            font-bold
            bg-gradient-to-tr
            from-magenta
            to-magenta-lightest
            text-gray-100 
            text-center
            tracking-widest 
            uppercase
            shadow-lg
            overflow-hidden

            w-full
            sm:w-96
            px-8
            py-4 
            -mt-24
            sm:-ml-4

            transform 
            -skew-y-2 
            sm:skew-y-0
            sm:-rotate-3 
            sm:rounded-md">{title}</h1>

    );
}

export default SectionTitle;
