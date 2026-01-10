import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { path } = req.query;
    const hostUrl = process.env.UMAMI_HOST_URL || 'https://mtgibbs-tracking.herokuapp.com';

    console.log(`[Umami Proxy] Request for: ${path}`);
    console.log(`[Umami Proxy] Upstream Host: ${hostUrl}`);

    // Reconstruct the path (e.g., ["script.js"] -> "/script.js")
    const pathStr = Array.isArray(path) ? path.join('/') : path;
    const targetUrl = `${hostUrl.replace(/\/$/, '')}/${pathStr}`;

    console.log(`[Umami Proxy] Proxying to: ${targetUrl}`);

    try {
        // 2. Prepare headers
        const headers: Record<string, string> = {};
        if (req.headers['user-agent']) {
            headers['user-agent'] = req.headers['user-agent'] as string;
        }

        // Forward real IP
        const forwardedFor = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;
        if (forwardedFor) {
            headers['x-forwarded-for'] = forwardedFor;
        }

        // 3. Fetch upstream
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
        });

        // 4. Return response
        const data = await response.text();

        // Forward Content-Type if present (e.g. application/javascript)
        if (response.headers.get('Content-Type')) {
            res.setHeader('Content-Type', response.headers.get('Content-Type')!);
        }

        return res.status(response.status).send(data);

    } catch (error) {
        // 5. Robust Error Handling: Swallow errors to prevent client console spam
        // If Umami is down, we just return 200 OK to the browser script/event
        console.error('Umami Proxy Error (Suppressed):', error);
        return res.status(200).end();
    }
}
