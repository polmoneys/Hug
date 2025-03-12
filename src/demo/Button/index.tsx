import { AriaAttributes, KeyboardEvent, ReactNode, useRef } from 'react';
import { useButton } from 'react-aria';
import { clsx, has } from '../../Hug/utils';
import styles from './index.module.css';

export interface ButtonProps extends AriaAttributes {
    id?: string;
    onClick?: () => void;
    onKeyDown?: (
        event: KeyboardEvent<HTMLButtonElement | HTMLInputElement>
    ) => void;
    className?: string;
    children: ReactNode;
    short?: boolean;
    stretch?: boolean;
    text?: boolean;
    icon?: boolean;
    isActive?: boolean;
    fitContent?: boolean;
    ml?: boolean;
    mr?: boolean;
    popovertarget?: string;
    dangerousColor?: string;
}

const Button = (props: ButtonProps) => {
    const {
        className,
        short = false,
        text = false,
        icon = false,
        isActive = false,
        fitContent = true,
        ml = false,
        mr = false,
        stretch = false,
        onKeyDown,
        popovertarget,
        dangerousColor,
        ...rest
    } = props;

    const ref = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton(rest, ref);
    const { children } = props;

    return (
        <button
            type="button"
            {...buttonProps}
            {...(has(popovertarget) && { popovertarget })}
            {...(has(dangerousColor) && { style: { color: dangerousColor } })}
            {...(ml && {
                style: {
                    marginLeft: 'auto',
                    ...(has(dangerousColor) && { color: dangerousColor }),
                },
            })}
            {...(mr && {
                style: {
                    marginRight: 'auto',
                    ...(has(dangerousColor) && { color: dangerousColor }),
                },
            })}
            {...(has(onKeyDown) && { onKeyDown })}
            tabIndex={0}
            className={clsx(
                styles.root,
                fitContent && styles.fitContent,
                short && styles.short,
                text && styles.text,
                icon && styles.icon,
                stretch && styles.stretch,
                isActive && styles.active,
                className
            )}
        >
            {children}
        </button>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Text = ({ text, ...rest }: ButtonProps) => <Button {...rest} text />;
const Icon = (props: ButtonProps) => <Button {...props} />;

export default Object.assign(Button, {
    Text,
    Icon,
});
