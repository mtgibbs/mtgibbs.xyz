
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getAccessToken = async () => {
    if (!refresh_token) {
        console.error("SPOTIFY_REFRESH_TOKEN is missing");
        return {};
    }

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            }),
        });

        if (!response.ok) {
            console.error("Failed to fetch Spotify access token", response.status, await response.text());
            return {};
        }

        return response.json();
    } catch (e) {
        console.error("Error fetching Spotify access token", e);
        return {};
    }
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    if (!access_token) return new Response(null, { status: 401 });

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getAudioAnalysis = async (id: string) => {
    const { access_token } = await getAccessToken();

    if (!access_token) {
        console.error("No access token for getAudioAnalysis");
        return new Response("No access token", { status: 401 });
    }

    return fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getAudioFeatures = async (id: string) => {
    const { access_token } = await getAccessToken();

    if (!access_token) {
        console.error("No access token for getAudioFeatures");
        return new Response("No access token", { status: 401 });
    }

    return fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};
