import React, { useEffect } from 'react';
import { IExperienceItem } from './model/experience-list-item';
import cn from 'classnames'

interface ExperienceItemProps extends IExperienceItem {
    index: number;
}

const ExperienceItem = ({ title, subTitle, description, startDate, endDate, index, relatedReports }: ExperienceItemProps): React.ReactNode => {

    const isEven = index % 2 === 0;
    const isOdd = !isEven;

    return (
        <li className="w-full list-none">
            <div className={
                cn({
                    "even": isEven,
                    "odd": isOdd,

                    // Mobile (< md): Full Width Wrapper
                    // This creates the "canvas" for the background to extend edge-to-edge
                    "w-full mx-0 mb-8": true,

                    // Tablet/Desktop (>= md): Floating & Centered
                    "md:w-11/12 md:max-w-4xl md:mx-auto md:mb-12": true,

                    // Desktop Stagger (lg+): Shift positions
                    "lg:translate-x-8": isEven,
                    "lg:-translate-x-8": isOdd,
                }, "relative")
            }>
                {/* Background Gradients */}
                <div className={cn({
                    // Gradients
                    "bg-gradient-to-l -skew-y-3 md:skew-y-0 md:-rotate-3 from-phosphor-amber to-tracking-red": isEven,
                    "transform skew-y-3 md:skew-y-0 md:rotate-3 from-signal-orange to-chrome-blue": isOdd,

                    // Corner Radius
                    // Mobile: Square (Flush with both edges due to w-full)
                    "rounded-none": true,
                    // Desktop: Full Rounding
                    "md:rounded-xl": true
                }, "absolute z-0 inset-0 bg-gradient-to-r shadow-lg")}></div>

                {/* Content Container */}
                <div className={cn({
                    // Mobile Layout: 
                    // Even: Right Attached (mr-0), Gap Left (ml-8)
                    "ml-8 mr-0 rounded-l-xl rounded-r-none": isEven,
                    // Odd: Left Attached (ml-0), Gap Right (mr-8)
                    "mr-8 ml-0 rounded-r-xl rounded-l-none": isOdd,

                    // Desktop Layout: Reset Margins & Rounding
                    "md:m-0 md:rounded-xl": true
                }, "shadow-md p-8 z-10 relative bg-magnetic-black bg-opacity-100")}>

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

                    {/* Related Field Reports */}
                    {relatedReports && relatedReports.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-gray-800 font-mono text-xs space-y-2">
                            {relatedReports.map((report) => (
                                <a
                                    href={`#report-${report.id}`}
                                    key={report.id}
                                    className="block text-gray-500 hover:text-white transition-colors cursor-pointer group/link"
                                >
                                    <span className="text-gray-600 group-hover/link:text-gray-400 transition-colors">{`>[${report.timestamp}] INF: RELATED_REPORT >> `}</span>
                                    <span className={cn("font-bold underline decoration-dotted decoration-gray-600 underline-offset-4 group-hover/link:decoration-white transition-all", isEven ? "text-signal-orange" : "text-chrome-blue")}>
                                        {`[${report.id} // ${report.title}]`}
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </li>
    );
}

export default ExperienceItem;
