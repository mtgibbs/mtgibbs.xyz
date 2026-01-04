import React, { useState, useEffect } from 'react';
import styles from './MainframeDashboard.module.css';
import AnalogGauge from './analog-gauge';
import ControlButton from './control-button';
import LEDDisplay from './led-display';
import SectionTitle from '../section-title/section-title';

const MainframeDashboard = () => {
    const [powerOn, setPowerOn] = useState(true);
    const [trajectories, setTrajectories] = useState(45);
    const [fuelLevel, setFuelLevel] = useState(82);
    const [radiation, setRadiation] = useState(12);
    const [systemTime, setSystemTime] = useState('12:00:00');

    // Simulate some movement in the gauges
    useEffect(() => {
        if (!powerOn) return;

        const interval = setInterval(() => {
            setTrajectories(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
            setFuelLevel(prev => Math.max(0, prev - 0.1));
            setRadiation(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
            setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);

        return () => clearInterval(interval);
    }, [powerOn]);

    return (
        <section className="relative w-full py-24 bg-magnetic-black overflow-hidden border-t-4 border-signal-orange/30">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <SectionTitle title="Mission Control" />
                </div>

                <div className={styles.consoleContainer}>
                    {/* Metal Console Frame */}
                    <div className={styles.mainframeHousing}>

                        <div className={styles.gridOverlay}></div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                            {/* Left Panel: Primary Controls */}
                            <div className="lg:col-span-4 flex flex-col gap-8">
                                <div className={styles.panelSection}>
                                    <div className={styles.panelLabel}>SYSTEM STATE</div>
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <ControlButton
                                            label="POWER"
                                            active={powerOn}
                                            onClick={() => setPowerOn(!powerOn)}
                                            color="red"
                                        />
                                        <ControlButton label="ABORT" color="orange" />
                                        <ControlButton label="LAUNCH" color="green" />
                                    </div>

                                    <div className="grid grid-cols-4 gap-2 mt-8">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className={styles.statusLight} data-active={powerOn && Math.random() > 0.7}></div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.panelSection}>
                                    <div className={styles.panelLabel}>PRIMARY GUIDANCE</div>
                                    <LEDDisplay value={powerOn ? "APOLLO 18" : ""} label="MISSION_ID" />
                                    <LEDDisplay value={powerOn ? systemTime : "--:--:--"} label="CHRONO" color="red" />
                                </div>
                            </div>

                            {/* Center Panel: Visual Gauges */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <AnalogGauge
                                    label="TRAJECTORY"
                                    value={powerOn ? trajectories : 0}
                                    min={0}
                                    max={100}
                                />
                                <AnalogGauge
                                    label="FUEL FLOW"
                                    value={powerOn ? fuelLevel : 0}
                                    min={0}
                                    max={100}
                                    warningAt={20}
                                />
                                <AnalogGauge
                                    label="RADIATION"
                                    value={powerOn ? radiation : 0}
                                    min={0}
                                    max={100}
                                    dangerAt={80}
                                />

                                <div className="md:col-span-3 mt-4">
                                    <div className={styles.panelSection}>
                                        <div className={styles.panelLabel}>TELEMETRY DATA STREAM</div>
                                        <div className={styles.dataStream}>
                                            {powerOn ? (
                                                <div className="font-mono text-xs text-phosphor-amber opacity-60">
                                                    {`> LINK SECURE...\n> BUS VOLTAGE: 28.4V\n> O2 PRESSURE: NOMINAL\n> H2 LEVEL: ${fuelLevel.toFixed(1)}%\n> TRJ_OFFSET: +00.042`}
                                                </div>
                                            ) : (
                                                <div className="font-mono text-xs text-static-grey italic">SYSTEM OFFLINE</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hardware Details */}
                        <div className={styles.screwTopLeft}></div>
                        <div className={styles.screwTopRight}></div>
                        <div className={styles.screwBottomLeft}></div>
                        <div className={styles.screwBottomRight}></div>
                        <div className={styles.handleLeft}></div>
                        <div className={styles.handleRight}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainframeDashboard;
