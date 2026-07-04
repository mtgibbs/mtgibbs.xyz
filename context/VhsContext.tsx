import React, { createContext, useContext, useState, useEffect } from 'react';

interface VhsContextType {
    isVhsActive: boolean;
    toggleVhs: () => void;
}

const VhsContext = createContext<VhsContextType | undefined>(undefined);

export const VhsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVhsActive, setIsVhsActive] = useState(true);

    const toggleVhs = () => {
        setIsVhsActive(!isVhsActive);
    };

    return (
        <VhsContext.Provider value={{ isVhsActive, toggleVhs }}>
            <div className={isVhsActive ? 'vhs-active vhs-effects' : 'vhs-effects'}>
                <div className="tracking-noise" />
                <div className="phosphor-roll" />
                {children}
            </div>
        </VhsContext.Provider>
    );
};

export const useVhs = () => {
    const context = useContext(VhsContext);
    if (context === undefined) {
        throw new Error('useVhs must be used within a VhsProvider');
    }
    return context;
};
