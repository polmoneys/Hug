import {
    Breakpoint,
    HugsComponentProps,
    ResponsiveProp,
    SlotsProps,
    Unit,
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

export function computeResponsiveValues(
    valueMap?: ResponsiveProp<Unit>
): Record<Breakpoint, Unit | ''> {
    const result: Partial<Record<Breakpoint, Unit | ''>> = {};
    let lastValue: Unit | '' = '';
    for (const bp of breakpointsOrder) {
        if (valueMap && valueMap[bp] !== undefined) {
            lastValue = valueMap[bp]!;
        }
        result[bp] = lastValue;
    }
    return result as Record<Breakpoint, Unit | ''>;
}

export function removeStyle(selector: string, property: string) {
    const el: HTMLElement | null = document.querySelector(selector);

    if (el) {
        el.style.removeProperty(property);
    }
}
