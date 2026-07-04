import { IFleetAgent } from '../components/ai-ops/model/fleet-agent';

// Every entry is a real agent, persona, or bot that operates on Matt's
// systems. No decorative fakery — if it's listed, it runs.
export const FLEET_AGENTS: readonly IFleetAgent[] = [
    {
        pid: '001',
        name: 'claude-fable-5',
        role: 'design engineer // v6 redesign (this page)',
        host: 'claude-code',
        status: 'ACTIVE',
    },
    {
        pid: '002',
        name: 'mission-control',
        role: 'devops & release manager',
        host: 'antigravity',
        status: 'STANDBY',
    },
    {
        pid: '003',
        name: 'retro-architect',
        role: 'frontend specialist // retro sci-fi ui',
        host: 'antigravity',
        status: 'STANDBY',
    },
    {
        pid: '004',
        name: 'data-officer',
        role: 'typescript & data guardian',
        host: 'antigravity',
        status: 'STANDBY',
    },
    {
        pid: '005',
        name: 'design-agent',
        role: 'visual language archivist',
        host: 'antigravity',
        status: 'STANDBY',
    },
    {
        pid: '006',
        name: 'fluxcd',
        role: 'gitops reconciler // self-healing deploys',
        host: 'pi-k3s',
        status: 'ACTIVE',
    },
    {
        pid: '007',
        name: 'renovate',
        role: 'dependency patrol',
        host: 'github',
        status: 'ACTIVE',
    },
    {
        pid: '008',
        name: 'mcp-homelab',
        role: 'read-only cluster vision (mcp)',
        host: 'pi-k3s',
        status: 'ACTIVE',
    },
];
