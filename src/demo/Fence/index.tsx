import { useState, type ReactNode } from 'react';
import { InView } from 'react-intersection-observer';
import { has } from '../../Hug/utils';

interface Props {
    children: ReactNode;
    className?: string;
    options?: {
        threshold?: number;
        rootMargin?: string;
        triggerOnce?: boolean;
    };
    onChange?: (on: boolean) => void;
    as?: HTMLTags;
    ifOn?: ReactNode;
}

export const HTMLtag = ['header', 'footer', 'h1', 'h2', 'h3', 'div'] as const;
type HTMLTags = (typeof HTMLtag)[number];

export default function Fence(props: Props) {
    const { as = 'div', children, options, onChange, className, ifOn } = props;
    const [maybe, setMaybe] = useState(false);

    return (
        <InView
            as={as}
            {...(options !== undefined && {
                ...options,
            })}
            onChange={(inView, entry) => {
                console.log({ inView, entry });
                onChange?.(inView);
                if (has(ifOn) && inView) {
                    setMaybe(true);
                } else {
                    setMaybe(false);
                }
            }}
            {...(className !== undefined && { className })}
        >
            {children}
            {has(ifOn) && maybe && ifOn}
        </InView>
    );
}
