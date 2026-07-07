import { IProjectFaction } from '../components/project-deck/model/project-faction';

// Repo families rendered as tinted "factions" on the star chart: member
// dots and the uplinks between members take the faction color. Repos in
// no faction keep the default ambient amber (or derelict blue for forks).
// Colors stay in the warm Magnetic Spectrum family — no cold greens or
// synthwave purples (DESIGN.md).
export const PROJECT_FACTIONS: readonly IProjectFaction[] = [
    {
        name: 'HOMELAB',
        color: '#FFB000', // phosphor-amber — the core fleet keeps the flagship tint
        members: ['mtgibbs.xyz', 'pi-cluster', 'pi-cluster-mcp', 'kiwix-mcp', 'local-llm-mcp', 'umami'],
    },
    {
        name: 'RALPH',
        color: '#6C9BC7', // lifted chrome-blue — alive, unlike the derelict hulls
        members: ['ralph', 'ralph-mcp', 'ralph-voice'],
    },
    {
        name: 'CAMPUS',
        color: '#F5F0E1', // faded-cardboard — the Canvas LMS pair
        members: ['canvas-lms-mcp', 'carl'],
    },
];
