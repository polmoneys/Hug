import { createContext, useState, useRef, useEffect } from 'react';
import { PortalContextValue, PortalProviderProps } from './interface';

export const PortalContext = createContext<PortalContextValue | null>(null);

const PortalProvider = ({ children }: PortalProviderProps) => {
    const fallbackRef = useRef<HTMLElement | null>(null);

    const [portalTarget, setPortalTargetState] = useState<HTMLElement | null>(
        null
    );

    const setPortalTarget = (id: string) => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            setPortalTargetState(targetElement);
        } else {
            console.warn(`No element with ID "${id}" found in the DOM`);
            if (!fallbackRef.current) {
                fallbackRef.current = document.createElement('div');
                fallbackRef.current.id = 'fallback-portal-target';
                document.body.appendChild(fallbackRef.current);
            }
            setPortalTargetState(fallbackRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (fallbackRef.current) {
                document.body.removeChild(fallbackRef.current);
                fallbackRef.current = null;
            }
        };
    }, []);

    return (
        <PortalContext.Provider value={{ portalTarget, setPortalTarget }}>
            {children}
        </PortalContext.Provider>
    );
};

export default PortalProvider;
