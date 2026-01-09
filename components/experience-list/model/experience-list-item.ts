export interface IExperienceItem {
    title: string;
    subTitle?: string;
    description: string;
    startDate?: string;
    endDate?: string;
    relatedReports?: {
        id: string;
        title: string;
        timestamp: string;
    }[];
}
