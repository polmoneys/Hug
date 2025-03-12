import { ReactNode } from 'react';
import Disclosure from '.';

import styles from './group.module.css';

interface Props {
    items: Array<{
        summary: string;
        children: ReactNode;
        id: string;
        name: string;
    }>;
}

const Group = (props: Props) => {
    const { items } = props;
    return (
        <div className={styles.root}>
            {items.map((child) => (
                <Disclosure key={child.id} {...child} />
            ))}
        </div>
    );
};

export default Group;
