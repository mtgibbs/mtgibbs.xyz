// Real relationships between repos, drawn as uplink signals on the star
// chart. Only pairs where both bodies exist in the catalog are rendered.
export const PROJECT_RELATIONS: readonly (readonly [string, string])[] = [
    ['mtgibbs.xyz', 'pi-cluster'],      // the site deploys onto the cluster
    ['pi-cluster', 'pi-cluster-mcp'],   // the mcp watches the cluster
];
