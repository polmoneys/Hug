import { CSSProperties, isValidElement, cloneElement, useMemo } from 'react';
import { DisplayType, HugProps, Unit } from './interfaces';
import { clsx, computeResponsiveValues, has } from './utils';
import Us from './Us';

import styles from './Hug.module.css';

function Hug({
    display,
    flexDirection = 'row',
    padding,
    gap,
    gridTemplateColumns,
    width,
    height,
    children,
    component: Component = 'div',
    dangerous,
    start,
    startWidth,
    end,
    endWidth,
    gradient,
    ml,
    mr,
    ...rest
}: HugProps) {
    // ...
    // white space
    // ...
    // ...
    // for dramatic effect
    // ...

    const style: CSSProperties = useMemo(() => {
        const displayValues = computeResponsiveValues<DisplayType>(display);
        const widthValues = computeResponsiveValues<Unit>(width);
        const heightValues = computeResponsiveValues<Unit>(height);
        const paddingValues = computeResponsiveValues<Unit>(padding);
        const gapValues = computeResponsiveValues<Unit>(gap);
        const gridTemplateColumnsValues =
            computeResponsiveValues<Unit>(gridTemplateColumns);

        const sizes = {
            start: has(startWidth),
            end: has(endWidth),
            both: has(startWidth) && has(endWidth),
        };

        const customStyle = {
            '--hug-display': displayValues.xs,
            '--hug-display-sm': displayValues.sm,
            '--hug-display-md': displayValues.md,
            '--hug-display-lg': displayValues.lg,
            '--hug-display-xl': displayValues.xl,
            '--hug-width': widthValues.xs,
            '--hug-width-sm': widthValues.sm,
            '--hug-width-md': widthValues.md,
            '--hug-width-lg': widthValues.lg,
            '--hug-width-xl': widthValues.xl,
            '--hug-height': heightValues.xs,
            '--hug-height-sm': heightValues.sm,
            '--hug-height-md': heightValues.md,
            '--hug-height-lg': heightValues.lg,
            '--hug-height-xl': heightValues.xl,
            '--hug-padding': paddingValues.xs,
            '--hug-padding-sm': paddingValues.sm,
            '--hug-padding-md': paddingValues.md,
            '--hug-padding-lg': paddingValues.lg,
            '--hug-padding-xl': paddingValues.xl,
            '--hug-gap': gapValues.xs,
            '--hug-gap-sm': gapValues.sm,
            '--hug-gap-md': gapValues.md,
            '--hug-gap-lg': gapValues.lg,
            '--hug-gap-xl': gapValues.xl,
            '--hug-grid-template-columns': gridTemplateColumnsValues.xs,
            '--hug-grid-template-columns-sm': gridTemplateColumnsValues.sm,
            '--hug-grid-template-columns-md': gridTemplateColumnsValues.md,
            '--hug-grid-template-columns-lg': gridTemplateColumnsValues.lg,
            '--hug-grid-template-columns-xl': gridTemplateColumnsValues.xl,
            '--hug-flex-direction': flexDirection,
            ...(sizes.start && {
                '--start': startWidth,
            }),
            ...(sizes.end && {
                '--end': endWidth,
            }),
            ...(sizes.both && {
                '--start': startWidth,
                '--end': endWidth,
            }),
            ...(has(gradient) && {
                backgroundImage: `linear-gradient(90deg,${gradient})`,
            }),
            ...(ml && {
                marginLeft: 'auto',
            }),
            ...(mr && {
                marginRight: 'auto',
            }),
        };

        return has(dangerous) ? { ...dangerous, ...customStyle } : customStyle;
    }, [
        dangerous,
        display,
        endWidth,
        flexDirection,
        gap,
        gradient,
        gridTemplateColumns,
        height,
        ml,
        mr,
        padding,
        startWidth,
        width,
    ]);

    const hasSlot = has(start) || has(end);
    const isSlot = hasSlot || !isValidElement(children);

    if (!isSlot) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = children as React.ReactElement<any>;
        const childClassName = clsx(child.props.className, styles.hug);
        return cloneElement(child, {
            ...rest,
            className: childClassName,
            style,
        });
    }

    return (
        <Component
            className={clsx(
                styles.hug,
                hasSlot && styles.slot,
                has(start) && styles.hasStart,
                has(end) && styles.hasEnd
            )}
            style={style}
            {...rest}
        >
            {has(start) && start}
            {children}
            {has(end) && end}
        </Component>
    );
}

export default Object.assign(Hug, { Us });
