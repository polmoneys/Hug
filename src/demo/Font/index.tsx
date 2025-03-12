import { type ElementType, useMemo } from 'react';
import { FontProps, TruncateFileProps } from './interface';
import { clsx, has } from '../../Hug/utils';
import { Unit } from '../../Hug/interfaces';
import styles from './index.module.css';

function Font(props: FontProps) {
    const {
        as,
        dangerousColor,
        dangerousTransform,
        dangerousStyles,
        children,
        options = [],
        className,
        size = 'md',
        kind = 'poppins-regular',
        clamp = 0,
        inherit,
        ...rest
    } = props;

    const Tag = as ?? ('p' as ElementType);

    const shouldClamp = clamp !== 0;

    const classNames = useMemo(
        () =>
            clsx(
                className,
                styles[`${kind}`],
                styles[size],
                options.includes('number') && styles.numeric,
                options.includes('inert') && styles.inert,
                options.includes('AA') && styles.uppercase,
                options.includes('Aa') && styles.capitalize,
                options.includes('breakWord') && styles.break,
                options.includes('hyphenate') && styles.hyphenate,
                options.includes('maskX') && styles.maskX,
                options.includes('maskY') && styles.maskY,
                shouldClamp && styles.clamp,
                inherit && styles.inherit
            ),
        [className, kind, size, options, shouldClamp, inherit]
    );

    return (
        <Tag
            {...rest}
            style={{
                ...(has(dangerousColor) && { color: dangerousColor }),
                ...(has(dangerousStyles) && dangerousStyles),
                ...(has(dangerousTransform) && {
                    transform: dangerousTransform,
                }),
                ...(shouldClamp && { '--clamp-lines': clamp }),
            }}
            className={classNames}
        >
            {children}
        </Tag>
    );
}

const Bold = (props: FontProps) => <Font {...props} kind="poppins-semibold" />;
const Thin = (props: FontProps) => <Font {...props} kind="poppins-light" />;
const Italic = (props: FontProps) => (
    <Font {...props} kind="poppins-medium-italic" />
);

const Grotesk = (props: FontProps) => <Font {...props} kind="grotesk" />;

const Tooltip = ({ maxWidth, ...props }: FontProps & { maxWidth: Unit }) => (
    <div className={styles.ellipsis} style={{ width: maxWidth }}>
        <Font {...props} />
    </div>
);

const TruncateFile = (props: TruncateFileProps) => {
    const {
        children = 'this-file-has-a-really-really-really-long-filename.',
        extension = 'pdf',
    } = props;
    return (
        <div className={styles.filename}>
            <span className={styles.name}>{children}</span>
            <span className={styles.extension}>{extension}</span>
        </div>
    );
};

export default Object.assign(Font, {
    Bold,
    Thin,
    Italic,
    Grotesk,
    Tooltip,
    TruncateFile,
});
