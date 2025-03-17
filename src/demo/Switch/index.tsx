import { ComponentProps, ChangeEvent } from 'react';
import Font from '../Font';

import styles from './Switch.module.css';

interface Props extends ComponentProps<'input'> {
    initial: boolean;
    onChangeValue: (value: boolean) => void;
    label: string;
}

function Switch(props: Props) {
    const {
        initial = false,
        onChangeValue,
        id,
        label = 'Switch',
        ...rest
    } = props;

    const onChange = (event: ChangeEvent<HTMLInputElement>) =>
        onChangeValue(event.target.checked);
    return (
        <label htmlFor={id} className={styles.group}>
            <input
                {...rest}
                type="checkbox"
                {...(initial && { checked: true })}
                onChange={onChange}
            />
            <Font>{label}</Font>
        </label>
    );
}

export default Switch;
