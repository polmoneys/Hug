import { forwardRef, type ForwardedRef } from 'react';
import { TextInputLabelProps } from './interface';
import { clsx, has } from '../../Hug/utils';

import styles from './index.module.css';

const TextInputLabel = forwardRef<HTMLInputElement, TextInputLabelProps>(
    (props: TextInputLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
        const {
            id,
            // value,
            onChange,
            direction = 'column',
            classNames,
            label,
            errorElementId,
            ...rest
        } = props;

        return (
            <div
                className={clsx(
                    styles.root,
                    direction === 'column' ? styles.column : styles.row,
                    classNames?.root
                )}
            >
                <label htmlFor={id}>{label}</label>
                <input
                    {...rest}
                    id={id}
                    name={id}
                    type="text"
                    className={clsx(styles.input, classNames?.input)}
                    {...(ref != null && { ref })}
                    {...(has(errorElementId) && {
                        'aria-describedby': errorElementId,
                    })}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        );
    }
);

export default TextInputLabel;
