import { useEffect, useState } from 'react';
import { RequireAtLeastOne } from '../Hug/interfaces';

type MediaQueryOpts = RequireAtLeastOne<{
    query?: string;
    minWidth?: number;
    maxWidth?: number;
}>;

// ✅ choose either
// const isDesktop = useMediaQuery({ minWidth: 1024 });
// const prefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' });

// ❌ error: no params
// useMediaQuery({});

export default function useMediaQuery(opts: MediaQueryOpts): boolean {
    const { query, minWidth, maxWidth } = opts ?? {};
    const mq =
        query ??
        [
            minWidth !== undefined && `(min-width: ${minWidth}px)`,
            maxWidth !== undefined && `(max-width: ${maxWidth}px)`,
        ]
            .filter(Boolean)
            .join(' and ');

    const [matches, setMatches] = useState(() => window.matchMedia(mq).matches);

    useEffect(() => {
        const mql = window.matchMedia(mq);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, [mq]);

    return matches;
}
