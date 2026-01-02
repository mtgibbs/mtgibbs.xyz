import React from 'react';

const CyberGrid = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
                    width: '100vw'
                }}
            />

            {/* Horizon Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-magnetic-black opacity-80"></div>
        </div>
    );
};

export default CyberGrid;
