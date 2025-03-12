import { ReactNode } from 'react';
import Group from './Group';
import { has } from '../../Hug/utils';

interface Props {
    summary: string;
    children: ReactNode;
    name?: string;
}

/*
    https://codepen.io/bramus/pen/MWZYdmX
*/

const Disclosure = ({ summary, children, name }: Props) => (
    <details {...(has(name) && { name })}>
        <summary>{summary}</summary>
        {children}
    </details>
);

export default Object.assign(Disclosure, { Group });
