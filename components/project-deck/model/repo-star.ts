export interface IRepoStar {
    readonly name: string;
    readonly createdYear: number;
    readonly pushedAt: string; // ISO date
    readonly sizeKb: number;
    readonly fork: boolean;
}

export interface IStarCatalog {
    readonly repos: readonly IRepoStar[];
    // private repos chart as unnamed "classified contacts" — count only,
    // names must never ship to the public site
    readonly privateCount: number;
}
