
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
            // Spotify API is deprecated or restricted for this app (likely 403).
            // We return 200 with an error object to allow the frontend to gracefully degrade 
            // to procedural animation without cluttering the console with 500 errors.
            console.warn(
                "Spotify Audio Analysis unavailable (likely deprecated/restricted):",
                analysisRes.status, featuresRes.status
            );
            return res.status(200).json({ error: 'Audio analysis unavailable' });
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
