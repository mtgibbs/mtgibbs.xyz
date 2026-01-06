export interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
    id?: string;
    progress_ms?: number;
    timestamp?: number;
}
