// Real relationships between repos, drawn as uplink signals on the star
// chart. Only pairs where both bodies exist in the catalog are rendered.
export const PROJECT_RELATIONS: readonly (readonly [string, string])[] = [
    ['mtgibbs.xyz', 'pi-cluster'],      // the site deploys onto the cluster
    ['pi-cluster', 'pi-cluster-mcp'],   // the mcp watches the cluster
    ['mtgibbs.xyz', 'umami'],           // the site reports to self-hosted analytics
    ['ralph', 'ralph-mcp'],             // the agent loop and its mcp
    ['ralph', 'ralph-voice'],           // the agent loop and its voice
    ['canvas-lms-mcp', 'carl'],         // both speak to Canvas LMS
    ['pi-cluster', 'kiwix-mcp'],        // deployed on the cluster via Flux
    ['pi-cluster', 'local-llm-mcp'],    // deployed on the cluster via Flux
];
