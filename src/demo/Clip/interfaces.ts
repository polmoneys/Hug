import { ReactElement } from 'react';

export type ClipVariant =
    | 'circle'
    | 'rounded'
    | 'ellipse'
    | 'hide'
    | 'hideTop'
    | 'hideRight'
    | 'hideLeft'
    | 'hideBottom';

export interface ClipProps {
    variant: ClipVariant;
    children: ReactElement<{
        className?: string;
    }>;
    fill?: string;
    hoverFill?: string;
    scale?: number;
}
