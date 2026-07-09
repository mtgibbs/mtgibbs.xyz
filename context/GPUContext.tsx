import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type GPUTier = 'low' | 'medium' | 'high';

interface GPUState {
    tier: GPUTier;
    isLowPower: boolean;
    renderer: string;
    cycleTier: () => void;
}

const GPUContext = createContext<GPUState | undefined>(undefined);

export const GPUProvider = ({ children }: { children: ReactNode }) => {
    const [tier, setTier] = useState<GPUTier>('medium');
    const [renderer, setRenderer] = useState('unknown');
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Auto-detect on mount
    useEffect(() => {
        // Reduced Motion Check
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(motionQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        motionQuery.addEventListener('change', handleMotionChange);

        const detectTier = (): { tier: GPUTier, renderer: string } => {
            let detectedTier: GPUTier = 'medium';
            let detectedRenderer = 'unknown';

            const concurrency = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;

            try {
                const canvas = document.createElement('canvas');
                const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
                if (gl) {
                    // Try standard RENDERER first to avoid deprecation warnings
                    const standardRenderer = gl.getParameter(gl.RENDERER);

                    if (standardRenderer) {
                        detectedRenderer = standardRenderer;
                    }

                    // Only try extension if standard renderer is generic and we aren't in Firefox (which warns about this)
                    // Note: "Gecko" check is a crude proxy for Firefox
                    const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1;

                    if (!detectedRenderer || (detectedRenderer === 'Generic' && !isFirefox)) {
                        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                        if (debugInfo) {
                            const unmasked = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                            if (unmasked) detectedRenderer = unmasked;
                        }
                    }
                }
            } catch (e) {
                console.warn('WebGL detection failed', e);
            }

            // Judge by GPU, not by form factor — the v6 phosphor stack is
            // static gradients + one composited opacity animation, and modern
            // phone GPUs (Apple A-series, Adreno) eat that for free. The old
            // blanket mobile→low gate blanked the whole CRT look on phones.
            const isIntel = detectedRenderer.toLowerCase().includes('intel');
            const isApple = detectedRenderer.toLowerCase().includes('apple');
            const isNvidia = detectedRenderer.toLowerCase().includes('nvidia');
            const isRadeon = detectedRenderer.toLowerCase().includes('radeon') || detectedRenderer.toLowerCase().includes('amd');

            if (isIntel) {
                detectedTier = 'low';
            } else if (isApple || isNvidia || isRadeon) {
                detectedTier = 'high';
            } else {
                detectedTier = concurrency > 4 ? 'medium' : 'low';
            }

            return { tier: detectedTier, renderer: detectedRenderer };
        };

        const result = detectTier();
        setTier(result.tier);
        setRenderer(result.renderer);

        return () => {
            motionQuery.removeEventListener('change', handleMotionChange);
        };
    }, []);

    const cycleTier = () => {
        setTier(current => {
            if (current === 'low') return 'medium';
            if (current === 'medium') return 'high';
            return 'low';
        });
    };

    const isLowPower = tier === 'low' || prefersReducedMotion;

    useEffect(() => {
        if (isLowPower) {
            document.body.classList.add('low-power');
        } else {
            document.body.classList.remove('low-power');
        }
    }, [isLowPower]);

    return (
        <GPUContext.Provider value={{ tier, isLowPower, renderer, cycleTier }}>
            {children}
        </GPUContext.Provider>
    );
};

export const useGPU = () => {
    const context = useContext(GPUContext);
    if (!context) {
        throw new Error('useGPU must be used within a GPUProvider');
    }
    return context;
};
