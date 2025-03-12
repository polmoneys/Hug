import { Props } from './interface';
import styles from './index.module.css';

const sprite = new URL('../../assets/sprite.svg', import.meta.url);

const Icon = ({ name, size = 24, label, dangerousTransform }: Props) => (
    <svg
        className={styles.root}
        width={size}
        height={size}
        focusable="false"
        data-icon
        aria-labelledby={`${label}-icon`}
        viewBox={`0 0 ${size} ${size}`}
        style={{
            width: size,
            height: size,
            ...(dangerousTransform && {
                transform: dangerousTransform,
                transformOrigin: 'center center',
            }),
        }}
    >
        <title id={`${label}-icon`}>{label} </title>
        <use href={`${sprite}#${name}`} />
    </svg>
);

export default Icon;
