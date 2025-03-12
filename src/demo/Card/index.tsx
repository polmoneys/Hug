import { clsx, has } from '../../Hug/utils';
import Media from '../Media';
import VideoPlayer from '../Media/Video/';
import Video from '../Media/Video/Player';
import CardProps, { CardTitleProps } from './interface';

import styles from './index.module.css';

const Card = (props: CardProps) => {
    const { ratio = 'auto', className, ...rest } = props;
    return (
        <div
            className={clsx(styles.root, styles[ratio], className)}
            {...rest}
        />
    );
};

const Title = ({ children, icon, ...rest }: Omit<CardTitleProps, 'ratio'>) => (
    <header {...rest}>
        {has(icon) && icon}
        {children}
    </header>
);

const Content = ({
    children,
    className,
    ...rest
}: Omit<CardProps, 'ratio'>) => (
    <div {...rest} className={clsx(className, styles.content)}>
        {children}
    </div>
);

const Actions = ({ children, ...rest }: Omit<CardProps, 'ratio'>) => (
    <footer {...rest}>{children}</footer>
);

const Portrait = (props: CardProps) => {
    return <Card {...props} ratio="portrait" />;
};

const Landscape = (props: CardProps) => {
    return <Card {...props} ratio="landscape" />;
};

export default Object.assign(Card, {
    Media,
    Video,
    VideoPlayer,
    Portrait,
    Landscape,
    Actions,
    Content,
    Title,
});
