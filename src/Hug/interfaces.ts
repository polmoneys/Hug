import { HTMLAttributes, ReactNode } from 'react';

export type RequireAtLeastOne<T> = {
    [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];
export type LooseAutocomplete<T extends string> = T | (string & {});
export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];
/*
    export const SIZES = BREAKPOINTS;            
    export type SizeToken = typeof SIZES[number];
*/
export type DisplayType = 'flex' | 'grid' | 'none';

type CssVar = `var(--${string})`;
type NumericVar = `${number} ${CssVar}`;
type MinMax = `min(${string})` | `max(${string})`;
type Calc = `calc(${string})`;
type UnitSuffix = 'em' | 'rem' | 'px' | '%' | 'fr' | 'vh' | 'vw';
type WithSuffix = `${string}${UnitSuffix}`;

export type Unit =
    | 0
    | CssVar
    | NumericVar
    | MinMax
    | Calc
    | WithSuffix
    | 'start'
    | 'center'
    | 'end'
    | 'fit-content'
    | 'wrap';

export type ResponsiveProp<T> = Partial<Record<Breakpoint, T>>;
// Alias
export type R<T> = ResponsiveProp<T>;

type SpacingProps = {
    padding?: R<Unit>;
    gap?: R<Unit>;
};

type SizeProps = {
    width?: R<Unit>;
    height?: R<Unit>;
    gridTemplateColumns?: R<Unit>;
};

export interface HugProps
    extends HTMLAttributes<HTMLDivElement>,
        SpacingProps,
        SizeProps {
    display?: R<DisplayType>;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
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
