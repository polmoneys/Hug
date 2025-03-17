// Turn all HTML <a> elements into client side router links, no special framework-specific <Link> component necessary!
// Example using the Next.js App Router.
// import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useLinkHandler() {
    // let router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onClick = (e: any) => {
            const link = e.target.closest('a');
            if (
                link &&
                link instanceof HTMLAnchorElement &&
                link.href &&
                (!link.target || link.target === '_self') &&
                link.origin === location.origin &&
                !link.hasAttribute('download') &&
                e.button === 0 && // left clicks only
                !e.metaKey && // open in new tab (mac)
                !e.ctrlKey && // open in new tab (windows)
                !e.altKey && // download
                !e.shiftKey &&
                !e.defaultPrevented
            ) {
                e.preventDefault();
                // router.push(link.href);
            }
        };

        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
        };
    }, []);
    // }, [router]);
}
