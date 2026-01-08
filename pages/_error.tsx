import type { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface ErrorProps {
    statusCode?: number;
    message?: string;
}

const Error = ({ statusCode, message }: ErrorProps) => {
    return (
        <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
            <Head>
                <title>Error {statusCode || 'Unknown'}</title>
            </Head>

            <div className="max-w-md w-full border border-green-500 p-8 rounded relative overflow-hidden">
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

                <h1 className="text-4xl font-bold mb-4 glitch-text">
                    SYSTEM ERROR {statusCode}
                </h1>

                <div className="border-t border-green-500/50 my-4" />

                <p className="mb-6 text-lg">
                    {message || (statusCode
                        ? `A server-side error occurred: ${statusCode}`
                        : 'A client-side error occurred')}
                </p>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/"
                        className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest text-sm"
                    >
                        Reboot System
                    </Link>
                </div>
            </div>
        </div>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
