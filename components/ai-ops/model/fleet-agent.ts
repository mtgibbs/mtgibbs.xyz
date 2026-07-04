export interface IFleetAgent {
    readonly pid: string;
    readonly name: string;
    readonly role: string;
    readonly host: string;
    readonly status: 'ACTIVE' | 'STANDBY';
}
