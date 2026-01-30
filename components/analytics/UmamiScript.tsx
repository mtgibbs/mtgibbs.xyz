import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        umami?: {
            track: (eventName: string, data?: Record<string, any>) => void;
        };
    }
}

const UmamiScript = () => {
    const [websiteId, setWebsiteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/config');
                if (res.ok) {
                    const data = await res.json();
                    if (data.umamiWebsiteId) {
                        console.log('Umami Tracking: Runtime ID loaded:', data.umamiWebsiteId);
                        setWebsiteId(data.umamiWebsiteId);
                    } else {
                        console.warn('Umami Tracking: No ID returned from /api/config');
                    }
                }
            } catch (error) {
                console.error('Umami Tracking: Failed to fetch config', error);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        if (!websiteId) return;

        const heartbeat = setInterval(() => {
            if (document.visibilityState === 'visible' && window.umami) {
                window.umami.track('heartbeat');
            }
        }, 30000);

        return () => clearInterval(heartbeat);
    }, [websiteId]);

    if (!websiteId) {
        return null;
    }

    return (
        <Script
            src="/api/analytics/script.js"
            data-website-id={websiteId}
            data-host-url="/api/analytics"
            strategy="afterInteractive"
        />
    );
};

export default UmamiScript;
