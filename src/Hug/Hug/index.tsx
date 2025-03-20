import { CSSProperties, isValidElement, cloneElement } from 'react';
import { DisplayType, HugProps, Unit } from '../interfaces';
import { clsx, computeResponsiveValues, has } from '../utils';

import styles from './Hug.module.css';

export default function Hugger({
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
    ...rest
}: HugProps) {
    const displayValues = computeResponsiveValues<DisplayType>(display);
    const widthValues = computeResponsiveValues<Unit>(width);
    const heightValues = computeResponsiveValues<Unit>(height);
    const paddingValues = computeResponsiveValues<Unit>(padding);
    const gapValues = computeResponsiveValues<Unit>(gap);
    const gridTemplateColumnsValues =
        computeResponsiveValues<Unit>(gridTemplateColumns);

    const customStyle: CSSProperties = {
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
    } as CSSProperties;

    const style = has(dangerous)
        ? { ...dangerous, ...customStyle }
        : customStyle;

    if (isValidElement(children)) {
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
        <Component className={styles.hug} style={style} {...rest}>
            {children}
        </Component>
    );
}
