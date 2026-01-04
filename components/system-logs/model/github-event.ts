export interface IGitHubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
    };
    repo: {
        name: string;
    };
    payload: {
        commits?: Array<{
            sha: string;
            message: string;
        }>;
        action?: string;
        ref?: string;
        pull_request?: {
            title: string;
            html_url?: string;
        };
        issue?: {
            title?: string;
            number: number;
        };
    };
    created_at: string;
}
