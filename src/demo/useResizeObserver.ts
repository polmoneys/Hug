import { RefObject, useEffect, useState } from 'react';

interface Size {
    width: number;
    height: number;
}

function useResizeObserver<T extends HTMLElement = HTMLDivElement>(
    elementRef: RefObject<T>
): Size {
    const [size, setSize] = useState<Size>(() => {
        const el = elementRef.current;
        return el
            ? { width: el.clientWidth, height: el.clientHeight }
            : { width: 0, height: 0 };
    });

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const observer = new ResizeObserver(([entry]) => {
            if (entry?.contentRect) {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [elementRef]);

    return size;
}

export default useResizeObserver;
