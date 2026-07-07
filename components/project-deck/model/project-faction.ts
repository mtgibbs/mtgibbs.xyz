export interface IProjectFaction {
    /** Silkscreen label, uppercase mono (e.g. 'HOMELAB') */
    name: string;
    /** Dot + uplink tint. Stay in the warm Magnetic Spectrum family. */
    color: string;
    members: readonly string[];
}
