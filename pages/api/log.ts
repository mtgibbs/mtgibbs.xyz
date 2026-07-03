
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { level = 'info', message, context } = req.body;

    const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    };

    // Log to stdout so it gets picked up by Heroku Log Drains
    const logString = JSON.stringify(logEntry);

    if (level === 'error') {
        console.error(logString);
    } else if (level === 'warn') {
        console.warn(logString);
    } else {
        console.log(logString);
    }

    return res.status(200).json({ success: true });
}
