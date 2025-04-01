import {
    AriaAttributes,
    KeyboardEvent,
    ReactNode,
    useMemo,
    useRef,
} from 'react';
import { useButton } from 'react-aria';
import { clsx, has } from '../../Hug/utils';
import styles from './index.module.css';
import { Unit } from '../../Hug/interfaces';

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
    textUnderline?: boolean;
    icon?: boolean;
    isActive?: boolean;
    pill?: boolean;
    fitContent?: boolean;
    ml?: boolean;
    mr?: boolean;
    popovertarget?: string;
    dangerousColor?: string;
    start?: ReactNode;
    startWidth?: Unit;
    startHeight?: Unit;
    end?: ReactNode;
    endWidth?: Unit;
    endHeight?: Unit;
    gradient?: string;
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
        textUnderline = false,
        stretch = false,
        pill = false,
        onKeyDown,
        popovertarget,
        dangerousColor,
        start,
        startWidth,
        end,
        endWidth,
        gradient,
        ...rest
    } = props;

    const ref = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton(rest, ref);
    const { children } = props;

    const sizes = {
        start: has(startWidth),
        end: has(endWidth),
        both: has(startWidth) && has(endWidth),
    };

    const stylesProps = useMemo(() => {
        const gradientStyle = {
            backgroundImage: `linear-gradient(90deg,${gradient})`,
        };
        const style = {
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
            ...(has(gradient) && gradientStyle),
            ...(has(dangerousColor) && {
                color: dangerousColor,
            }),
            ...(ml && {
                marginLeft: 'auto',
            }),
            ...(mr && {
                marginRight: 'auto',
            }),
        };
        return style;
    }, [
        dangerousColor,
        endWidth,
        gradient,
        ml,
        mr,
        sizes.both,
        sizes.end,
        sizes.start,
        startWidth,
    ]);

    return (
        <button
            type="button"
            {...buttonProps}
            {...(has(popovertarget) && { popovertarget })}
            {...(has(onKeyDown) && { onKeyDown })}
            tabIndex={0}
            className={clsx(
                styles.root,
                fitContent && styles.fitContent,
                short && styles.short,
                text && styles.text,
                textUnderline && styles.textUnderline,
                icon && styles.icon,
                pill && styles.pill,
                stretch && styles.stretch,
                isActive && styles.active,
                has(start) && styles.hasStart,
                has(end) && styles.hasEnd,
                className
            )}
            style={stylesProps}
        >
            {has(start) && start}
            <span>{children}</span>
            {has(end) && end}
        </button>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Text = ({ text, ...rest }: ButtonProps) => <Button {...rest} text />;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextUnderline = ({ textUnderline, ...rest }: ButtonProps) => (
    <Button {...rest} textUnderline />
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Icon = ({ icon, ...rest }: ButtonProps) => <Button {...rest} icon />;

export default Object.assign(Button, {
    Text,
    Icon,
    TextUnderline,
});
