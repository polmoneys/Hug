import { CSSProperties } from 'react';
import { has } from '../utils';
import { SlotsProps } from '../interfaces';

import styles from './slot.module.css';

export default function Slot(props: SlotsProps) {
    const { children, start, end, startWidth, endWidth, gradient, style } =
        props;

    const sizes = {
        start: has(startWidth),
        end: has(endWidth),
        both: has(startWidth) && has(endWidth),
    };

    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg,${gradient})`,
    };

    return (
        <div
            className={styles.slot}
            {...(sizes.start && {
                style: {
                    '--start': startWidth,
                    ...(has(gradient) && gradientStyle),
                    ...(has(style) && style),
                } as CSSProperties,
            })}
            {...(sizes.end && {
                style: {
                    '--end': endWidth,
                    ...(has(gradient) && gradientStyle),
                    ...(has(style) && style),
                } as CSSProperties,
            })}
            {...(sizes.both && {
                style: {
                    '--start': startWidth,
                    '--end': endWidth,
                    ...(has(gradient) && gradientStyle),
                    ...(has(style) && style),
                } as CSSProperties,
            })}
        >
            {has(start) && <div className={styles.start}>{start}</div>}
            <div className={styles.content}>{children}</div>
            {has(end) && <div className={styles.end}>{end}</div>}
        </div>
    );
}
