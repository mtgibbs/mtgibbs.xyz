import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || process.env.UMAMI_WEBSITE_ID,
    });
}
