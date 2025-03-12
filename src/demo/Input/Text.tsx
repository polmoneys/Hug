import { forwardRef, type ForwardedRef } from 'react';
import { TextInputProps } from './interface';

import styles from './index.module.css';
import { clsx, has } from '../../Hug/utils';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) => {
        const {
            id,
            //  value,
            onChange,
            classNames,
            errorElementId,
            ...rest
        } = props;

        return (
            <input
                {...rest}
                id={id}
                type="text"
                className={clsx(styles.input, classNames?.input)}
                {...(ref != null && { ref })}
                {...(has(errorElementId) && {
                    'aria-describedby': errorElementId,
                })}
                autoComplete="off"
                onChange={(event) => onChange(event.target.value)}
            />
        );
    }
);

export default TextInput;
