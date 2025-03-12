import { CSSProperties, isValidElement, cloneElement } from 'react';
import { HugProps } from '../interfaces';
import { clsx, computeResponsiveValues, has } from '../utils';

import styles from './Hug.module.css';

export default function Hugger({
    display = 'flex',
    flexDirection = 'row',
    padding,
    gap,
    gridTemplateColumns,
    width,
    height,
    children,
    component: Component = 'div',
    dangerous,
    ...rest
}: HugProps) {
    const widthValues = computeResponsiveValues(width);
    const heightValues = computeResponsiveValues(height);
    const paddingValues = computeResponsiveValues(padding);
    const gapValues = computeResponsiveValues(gap);
    const gridTemplateColumnsValues =
        computeResponsiveValues(gridTemplateColumns);

    const customStyle: CSSProperties = {
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
    } as CSSProperties;

    const layoutClass = display === 'grid' ? styles.grid : styles.flex;

    if (isValidElement(children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const child = children as React.ReactElement<any>;
        const childClassName = child.props.className
            ? clsx(child.props.className, styles.hug, layoutClass)
            : clsx(styles.hug, layoutClass);
        return cloneElement(child, {
            ...rest,
            className: childClassName,
            style: has(dangerous)
                ? { ...dangerous, ...customStyle }
                : customStyle,
        });
    }

    return (
        <Component
            className={clsx(styles.hug, layoutClass)}
            style={customStyle}
            {...rest}
        >
            {children}
        </Component>
    );
}
