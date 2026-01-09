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
        detected_issue: 'While building a risk-analysis platform, I identified a core architectural challenge in our audit trail implementation. We were applying standard relational normalization to audit logs—linking records to configuration rules via Foreign Keys. While this is the standard for managing active state, it creates a "temporal conflict" in an audit system: if a rule changes today, history is effectively rewritten.',
        action_taken: 'I collaborated with the team to align our assumptions on the product\'s intent. We recognized that an audit needs to be a "photograph" of a moment in time, not a live stream of current rules. We pivoted to a Data Projection pattern, snapshotting the rule\'s state directly onto the record. This simplified the codebase by removing complex "guard-rail" logic and ensured our historical data remained immutable and SOC 2 compliant.',
        system_status: '[19:12:05] INF: DATA_INTEGRITY >> VERIFIED [19:12:10] INF: PATTERN >> IMMUTABLE_PROJECTION',
        resolved: true,
    },
    {
        id: '02',
        timestamp: '19:15:30',
        init_system: 'RELEASE_MANAGEMENT_V2',
        tag: 'PROCESS_EVOLUTION // STRATEGY',
        severity: 'WARNING',
        detected_issue: 'As our product and sales pipeline grew, our traditional quarterly release cycle hit a scaling bottleneck. The "Big Bang" approach created high-pressure delivery windows where a single certification delay could impact the entire payload. This often led to intensive "heroic" efforts during deployment weekends to ensure downstream data feeds remained synchronized.',
        action_taken: 'I am leading the transition to a Monthly Release Train to build more predictability into our lifecycle. The core shift was decoupling deployment from release through strict feature flagging. By merging code "dark," we can validate in production early and often. If a feature isn\'t ready for the current train, it simply catches the next one. This has shifted our culture from high-stakes "crunch" periods to a steady, manageable heartbeat that protects both system stability and developer sanity.',
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
