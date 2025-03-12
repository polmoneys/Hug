import { ReactNode } from 'react';

export type PortalContextValue = {
    setPortalTarget: (id: string) => void;
    portalTarget: HTMLElement | null;
};

export interface PortalProviderProps {
    children: ReactNode;
}

export interface PortalProps {
    children: ReactNode;
    onMount?: (target: HTMLElement) => void;
    onUnmount?: (target: HTMLElement) => void;
}
