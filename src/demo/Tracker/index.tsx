import { useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './Tracker.module.css';

interface MouseTrackerProps {
    children: ReactNode;
    offset?: {
        x: number;
        y: number;
    };
}

export default function MouseTracker({
    children,
    offset = { x: 0, y: 0 },
}: MouseTrackerProps) {
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handler(ev: MouseEvent | TouchEvent) {
            if (element.current) {
                // If it's a touch event, use the first touch point.
                const e = 'touches' in ev ? ev.touches[0] : ev;
                const x = e.clientX + offset.x;
                const y = e.clientY + offset.y;
                element.current.style.transform = `translate(${x}px, ${y}px)`;
                element.current.style.visibility = 'visible';
            }
        }
        document.addEventListener('mousemove', handler);
        document.addEventListener('touchmove', handler);
        return () => {
            document.removeEventListener('mousemove', handler);
            document.removeEventListener('touchmove', handler);
        };
    }, [offset.x, offset.y]);

    return createPortal(
        <div className={styles.root} ref={element}>
            {children}
        </div>,
        document.body
    );
}
