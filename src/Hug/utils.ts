import {
    Breakpoint,
    HugsComponentProps,
    ResponsiveProp,
    SlotsProps,
} from './interfaces';

export const has = <T>(value: T | undefined): value is T => value !== undefined;
export const clsx = (...params: unknown[]): string =>
    params.filter(Boolean).join(' ');

export const isSlotsProps = (
    props: HugsComponentProps
): props is SlotsProps => {
    return (
        ('start' in props && props.start !== undefined) ||
        ('end' in props && props.end !== undefined)
    );
};

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
