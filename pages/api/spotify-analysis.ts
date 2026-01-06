
import { getAudioAnalysis, getAudioFeatures } from '../../lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid track ID' });
    }

    try {
        const [analysisRes, featuresRes] = await Promise.all([
            getAudioAnalysis(id),
            getAudioFeatures(id)
        ]);

        if (analysisRes.status !== 200 || featuresRes.status !== 200) {
            console.error(
                "Failed to fetch spotify data",
                analysisRes.status, await analysisRes.text(),
                featuresRes.status, await featuresRes.text()
            );
            return res.status(500).json({ error: 'Failed to fetch audio data' });
        }

        const analysis = await analysisRes.json();
        const features = await featuresRes.json();

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=31536000, stale-while-revalidate=31536000' // Analysis doesn't change for a track ID
        );

        return res.status(200).json({
            segments: analysis.segments,
            loudness_max: analysis.track.loudness_max,
            features: {
                energy: features.energy,
                valence: features.valence
            }
        });
    } catch (error) {
        console.error("Spotify Analysis Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
