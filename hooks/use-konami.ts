import { useEffect, useState } from 'react';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

export const useKonami = (action: () => void) => {
    const [input, setInput] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newItem = e.key;

            setInput((prev) => {
                const newInput = [...prev, newItem];

                // Keep only as many keystrokes as the code length
                if (newInput.length > KONAMI_CODE.length) {
                    newInput.shift();
                }

                // Check for match
                if (JSON.stringify(newInput) === JSON.stringify(KONAMI_CODE)) {
                    action();
                    return []; // Reset after success
                }

                return newInput;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [action]);
};
