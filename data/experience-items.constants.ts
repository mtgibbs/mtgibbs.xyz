import { IExperienceItem } from "../components/experience-list/model/experience-list-item";

export const EXPERIENCE: readonly IExperienceItem[] = [
    {
        title: 'Senior Software Engineering Manager',
        subTitle: 'Data Strategy & Audit Intelligence Platforms',
        description: `In my current role, I’m responsible for the strategy and delivery of data analytics platforms that support inventory audits and portfolio risk analysis. The work requires balancing speed, accuracy, and trust, and building systems that customers can rely on when making real decisions.

I work closely with Product and UX partners to turn loosely defined problems into clear technical direction. A large part of my focus is helping teams navigate trade-offs, establish ownership, and build solutions that are resilient and understandable over time. I care deeply about technical standards and about creating an environment where engineers can move quickly without cutting corners.

Lately I’ve been driving our AI-assisted engineering adoption by building the proofs myself: evaluation gates that measure AI-written code in CI, a lab-proven harness that turns a ticket mention into a draft merge request, and the marketplace that distributes our agent tooling. The other half is making the case honestly — briefings, workshops with live demos, and real capacity baselines instead of wishful multipliers.

Alongside the platform work, I established and continue to lead DataScan’s engineering internship program in partnership with several local universities, including Georgia Tech, Kennesaw State, and Georgia State. What began as a small effort has grown into a repeatable pipeline for developing early-career engineers — and lately, the first place our AI-native workflows get taught — and it remains one of the most rewarding parts of my role.`,
        startDate: '2021',
        endDate: 'Present',
        relatedReports: [
            { id: '01', title: 'The Temporal Audit Alignment', timestamp: '19:12:05' },
            { id: '02', title: 'The Monthly Release Train', timestamp: '19:15:30' }
        ]
    },
    {
        title: 'Software Engineering Manager',
        subTitle: 'Platform Modernization & Cloud Readiness',
        description: `As a Software Engineering Manager, I led a fully remote team of full-stack engineers through a significant platform modernization effort. The goal was to make long-standing products cloud-ready while improving how customers interacted with them, all without disrupting existing workflows.

Much of this work involved balancing immediate delivery needs with long-term architectural health. We introduced stronger continuous integration practices, improved developer tooling, and created safer ways to evolve the system. I spent a great deal of time supporting engineers at different stages of their careers, helping them grow while maintaining momentum on a complex and evolving codebase.`,
        startDate: '2020',
        endDate: '2021'
    },
    {
        title: 'Lead Software Engineer',
        subTitle: 'UI Engineering & Developer Experience',
        description: `In this role, I served as the lead UI engineer, responsible for frontend architecture, tooling, and quality standards across teams. My focus was on consistency and reducing friction, particularly through better CI integration and shared patterns that made the codebase easier to work in and maintain.

Equally important was the opportunity to mentor and coach peers. Teaching new frameworks, testing strategies, and engineering practices became a natural part of the job, and it’s where I developed a lasting interest in growing people alongside the software.`,
        startDate: '2018',
        endDate: '2020'
    },
    {
        title: 'Lead Software Engineer',
        subTitle: 'Fortify on Demand (SaaS Application Security)',
        description: `At Fortify, I was a lead engineer on Fortify on Demand, an enterprise SaaS platform used to manage application security risk at scale. The platform supported tens of thousands of applications and users, which required careful attention to performance, reliability, and usability.

I worked across teams to design and deliver features that helped customers understand and act on large security portfolios. I also pushed for code reuse and inner-source practices, helping teams share components and reduce duplication. During this time, I was involved in early efforts to integrate security analysis into CI pipelines and to guide open-source engagement as those approaches were still emerging.`,
        startDate: '2013',
        endDate: '2018'
    },
    {
        title: 'Software Engineer',
        subTitle: 'Master Data Management',
        description: `Earlier in my career, I led development of a Master Data Management platform intended to consolidate and validate company-wide data. The system emphasized correctness while providing an interface that allowed users to safely understand and update records.

This work supported downstream capabilities such as fraud detection and prevention, and it reinforced the importance of data quality, validation, and careful design decisions early in a system’s life.`,
        startDate: '2012',
        endDate: '2013'
    },
    {
        title: 'Application Developer',
        subTitle: 'High-Volume Policy Processing Systems',
        description: `I began my career working on high-volume, automated policy processing systems built on a mix of Java and mainframe technologies. This included integrating with DB2, COBOL, and other legacy services, and required a strong focus on correctness and operational safety.

Those early years taught me how large systems behave in production and how to change them incrementally without breaking the business. That mindset has stayed with me throughout my career.`,
        startDate: '2009',
        endDate: '2012'
    }
];
