import Script from 'next/script';

const UmamiScript = () => {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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
