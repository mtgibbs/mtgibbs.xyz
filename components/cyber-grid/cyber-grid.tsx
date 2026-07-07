import React from 'react';

const CyberGrid = () => {
    return (
        // Capped to hero height: this used to span the whole page (~16k px of
        // 3D-transformed, opacity-animated layer composited on every scroll
        // frame) while only ever being visible behind the hero.
        <div className="absolute inset-x-0 top-0 h-[110vh] z-0 overflow-hidden pointer-events-none">
            {/* Perspective Grid */}
            <div className="absolute inset-0 bg-transparent"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 176, 0, 0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 176, 0, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
                    animation: 'pulse-fast 4s infinite linear',
                    opacity: 0.3,
                    height: '200%',
                    width: '100%'
                }}
            />

            {/* Horizon Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-magnetic-black opacity-80"></div>
        </div>
    );
};

export default CyberGrid;
