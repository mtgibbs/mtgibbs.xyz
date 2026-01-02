import { IExperienceItem } from "../components/experience-list/model/experience-list-item";

export const EXPERIENCE: readonly IExperienceItem[] = [
    {
        title: 'Senior Software Engineering Manager',
        subTitle: 'Data Strategy & Audit Intelligence Platforms',
        description: `In my current role, I’m responsible for the strategy and delivery of data analytics platforms that power inventory audits and portfolio risk intelligence. The work sits at the intersection of data, product, and customer trust—requiring systems that are not only fast and scalable, but also explainable and accurate.

I work closely with Product and UX partners to turn ambiguous problem statements into clear technical direction, helping teams navigate trade-offs and build solutions that hold up over time. A significant part of my focus is on creating strong ownership models, setting technical standards, and building an environment where engineers can move quickly without sacrificing quality.

Alongside platform work, I established and continue to lead DataScan’s engineering internship program in partnership with Georgia Tech. What started as a small initiative has grown into a durable talent pipeline and mentorship framework, and remains one of the most personally rewarding parts of my role.`,
        startDate: '2021',
        endDate: 'Present'
    },
    {
        title: 'Software Engineering Manager',
        subTitle: 'Platform Modernization & Cloud Readiness',
        description: `As a Software Engineering Manager, I led a fully remote team of full-stack engineers through a major platform modernization effort. The goal was to make long-lived products cloud-ready while rethinking how customers interacted with them, all without disrupting existing workflows.

Much of the work involved balancing short-term delivery with long-term architectural health—introducing continuous integration practices, improving developer tooling, and creating safer paths to change. I spent a lot of time supporting engineers at different stages of their careers, helping them grow while maintaining momentum on a complex and evolving codebase.`,
        startDate: '2020',
        endDate: '2021'
    },
    {
        title: 'Lead Software Engineer',
        subTitle: 'UI Engineering & Developer Experience',
        description: `In this role, I served as the lead UI engineer, shaping frontend architecture, tooling, and quality standards across teams. I focused on building consistency and reducing friction, particularly through stronger CI integration and shared patterns that made code easier to maintain and reason about.

Just as important as the technical work was the opportunity to mentor and coach peers. Teaching new frameworks, testing strategies, and engineering practices became a natural extension of the role, and it’s where I discovered a lasting passion for growing people, not just software.`,
        startDate: '2018',
        endDate: '2020'
    },
    {
        title: 'Lead Software Engineer',
        subTitle: 'Fortify on Demand (SaaS Application Security)',
        description: `At Fortify, I was a lead engineer on Fortify on Demand, an enterprise SaaS platform helping organizations manage application security risk at scale. The platform supported tens of thousands of applications and users, which demanded a high level of rigor around performance, reliability, and usability.

I worked across teams to design and deliver features that made large security portfolios understandable and actionable. I also championed code reuse and inner-source practices, helping teams share components and move faster together. During this time, I was involved in early efforts to integrate security analysis into CI pipelines and guide open-source engagement as those practices were just beginning to take hold.`,
        startDate: '2013',
        endDate: '2018'
    },
    {
        title: 'Software Engineer',
        subTitle: 'Master Data Management',
        description: `Earlier in my career, I led development of a Master Data Management platform designed to consolidate and validate company-wide data. The system balanced strict correctness requirements with an interface that made it easier for users to understand and safely update records.

This work laid the foundation for capabilities such as fraud detection and prevention, and it sharpened my appreciation for data quality, validation, and the long-term consequences of early design decisions.`,
        startDate: '2012',
        endDate: '2013'
    },
    {
        title: 'Application Developer',
        subTitle: 'High-Volume Policy Processing Systems',
        description: `I began my career working on high-volume, automated policy processing systems built on a mix of Java and mainframe technologies. The work involved interfacing with DB2, COBOL, and legacy services, and it required careful attention to correctness and operational safety.

Those early years taught me how large systems actually behave in production, and how to evolve them incrementally without breaking the business—a lesson that has informed every role since.`,
        startDate: '2009',
        endDate: '2012'
    }
];
