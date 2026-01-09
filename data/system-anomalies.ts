export interface AnomalyLog {
    id: string;
    timestamp: string;
    init_system: string; // [SYSTEM_INIT]
    tag: string;         // [TAG]
    detected_issue: string; // The Hook / Problem
    action_taken: string;   // The Intervention / Action
    system_status: string;  // The Log Entry / Result & Stats
    severity: 'CRITICAL' | 'WARNING' | 'FATAL';
    resolved: boolean;
}

export const ANOMALY_LOGS: AnomalyLog[] = [
    {
        id: '01',
        timestamp: '19:12:05',
        init_system: 'AUDIT_INTELLIGENCE_ENGINE',
        tag: 'DATA_INTEGRITY // MENTORSHIP',
        severity: 'CRITICAL',
        detected_issue: 'While building a risk-analysis platform, I noticed a teammate struggling with a "silent killer" bug. He was applying standard relational normalization to an audit log—linking audit records to configuration rules via Foreign Keys. This works for managing active state, but it’s a catastrophe for an audit trail. If a user updated a status rule today, every audit from six months ago would "time-travel" to match the new rule, effectively rewriting history and compromising our SOC 2 compliance.',
        action_taken: 'I sat him down to list our assumptions about the product\'s intent. We realized an audit isn\'t a "live stream" of current rules; it’s a photograph of a moment in time. We pivoted the architecture from references to projections, snapshotting the rule\'s result directly onto the record at the moment of creation. This deleted the complex "guard-rail" code he’d been fighting and replaced it with a simplified, immutable data pattern that ensures history stays historical.',
        system_status: '[19:12:05] INF: DATA_INTEGRITY >> VERIFIED [19:12:10] INF: PATTERN >> IMMUTABLE_PROJECTION',
        resolved: true,
    },
    {
        id: '02',
        timestamp: '19:15:30',
        init_system: 'RELEASE_MANAGEMENT_V2',
        tag: 'PROCESS_EVOLUTION // STRATEGY',
        severity: 'WARNING',
        detected_issue: 'My team was stuck in a "Quarterly Death March." We had high-stakes sales pipelines for financial clients, non-negotiable dates, and a "Big Bang" release cycle that was failing. Because we tried to ship everything at once, one minor certification delay would threaten the entire payload. This inevitably led to "heroic" weekend hotfixing to repair downstream data feeds that were missed in the crunch.',
        action_taken: 'I’m currently leading the transition to a Monthly Release Train. The shift is cultural as much as technical: we decoupled deployment from release. By enforcing strict feature flagging, we can merge code into production "dark." If a feature isn\'t ready, it simply misses the train and catches the next one. This has turned "High-Pressure Deployments" into "Boring Tuesdays," allowing us to focus on quality and passive telemetry rather than weekend recovery.',
        system_status: '[19:15:30] INF: DEPLOY_CADENCE >> MONTHLY_STABLE [19:15:45] INF: HOTFIX_RELIANCE >> DECREASING',
        resolved: true,
    },
    {
        id: '03',
        timestamp: '19:20:12',
        init_system: 'GREENFIELD_RISK_UNDERWRITING',
        tag: 'PRAGMATISM // ARCHITECTURE',
        severity: 'FATAL',
        detected_issue: 'I joined a greenfield project that had encountered a common modern challenge: architectural over-correction. In an effort to avoid the technical debt of our legacy monolith, the system had evolved into a highly distributed landscape of microservices and Lambdas before the core business requirements were fully anchored. While the tech was modern, the infrastructure overhead was beginning to outpace our delivery velocity for what was essentially a complex C# rules engine.',
        action_taken: 'I led a "KISS" initiative to realign our architecture with our current scale. We consolidated fragmented services where the operational cost outweighed the decoupling benefits and moved away from serverless abstractions that added unnecessary debugging cycles. This simplification wasn\'t just about deleting code; it was about enabling reliability. By right-sizing the stack, we were able to establish a robust CI/CD pipeline with automated smoke tests and rollbacks. With the infrastructure "noise" neutralized, the team was finally able to focus on the high-value complexity: a DocumentDB-backed templating engine designed to handle the intricate, immutable snapshotting required for bank collateral underwriting.',
        system_status: '[19:20:12] INF: CI_CD_PIPELINE >> ACTIVE [19:20:25] INF: INFRASTRUCTURE_ALIGNMENT >> COMPLETED',
        resolved: true,
    },
];
