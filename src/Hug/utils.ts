import { Breakpoint, ResponsiveProp } from './interfaces';

export const has = <T>(value: T | undefined): value is T => value !== undefined;
export const clsx = (...params: unknown[]): string =>
    params.filter(Boolean).join(' ');

const breakpointsOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function computeResponsiveValues<T>(
    valueMap?: ResponsiveProp<T>
): Record<Breakpoint, T | ''> {
    const result: Partial<Record<Breakpoint, T | ''>> = {};
    let lastValue: T | '' = '';
    for (const bp of breakpointsOrder) {
        if (valueMap && valueMap[bp] !== undefined) {
            lastValue = valueMap[bp]!;
        }
        result[bp] = lastValue;
    }
    return result as Record<Breakpoint, T | ''>;
}
