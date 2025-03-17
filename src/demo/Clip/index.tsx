import { cloneElement, CSSProperties } from 'react';
import { ClipProps } from './interfaces';
import { clipPathValues } from './utils';
import { clsx } from '../../Hug/utils';

import styles from './Clip.module.css';

export default function Clip({
    variant,
    children,
    fill = 'red',
    hoverFill,
    scale = 0.9,
}: ClipProps) {
    const outerStyle: CSSProperties = {
        '--clip-fill': fill,
        '--clip-path': clipPathValues[variant],
        '--clip-scale': scale,
        ...(hoverFill && { '--clip-hover-fill': hoverFill }),
    } as CSSProperties;

    const childWithScale = cloneElement(children, {
        className: clsx(children.props.className, styles.child),
    });

    return (
        <div style={outerStyle} className={styles.root}>
            {childWithScale}
        </div>
    );
}
