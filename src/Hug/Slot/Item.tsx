import { CSSProperties } from 'react';
import { has } from '../utils';
import { SlotsProps } from '../interfaces';

import styles from './slot.module.css';

function Slot(props: SlotsProps) {
    const { children, description, start, end, startWidth, endWidth } = props;

    const sizes = {
        start: has(startWidth),
        end: has(endWidth),
        both: has(startWidth) && has(endWidth),
    };

    return (
        <li
            className={styles.slot}
            {...(sizes.start && {
                style: { '--start': startWidth } as CSSProperties,
            })}
            {...(sizes.end && {
                style: { '--end': endWidth } as CSSProperties,
            })}
            {...(sizes.both && {
                style: {
                    '--start': startWidth,
                    '--end': endWidth,
                } as CSSProperties,
            })}
        >
            {has(start) && <div className={styles.start}>{start}</div>}
            <div className={styles.content}>
                {children}
                {has(description) && <div>{description}</div>}
            </div>
            {has(end) && <div className={styles.end}>{end}</div>}
        </li>
    );
}

export default Slot;
