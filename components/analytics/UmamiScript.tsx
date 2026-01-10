import Script from 'next/script';

const UmamiScript = () => {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    if (!websiteId) {
        console.warn('Umami Tracking: No NEXT_PUBLIC_UMAMI_WEBSITE_ID found. Tracking disabled.');
        return null;
    }

    console.log('Umami Tracking: Initialized with ID:', websiteId);

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
