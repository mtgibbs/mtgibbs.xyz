import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-4">
            <Head>
                <title>404 - Signal Lost</title>
            </Head>

            <div className="max-w-md w-full border border-green-500 p-8 rounded relative overflow-hidden">
                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

                <h1 className="text-6xl font-bold mb-2">404</h1>
                <h2 className="text-2xl mb-6 uppercase tracking-wider">Signal Lost</h2>

                <p className="mb-8 text-green-500/80">
                    The requested data sector could not be located in the mainframe memory banks.
                </p>

                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-widest text-sm"
                    >
                        Return to Root
                    </Link>
                </div>
            </div>
        </div>
    );
}
