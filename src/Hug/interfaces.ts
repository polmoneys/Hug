import { HTMLAttributes, ReactNode } from 'react';

export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type DisplayType = 'flex' | 'grid' | 'none';

export type Unit =
    | 0
    | `${string} var(--${string})`
    | `${number} var(--${string})`
    | `var(--${string})`
    | `min(${string})`
    | `max(${string})`
    | `${string}em`
    | `${string}rem`
    | `${string}px`
    | `${string}%`
    | `${string}fr`
    | `${string}vh`
    | `${string}vw`
    | `calc(${string})`
    | 'start'
    | 'center'
    | 'end'
    | 'fit-content'
    | 'wrap';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveProp<T> = Partial<Record<Breakpoint, T>>;

export interface HugProps extends HTMLAttributes<HTMLDivElement> {
    display?: ResponsiveProp<DisplayType>;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    padding?: ResponsiveProp<Unit>;
    gap?: ResponsiveProp<Unit>;
    gridTemplateColumns?: ResponsiveProp<Unit>;
    width?: ResponsiveProp<Unit>;
    height?: ResponsiveProp<Unit>;
    component?: React.ElementType;
    dangerous?: Record<string, Unit>;
    children?: ReactNode;
    start?: ReactNode;
    startWidth?: Unit;
    startHeight?: Unit;
    end?: ReactNode;
    endWidth?: Unit;
    endHeight?: Unit;
    gradient?: string;
    ml?: boolean;
    mr?: boolean;
}

export interface UsProps extends HugProps {
    centered?: boolean;
}
