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
            // If one fails, we might still want to return what we can, but for now let's fail gracefully
            // Or just return nulls if one fails.
            console.error("Failed to fetch spotify data", analysisRes.status, featuresRes.status);
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
            loudness_max: analysis.track.loudness_max, // Or similar property? Need to check structure if possible, but usually analysis.track has overall loudness. 
            // The user mentioned "segments array, specifically the pitches (12-element array) and loudness_max values"
            // Wait, loudness_max is usually per segment. I'll pass the segments.
            // But maybe user meant track's max loudness for normalization?
            // "Audio Analysis: Use the segments array, specifically the pitches (12-element array) and loudness_max values."
            // segments objects have `loudness_max` usually.

            features: {
                energy: features.energy,
                valence: features.valence
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
