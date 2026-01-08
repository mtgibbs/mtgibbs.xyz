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

    // Auto-detect on mount
    useEffect(() => {
        const detectTier = (): { tier: GPUTier, renderer: string } => {
            let detectedTier: GPUTier = 'medium';
            let detectedRenderer = 'unknown';

            const concurrency = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;

            try {
                const canvas = document.createElement('canvas');
                const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        detectedRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                    }
                }
            } catch (e) {
                console.warn('WebGL detection failed', e);
            }

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isIntel = detectedRenderer.toLowerCase().includes('intel');
            const isApple = detectedRenderer.toLowerCase().includes('apple');
            const isNvidia = detectedRenderer.toLowerCase().includes('nvidia');
            const isRadeon = detectedRenderer.toLowerCase().includes('radeon') || detectedRenderer.toLowerCase().includes('amd');

            if (isMobile || isIntel) {
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
    }, []);

    const cycleTier = () => {
        setTier(current => {
            if (current === 'low') return 'medium';
            if (current === 'medium') return 'high';
            return 'low';
        });
    };

    const isLowPower = tier === 'low';

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
